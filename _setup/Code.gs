/**
 * 클라우드에어 AI 구독 견적 요청 → 텔레그램 중계
 *
 * 견적기(GitHub Pages)에서 보낸 요청을 받아 텔레그램 봇으로 전달합니다.
 * 봇 토큰은 이 코드에 적지 않고 "스크립트 속성"에 저장합니다.
 * (공개 저장소에 토큰이 노출되지 않게 하기 위함)
 *
 * 스크립트 속성 (프로젝트 설정 → 스크립트 속성)
 *   BOT_TOKEN : BotFather 에게 받은 토큰
 *   CHAT_ID   : 알림 받을 채팅 ID
 */

var MAX_PER_10MIN = 30; // 10분에 이 이상 들어오면 차단 (스팸 방지)

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // 봇이 자동으로 채우는 숨김 칸에 값이 있으면 조용히 무시
    if (d.hp) return json_({ ok: true });

    var items = Array.isArray(d.items) ? d.items.slice(0, 30) : [];
    if (!items.length || !d.name || !d.org || !d.email) return json_({ ok: false, error: 'invalid' });
    if (!allow_()) return json_({ ok: false, error: 'busy' });

    var now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
    var text = [
      '[AI 구독 견적 요청] ' + now,
      '',
      clip_(d.org, 60) + ' ' + clip_(d.name, 40),
      '이메일 ' + clip_(d.email, 80),
      d.tel ? '연락처 ' + clip_(d.tel, 30) : null,
      '',
      items.map(function (it, i) {
        return (i + 1) + '. ' + clip_(it.name, 60) + ' ' + clip_(it.plan, 60)
          + ' · ' + num_(it.qty, 99) + '계정 · ' + num_(it.months, 36) + '개월';
      }).join('\n')
    ].filter(function (x) { return x !== null; }).join('\n');

    return json_({ ok: send_(text) });
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  }
}

/** 편집기에서 한 번 실행해 텔레그램으로 테스트 메시지가 오는지 확인하세요. */
function testSend() {
  var ok = send_('[테스트] 견적기 텔레그램 연결이 정상입니다.');
  Logger.log(ok ? '전송 성공 — 텔레그램을 확인하세요.' : '전송 실패 — BOT_TOKEN / CHAT_ID 를 확인하세요.');
}

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

function allow_() {
  var cache = CacheService.getScriptCache();
  var n = Number(cache.get('cnt') || 0) + 1;
  cache.put('cnt', String(n), 600);
  return n <= MAX_PER_10MIN;
}

function clip_(v, n) { return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n); }
function num_(v, max) { v = parseInt(v, 10); return isNaN(v) ? 1 : Math.max(1, Math.min(max, v)); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
