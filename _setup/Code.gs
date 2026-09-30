/**
 * 클라우드에어 AI 구독 견적 요청 → 텔레그램 중계
 *
 * 견적기(GitHub Pages)에서 보낸 요청을 검사한 뒤 텔레그램 봇으로 전달합니다.
 * 비밀 값은 코드에 적지 않고 "스크립트 속성"에 저장합니다.
 *
 * 스크립트 속성 (프로젝트 설정 → 스크립트 속성)
 *   BOT_TOKEN         : BotFather 에게 받은 봇 토큰              (필수)
 *   CHAT_ID           : 알림 받을 채팅 ID                        (필수)
 *   TURNSTILE_SECRET  : Cloudflare Turnstile 비밀 키             (선택 — 넣으면 사람 확인을 통과한 요청만 받음)
 *   ALLOWED_HOSTS     : 허용할 사이트 주소, 쉼표로 구분          (선택 — 비우면 아래 기본값)
 *
 * 검사 순서
 *   1. 숨김 칸(봇 함정)   2. 입력 형식·길이·링크   3. 사람 확인(Turnstile) + 발급 사이트
 *   4. 실제 상품 목록에 있는 상품·플랜인지   5. 10분당 전체 건수 제한
 */

var DEFAULT_HOSTS = 'cloudairac01-arch.github.io';
var CATALOG_URL   = 'https://cloudairac01-arch.github.io/cloudair-quote/products.js';
var MAX_PER_10MIN = 30;

// 링크로 보이는 것: http(s)://, www., t.me/, 흔한 도메인 끝자리
var LINK_RE = /(https?:\/\/|www\.|t\.me\/|[a-z0-9-]+\.(com|net|org|io|kr|co|me|xyz|ly|app|site|link|click|top|info|biz)\b)/i;
var EMAIL_RE = /^[^@\s<>"']+@[^@\s<>"']+\.[^@\s<>"']+$/;
var TEL_RE = /^[0-9+\-() ]{0,20}$/;

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // 1. 봇이 자동으로 채우는 숨김 칸에 값이 있으면 조용히 무시
    if (d.hp) return json_({ ok: true });

    // 2. 입력 형식
    var bad = validate_(d);
    if (bad) return json_({ ok: false, error: 'invalid', field: bad });

    // 3. 사람 확인 + 우리 사이트에서 발급된 토큰인지
    if (!verifyHuman_(d.ts)) return json_({ ok: false, error: 'captcha' });

    // 4. 실제 판매 중인 상품·플랜인지
    if (!inCatalog_(d.items)) return json_({ ok: false, error: 'invalid', field: 'items' });

    // 5. 전체 건수 제한 (사람 확인을 통과한 요청만 셉니다)
    if (!allow_()) return json_({ ok: false, error: 'busy' });

    var now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
    var text = [
      '[AI 구독 견적 요청] ' + now,
      '',
      clean_(d.org) + ' ' + clean_(d.name),
      '이메일 ' + clean_(d.email),
      d.tel ? '연락처 ' + clean_(d.tel) : null,
      '',
      d.items.map(function (it, i) {
        return (i + 1) + '. ' + clean_(it.name) + ' ' + clean_(it.plan)
          + ' · ' + it.qty + '계정 · ' + it.months + '개월';
      }).join('\n')
    ].filter(function (x) { return x !== null; }).join('\n');

    return json_({ ok: send_(text) });
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  }
}

/* ── 2. 입력 형식 ───────────────────────────── */
function validate_(d) {
  if (!str_(d.name, 1, 40) || LINK_RE.test(d.name)) return 'name';
  if (!str_(d.org, 1, 60) || LINK_RE.test(d.org)) return 'org';
  if (!str_(d.email, 5, 80) || !EMAIL_RE.test(d.email.trim())) return 'email';
  if (d.tel != null && d.tel !== '' && (!str_(d.tel, 1, 20) || !TEL_RE.test(d.tel.trim()))) return 'tel';

  if (!Array.isArray(d.items) || d.items.length < 1 || d.items.length > 20) return 'items';
  var seen = {};
  for (var i = 0; i < d.items.length; i++) {
    var it = d.items[i];
    if (!it || !str_(it.name, 1, 60) || !str_(it.plan, 1, 60)) return 'items';
    if (LINK_RE.test(it.name) || LINK_RE.test(it.plan)) return 'items';
    if (!int_(it.qty, 1, 99) || !int_(it.months, 1, 36)) return 'items';
    var key = it.name + '|' + it.plan;
    if (seen[key]) return 'items';
    seen[key] = true;
  }
  return '';
}

/* ── 3. 사람 확인 (Cloudflare Turnstile) ───────── */
function verifyHuman_(token) {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('TURNSTILE_SECRET');
  if (!secret) return true; // 비밀 키를 넣기 전에는 이 검사를 건너뜁니다
  if (typeof token !== 'string' || !token || token.length > 2048) return false;

  var res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true
  });
  var j = {};
  try { j = JSON.parse(res.getContentText() || '{}'); } catch (e) {}
  var hosts = (props.getProperty('ALLOWED_HOSTS') || DEFAULT_HOSTS)
    .split(',').map(function (h) { return h.trim().toLowerCase(); }).filter(String);
  return j.success === true && hosts.indexOf(String(j.hostname || '').toLowerCase()) >= 0;
}

/* ── 4. 상품 목록 대조 ─────────────────────────
 * 사이트의 products.js 를 읽어 판매중(sale)·선행조건(prereq) 상품과 플랜만 허용합니다.
 * 1시간 동안 기억해 두고, 목록에 없는 상품이 오면 한 번 새로 읽어 다시 확인합니다
 * (새 상품을 올린 직후에도 막히지 않도록). 목록을 끝내 못 읽으면 이 검사만 건너뜁니다. */
function inCatalog_(items) {
  var cat = catalog_(false);
  if (!cat) return true;
  if (match_(cat, items)) return true;

  var cache = CacheService.getScriptCache();
  if (cache.get('catalog_refreshed')) return false;   // 5분에 한 번만 새로 읽음
  cache.put('catalog_refreshed', '1', 300);
  cat = catalog_(true);
  return !cat || match_(cat, items);
}

function match_(cat, items) {
  return items.every(function (it) {
    var plans = cat[it.name];
    return !!plans && plans.indexOf(it.plan) >= 0;
  });
}

function catalog_(fresh) {
  var cache = CacheService.getScriptCache();
  var props = PropertiesService.getScriptProperties();
  if (!fresh) {
    var c = cache.get('catalog');
    if (c) return JSON.parse(c);
  }
  try {
    var res = UrlFetchApp.fetch(CATALOG_URL + '?t=' + Date.now(), { muteHttpExceptions: true });
    if (res.getResponseCode() === 200) {
      var cat = parseCatalog_(res.getContentText());
      if (Object.keys(cat).length) {
        var s = JSON.stringify(cat);
        cache.put('catalog', s, 3600);
        props.setProperty('CATALOG_BACKUP', s);
        return cat;
      }
    }
  } catch (e) {}
  var b = props.getProperty('CATALOG_BACKUP');
  return b ? JSON.parse(b) : null;
}

function parseCatalog_(src) {
  var cat = {};
  src.split(/\{\s*id:\s*"/).slice(1).forEach(function (block) {
    var name = (block.match(/\bname:\s*"([^"]+)"/) || [])[1];
    var status = (block.match(/\bstatus:\s*"([^"]+)"/) || [])[1];
    var plans = (block.match(/\bplans:\s*\[([^\]]*)\]/) || [])[1];
    if (!name || !plans || (status !== 'sale' && status !== 'prereq')) return;
    cat[name] = (plans.match(/"([^"]*)"/g) || []).map(function (q) { return q.slice(1, -1); });
  });
  return cat;
}

/* ── 5. 건수 제한 ───────────────────────────── */
function allow_() {
  var cache = CacheService.getScriptCache();
  var n = Number(cache.get('cnt') || 0) + 1;
  cache.put('cnt', String(n), 600);
  return n <= MAX_PER_10MIN;
}

/* ── 텔레그램 전송 ─────────────────────────── */
function send_(text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('BOT_TOKEN'), chat = props.getProperty('CHAT_ID');
  if (!token || !chat) return false;
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ chat_id: chat, text: text, disable_web_page_preview: true }),
    muteHttpExceptions: true
  });
  return res.getResponseCode() === 200;
}

/** 편집기에서 실행해 텔레그램으로 테스트 메시지가 오는지 확인하세요. */
function testSend() {
  var ok = send_('[테스트] 견적기 텔레그램 연결이 정상입니다.');
  Logger.log(ok ? '전송 성공 — 텔레그램을 확인하세요.' : '전송 실패 — BOT_TOKEN / CHAT_ID 를 확인하세요.');
}

/** 편집기에서 실행해 사이트의 상품 목록을 제대로 읽는지 확인하세요. */
function testCatalog() {
  var cat = catalog_(true);
  Logger.log(cat ? '상품 ' + Object.keys(cat).length + '개를 읽었습니다: ' + Object.keys(cat).join(', ') : '상품 목록을 읽지 못했습니다 — CATALOG_URL 을 확인하세요.');
}

/* ── 도우미 ─────────────────────────────────── */
function str_(v, min, max) { return typeof v === 'string' && v.trim().length >= min && v.trim().length <= max; }
function int_(v, min, max) { return typeof v === 'number' && Math.floor(v) === v && v >= min && v <= max; }
function clean_(v) { return String(v == null ? '' : v).replace(/\s+/g, ' ').trim(); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
