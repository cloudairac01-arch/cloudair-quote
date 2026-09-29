/* 클라우드에어 AI 구독 견적기 — 상품 데이터
 * 고객 단가 = 공급사 정가 × 환율 × (1 + feeRate). 부가세는 붙이지 않습니다.
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
    fxFallback: { USD: 1390, EUR: 1510 },
    feeRate: 0.20,
    staleDays: 30,
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
      use: "범용 대화·문서 작성·데이터 분석·이미지 생성", cur: "USD", status: "sale",
      account: "이메일 또는 구글·MS·애플 계정",
      plans: [{ n: "Go", p: 8 }, { n: "Plus", p: 20 }, { n: "Pro (5x)", p: 100 }, { n: "Pro (20x)", p: 200 }, { n: "Business (좌석)", p: 25 }] },

    { id: "claude", logo: "logos/claude.svg", name: "Claude", vendor: "Anthropic", category: "생성형 AI",
      use: "장문 문서 분석·글쓰기·코딩", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정 · 휴대폰 SMS 인증",
      plans: [{ n: "Pro", p: 20 }, { n: "Max (5x)", p: 100 }, { n: "Max (20x)", p: 200 }, { n: "Team Standard (좌석)", p: 25 }, { n: "Team Premium (좌석)", p: 125 }] },

    { id: "gemini", logo: "logos/gemini.svg", name: "Gemini", vendor: "Google", category: "생성형 AI",
      use: "범용 대화 · Veo 영상 · NotebookLM · 드라이브 연동", cur: "USD", status: "prereq",
      account: "구글 계정 필수", note: "학교 구글 계정(.ac.kr)은 기관 관리자 정책으로 개인 구독이 막힐 수 있습니다",
      plans: [{ n: "AI Plus", p: 4.99 }, { n: "AI Pro", p: 19.99 }, { n: "AI Ultra", p: 99.99 }, { n: "AI Ultra (상위)", p: 199.99 }] },

    { id: "perplexity", logo: "logos/perplexity.svg", name: "Perplexity", vendor: "Perplexity AI", category: "생성형 AI",
      use: "출처 기반 AI 검색·리서치", cur: "USD", status: "sale",
      account: "이메일 또는 구글·애플 계정",
      plans: [{ n: "Pro", p: 20 }, { n: "Enterprise Pro (좌석)", p: 40 }, { n: "Max", p: 200 }] },

    { id: "ms-copilot", logo: "logos/ms-copilot.svg", name: "Microsoft Copilot", vendor: "Microsoft", category: "생성형 AI",
      use: "범용 대화 + Word·Excel·PowerPoint 연동", cur: "USD", status: "prereq",
      account: "Microsoft 계정 필수", note: "기업 플랜은 조직 도메인이 필요합니다",
      plans: [{ n: "Microsoft 365 Premium", p: 19.99 }, { n: "Copilot Business (좌석)", p: 21 }] },

    { id: "codex", logo: "logos/codex.svg", name: "Codex", vendor: "OpenAI", category: "코딩·개발",
      use: "코드 생성·리팩터링 에이전트", cur: "USD", status: "bundle_only", altId: "chatgpt",
      note: "단독 구독 상품이 없습니다. ChatGPT Plus 이상 구독에 포함됩니다",
      account: "OpenAI 계정", plans: [] },

    /* ── 2. 이미지 생성 ─────────────────────────── */
    { id: "midjourney", logo: "logos/midjourney.svg", name: "Midjourney", vendor: "Midjourney", category: "이미지 생성",
      use: "최고급 품질 이미지 생성", cur: "USD", status: "sale",
      account: "구글 또는 디스코드 계정", note: "원화 결제 미지원 · USD 청구",
      plans: [{ n: "Basic", p: 10 }, { n: "Standard", p: 30 }, { n: "Pro", p: 60 }, { n: "Mega", p: 120 }] },

    { id: "firefly", logo: "logos/firefly.webp", name: "Adobe Firefly", vendor: "Adobe", category: "이미지 생성",
      use: "상업적 이용 안전 이미지 생성", cur: "USD", status: "sale",
      account: "Adobe ID 필수",
      plans: [{ n: "Standard", p: 9.99 }, { n: "Pro", p: 19.99 }, { n: "Pro Plus", p: 49.99 }, { n: "Premium", p: 199.99 }] },

    { id: "leonardo", logo: "logos/leonardo.webp", name: "Leonardo AI", vendor: "Leonardo (Canva)", category: "이미지 생성",
      use: "디자인·게임 에셋 이미지", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Essential", p: 12 }, { n: "Premium", p: 30 }, { n: "Ultimate", p: 60 }] },

    { id: "ideogram", logo: "logos/ideogram.webp", name: "Ideogram", vendor: "Ideogram", category: "이미지 생성",
      use: "이미지 내 텍스트 정확도 최상 — 포스터·로고·현수막", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Plus", p: 20 }, { n: "Pro", p: 60 }, { n: "Team (좌석)", p: 30 }] },

    { id: "recraft", logo: "logos/recraft.webp", name: "Recraft", vendor: "Recraft", category: "이미지 생성",
      use: "벡터(SVG) 출력 — 로고·아이콘·브랜드", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Basic", p: 12 }, { n: "Pro", p: 20 }, { n: "Pro (상위)", p: 40 }, { n: "Teams (좌석)", p: 22 }] },

    /* ── 3. 영상 생성 ───────────────────────────── */
    { id: "sora", logo: "logos/sora.svg", name: "Sora", vendor: "OpenAI", category: "영상 생성",
      use: "텍스트 → 영상 생성", cur: "USD", status: "bundle_only", altId: "chatgpt",
      note: "단독 구독 상품이 없습니다. ChatGPT Plus 이상 구독에 포함됩니다",
      account: "OpenAI 계정", plans: [] },

    { id: "runway", logo: "logos/runway.webp", name: "Runway", vendor: "Runway", category: "영상 생성",
      use: "영상 생성 + 편집 + VFX", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Standard", p: 15 }, { n: "Pro", p: 35 }, { n: "Unlimited", p: 95 }] },

    { id: "kling", logo: "logos/kling.svg", name: "Kling AI", vendor: "Kuaishou", category: "영상 생성",
      use: "이미지 → 영상 생성", cur: "USD", status: "review",
      account: "이메일 또는 휴대폰 인증", note: "국내 휴대폰 번호 인증 가능 여부 확인 중",
      plans: [{ n: "Standard", p: 10 }, { n: "Pro", p: 37 }, { n: "Premier", p: 92 }] },

    { id: "heygen", logo: "logos/heygen.webp", name: "HeyGen", vendor: "HeyGen", category: "영상 생성",
      use: "AI 아바타 강의 영상·다국어 더빙", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정 · 아바타 생성 시 본인 동의 절차",
      plans: [{ n: "Creator", p: 29 }, { n: "Pro", p: 49 }, { n: "Business", p: 149 }] },

    /* ── 4. 음성·음악 ───────────────────────────── */
    { id: "elevenlabs", logo: "logos/elevenlabs.webp", name: "ElevenLabs", vendor: "ElevenLabs", category: "음성·음악",
      use: "TTS·음성 복제·영상 더빙", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Starter", p: 6 }, { n: "Creator", p: 22 }, { n: "Pro", p: 99 }, { n: "Scale", p: 299 }] },

    { id: "suno", logo: "logos/suno.webp", name: "Suno", vendor: "Suno", category: "음성·음악",
      use: "AI 작곡·보컬 생성", cur: "USD", status: "sale",
      account: "이메일 또는 구글·디스코드 계정",
      plans: [{ n: "Pro", p: 10 }, { n: "Premier", p: 30 }] },

    { id: "typecast", logo: "logos/typecast.webp", name: "Typecast", vendor: "네오사피엔스", category: "음성·음악",
      use: "한국어 AI 성우·내레이션", cur: "KRW", status: "sale",
      account: "이메일 또는 네이버·구글 계정 · 국내 카드 원화 결제",
      plans: [{ n: "베이직", p: 9900 }, { n: "플러스", p: 29000 }, { n: "프로", p: 39000 }, { n: "비즈니스", p: 99000 }] },

    { id: "murf", logo: "logos/murf.webp", name: "Murf AI", vendor: "Murf", category: "음성·음악",
      use: "강의·프레젠테이션 내레이션", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Creator", p: 29 }, { n: "Business", p: 99 }] },

    { id: "udio", logo: "logos/udio.svg", name: "Udio", vendor: "Udio", category: "음성·음악",
      use: "AI 작곡", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Standard", p: 10 }, { n: "Pro", p: 30 }] },

    /* ── 5. 회의록·STT ──────────────────────────── */
    { id: "clovanote", logo: "logos/clovanote.webp", name: "클로바노트", vendor: "네이버", category: "회의록·STT",
      use: "한국어 회의록·녹취 요약", cur: "KRW", status: "prereq",
      account: "네이버 계정 필수", note: "기업 플랜은 사업자 도메인 등록이 선행되어야 합니다",
      plans: [{ n: "Lite (기업)", p: 20000 }, { n: "Team (기업)", p: 108000 }, { n: "Business (기업)", p: 510000 }] },

    { id: "otter", logo: "logos/otter.webp", name: "Otter.ai", vendor: "Otter", category: "회의록·STT",
      use: "영어 회의록·실시간 자막", cur: "USD", status: "sale",
      account: "이메일 또는 구글·MS 계정",
      plans: [{ n: "Pro (좌석)", p: 16.99 }, { n: "Business (좌석)", p: 30 }] },

    { id: "fireflies", logo: "logos/fireflies.webp", name: "Fireflies.ai", vendor: "Fireflies", category: "회의록·STT",
      use: "회의 자동 참석·녹음·요약", cur: "USD", status: "prereq",
      account: "구글 또는 Microsoft 계정 필수", note: "캘린더 접근 권한 승인이 필요합니다",
      plans: [{ n: "Pro (좌석)", p: 18 }, { n: "Business (좌석)", p: 29 }, { n: "Enterprise (좌석)", p: 39 }] },

    { id: "daglo", logo: "logos/daglo.webp", name: "다글로", vendor: "액션파워", category: "회의록·STT",
      use: "한국어 STT·자막 생성", cur: "KRW", status: "sale",
      account: "이메일 또는 구글 계정 · 국내 카드 원화 결제",
      plans: [{ n: "Pro", p: 11900 }, { n: "Premium", p: 16580 }, { n: "Team (좌석)", p: 20750 }] },

    { id: "granola", logo: "logos/granola.webp", name: "Granola", vendor: "Granola", category: "회의록·STT",
      use: "노트 기반 회의 요약", cur: "USD", status: "review",
      account: "이메일 또는 구글 계정", note: "데스크톱 앱 설치 필요 · macOS 전용 여부 확인 중",
      plans: [{ n: "Business (사용자)", p: 14 }, { n: "Enterprise (사용자)", p: 35 }] },

    /* ── 6. 학술·연구 ───────────────────────────── */
    { id: "elicit", logo: "logos/elicit.webp", name: "Elicit", vendor: "Elicit", category: "학술·연구",
      use: "논문 검색·데이터 표 자동 추출", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Pro", p: 49 }, { n: "Scale", p: 169 }] },

    { id: "consensus", logo: "logos/consensus.webp", name: "Consensus", vendor: "Consensus", category: "학술·연구",
      use: "논문 근거 기반 질의응답", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생 할인은 학교 이메일 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: [{ n: "Premium (연납 기준)", p: 8.99 }, { n: "Teams (좌석·연납)", p: 9.99 }] },

    { id: "scispace", logo: "logos/scispace.webp", name: "SciSpace", vendor: "SciSpace", category: "학술·연구",
      use: "논문 읽기·번역·수식 설명", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Premium", p: 20 }, { n: "Advanced", p: 90 }, { n: "Max", p: 200 }] },

    { id: "scite", logo: "logos/scite.webp", name: "Scite", vendor: "Scite", category: "학술·연구",
      use: "인용 맥락(지지/반박) 분석", cur: "USD", status: "sale",
      account: "이메일",
      plans: [{ n: "Basic (연납 기준)", p: 14 }, { n: "Pro (연납 기준)", p: 35 }] },

    /* ── 7. 번역·글쓰기 ─────────────────────────── */
    { id: "deepl", logo: "logos/deepl.svg", name: "DeepL", vendor: "DeepL", category: "번역·글쓰기",
      use: "고품질 번역·문서 서식 유지 번역", cur: "EUR", status: "sale",
      account: "이메일 · EUR 청구",
      plans: [{ n: "Individual (연납 기준)", p: 7.49 }, { n: "Team (좌석)", p: 24.99 }, { n: "Business (좌석)", p: 49.99 }] },

    { id: "grammarly", logo: "logos/grammarly.svg", name: "Grammarly", vendor: "Grammarly", category: "번역·글쓰기",
      use: "영문 교정·문체 개선", cur: "USD", status: "sale",
      account: "이메일 또는 구글·애플 계정 · 확장 프로그램 설치 필요",
      plans: [{ n: "Pro (좌석)", p: 12 }] },

    { id: "quillbot", logo: "logos/quillbot.webp", name: "QuillBot", vendor: "QuillBot", category: "번역·글쓰기",
      use: "패러프레이징·요약", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생가는 .edu 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: [{ n: "Premium (월납)", p: 19.95 }, { n: "Premium (연납 기준)", p: 8.33 }] },

    { id: "wordvice", logo: "logos/wordvice.webp", name: "Wordvice AI", vendor: "Wordvice", category: "번역·글쓰기",
      use: "학술 영문 교정", cur: "USD", status: "sale",
      account: "이메일",
      plans: [{ n: "Premium", p: 19.95 }, { n: "Premium PRO", p: 29.95 }, { n: "Team", p: 19.95 }] },

    /* ── 8. 문서·생산성 ─────────────────────────── */
    { id: "m365-copilot", logo: "logos/m365-copilot.svg", name: "Microsoft 365 Copilot", vendor: "Microsoft", category: "문서·생산성",
      use: "Word·Excel·PowerPoint 내 AI", cur: "USD", status: "prereq",
      account: "Microsoft 계정 필수", note: "기업 플랜은 조직 도메인이 필요합니다",
      plans: [{ n: "Business Standard + Copilot (좌석)", p: 23.5 }, { n: "Business Premium + Copilot (좌석)", p: 32 }, { n: "Copilot 애드온 (좌석)", p: 25.2 }] },

    { id: "notion-ai", logo: "logos/notion-ai.svg", name: "Notion AI", vendor: "Notion", category: "문서·생산성",
      use: "노트·위키·데이터베이스 + AI", cur: "USD", status: "sale",
      account: "이메일 또는 구글·애플 계정", note: "학생·교직원은 학교 이메일 인증으로 Plus 무료 가능 (1인 한정)",
      plans: [{ n: "Plus (멤버)", p: 12 }, { n: "Business (멤버)", p: 24 }] },

    { id: "gamma", logo: "logos/gamma.webp", name: "Gamma", vendor: "Gamma", category: "문서·생산성",
      use: "AI 프레젠테이션·문서 자동 생성", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정",
      plans: [{ n: "Plus (좌석·연납 기준)", p: 9 }, { n: "Pro (좌석·연납 기준)", p: 18 }, { n: "Ultra (좌석·연납 기준)", p: 90 }] },

    { id: "canva", logo: "logos/canva.webp", name: "Canva Pro", vendor: "Canva", category: "문서·생산성",
      use: "디자인·PPT·이미지 생성 통합", cur: "USD", status: "sale",
      account: "이메일 또는 구글·페이스북 계정",
      plans: [{ n: "Pro", p: 15 }, { n: "Business (인당)", p: 20.83 }] },

    { id: "gworkspace", logo: "logos/gworkspace.svg", name: "Google Workspace", vendor: "Google", category: "문서·생산성",
      use: "문서·시트·슬라이드 내 Gemini AI", cur: "USD", status: "prereq",
      account: "구글 계정 + 소유한 도메인 필수", note: "조직 도메인 등록과 관리 콘솔 설정이 선행되어야 합니다",
      plans: [{ n: "Business Starter (좌석)", p: 8.4 }, { n: "Business Standard (좌석)", p: 16.8 }, { n: "Business Plus (좌석)", p: 26.4 }] },

    /* ── 9. 코딩·개발 ───────────────────────────── */
    { id: "gh-copilot", logo: "logos/gh-copilot.svg", name: "GitHub Copilot", vendor: "GitHub / Microsoft", category: "코딩·개발",
      use: "코드 자동완성·AI 채팅", cur: "USD", status: "sale",
      account: "GitHub 계정 필수", note: "학생은 Student Developer Pack 으로 Pro 무상 — 재학증빙 필요",
      plans: [{ n: "Pro", p: 10 }, { n: "Pro+", p: 39 }, { n: "Max", p: 100 }] },

    { id: "cursor", logo: "logos/cursor.svg", name: "Cursor", vendor: "Anysphere", category: "코딩·개발",
      use: "AI 코드 에디터", cur: "USD", status: "sale",
      account: "이메일 또는 깃허브·구글 계정 · 데스크톱 설치 필요",
      plans: [{ n: "Pro", p: 20 }, { n: "Pro+", p: 60 }, { n: "Ultra", p: 200 }, { n: "Teams (좌석)", p: 40 }] },

    { id: "windsurf", logo: "logos/windsurf.svg", name: "Windsurf", vendor: "Cognition", category: "코딩·개발",
      use: "AI 코드 에디터", cur: "USD", status: "sale",
      account: "이메일 또는 구글 계정", note: "학생 할인은 .edu 인증 필요 (.ac.kr 인정 여부 확인)",
      plans: [{ n: "Pro", p: 20 }, { n: "Max", p: 200 }, { n: "Teams (사용자)", p: 40 }] },

    { id: "replit", logo: "logos/replit.svg", name: "Replit", vendor: "Replit", category: "코딩·개발",
      use: "클라우드 IDE + AI 앱 생성", cur: "USD", status: "sale",
      account: "이메일 또는 구글·깃허브 계정 · 설치 불필요",
      plans: [{ n: "Core", p: 20 }, { n: "Pro", p: 100 }] }
  ]
};
