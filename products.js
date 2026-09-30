/* 클라우드에어 AI 구독 견적기 — 상품 데이터
 * logo 는 logos 폴더 안의 로고 파일입니다.
 * 이 파일만 수정하면 견적기에 바로 반영됩니다. (index.html 은 손대지 않아도 됩니다)
 * 노션 상품 DB 연동을 켜면 GitHub Actions 가 이 파일을 자동으로 덮어씁니다.
 *
 * status 값 — sale·prereq 만 화면에 보이고, 나머지는 목록에서 숨겨집니다
 *   sale        판매중 — 정상 견적 가능
 *   prereq      선행조건 있음 — 견적 가능하지만 도메인·계정 등 조건 안내
 *   bundle_only 단독 구매 불가 — 상위 구독에 포함 (altId 로 대체 상품 지정)
 *   blocked     결제 차단 — 현재 구매 불가
 *   review      조사 필요 — 단가 확인 전, 견적 담기 차단
 */
window.CA_DATA = {
  meta: {
    updatedAt: "2026-09-29",
    // 텔레그램 중계 주소 (Google Apps Script 웹 앱 URL). 설정 방법은 _setup/텔레그램_연동_가이드.md
    telegramRelayUrl: "https://script.google.com/macros/s/AKfycbxaX_k7qmhJXAl4RZeLBHp705oQxI2c_qXqzoo_HqP92HHGRh6iMliPNWwwo0YxaK_USw/exec",
    // Cloudflare Turnstile 사이트 키 (공개 값). 비워두면 사람 확인 없이 동작
    turnstileSiteKey: "",

    company: {
      name: "클라우드에어",
      tagline: "청주대학교 AI 구독 구매대행",
      email: "cloudairac01@gmail.com",
      inquiryFormUrl: "https://app.notion.com/p/36e02b2c773a80e58c6ccf6ae437addd"
    }
  },

  categories: [
    "생성형 AI", "이미지 생성", "영상 생성", "음성·음악",
    "회의록·STT", "학술·연구", "번역·글쓰기", "문서·생산성", "코딩·개발"
  ],

  products: [
    /* ── 1. 생성형 AI ───────────────────────────── */
    { id: "chatgpt", logo: "logos/chatgpt.webp", name: "ChatGPT", vendor: "OpenAI", category: "생성형 AI",
      use: "범용 대화·문서 작성·데이터 분석·이미지 생성", status: "sale",
      account: "이메일 또는 구글·MS·애플 계정",
      plans: ["Go", "Plus", "Pro (5x)", "Pro (20x)", "Business (좌석)"] },

    { id: "claude", logo: "logos/claude.svg", name: "Claude", vendor: "Anthropic", category: "생성형 AI",
      use: "장문 문서 분석·글쓰기·코딩", status: "sale",
      account: "이메일 또는 구글 계정 · 휴대폰 SMS 인증",
      plans: ["Pro", "Max (5x)", "Max (20x)", "Team Standard (좌석)", "Team Premium (좌석)"] },

    { id: "gemini", logo: "logos/gemini.svg", name: "Gemini", vendor: "Google", category: "생성형 AI",
      use: "범용 대화 · Veo 영상 · NotebookLM · 드라이브 연동", status: "prereq",
      account: "구글 계정 필수", note: "학교 구글 계정(.ac.kr)은 기관 관리자 정책으로 개인 구독이 막힐 수 있습니다",
      plans: ["AI Plus", "AI Pro", "AI Ultra", "AI Ultra (상위)"] },

    { id: "perplexity", logo: "logos/perplexity.svg", name: "Perplexity", vendor: "Perplexity AI", category: "생성형 AI",
      use: "출처 기반 AI 검색·리서치", status: "sale",
      account: "이메일 또는 구글·애플 계정",
      plans: ["Pro", "Enterprise Pro (좌석)", "Max"] },

    { id: "ms-copilot", logo: "logos/ms-copilot.svg", name: "Microsoft Copilot", vendor: "Microsoft", category: "생성형 AI",
      use: "범용 대화 + Word·Excel·PowerPoint 연동", status: "prereq",
      account: "Microsoft 계정 필수", note: "기업 플랜은 조직 도메인이 필요합니다",
      plans: ["Microsoft 365 Premium", "Copilot Business (좌석)"] },

    { id: "codex", logo: "logos/codex.svg", name: "Codex", vendor: "OpenAI", category: "코딩·개발",
      use: "코드 생성·리팩터링 에이전트", status: "bundle_only", altId: "chatgpt",
      note: "단독 구독 상품이 없습니다. ChatGPT Plus 이상 구독에 포함됩니다",
      account: "OpenAI 계정", plans: [] },

    /* ── 2. 이미지 생성 ─────────────────────────── */
    { id: "midjourney", logo: "logos/midjourney.svg", name: "Midjourney", vendor: "Midjourney", category: "이미지 생성",
      use: "최고급 품질 이미지 생성", status: "sale",
      account: "구글 또는 디스코드 계정", note: "원화 결제 미지원 · USD 청구",
      plans: ["Basic", "Standard", "Pro", "Mega"] },

    { id: "firefly", logo: "logos/firefly.webp", name: "Adobe Firefly", vendor: "Adobe", category: "이미지 생성",
      use: "상업적 이용 안전 이미지 생성", status: "sale",
      account: "Adobe ID 필수",
      plans: ["Standard", "Pro", "Pro Plus", "Premium"] },

    { id: "leonardo", logo: "logos/leonardo.webp", name: "Leonardo AI", vendor: "Leonardo (Canva)", category: "이미지 생성",
      use: "디자인·게임 에셋 이미지", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Essential", "Premium", "Ultimate"] },

    { id: "ideogram", logo: "logos/ideogram.webp", name: "Ideogram", vendor: "Ideogram", category: "이미지 생성",
      use: "이미지 내 텍스트 정확도 최상 — 포스터·로고·현수막", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Plus", "Pro", "Team (좌석)"] },

    { id: "recraft", logo: "logos/recraft.webp", name: "Recraft", vendor: "Recraft", category: "이미지 생성",
      use: "벡터(SVG) 출력 — 로고·아이콘·브랜드", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Basic", "Pro", "Pro (상위)", "Teams (좌석)"] },

    /* ── 3. 영상 생성 ───────────────────────────── */
    { id: "sora", logo: "logos/sora.svg", name: "Sora", vendor: "OpenAI", category: "영상 생성",
      use: "텍스트 → 영상 생성", status: "bundle_only", altId: "chatgpt",
      note: "단독 구독 상품이 없습니다. ChatGPT Plus 이상 구독에 포함됩니다",
      account: "OpenAI 계정", plans: [] },

    { id: "runway", logo: "logos/runway.webp", name: "Runway", vendor: "Runway", category: "영상 생성",
      use: "영상 생성 + 편집 + VFX", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Standard", "Pro", "Unlimited"] },

    { id: "kling", logo: "logos/kling.svg", name: "Kling AI", vendor: "Kuaishou", category: "영상 생성",
      use: "이미지 → 영상 생성", status: "review",
      account: "이메일 또는 휴대폰 인증", note: "국내 휴대폰 번호 인증 가능 여부 확인 중",
      plans: ["Standard", "Pro", "Premier"] },

    { id: "heygen", logo: "logos/heygen.webp", name: "HeyGen", vendor: "HeyGen", category: "영상 생성",
      use: "AI 아바타 강의 영상·다국어 더빙", status: "sale",
      account: "이메일 또는 구글 계정 · 아바타 생성 시 본인 동의 절차",
      plans: ["Creator", "Pro", "Business"] },

    /* ── 4. 음성·음악 ───────────────────────────── */
    { id: "elevenlabs", logo: "logos/elevenlabs.webp", name: "ElevenLabs", vendor: "ElevenLabs", category: "음성·음악",
      use: "TTS·음성 복제·영상 더빙", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Starter", "Creator", "Pro", "Scale"] },

    { id: "suno", logo: "logos/suno.webp", name: "Suno", vendor: "Suno", category: "음성·음악",
      use: "AI 작곡·보컬 생성", status: "sale",
      account: "이메일 또는 구글·디스코드 계정",
      plans: ["Pro", "Premier"] },

    { id: "typecast", logo: "logos/typecast.webp", name: "Typecast", vendor: "네오사피엔스", category: "음성·음악",
      use: "한국어 AI 성우·내레이션", status: "sale",
      account: "이메일 또는 네이버·구글 계정 · 국내 카드 원화 결제",
      plans: ["베이직", "플러스", "프로", "비즈니스"] },

    { id: "murf", logo: "logos/murf.webp", name: "Murf AI", vendor: "Murf", category: "음성·음악",
      use: "강의·프레젠테이션 내레이션", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Creator", "Business"] },

    { id: "udio", logo: "logos/udio.svg", name: "Udio", vendor: "Udio", category: "음성·음악",
      use: "AI 작곡", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Standard", "Pro"] },

    /* ── 5. 회의록·STT ──────────────────────────── */
    { id: "clovanote", logo: "logos/clovanote.webp", name: "클로바노트", vendor: "네이버", category: "회의록·STT",
      use: "한국어 회의록·녹취 요약", status: "prereq",
      account: "네이버 계정 필수", note: "기업 플랜은 사업자 도메인 등록이 선행되어야 합니다",
      plans: ["Lite (기업)", "Team (기업)", "Business (기업)"] },

    { id: "otter", logo: "logos/otter.webp", name: "Otter.ai", vendor: "Otter", category: "회의록·STT",
      use: "영어 회의록·실시간 자막", status: "sale",
      account: "이메일 또는 구글·MS 계정",
      plans: ["Pro (좌석)", "Business (좌석)"] },

    { id: "fireflies", logo: "logos/fireflies.webp", name: "Fireflies.ai", vendor: "Fireflies", category: "회의록·STT",
      use: "회의 자동 참석·녹음·요약", status: "prereq",
      account: "구글 또는 Microsoft 계정 필수", note: "캘린더 접근 권한 승인이 필요합니다",
      plans: ["Pro (좌석)", "Business (좌석)", "Enterprise (좌석)"] },

    { id: "daglo", logo: "logos/daglo.webp", name: "다글로", vendor: "액션파워", category: "회의록·STT",
      use: "한국어 STT·자막 생성", status: "sale",
      account: "이메일 또는 구글 계정 · 국내 카드 원화 결제",
      plans: ["Pro", "Premium", "Team (좌석)"] },

    { id: "granola", logo: "logos/granola.webp", name: "Granola", vendor: "Granola", category: "회의록·STT",
      use: "노트 기반 회의 요약", status: "review",
      account: "이메일 또는 구글 계정", note: "데스크톱 앱 설치 필요 · macOS 전용 여부 확인 중",
      plans: ["Business (사용자)", "Enterprise (사용자)"] },

    /* ── 6. 학술·연구 ───────────────────────────── */
    { id: "elicit", logo: "logos/elicit.webp", name: "Elicit", vendor: "Elicit", category: "학술·연구",
      use: "논문 검색·데이터 표 자동 추출", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Pro", "Scale"] },

    { id: "consensus", logo: "logos/consensus.webp", name: "Consensus", vendor: "Consensus", category: "학술·연구",
      use: "논문 근거 기반 질의응답", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생 할인은 학교 이메일 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: ["Premium (연납 기준)", "Teams (좌석·연납)"] },

    { id: "scispace", logo: "logos/scispace.webp", name: "SciSpace", vendor: "SciSpace", category: "학술·연구",
      use: "논문 읽기·번역·수식 설명", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Premium", "Advanced", "Max"] },

    { id: "scite", logo: "logos/scite.webp", name: "Scite", vendor: "Scite", category: "학술·연구",
      use: "인용 맥락(지지/반박) 분석", status: "sale",
      account: "이메일",
      plans: ["Basic (연납 기준)", "Pro (연납 기준)"] },

    /* ── 7. 번역·글쓰기 ─────────────────────────── */
    { id: "deepl", logo: "logos/deepl.svg", name: "DeepL", vendor: "DeepL", category: "번역·글쓰기",
      use: "고품질 번역·문서 서식 유지 번역", status: "sale",
      account: "이메일 · EUR 청구",
      plans: ["Individual (연납 기준)", "Team (좌석)", "Business (좌석)"] },

    { id: "grammarly", logo: "logos/grammarly.svg", name: "Grammarly", vendor: "Grammarly", category: "번역·글쓰기",
      use: "영문 교정·문체 개선", status: "sale",
      account: "이메일 또는 구글·애플 계정 · 확장 프로그램 설치 필요",
      plans: ["Pro (좌석)"] },

    { id: "quillbot", logo: "logos/quillbot.webp", name: "QuillBot", vendor: "QuillBot", category: "번역·글쓰기",
      use: "패러프레이징·요약", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생가는 .edu 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: ["Premium (월납)", "Premium (연납 기준)"] },

    { id: "wordvice", logo: "logos/wordvice.webp", name: "Wordvice AI", vendor: "Wordvice", category: "번역·글쓰기",
      use: "학술 영문 교정", status: "sale",
      account: "이메일",
      plans: ["Premium", "Premium PRO", "Team"] },

    /* ── 8. 문서·생산성 ─────────────────────────── */
    { id: "m365-copilot", logo: "logos/m365-copilot.svg", name: "Microsoft 365 Copilot", vendor: "Microsoft", category: "문서·생산성",
      use: "Word·Excel·PowerPoint 내 AI", status: "prereq",
      account: "Microsoft 계정 필수", note: "기업 플랜은 조직 도메인이 필요합니다",
      plans: ["Business Standard + Copilot (좌석)", "Business Premium + Copilot (좌석)", "Copilot 애드온 (좌석)"] },

    { id: "notion-ai", logo: "logos/notion-ai.svg", name: "Notion AI", vendor: "Notion", category: "문서·생산성",
      use: "노트·위키·데이터베이스 + AI", status: "sale",
      account: "이메일 또는 구글·애플 계정", note: "학생·교직원은 학교 이메일 인증으로 Plus 무료 가능 (1인 한정)",
      plans: ["Plus (멤버)", "Business (멤버)"] },

    { id: "gamma", logo: "logos/gamma.webp", name: "Gamma", vendor: "Gamma", category: "문서·생산성",
      use: "AI 프레젠테이션·문서 자동 생성", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: ["Plus (좌석·연납 기준)", "Pro (좌석·연납 기준)", "Ultra (좌석·연납 기준)"] },

    { id: "canva", logo: "logos/canva.webp", name: "Canva Pro", vendor: "Canva", category: "문서·생산성",
      use: "디자인·PPT·이미지 생성 통합", status: "sale",
      account: "이메일 또는 구글·페이스북 계정",
      plans: ["Pro", "Business (인당)"] },

    { id: "gworkspace", logo: "logos/gworkspace.svg", name: "Google Workspace", vendor: "Google", category: "문서·생산성",
      use: "문서·시트·슬라이드 내 Gemini AI", status: "prereq",
      account: "구글 계정 + 소유한 도메인 필수", note: "조직 도메인 등록과 관리 콘솔 설정이 선행되어야 합니다",
      plans: ["Business Starter (좌석)", "Business Standard (좌석)", "Business Plus (좌석)"] },

    /* ── 9. 코딩·개발 ───────────────────────────── */
    { id: "gh-copilot", logo: "logos/gh-copilot.svg", name: "GitHub Copilot", vendor: "GitHub / Microsoft", category: "코딩·개발",
      use: "코드 자동완성·AI 채팅", status: "sale",
      account: "GitHub 계정 필수", note: "학생은 Student Developer Pack 으로 Pro 무상 — 재학증빙 필요",
      plans: ["Pro", "Pro+", "Max"] },

    { id: "cursor", logo: "logos/cursor.svg", name: "Cursor", vendor: "Anysphere", category: "코딩·개발",
      use: "AI 코드 에디터", status: "sale",
      account: "이메일 또는 깃허브·구글 계정 · 데스크톱 설치 필요",
      plans: ["Pro", "Pro+", "Ultra", "Teams (좌석)"] },

    { id: "windsurf", logo: "logos/windsurf.svg", name: "Windsurf", vendor: "Cognition", category: "코딩·개발",
      use: "AI 코드 에디터", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생 할인은 .edu 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: ["Pro", "Max", "Teams (사용자)"] },

    { id: "replit", logo: "logos/replit.svg", name: "Replit", vendor: "Replit", category: "코딩·개발",
      use: "클라우드 IDE + AI 앱 생성", status: "sale",
      account: "이메일 또는 구글·깃허브 계정 · 설치 불필요",
      plans: ["Core", "Pro"] }
  ]
};
