(function(){
"use strict";

var FACE = {
  hong:"__F_HONG__", kim:"__F_KIM__", ahn:"__F_AHN__",
  nam:"__F_NAM__", lee:"__F_LEE__", ji:"__F_JI__",
  s1:"__F_S1__", s2:"__F_S2__", s3:"__F_S3__",
  s4:"__F_S4__", s5:"__F_S5__", s6:"__F_S6__"
};
var CAMP = { day:"__CAMP_DAY__", night:"__CAMP_NIGHT__" };

/* @@ART@@ */

/* @@AUDIO@@ */

var BOOK = "동아출판 한국사2";

/* ===== 실존 인물 — 최후는 역사 그대로 ===== */
var ROSTER = [
  { name:"홍범도", face:"hong", unit:"대한 독립군", life:"1868 — 1943", cite:"교과서 30쪽",
    year:1943, fate:"1937년 중앙아시아로 강제 이주되었다. 1943년 카자흐스탄 크즐오르다에서 세상을 떠났고, 2021년에야 유해가 돌아왔다." },
  { name:"안무", face:null, unit:"국민회군", life:"1883 — 1924", cite:"교과서 30쪽",
    year:1924, fate:"1924년 룽징에서 일제 경찰의 총에 맞아 순국하였다." },
  { name:"김좌진", face:"kim", unit:"북로 군정서", life:"1889 — 1930", cite:"교과서 30쪽",
    year:1930, fate:"1930년 만주에서 같은 한인의 총에 목숨을 잃었다. 일본군이 아니었다." },
  { name:"이회영", face:"lee", unit:"신흥 무관 학교", life:"1867 — 1932", cite:"교과서 20쪽",
    year:1932, fate:"1932년 다롄에서 붙잡혀 뤼순 감옥에서 고문 끝에 순국하였다." },
  { name:"남자현", face:"nam", unit:"서로군정서", life:"1872 — 1933", cite:"교과서 33쪽",
    year:1933, fate:"체포되어 고문을 당하였다. 이후 병보석으로 풀려났으나 곧 순국하였다." },
  { name:"지청천", face:"ji", unit:"서로군정서", life:"1888 — 1957", cite:"교과서 20쪽",
    year:0, fate:"살아남아 광복을 보았다. 여섯 사람 가운데 오직 한 사람이다." }
];

/* ===== 내 소대 — 이름은 지어낸 것 =====
   ask  : 사람에 대한 응답. 수치를 주지 않는다. 그 사람이 나를 부르는 말과 마지막 한 줄을 바꾼다.
   aside: 곁에 두었을 때 화면 아래에 남기는 한 마디. 국면(0 주둔지 1 봉오동 2 청산리·간도 3 자유시)
*/
var SQUAD_SEED = [
  { name:"박두칠", face:"s1", origin:"회령", age:23, skill:"정찰", pos:[16,64,1],
    line:"강을 건널 때 어머니 신발을 지고 왔다.",
    keep:"어머니의 신발 한 켤레",
    say:["“강 건너 마을에 다녀왔습니다. 일본군 초소가 하나 늘었습니다.”",
         "“발자국이 남쪽으로 나 있었습니다. 우리를 찾고 있습니다.”",
         "“능선까지 올라왔습니다. 사흘 안에 붙습니다.”",
         "“능선에서 내려다보니 시신을 수레에 싣고 갑니다. 세지는 못했습니다.”"],
    ask:{ q:"“이 신발 말입니다. 어머니 겁니다. 지고 다니면 짐이 되는데… 어떻게 할까요.”",
      opts:[
        { t:"지고 가라", s:"“…예.” 그는 신발을 다시 등에 묶는다. 매듭을 두 번 짓는다.",
          bond:"어머니 신발을 지고 가라고 했다", call:"대장님",
          last:"등에 묶인 신발은 끝까지 그대로였다." },
        { t:"두고 가라", s:"“…” 한참 있다가 신발을 나무 밑에 가지런히 놓는다. 돌아보지 않는다.",
          bond:"어머니 신발을 두고 가라고 했다", call:"대장님",
          last:"등이 가벼웠다. 그가 원한 것은 아니었다." }
      ] },
    aside:["“앞은 제가 봅니다. 뒤만 봐 주십시오.”",
           "“능선 셋을 다 봤습니다. 저쪽으로는 안 옵니다.”",
           "“이번엔 제가 먼저 못 봤습니다. 죄송합니다.”",
           "“여기는 길을 모르겠습니다. 처음 오는 땅입니다.”"] },

  { name:"최봉근", face:"s2", origin:"무산", age:17, skill:"사격", pos:[45,67,1],
    line:"나이를 두 살 올려 적었다.",
    keep:"고쳐 쓴 나이가 적힌 종이쪽",
    say:["“총 쏘는 법은 사흘 만에 배웠습니다. 손이 아직 떨립니다.”",
         "“표적은 맞힙니다. 사람은 아직 안 쏴 봤습니다.”",
         "“무섭지 않다면 거짓말입니다. 그래도 갑니다.”",
         "“사람을 쐈습니다. 아무 느낌도 안 났습니다. 그게 무섭습니다.”"],
    ask:{ q:"“…저 사실 열일곱입니다. 두 살 올려 적었습니다. 돌려보내실 겁니까.”",
      opts:[
        { t:"“무서운 게 맞다”", s:"“…예.” 아이가 웃는다. 처음 웃는 것을 본다. “무서워도 됩니까.”",
          bond:"무서운 게 맞다고 말해 주었다", call:"형님",
          last:"마지막까지 무섭다고 말할 수 있었다." },
        { t:"“그 나이로 적어 두겠다”", s:"“…고맙습니다.” 아이가 어깨를 편다. 열아홉인 척을 계속한다.",
          bond:"열아홉으로 적어 두었다", call:"대장님",
          last:"명부에는 열아홉으로 적혀 있다. 열일곱이었다." }
      ] },
    aside:["“형님, 총 잡는 손이 아직 떨립니다.”",
           "“쏘라고 하시면 쏩니다. 말씀만 하십시오.”",
           "“어제 쏜 사람 얼굴이 자꾸 생각납니다.”",
           "“여기서도 총을 쏩니까. 누구한테 쏩니까.”"] },

  { name:"오상길", face:"s3", origin:"길주", age:34, skill:"취사", pos:[74,63,1],
    line:"아들 둘을 두고 왔다.",
    keep:"이 빠진 국자 하나",
    say:["“쌀이 이만큼 남았습니다. 아껴도 열흘입니다.”",
         "“마을에서 조를 얻어 왔습니다. 애들 먹을 걸 덜어 준 겁니다.”",
         "“오늘은 국이 묽습니다. 미안합니다.”",
         "“밥을 지었는데 그릇이 남습니다.”"],
    ask:{ q:"“아들놈 둘을 두고 왔습니다. 큰놈이 아홉입니다. …편지를 부쳐도 되겠습니까.”",
      opts:[
        { t:"부치라고 한다", s:"“예.” 그날 밤 등잔 밑에서 오래 앉아 있었다. 글씨가 서툴렀다.",
          bond:"집에 편지를 부치게 했다", call:"대장님",
          last:"편지는 부쳤다. 답장이 오기 전이었다." },
        { t:"지금은 안 된다", s:"“…압니다. 위치가 드러나니까요.” 그는 종이를 접어 품에 넣는다.",
          bond:"편지를 부치지 못하게 했다", call:"대장님",
          last:"품에서 부치지 못한 편지가 나왔다." }
      ] },
    aside:["“오늘은 국에 건더기가 있습니다.”",
           "“싸우고 오면 뜨거운 거 드리겠습니다.”",
           "“그릇이 남습니다. 자꾸 남습니다.”",
           "“여기 쌀은 낯선 냄새가 납니다.”"] },

  { name:"정만수", face:"s4", origin:"갑산", age:26, skill:"사격", pos:[29,50,.8],
    line:"포수였다. 곰을 세 마리 잡았다고 한다.",
    keep:"닳아 반들거리는 화승총 개머리",
    say:["“이 골짜기는 곰이 다니던 길입니다. 사람도 같은 길로 다닙니다.”",
         "“바람이 우리 쪽으로 붑니다. 냄새가 안 갑니다. 좋습니다.”",
         "“저 능선에서 새가 안 웁니다. 사람이 있다는 뜻입니다.”",
         "“곰은 죽으면 소리를 냅니다. 사람은 안 냅니다. 아까 알았습니다.”"],
    ask:{ q:"“포수 시절 총을 아직 가지고 있습니다. 낡았습니다. 새 총으로 바꾸랍니까.”",
      opts:[
        { t:"쓰던 총을 쓰라", s:"“…그러겠습니다.” 개머리를 손바닥으로 한 번 문지른다. 십 년 만진 자리다.",
          bond:"쓰던 총을 그대로 쓰게 했다", call:"대장",
          last:"손에 쥔 것은 십 년 만진 그 총이었다." },
        { t:"새 총으로 바꿔라", s:"“예.” 낡은 총을 천에 싸서 짐 밑에 넣는다. 자주 들여다본다.",
          bond:"새 총으로 바꾸게 했다", call:"대장",
          last:"짐 밑에서 천에 싼 낡은 총이 나왔다." }
      ] },
    aside:["“짐승이든 사람이든 지나간 자리는 남습니다.”",
           "“바람만 안 바뀌면 됩니다.”",
           "“오늘은 새가 안 웁니다.”",
           "“여기 산은 우리 산이랑 다르게 생겼습니다.”"] },

  { name:"김순덕", face:"s5", origin:"명천", age:19, skill:"연락", pos:[58,48,.8],
    line:"오빠를 찾으러 왔다가 남았다.",
    keep:"오빠 이름이 적힌 쪽지",
    say:["“마을 사람들이 우리를 봐도 못 본 척합니다. 그게 도와주는 겁니다.”",
         "“여자라 검문을 덜 받습니다. 그래서 제가 갑니다.”",
         "“오늘 두 집이 짐을 쌌습니다. 뭔가 아는 겁니다.”",
         "“마을이 우리를 걱정합니다. 우리 때문에 자기들이 당할까 봐.”"],
    ask:{ q:"“오빠를 찾으러 왔다가 눌러앉았습니다. …아직 찾습니다. 이름을 물어봐도 됩니까, 가는 데마다.”",
      opts:[
        { t:"물어보라고 한다", s:"“…예.” 그 뒤로 가는 부대마다 명부를 들여다본다. 매번 없다.",
          bond:"가는 곳마다 오빠를 찾게 했다", call:"대장님",
          last:"마지막까지 그 이름은 어느 명부에도 없었다." },
        { t:"찾지 말라고 한다", s:"“…예.” 대답은 짧았다. 쪽지는 계속 품에 있었다.",
          bond:"오빠를 그만 찾으라고 했다", call:"대장님",
          last:"품에서 이름이 적힌 쪽지가 나왔다. 오빠의 것이었다." }
      ] },
    aside:["“소식은 제가 나릅니다. 저는 덜 잡힙니다.”",
           "“마을에 알렸습니다. 다들 산으로 올라갔습니다.”",
           "“오늘은 아무 집도 문을 안 열어 줍니다.”",
           "“여기서는 우리말이 두 쪽으로 갈립니다.”"] },

  { name:"윤재호", face:"s6", origin:"성진", age:21, skill:"기록", pos:[85,47,.8],
    line:"학교를 그만두고 왔다. 글을 쓸 줄 안다.",
    keep:"날짜와 이름만 적힌 공책",
    say:["“날짜와 이름을 적고 있습니다. 나중에 누군가 필요할 겁니다.”",
         "“『독립신문』이 여기까지 옵니다. 두 달 늦게 옵니다만.”",
         "“적을 것이 많아졌습니다. 좋은 뜻은 아닙니다.”",
         "“전과를 적어야 하는데, 숫자를 못 적겠습니다.”"],
    ask:{ q:"“죽은 사람 이름을 적고 있습니다. …이걸 적는 게 맞습니까. 잡히면 이 공책이 명단이 됩니다.”",
      opts:[
        { t:"적어 두라", s:"“예.” 그날부터 이름 옆에 날짜와 고향까지 적는다. 글씨가 작아진다.",
          bond:"죽은 이의 이름을 적어 두게 했다", call:"대장님",
          last:"공책은 끝까지 그의 품에 있었다. 마지막 줄은 자기 이름 자리였다." },
        { t:"태워라", s:"“…예.” 그날 밤 공책을 불에 넣는다. 그러고는 외우기 시작한다.",
          bond:"기록을 태우게 했다", call:"대장님",
          last:"공책은 없었다. 이름들은 그의 머릿속에만 있었다." }
      ] },
    aside:["“오늘 날짜를 적었습니다. 그것만이라도 남습니다.”",
           "“여섯 명, 다 적었습니다. 아직 여섯입니다.”",
           "“한 줄을 지워야 했습니다.”",
           "“여기 일은 뭐라고 적어야 할지 모르겠습니다.”"] }
];

/* 세 사람이 각자 하나씩 결정을 가지고 온다 */
var DECIDE = {
  "박두칠":{ title:"국내로 들어갈 것인가", art:"raid",
    say:"“압록강 건너 주재소를 치자는 말이 돕니다. 소식은 퍼지겠지만, 우리 위치도 드러납니다.”",
    cite:"교과서 30쪽 — 만주 일대의 독립군 부대는 국내에 진입하여 일제와 전투를 벌이고 식민 통치 기관을 파괴하였다.",
    opts:[{t:"들어간다", s:"소식이 국내로 퍼진다. 추격 부대가 우리를 특정한다.", trust:1, pic:33,
           bond:"국내로 들어가자는 그의 말을 들어주었다", log:"국내 진공 — 실행"},
          {t:"움직이지 않는다", s:"조용히 있는다. 그는 아무 말도 하지 않는다.", trust:0, pic:34,
           bond:"국내로 들어가자는 그의 말을 물렸다", log:"국내 진공 — 보류"}] },
  "오상길":{ title:"군자금을 걷을 것인가", art:"levy",
    say:"“쌀이 열흘치입니다. 마을에서 걷어 와야 하는데… 그 집도 애가 셋입니다.”",
    cite:"교과서 30쪽 — 독립군은 간도 한인 사회의 지원으로 유지되었다.",
    opts:[{t:"걷는다", s:"부대는 버틴다. 그는 문 앞에서 오래 서 있게 된다.", trust:-2, pic:35,
           bond:"그를 시켜 마을에서 군자금을 걷었다", log:"군자금 — 징수"},
          {t:"걷지 않는다", s:"굶더라도 받지 않는다. 그는 솥을 더 오래 젓는다.", trust:1, pic:36,
           bond:"굶더라도 마을 것을 받지 말자고 했다", log:"군자금 — 포기"}] },
  "김순덕":{ title:"군무 도독부에서 사람이 왔다", art:"union",
    say:"“최진동 부대에서 사람이 왔습니다. 안무 부대도 같이 움직이자고 합니다.”",
    cite:"교과서 30쪽 — 홍범도의 대한 독립군, 최진동의 군무 도독부, 안무의 국민회군 등 독립군 부대는 연합하여 일제의 공격에 대비하였다.",
    opts:[{t:"연합한다", s:"세 부대가 하나로 움직인다. 그가 세 부대를 오가는 발이 된다.", trust:0, union:true, pic:37,
           bond:"세 부대를 잇는 발로 그를 보냈다", log:"연합 — 수락"},
          {t:"따로 움직인다", s:"우리 힘으로 간다. 그가 나를 한 번 쳐다본다.", trust:1, union:false, pic:38,
           bond:"연합을 거절하고 우리끼리 가기로 했다", log:"연합 — 거절"}] }
};

var FIGURES = [
  { key:"hong", mark:"甲", real:"홍범도", face:"hong", label:"산에서 온 사람",
    desc:"포수 출신으로 의병으로 활약하였다. 국권 피탈 이후 독립군을 이끌고 국내 진공 작전을 펼쳤으며 봉오동 전투, 청산리 대첩 등에서 활약하였다.",
    descSrc:"교과서 30쪽 인물 소개 ❶", revealSub:"대한 독립군 · 1868 — 1943", trust:1,
    after:"그는 지도를 펴지 않는다. 손가락으로 능선을 짚는다.", sources:["s-mujang","s-hong-hb"] }
];

var SOURCES = {
  "s-mujang":{ title:"「국무원 포고」 제1호", chop:"布", book:"교과서 28쪽",
    badges:["이동휘 등","1920","임시 정부 포고"],
    text:"독립이라는 우리의 목표를 이루기 위해서는 대규모 전쟁 외에는 다른 방도가 없다. …… 때라는 것은 서두르면 서두를수록 좋은 것이다.",
    note:"교과서가 '무장 투쟁론'의 대표 사료로 실은 글." },
  "s-oegyo":{ title:"『독립신문』 외교 독립론 기사", chop:"報", book:"교과서 28쪽",
    badges:["임시 정부 기관지","1919.11.20","보도·설득"],
    text:"이 세계에서 가장 큰 공화국인 미국 내의 자유를 사랑하는 이들에게 (한국의 독립을) 하소연하고 알려야 할 줄 압니다.",
    note:"교과서가 '외교 독립론'의 대표 사료로 실은 글." },
  "s-seungri":{ title:"「아군의 승리 요인」", chop:"報", book:"교과서 30쪽",
    badges:["임시 정부 기관지","1921.2.25","전투 총평"],
    text:"• 용감하고 분연히 싸우는 군인 정신으로 적의 기세를 압도한 것<br>• 유리한 진지를 먼저 차지한 것<br>• 임기응변의 전술이 적의 예상보다 나은 것",
    note:"교과서가 '이길 수 있었던 까닭'을 묻는 자리에 붙인 사료." },
  "s-hong-hb":{ title:"함경도 의병 관련 헌병대 기록", chop:"密", book:null,
    badges:["일본 헌병대","1908","내부 보고"],
    text:"갑산·삼수 일대의 산포수를 규합하여 수비대를 습격함. 두목은 사격에 능하고 산길에 밝아 추격이 어려움.",
    note:"교과서 밖 자료(현대어 요약)." },
  "s-kim-jung":{ title:"대한 군정서 편제 기록", chop:"編", book:null,
    badges:["독립군 본인","1920","내부 문서"],
    text:"사관연성소를 두어 장교를 양성하고, 연해주 방면에서 무기를 구입함.",
    note:"교과서 밖 자료(현대어 요약)." },
  "s-ahn-hs":{ title:"흥사단 관련 기록", chop:"團", book:null,
    badges:["단체 내부","1913~","조직 문서"],
    text:"힘이 없으면 얻은 독립도 지킬 수 없다. 먼저 사람을 기르고 실력을 쌓아야 한다.",
    note:"교과서 밖 자료(현대어 요약)." },
  "s-bo-1":{ title:"『독립신문』 제88호 전과 보도", chop:"報", book:null,
    badges:["임시 정부 기관지","1920.6.22","보도·선전"],
    text:"봉오동에서 적 사망 <span class=\"fig-n\">157명</span>, 중상 <span class=\"fig-n\">200여 명</span>. 아군 전사 <span class=\"fig-n\">4명</span>.",
    note:"교과서는 「크게 승리하였다」고만 적고 수치는 싣지 않습니다." },
  "s-bo-2":{ title:"일본군 토벌 상황 보고", chop:"秘", book:null,
    badges:["조선군사령부","1920.6","상부 보고"],
    text:"아군 전사 <span class=\"fig-n\">1명</span>, 부상 <span class=\"fig-n\">2명</span>.",
    note:"상급 기관에 올린 문서. 손실을 축소해 보고할 동기가 뚜렷합니다." },
  "s-jy-order":{ title:"고려 혁명 군정 의회 통고문", chop:"令", book:null,
    badges:["자유시 · 한인 부대 통합 기구","1921.6","지휘 명령"],
    text:"자유시에 모인 모든 한인 부대는 본 의회의 지휘 아래 든다. 이에 응하지 않는 부대는 <span class=\"fig-n\">무장을 해제</span>한다.",
    note:"교과서 밖 자료(현대어 요약). 러시아 적군의 지원을 받은 쪽이 낸 문서." },
  "s-jy-refuse":{ title:"사할린 의용대 성명", chop:"檄", book:null,
    badges:["만주에서 넘어온 부대","1921.6","거부 성명"],
    text:"우리 총은 만주에서 우리 손으로 들고 온 것이다. 남의 지휘 아래 <span class=\"fig-n\">총을 넘길</span> 수 없다.",
    note:"교과서 밖 자료(현대어 요약). 지휘권을 넘기기를 거부한 쪽이 낸 문서." },
  "s-jy-n1":{ title:"군정 의회 측 진상 보고", chop:"報", book:null,
    badges:["무장 해제를 집행한 쪽","1921","상부 보고"],
    text:"사망 <span class=\"fig-n\">36명</span>, 포로 <span class=\"fig-n\">864명</span>, 행방불명 <span class=\"fig-n\">59명</span>.",
    note:"집행한 쪽이 스스로 낸 숫자입니다." },
  "s-jy-n2":{ title:"『독립신문』 자유시 보도", chop:"報", book:null,
    badges:["임시 정부 기관지","1921","생존자 증언 기반"],
    text:"사망 <span class=\"fig-n\">272명</span>, 익사 <span class=\"fig-n\">31명</span>, 행방불명 <span class=\"fig-n\">250명</span>, 포로 <span class=\"fig-n\">917명</span>.",
    note:"무장 해제를 당한 쪽 계열의 보도입니다. 연구자마다 집계가 다릅니다." }
};

var BATTLE_DOCS = ["s-bo-1","s-bo-2"];
var REASONS = [
  {key:"interest", label:"작성 주체의 이해관계"},
  {key:"distance", label:"사건과의 시간 거리"},
  {key:"purpose",  label:"기록을 남긴 목적"}
];
var FEEDBACK = {
  "s-bo-1":{best:["interest","purpose"], text:"사기를 올리고 자금을 모아야 했던 기관지의 목적이 숫자에 반영되었을 가능성이 큽니다."},
  "s-bo-2":{best:["interest","purpose"], text:"패배를 축소해 보고할 동기가 뚜렷합니다. 전사 1명은 오늘날 거의 받아들여지지 않습니다."}
};

var QUIZ = {
  q1:{ by:"hong", cite:"교과서 30쪽",
       said:"“자네, 우리가 어느 부대인지는 아는가. 잡히면 저쪽이 그것부터 묻는다.”",
       yes:"“그래. 대한 독립군이다. 잊지 말게.”",
       no:"“아닐세. 그건 다른 사람 부대야.”",
       opts:["대한 독립군","북로 군정서","서로 군정서","군무 도독부"], ans:0,
       why:"교과서는 '홍범도의 대한 독립군, 최진동의 군무 도독부, 안무의 국민회군'이라 적습니다. 북로 군정서는 김좌진의 부대입니다." },
  q2:{ by:"윤재호", cite:"교과서 30쪽",
       said:"“전과를 적어야 하는데… 이 넷 가운데 봉오동에 없던 부대가 하나 있습니다. 어느 쪽입니까.”",
       yes:"“예. 그럼 셋으로 적겠습니다.”",
       no:"“…그 부대는 여기 있었습니다. 제가 봤습니다.”",
       opts:["대한 독립군","군무 도독부","국민회군","북로 군정서"], ans:3,
       why:"봉오동은 대한 독립군·군무 도독부·국민회군의 연합입니다. 북로 군정서는 넉 달 뒤 청산리에서 합류합니다." },
  q3:{ by:"윤재호", cite:"교과서 31쪽",
       said:"“이 일을 뭐라고 적어야 합니까. 전투라고 적을 수는 없지 않습니까. 맞선 쪽이 일본군이 아니었는데.”",
       yes:"“…예. 참변이라고 적겠습니다.”",
       no:"“그렇게 적으면 싸움이 되어 버립니다. 싸움이 아니었습니다.”",
       opts:["자유시 전투","자유시 참변","자유시 협정","자유시 봉기"], ans:1,
       why:"교과서는 「자유시 참변」이라 적습니다. 참변(慘變)은 전투가 아닙니다. 맞선 상대가 일본군이 아니었기 때문입니다." }
};

/* ===================== 상태 ===================== */

var S = null;

function newGame(){
  FIGURES.forEach(function(f){ f.seen = false; });
  S = {
    trust:5,
    squad: SQUAD_SEED.map(function(m){
      return { name:m.name, face:m.face, origin:m.origin, age:m.age, skill:m.skill,
               line:m.line, keep:m.keep, say:m.say, ask:m.ask, aside:m.aside, pos:m.pos,
               alive:true, front:false, where:null, how:null,
               answered:null, call:null, last:null, bond:[] };
    }),
    figure:null, union:null, ambush:null, front:[], good:[],
    done:0, risk:0, gain:0, rescued:false,
    escort:null, phase:0, mourn:null, lost:[], seatNote:null, seatShown:false, b:null,
    opened:{}, verdicts:{}, quiz:{}, decided:{}, log:[]
  };
}

function alive(){ return S.squad.filter(function(m){ return m.alive; }); }
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

/* ===================== 유틸 ===================== */

var $ = function(id){ return document.getElementById(id); };
var screenEl = $("screen");
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function toast(m){
  var t = $("toast"); t.textContent = m; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(function(){ t.classList.remove("show"); }, 2400);
}

var SLUG = { date:"", place:"" }, SIM = false;

var STATDEF = [{k:"trust", n:"주민의 신망", max:10}];

function drawHud(){
  $("board").hidden = false;
  $("slug-date").textContent = SLUG.date;
  $("slug-place").textContent = SLUG.place;

  $("stats").innerHTML = SIM ? STATDEF.map(function(d){
    var v = S[d.k], pct = Math.round(v/d.max*100);
    return '<span class="st'+(d.bad?" bad":"")+(d.bad && v>=7 ? " alarm":"")+'">' +
      '<span class="st-n">'+d.n+'</span>' +
      '<span class="st-bar"><span style="width:'+pct+'%"></span></span>' +
      '<span class="st-v">'+v+'</span></span>';
  }).join("") : "";

  $("roster").innerHTML = S.squad.map(function(m){
    var mine = (S.escort === m);
    return '<span class="rchip'+(m.alive?"":" gone")+(mine?" mine":"")+'">' +
      '<img class="rface" src="'+FACE[m.face]+'" alt="">'+esc(m.name)+'</span>';
  }).join("");

  drawStrip();
  drawAside();

  var sb = $("sndbtn");
  if(sb && !sb._wired){
    sb._wired = true;
    sb.addEventListener("click", function(){
      snd.setOn(!snd.isOn());
      sb.textContent = snd.isOn() ? "소리 켬" : "소리 끔";
      sb.classList.toggle("off", !snd.isOn());
    });
  }
  if(sb){
    sb.textContent = snd.isOn() ? "소리 켬" : "소리 끔";
    sb.classList.toggle("off", !snd.isOn());
  }
}

/* 곁에 둔 사람을 잃으면, 함께 한 일이 가장 많은 사람이 그 자리에 선다 */
function reseat(){
  var e = S.escort;
  if(!e || e.alive) return;
  var pool = alive().slice().sort(function(a,b){ return b.bond.length - a.bond.length; });
  if(!pool.length) return;
  var n = pool[0];
  S.escort = n;
  bond(n, e.name + "의 자리를 이어받았다");
  S.seatNote = "“" + e.name + " 자리였습니다. …제가 서겠습니다.”";
  S.seatShown = false;
}

/* 곁에 둔 사람이 화면 맨 위에 한 마디를 남긴다 */
function drawAside(){
  var a = $("aside"); if(!a) return;
  var e = S.escort;
  if(!e || !SIM){ a.hidden = true; return; }
  a.hidden = false;
  if(!e.alive){
    a.classList.add("empty");
    a.innerHTML = '<span class="aside-who">'+esc(e.name)+'</span> 그 자리는 비어 있다.';
    return;
  }
  a.classList.remove("empty");
  var said = S.mourn ? "“"+S.mourn+"…”"
           : (S.seatNote ? (S.seatShown = true, S.seatNote)
           : e.aside[Math.min(S.phase, e.aside.length-1)]);
  a.innerHTML = '<span class="aside-who">'+esc(e.name)+'</span>' + esc(said);
}

function scene(date, place, mood, mus){
  if(S.seatShown){ S.seatNote = null; S.seatShown = false; }
  if(date) SLUG.date = date;
  if(place) SLUG.place = place;
  paintSky(mood);
  if(mus) snd.music(mus); else if(mood) snd.mood(mood);
  drawHud();
}
var _typer = null;

function typeOut(){
  if(_typer){ clearInterval(_typer); _typer = null; }
  var sc = screenEl.querySelector(".scene");
  var el = screenEl.querySelector(".vn-say");
  if(!sc || !el) return;
  var full = el.textContent;
  if(document.documentElement.classList.contains("calm") || full.length < 2) return;

  sc.classList.add("typing");
  var pn = screenEl.querySelector(".vn-scroll");
  if(pn) pn.scrollTop = 0;
  el.textContent = "";
  var i = 0;

  function done(){
    if(_typer){ clearInterval(_typer); _typer = null; }
    el.textContent = full;
    sc.classList.remove("typing");
  }
  _typer = setInterval(function(){
    i += 1;
    el.textContent = full.slice(0, i);
    if(i >= full.length) done();
  }, 24);

  var vn = screenEl.querySelector(".vn");
  if(vn) vn.addEventListener("click", function(){ done(); });
  sc.addEventListener("keydown", function(e){
    if(e.key === " " || e.key === "Enter") done();
  });
}

/* 무대가 아닌 화면도 지금 장면의 그림 위에 놓인다 */
function drawBackdrop(){
  var el = $("stagebg"); if(!el) return;
  var sc = screenEl.querySelector(".scene");
  if(!sc || sc.querySelector(".vn") || sc.querySelector(".camp") || sc.querySelector(".keyart-full")){
    el.style.opacity = 0; return;
  }
  var img = sc.querySelector(".plate .scene-img");
  var src = img ? img.getAttribute("src") : STAGE_BG;
  if(!src){ el.style.opacity = 0; return; }
  el.style.backgroundImage = 'url("' + src + '")';
  el.style.opacity = 1;
}

function show(html){
  screenEl.innerHTML = '<div class="scene">'+html+'</div>';
  window.scrollTo(0,0);
  mountStage();
  drawBackdrop();
  typeOut();
}
function actbar(html, hint){ return '<div class="actbar">'+html+(hint?'<p class="hintline">'+esc(hint)+'</p>':'')+'</div>'; }
function steps(total, at){
  var o = '<div class="steps">';
  for(var i=0;i<total;i++) o += '<span class="step '+(i<at?"done":(i===at?"on":""))+'"></span>';
  return o + '</div>';
}
function bindOpts(fn){
  screenEl.querySelectorAll("[data-o]").forEach(function(b){
    b.addEventListener("click", function(){ fn(parseInt(b.getAttribute("data-o"),10)); });
  });
}
function deltas(fx){
  var nm = {trust:"주민의 신망"};
  var out = [];
  for(var k in fx){ if(fx[k]) out.push({n:nm[k], d:fx[k], bad:false}); }
  if(!out.length) return "";
  return '<div class="deltas">' + out.map(function(p,i){
    var good = p.bad ? p.d < 0 : p.d > 0;
    return '<span class="delta '+(good?"up":"down")+'" style="animation-delay:'+(i*80+120)+'ms">' +
      esc(p.n)+" "+(p.d>0?"+":"")+p.d+'</span>';
  }).join("") + '</div>';
}
function apply(fx){
  if(fx.trust) S.trust = clamp(S.trust + fx.trust, 0, 10);
  drawHud();
}

/* ===================== 사료 ===================== */

function bookTag(s){
  return s.book ? '<span class="src-tag on">'+esc(s.book)+'</span>'
                : '<span class="src-tag">교과서 밖 자료</span>';
}
function docCard(id){
  var s = SOURCES[id], open = !!S.opened[id];
  return '<article class="doc'+(open?" open":"")+'" data-doc="'+id+'">' +
    '<button class="doc-bar" type="button" data-open="'+id+'"><span class="doc-seal">'+(open?"閱":"封")+'</span>' +
    '<span class="doc-meta"><span class="doc-title">'+bookTag(s)+esc(s.title)+'</span>' +
    '<span class="doc-badges">'+s.badges.map(function(b){return "<span>"+esc(b)+"</span>";}).join("")+'</span></span>' +
    '<span class="doc-cost">'+(open?"닫기":"펼쳐 본다")+'</span></button>' +
    '<div class="doc-body"><div><div class="sheet"><span class="chop">'+esc(s.chop)+'</span>'+s.text +
    '<span class="note">'+esc(s.note)+'</span></div></div></div></article>';
}
function bindDocs(){
  screenEl.querySelectorAll("[data-open]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var id = btn.getAttribute("data-open");
      var card = screenEl.querySelector('[data-doc="'+id+'"]');
      var open = card.classList.toggle("open");
      if(open){ S.opened[id] = true; snd.paper(); }
      card.querySelector(".doc-seal").textContent = open ? "閱" : "封";
      card.querySelector(".doc-cost").textContent = open ? "닫기" : "펼쳐 본다";
    });
  });
}

/* ===================== 시작 화면 — 키아트 ===================== */

var TITLE = "__SCTITLE__";

/* 그림에 그려진 차림표 위에 실제 단추를 겹친다 (그림 기준 백분율) */
var MENU = [
  { id:"start", label:"게임 시작", top:76.0, h:7.2 },
  { id:"opt",   label:"설정",     top:83.2, h:6.4 },
  { id:"quit",  label:"종료",     top:89.3, h:6.4 }
];

function scrTitle(){
  $("board").hidden = true; SIM = false;
  paintSky("night");
  snd.music && snd.mood && snd.mood("night");
  show(
    '<div class="keyart-full">' +
    '<div class="keyart-blur" style="background-image:url(&quot;'+TITLE+'&quot;)"></div>' +
    '<div class="keyart">' +
      '<img class="keyart-img" src="'+TITLE+'" alt="독립군의 별 — 1920년대 무장 독립 투쟁">' +
      MENU.map(function(m){
        return '<button class="keyart-hit'+(m.id==="start"?" primary":"")+'" type="button" ' +
          'id="k-'+m.id+'" style="top:'+m.top+'%;height:'+m.h+'%" aria-label="'+esc(m.label)+'">' +
          '<span class="kh-glow"></span></button>';
      }).join("") +
    '</div>' +
    '<div class="keyart-menu">' +
      MENU.map(function(m){
        return '<button class="btn'+(m.id==="start"?"":" ghost")+'" type="button" id="m-'+m.id+'">' +
          esc(m.label)+'</button>';
      }).join("") +
    '</div>' +
    '<p class="byline">사료·서술 근거 — 동아출판 『고등학교 한국사2』 20 · 28 · 30~33쪽 · ' +
    '실존 인물 사진 — 퍼블릭 도메인 · 장면과 인물 그림 — 재현 일러스트<br>' +
    '<a class="pp-link" href="privacy.html">개인정보처리방침</a> — 이 게임은 어떤 개인정보도 수집하지 않습니다.</p>' +
    '</div>'
  );

  function on(id, fn){
    var a = $("k-"+id), b = $("m-"+id);
    if(a) a.addEventListener("click", fn);
    if(b) b.addEventListener("click", fn);
  }
  on("start", function(){ snd.start(); newGame(); b1(); });
  on("opt", settings);
  on("quit", about);
}

/* ===== 설정 ===== */

function settings(){
  paintSky("night");
  var big = document.documentElement.classList.contains("big");
  var calm = document.documentElement.classList.contains("calm");
  show(
    '<p class="eyebrow">설정</p><h2>소리와 화면</h2>' +
    '<div class="setlist">' +
      '<button class="setrow" type="button" id="s-snd"><span class="sr-n">소리</span>' +
        '<span class="sr-v">'+(snd.isOn()?"켬":"끔")+'</span></button>' +
      '<button class="setrow" type="button" id="s-big"><span class="sr-n">글자 크게</span>' +
        '<span class="sr-v">'+(big?"켬":"끔")+'</span></button>' +
      '<button class="setrow" type="button" id="s-calm"><span class="sr-n">움직임 줄이기</span>' +
        '<span class="sr-v">'+(calm?"켬":"끔")+'</span></button>' +
      '<button class="setrow" type="button" id="s-mode"><span class="sr-n">화면 모드</span>' +
        '<span class="sr-v">'+modeLabel()+'</span></button>' +
    '</div>' +
    '<p class="hintline">휴대폰에서 버튼이 화면 밖으로 밀리면 「화면 모드」를 <b>모바일</b>로 두세요. ' +
    '진행 버튼이 화면 아래에 붙어 세로로도 편하게 눌립니다.<br>' +
    '교실 화면이 크면 「글자 크게」를, 화면 흔들림이 부담되면 「움직임 줄이기」를 켜세요.</p>' +
    actbar('<button class="btn" type="button" id="back">돌아가기</button>')
  );
  $("s-snd").addEventListener("click", function(){ snd.setOn(!snd.isOn()); settings(); });
  $("s-big").addEventListener("click", function(){
    document.documentElement.classList.toggle("big"); settings();
  });
  $("s-calm").addEventListener("click", function(){
    document.documentElement.classList.toggle("calm"); settings();
  });
  $("s-mode").addEventListener("click", function(){
    var m = modeGet();
    modeSet(m === "auto" ? "mobile" : (m === "mobile" ? "wide" : "auto"));
    settings();
  });
  $("back").addEventListener("click", scrTitle);
}

/* ===== 종료 — 이 게임에 대하여 ===== */

function about(){
  paintSky("deep");
  show(
    '<p class="eyebrow">이 게임에 대하여</p><h2>독립군의 별</h2>' +
    '<p class="narr">1920년 만주. 봉오동에서 자유시까지, 한 소대를 데리고 갑니다. ' +
      '한 판에 40~50분 걸립니다.</p>' +
    '<div class="wit">' +
      '<div class="w-row"><span class="w-h">바뀌지 않는 것</span>' +
        '<p>홍범도·안무·김좌진·이회영·남자현·지청천 — 여섯 실존 인물의 최후는 ' +
        '당신이 무엇을 하든 바뀌지 않습니다. 실제로 있었던 일이기 때문입니다.</p></div>' +
      '<div class="w-row"><span class="w-h">바뀌는 것</span>' +
        '<p>박두칠·최봉근·오상길·정만수·김순덕·윤재호 — 내 소대 여섯은 <em>지어낸 이름</em>입니다. ' +
        '봉오동과 청산리에서 죽은 대다수는 오늘날 이름을 알 수 없기 때문입니다.</p></div>' +
      '<div class="w-row"><span class="w-h">근거</span>' +
        '<p>동아출판 『고등학교 한국사2』 20 · 28 · 30~33쪽. ' +
        '교과서 밖 자료는 화면마다 「교과서 밖 자료」로 표시했습니다. ' +
        '숫자는 기록마다 다르며, 게임은 그 차이를 그대로 보여 줍니다.</p></div>' +
      '<div class="w-row"><span class="w-h">그림과 소리</span>' +
        '<p>실존 인물 사진은 퍼블릭 도메인입니다. 장면·인물·선택지 그림은 <em>재현 일러스트</em>이며 ' +
        '사진이 아닙니다. 효과음은 합성음입니다.</p></div>' +
    '</div>' +
    '<p class="hintline">창을 닫으면 종료됩니다. 진행 상황은 저장되지 않습니다.</p>' +
    actbar('<button class="btn" type="button" id="back">처음 화면으로</button>')
  );
  $("back").addEventListener("click", scrTitle);
}

/* ===================== 도입 ===================== */

function b1(){
  scene("1920. 6. 4 · 밤", "두만강 북안", "night");
  snd.water();
  setBg(SC[1]);
  show(
    narrate('강을 건넜다. 물이 허리까지 왔고, 신발은 벗어 손에 들었다.', SC[1]) +
    actbar('<button class="btn" type="button" id="next">마을로 들어간다</button>')
  );
  $("next").addEventListener("click", b2);
}

function b2(){
  scene("1920. 6. 4 · 밤", "북간도 · 어느 마을", "night");
  setBg(SC[2]);
  show(
    narrate('불 앞에 한 사람이 앉아 있다. 마을 사람들은 그를 <em>산에서 온 사람</em>이라고만 부른다. ' +
            '아무도 이름을 대지 않는다. 이름을 대면 그 이름이 곧 수배가 되기 때문이다.', SC[2]) +
    actbar('<button class="btn" type="button" id="next">불 앞에 앉는다</button>')
  );
  $("next").addEventListener("click", person);
}

function person(){
  var f = FIGURES[0];
  scene("1920. 6. 4 · 밤", "북간도 · 어느 마을", "night");
  show(
    '<p class="eyebrow">신원 미상</p>' +
    '<div class="person"><span class="portrait"><img src="'+FACE[f.face]+'" alt="">' +
    '<span class="seal">'+f.mark+'</span></span>' +
    '<div><span class="person-tag">신원 미상 · '+f.mark+'</span>' +
    '<p class="person-name">'+esc(f.label)+'</p>' +
    '<p class="person-desc">'+esc(f.desc)+'</p>' +
    '<p class="cite">'+esc(BOOK)+' · '+esc(f.descSrc)+'</p></div></div>' +
    '<div class="person-docs"><div class="section-head"><h3>그를 두고 남아 있는 기록</h3>' +
      '<span class="hint">두 장을 펼쳐 보면 누구인지 알 수 있습니다</span></div>' +
    '<div class="docs">'+f.sources.map(docCard).join("")+'</div></div>' +
    actbar('<button class="btn" type="button" id="nx">그가 나를 본다</button>')
  );
  bindDocs();
  $("nx").addEventListener("click", function(){ nameAsk(0); });
}

/* ===== 그가 직접 묻는다 ===== */

var HONG_NPC = { name:"산에서 온 사람", face:"hong", origin:"평양", age:52, skill:"포수 출신" };

var HONG_ANSWERS = ["홍범도","洪範圖","홍범도장군"];

var HONG_SAID = [
  "“마을 사람들은 나를 산에서 온 사람이라고만 하네. …자네는 내가 누군지 아는가. 적어 보게.”",
  "“다시 생각해 보게. 갑산·삼수의 포수를 모아 수비대를 친 사람일세. 헌병대 문서에도 그렇게 적혀 있지.”",
  "“…성은 홍(洪)일세. 그 다음은 자네가 적게.”"
];

function normName(v){
  return String(v).replace(/[\s·.,'"“”‘’\-]/g, "").replace(/(장군|선생|님|씨)$/, "");
}

function nameAsk(tries){
  var f = FIGURES[0];
  scene("1920. 6. 4 · 밤", "북간도 · 어느 마을", "night");
  show(
    stage(HONG_NPC, HONG_SAID[Math.min(tries, HONG_SAID.length-1)], null, SC[2],
      '<div class="nb-in">' +
        '<input id="nm" class="nb-input" type="text" autocomplete="off" maxlength="12" placeholder="이름을 적으시오">' +
        '<button class="btn" type="button" id="ok">적는다</button>' +
      '</div>' +
      (tries ? '<p class="nb-note">틀린 횟수 '+tries+' / 3 · 기록을 다시 보려면 아래를 펼치세요</p>' : '')) +
    '<details class="ev-src"'+(tries?' open':'')+'><summary>그를 두고 남아 있는 기록 다시 보기</summary>' +
      '<div class="docs">'+f.sources.map(docCard).join("")+'</div></details>' +
    actbar('<button class="btn ghost" type="button" id="back">불을 바라본다</button>',
           "교과서 30쪽 인물 소개와 헌병대 기록이 같은 사람을 가리킵니다.")
  );
  bindDocs();
  $("back").addEventListener("click", person);

  var input = $("nm");
  function submit(){
    var v = normName(input.value);
    if(!v){ toast("이름을 적어 주세요."); input.focus(); return; }
    if(HONG_ANSWERS.some(function(a){ return normName(a) === v; })){
      S.quiz.name = { ok:true, tries:tries, picked:input.value };
      snd.chime();
      return nameGot(f, tries);
    }
    snd.deny();
    var n = tries + 1;
    if(n >= 3){
      S.quiz.name = { ok:false, tries:3, picked:input.value };
      return nameGot(f, 3);
    }
    toast("아니라고 고개를 젓는다.");
    nameAsk(n);
  }
  $("ok").addEventListener("click", submit);
  input.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); submit(); } });
  setTimeout(function(){ input.focus(); }, 60);
}

function nameGot(f, tries){
  var ok = tries < 3;
  scene("1920. 6. 4 · 밤", "북간도 · 어느 마을", "night");
  show(
    talkCard(HONG_NPC, ok
      ? "“…그래. 오래 못 들은 이름일세. 여기서는 아무도 부르지 않으니.”"
      : "“모르는 것이 흠은 아닐세. 나를 아는 사람이 많으면 나부터 위험해지니.”", SC[2]) +
    '<div class="note-box'+(ok?" good":" warn")+'"><h3>'+esc(BOOK)+' · 30쪽 인물 소개 ❶</h3>' +
      '<p><strong>홍범도</strong> — 포수 출신으로 의병으로 활약하였다. 국권 피탈 이후 독립군을 이끌고 ' +
      '국내 진공 작전을 펼쳤으며 봉오동 전투, 청산리 대첩 등에서 활약하였다.</p></div>' +
    (ok
      ? '<p class="narr">'+(tries===0
          ? "기록 두 장만으로 이름을 맞혔습니다."
          : tries+"번 만에 이름을 적었습니다.")+'</p>'
      : '<p class="narr">세 번 만에도 나오지 않았습니다. 그럴 수 있습니다. ' +
        '<em>이 이름은 1943년부터 2021년까지 이 땅에 없었습니다.</em></p>') +
    actbar('<button class="btn" type="button" id="next">그의 뒤를 따른다</button>')
  );
  $("next").addEventListener("click", function(){ reveal(f, tries); });
}

function reveal(f, tries){
  S.figure = f;
  S.trust = clamp(S.trust + f.trust, 0, 10);
  scene("1920. 6. 5 · 새벽", "북간도", "dawn");
  show(
    '<p class="eyebrow">신원 확인</p>' +
    '<div class="person"><span class="portrait"><img src="'+FACE[f.face]+'" alt=""></span>' +
    '<div><p class="person-name">'+esc(f.real)+'</p>' +
    '<p class="who-sub">'+esc(f.revealSub)+'</p>' +
    '<p class="person-desc">'+esc(f.after)+'</p></div></div>' +
    actbar('<button class="btn" type="button" id="next">주둔지로 간다</button>')
  );
  $("next").addEventListener("click", function(){ SIM = true; camp(); });
}

/* ===================== 주둔지 — 허브 ===================== */

function bond(m, text){
  if(text && m.bond.indexOf(text) < 0) m.bond.push(text);
}
function pending(m){
  return !m.answered || (!!DECIDE[m.name] && !S.decided[m.name]);
}
function pendingCount(){ return alive().filter(pending).length; }

function camp(msg){
  var left = pendingCount();
  scene(S.done >= 2 ? "1920. 6. 6 · 저녁" : "1920. 6. 5 · 낮", "북간도 · 주둔지",
        S.done >= 2 ? "dusk" : "day");

  show(
    '<div class="camp">' +
      '<img class="camp-bg" src="'+(S.done >= 2 ? CAMP.night : CAMP.day)+'" alt="주둔지">' +
      '<div class="camp-sheen"></div>' +
      alive().map(function(m){
        var i = S.squad.indexOf(m), p = pending(m);
        var tag = !m.answered ? '<em>● 말을 걸어온다</em>'
                : (DECIDE[m.name] && !S.decided[m.name] ? '<em>● 물어볼 것이 있다</em>'
                : '<i>'+esc(m.skill)+'</i>');
        return '<button class="unit'+(p?" has":"")+'" type="button" data-u="'+i+'" ' +
          'style="left:'+m.pos[0]+'%;top:'+m.pos[1]+'%;--sc:'+m.pos[2]+'">' +
          '<span class="unit-shadow"></span>' +
          '<span class="unit-fig"><img src="'+FACE[m.face]+'" alt="'+esc(m.name)+'"></span>' +
          '<span class="unit-tag">'+esc(m.name)+tag+'</span>' +
        '</button>';
      }).join("") +
    '</div>' +
    (msg ? '<div class="note-box"><p>'+msg+'</p></div>' : '') +
    actbar('<button class="btn" type="button" id="on"'+(left?" disabled":"")+'>' +
      (left ? "아직 이야기를 안 한 사람이 있다 (남은 "+left+"명)" : "곁에 둘 사람을 정한다") + '</button>',
      "여섯을 다 만나 보세요. ● 표가 붙은 사람이 아직 나를 기다립니다.")
  );

  screenEl.querySelectorAll("[data-u]").forEach(function(b){
    b.addEventListener("click", function(){ talk(parseInt(b.getAttribute("data-u"),10)); });
  });
  if(!left) $("on").addEventListener("click", escortPick);
}

function campBg(){ return S.done >= 2 ? CAMP.night : CAMP.day; }

function faceCard(m, said, sub){
  return stage(m, said, esc(sub || m.line), campBg());
}

function talk(idx){
  var m = S.squad[idx];
  scene(null, null, null);

  /* 아직 사람 얘기를 안 들었다 — 사적인 한 마디부터 */
  if(!m.answered){
    show(
      faceCard(m, m.ask.q) +
      optList(m.ask.opts) +
      actbar('<button class="btn ghost" type="button" id="back">나중에 듣는다</button>',
             "지표는 움직이지 않습니다. 이 사람이 나를 어떻게 부르는지가 바뀝니다.")
    );
    $("back").addEventListener("click", function(){ camp(); });
    bindOpts(function(k){ answer(m, m.ask.opts[k]); });
    return;
  }

  after(m);
}

function answer(m, o){
  m.answered = o.t; m.call = o.call; m.last = o.last;
  bond(m, o.bond);
  snd.chime();
  scene(null, null, null);
  show(
    faceCard(m, o.s, m.line) +
    '<p class="myline">나 — “'+esc(o.t)+'”</p>' +
    actbar('<button class="btn" type="button" id="next">'+
      (DECIDE[m.name] ? "그가 본론을 꺼낸다" : "주둔지로 돌아간다")+'</button>')
  );
  $("next").addEventListener("click", function(){
    if(DECIDE[m.name]) after(m); else camp();
  });
}

/* 대답을 들은 뒤 — 결정이 있으면 결정, 없으면 근황 한 마디 */
function after(m){
  var D = DECIDE[m.name], p = D && !S.decided[m.name];
  var dead = S.squad.filter(function(x){ return !x.alive; });
  var said = p ? D.say
           : (dead.length ? "“" + dead[dead.length-1].name + "이 없으니 자리가 빕니다.”"
                          : m.say[Math.min(S.done, 3)]);
  scene(null, null, null);
  show(
    faceCard(m, said) +
    (p
      ? '<div class="section-head"><h3>'+esc(D.title)+'</h3>' +
          '<span class="hint">결정 '+(S.done+1)+' / 3</span></div>' +
        '<details class="ev-src"><summary>교과서 근거</summary><p>'+esc(D.cite)+'</p></details>' +
        optList(D.opts) +
        actbar('<button class="btn ghost" type="button" id="back">나중에 답한다</button>',
               "어느 쪽도 공짜가 아닙니다.")
      : actbar('<button class="btn ghost" type="button" id="back">주둔지로 돌아간다</button>'))
  );
  $("back").addEventListener("click", function(){ camp(); });
  if(p) bindOpts(function(k){ decide(m, D, D.opts[k]); });
}

function decide(m, D, o){
  S.decided[m.name] = o.t;
  S.done++;
  bond(m, o.bond);
  if(o.trust) apply({ trust:o.trust });
  if(o.union !== undefined) S.union = o.union;
  S.log.push(D.title + " → " + o.t);
  snd.up();

  scene(null, null, o.union === undefined ? "dusk" : "day");
  var pic = D.art === "raid" ? artRaid() : (D.art === "levy" ? artVillage() : artUnits(!!o.union));
  show(
    pic +
    '<p class="eyebrow">'+esc(D.title)+'</p><h2>'+esc(o.t)+'</h2>' +
    '<p class="narr">'+esc(o.s)+'</p>' + deltas({ trust:o.trust }) +
    (o.union === true
      ? '<p class="narr">최진동의 군무 도독부와 안무의 국민회군이 함께 움직인다. 교과서가 적은 그대로다 — <em>독립군 부대는 연합하여 일제의 공격에 대비하였다.</em></p>'
      : (o.union === false
        ? '<p class="narr">우리 부대만 남는다. 병력은 늘지 않았고, 마을과는 가까이 있다.</p>' : '')) +
    actbar('<button class="btn" type="button" id="next">주둔지로 돌아간다</button>')
  );
  $("next").addEventListener("click", function(){ camp(); });
}

/* ===================== 곁에 둘 사람 ===================== */

function escortPick(){
  scene("1920. 6. 6 · 밤", "북간도 · 주둔지", "night");
  show(
    '<p class="eyebrow">한 사람</p><h2>누구를 곁에 둘 것인가</h2>' +
    '<p class="narr">한 명은 늘 내 옆에 붙는다. 가는 데마다 한 마디씩 한다. ' +
      '<em>옆에 있으면 더 자주 보이고, 더 오래 기억에 남는다.</em></p>' +
    '<div class="squad">' + alive().map(function(m,i){
      return '<button class="sq" type="button" data-e="'+i+'">' +
        '<span class="sq-face"><img src="'+FACE[m.face]+'" alt=""></span>' +
        '<span class="sq-info"><span class="sqn">'+esc(m.name)+'</span>' +
        '<span class="sqm">'+esc(m.origin)+' · '+m.age+'세 · '+esc(m.skill)+'</span>' +
        '<span class="sqs fit">'+esc(m.bond[0] || m.line)+'</span></span></button>';
    }).join("") + '</div>' +
    actbar('', "곁에 두는 것이 그를 지켜 주지는 않습니다.")
  );
  screenEl.querySelectorAll("[data-e]").forEach(function(b){
    b.addEventListener("click", function(){
      var m = alive()[parseInt(b.getAttribute("data-e"),10)];
      S.escort = m; bond(m, "내 곁에 두었다");
      snd.commit(); drawHud();
      scene(null, null, null);
      show(
        faceCard(m, "“옆에 있겠습니다. 뒤는 제가 봅니다.”") +
        '<p class="narr">그 뒤로 화면 맨 위에 <em>그의 한 마디</em>가 따라다닌다. 그가 없어지면 그 자리도 비워진다.</p>' +
        actbar('<button class="btn" type="button" id="next">장군이 부른다</button>')
      );
      $("next").addEventListener("click", function(){ askQ("q1", ep03, SC[17]); });
    });
  });
}

/* ===================== 명부 — 여섯 그리고 여섯 ===================== */

function musterAll(){
  scene("1920. 6. 6 · 밤", "북간도 · 주둔지", "night");
  show(
    '<p class="eyebrow">명부</p><h2>여섯 그리고 여섯</h2>' +
    '<p class="narr">위에는 이름이 역사에 남은 사람 여섯. 아래에는 내 소대 여섯. ' +
      '<em>화면 맨 위에 이 여섯의 얼굴이 계속 떠 있다.</em></p>' +
    '<div class="facegrid">' + ROSTER.map(function(r){
      return '<div class="fc">' + (r.face
          ? '<span class="fc-img"><img src="'+FACE[r.face]+'" alt="'+esc(r.name)+'"></span>'
          : '<span class="fc-img none">사진이<br>전하지<br>않는다</span>') +
        '<span class="fc-n">'+esc(r.name)+'</span><span class="fc-u">'+esc(r.unit)+'</span></div>';
    }).join("") + '</div>' +
    '<p class="cite">'+esc(BOOK)+' · 20 · 30 · 33쪽. 안무의 사진은 전하지 않는다.</p>' +
    actbar('<button class="btn" type="button" id="next">장군이 묻는다</button>')
  );
  $("next").addEventListener("click", function(){ askQ("q1", ep03, SC[17]); });
}


/* ===================== 무대 — 화면을 가득 채운다 =====================
   배경과 인물이 화면 전체를 쓰고, 대사창이 아래를 덮는다.
   선택지·근거·단추는 모두 대사창 안으로 들어간다 (mountStage 가 옮긴다).

   지어낸 소대원은 그림으로 선다. 실존 인물은 사진으로 선다 — 액자째.
*/

var SPRITE = {
  s1:"__SP_S1__", s2:"__SP_S2__", s3:"__SP_S3__",
  s4:"__SP_S4__", s5:"__SP_S5__", s6:"__SP_S6__"
};

var STAGE_BG = null;
function setBg(url){ STAGE_BG = url || null; }

function stage(who, said, lead, bg, extra, over){
  var src = bg || STAGE_BG || SC[2];
  var sp = who && SPRITE[who.face];
  var real = !sp && who && FACE[who.face];

  return '<div class="vn' + (sp ? " has-actor" : (real ? " has-photo" : "")) + '">' +
      '<img class="vn-bg" src="'+src+'" alt="">' +
      '<span class="vn-veil"></span>' +
      '<span class="vn-flash" aria-hidden="true"></span>' +
      (sp
        ? '<img class="vn-actor" src="'+sp+'" alt="'+esc(who.name)+'">'
        : (real
          ? '<span class="vn-photo"><img src="'+FACE[who.face]+'" alt="'+esc(who.name)+'">' +
            '<span class="vn-photo-tag">사진</span></span>'
          : '')) +
      (over ? '<div class="vn-over">'+over+'</div>' : '') +
      '<div class="vn-panel">' +
        (who ? '<span class="vn-name">'+esc(who.name) +
          (who.origin ? '<em>'+esc(who.origin)+' · '+who.age+'세 · '+esc(who.skill)+'</em>' : '') +
          '</span>' : '') +
        '<div class="vn-scroll"><div class="vn-text">' +
          (lead ? '<p class="vn-lead">'+lead+'</p>' : '') +
          (said ? '<p class="vn-say">'+esc(said)+'</p>' : '') +
          (extra || '') +
        '</div></div>' +
        (said ? '<span class="vn-tip" aria-hidden="true"></span>' : '') +
      '</div>' +
  '</div>';
}

/* 무대 뒤에 붙어 나온 것들(선택지·근거·단추)을 대사창 안으로 옮긴다 */
function mountStage(){
  var sc = screenEl.querySelector(".scene");
  if(!sc) return false;
  document.body.classList.toggle("titlescreen", !!sc.querySelector(".keyart-full"));
  var vn = sc.querySelector(".vn");
  if(!vn){
    document.body.classList.remove("staged");
    document.body.classList.toggle("campstage", !!sc.querySelector(".camp"));
    return false;
  }
  document.body.classList.remove("campstage");

  var panel = vn.querySelector(".vn-scroll") || vn.querySelector(".vn-panel");
  var node = vn.nextSibling;
  while(node){
    var next = node.nextSibling;
    panel.appendChild(node);
    node = next;
  }
  document.body.classList.add("staged");
  fitStage();
  return true;
}

/* 대사창 높이를 재어 인물과 액자가 가려지지 않게 한다 */
function fitStage(){
  var vn = screenEl.querySelector(".vn");
  if(!vn) return;
  var pn = vn.querySelector(".vn-panel");
  if(!pn) return;
  var h = Math.round(pn.getBoundingClientRect().height);
  vn.style.setProperty("--panel-h", h + "px");
  var bd = $("board");
  var bh = (bd && !bd.hidden) ? Math.round(bd.getBoundingClientRect().height) : 0;
  vn.style.setProperty("--hud-h", bh + "px");
}

function narrate(lead, bg){ return stage(null, null, lead, bg); }
function talkCard(m, said, bg){ return stage(m, said, null, bg); }

function optList(opts){
  return '<div class="opts">' + opts.map(function(o,i){
    return '<button class="opt'+(o.pic?" has-pic":"")+'" type="button" data-o="'+i+'"'+(o.off?" disabled":"")+'>' +
      (o.pic ? '<span class="opt-pic"><img src="'+SC[o.pic]+'" alt=""></span>' : '') +
      '<span class="opt-b"><span class="t">'+esc(o.t)+'</span>' +
      (o.s ? '<span class="s">'+esc(o.s)+'</span>' : '') + '</span>' +
    '</button>';
  }).join("") + '</div>';
}

function speaks(m, said, opts, bg, lead){
  return stage(m, said, lead, bg) + optList(opts);
}

/* ===================== 묻는 사람이 있는 문항 ===================== */

function askerOf(name){
  var m = memberBy(name);
  if(m && m.alive) return m;
  if(S.escort && S.escort.alive) return S.escort;
  return alive()[0] || HONG_NPC;
}

function askQ(key, next, bg){
  var Q = QUIZ[key];
  var who = Q.by === "hong" ? HONG_NPC : askerOf(Q.by);
  scene(null, null, null);
  show(
    stage(who, Q.said, null, bg) +
    optList(Q.opts.map(function(o){ return { t:o }; })) +
    actbar('', "틀려도 진행됩니다. 기록에는 남습니다.")
  );
  bindOpts(function(i){
    var ok = (i === Q.ans);
    S.quiz[key] = { picked:Q.opts[i], ok:ok };
    if(ok) snd.chime(); else snd.deny();
    scene(null, null, null);
    show(
      stage(who, ok ? Q.yes : Q.no, null, bg) +
      '<div class="note-box'+(ok?" good":" warn")+'"><h3>'+esc(BOOK)+' · '+esc(Q.cite)+'</h3>' +
      '<p><strong>'+esc(Q.opts[Q.ans])+'</strong> — '+esc(Q.why)+'</p></div>' +
      actbar('<button class="btn" type="button" id="next">계속</button>')
    );
    $("next").addEventListener("click", next);
  });
}

/* ===================== 봉오동 ===================== */

function ep03(){
  S.phase = 1;
  scene("1920. 6. 7 · 새벽 4시", "봉오동 상촌", "deep", "battle");
  show(
    narrate('마을을 비우면 골짜기 전체가 덫이 된다. 다만 집과 곡식을 두고 산으로 가라는 말을 ' +
            '<em>사람들이 받아들여야 한다.</em>', SC[4]) +
    optList([
      {t:"마을을 비우고 능선에 매복한다", s:"신망 "+S.trust+" / 10 — 4 이상이어야 주민이 따라 준다.", pic:21},
      {t:"골짜기 밖에서 정면으로 맞선다", s:"지형의 이점을 포기한다. 대신 마을은 건드리지 않는다.", pic:20}
    ]) + actbar('')
  );
  bindOpts(function(i){
    S.ambush = (i === 0);
    if(!S.ambush) S.trust = clamp(S.trust+1,0,10);
    deploy("봉오동", "능선 맨 앞", ["정찰","사격"], function(){ fight(0); });
  });
}

function deploy(where, slot, good, done){
  var pool = alive(), picked = [];
  function render(){
    show(
      '<p class="eyebrow">'+esc(where)+' · 배치</p><h2>누구를 '+esc(slot)+'에 세울 것인가</h2>' +
      '<p class="narr">두 사람을 고른다. <em>앞에 선 사람이 먼저 죽는다.</em></p>' +
      '<div class="squad">' + pool.map(function(m,i){
        var on = picked.indexOf(m) >= 0, fit = good.indexOf(m.skill) >= 0;
        return '<button class="sq'+(on?" on":"")+'" type="button" data-i="'+i+'">' +
          '<span class="sq-face"><img src="'+FACE[m.face]+'" alt=""></span>' +
          '<span class="sq-info"><span class="sqn">'+esc(m.name)+'</span>' +
          '<span class="sqm">'+esc(m.origin)+' · '+m.age+'</span>' +
          '<span class="sqs'+(fit?" fit":"")+'">'+esc(m.skill)+(fit?" · 이 자리에 맞다":"")+'</span></span></button>';
      }).join("") + '</div>' +
      actbar('<button class="btn" type="button" id="go"'+(picked.length===2?"":" disabled")+'>' +
        (picked.length===2 ? "이 두 사람을 앞에 세운다" : "두 사람 ("+picked.length+" / 2)")+'</button>')
    );
    screenEl.querySelectorAll("[data-i]").forEach(function(b){
      b.addEventListener("click", function(){
        var m = pool[parseInt(b.getAttribute("data-i"),10)];
        var k = picked.indexOf(m);
        if(k>=0){ picked.splice(k,1); snd.unassign(); }
        else if(picked.length<2){ picked.push(m); snd.assign(); }
        else snd.deny();
        render();
      });
    });
    if(picked.length===2) $("go").addEventListener("click", function(){
      S.squad.forEach(function(m){ m.front = false; });
      picked.forEach(function(m){ m.front = true; bond(m, where+" "+slot+"에 함께 세웠다"); });
      S.front = picked; S.good = good; S.risk = 0; S.gain = 0;
      done();
    });
  }
  scene(null, null, null);
  render();
}

/* ===================== 전황판 ===================== */

function startField(name, field, pos, when){
  S.b = { name:name, field:field, pos:pos, time:when, shots:0, log:[], on:true };
}
function endField(){ if(S.b) S.b.on = false; drawHud(); }

/* 전황은 상황 띠 한 줄로 낸다. 인원은 위 명단이 이미 보여 주므로 넣지 않는다 */
function drawStrip(){
  var el = $("bstrip"); if(!el) return;
  var b = S && S.b;
  if(!b || !b.on){ el.hidden = true; el.innerHTML = ""; return; }
  el.hidden = false;
  el.innerHTML =
    '<span class="bs-l">전황</span>' +
    '<span class="bs-time">'+esc(b.time)+'</span>' +
    '<span class="bf-track">' + b.field.map(function(n,i){
      return '<span class="bf-node'+(i===b.pos?" on":(i<b.pos?" past":""))+'"><i></i>'+esc(n)+'</span>';
    }).join("") + '</span>' +
    '<span class="bf-shots" aria-label="총성">' +
      [0,1,2,3,4,5,6,7].map(function(i){
        return '<i class="'+(i < b.shots ? "on" : "")+'"></i>';
      }).join("") + '</span>' +
    (b.log.length ? '<span class="bs-log">'+esc(b.log[b.log.length-1].s)+'</span>' : '');
}

/* 결과 화면에서 되짚는 전투 기록 */
function battleLog(){
  var b = S.b;
  if(!b || !b.log.length) return "";
  return '<ol class="bf-log tall">' + b.log.map(function(l){
      return '<li><span class="bf-t">'+esc(l.t)+'</span>'+esc(l.s)+'</li>';
    }).join("") + '</ol>';
}

function battleBar(){ return ""; }

/* 같은 그림 위에 연기와 섬광이 박자마다 짙어진다 */
function artFight(k, caps, pics){
  return '<figure class="plate fx fx'+k+'">' +
    '<img class="scene-img" src="'+SC[pics[k]]+'" alt="">' +
    '<span class="fx-smoke"></span><span class="fx-flash"></span>' +
    '<figcaption><span class="repro">재현 그림</span>'+esc(caps[k])+'</figcaption>' +
  '</figure>';
}

function bang(shots, spread){
  snd.volley(shots, spread);
  if(document.documentElement.classList.contains("calm")) return;
  var el = screenEl.querySelector(".vn") || screenEl.querySelector(".scene");
  if(!el) return;
  el.classList.remove("hit");
  void el.offsetWidth;
  el.classList.add("hit");
  setTimeout(function(){ el.classList.remove("hit"); }, 640);
}

/* ===================== 봉오동 — 세 박자 ===================== */

var BO_CAPS = [
  "능선에 엎드려 골짜기를 내려다본다. 안개가 아직 걷히지 않았다.",
  "능선이 열렸다. 연기가 골짜기를 채우고, 아래 개울에 사람 하나가 누워 있다.",
  "해가 올랐다. 총소리가 멎은 자리에 버려진 것들이 남았다."
];

var BO_BEATS = [
  { time:"04:40", slug:"새벽 4시 40분", who:0,
    lead:"골짜기 어귀에 일본군 선두가 들어섰다. 본대는 아직 밖에 있다.",
    say:"“지금이라면 선두는 잡습니다. 더 기다리면 본대까지 들어옵니다. 대신 우리가 갇힙니다.”",
    hint:"기다릴수록 전과는 커지고, 우리도 빠져나가기 어려워집니다.",
    opts:[
      { t:"지금 쏜다", s:"선두만 잡는다. 안전하지만 전과는 작다.", pic:20,
        pos:1, shots:3, vol:[6,2200],
        out:"능선이 한쪽에서 열렸다. 선두 대열이 무너지고, 뒤쪽은 골짜기 밖으로 물러났다.",
        log:"선두만 잡았다. 본대는 들어오지 않았다." },
      { t:"본대까지 들인다", s:"골짜기 전체를 덫으로 쓴다.", pic:21,
        pos:3, shots:6, vol:[12,2400], risk:1, gain:1,
        out:"숨을 죽였다. 발소리가 능선 아래를 다 지나간 뒤에야 사방이 한꺼번에 열렸다.",
        log:"본대까지 들였다. 골짜기가 닫혔다." }
    ] },

  { time:"05:10", slug:"새벽 5시 10분", who:1,
    lead:"사격이 이어진다. 골짜기 바닥에서 누군가 움직이지 못하고 있다. 우리 쪽 사람이다.",
    say:"“제가 내려가겠습니다. 지금 안 가면 못 데려옵니다.”",
    opts:[
      { t:"내려보낸다", s:"데려온다. 그가 표적이 된다.", pic:22,
        shots:5, vol:[8,2000], risk:1, trust:1, rescued:true, bond:"골짜기 바닥으로 그를 내려보냈다",
        out:"바위를 타고 내려갔다. 총알이 그 주위 흙을 튀겼다. 사람을 업고 다시 올라왔다.",
        log:"골짜기 바닥의 사람을 업고 올라왔다." },
      { t:"막는다", s:"진지를 지킨다. 그 사람은 두고 온다.", pic:23,
        shots:4, vol:[6,2000], trust:-1, bond:"내려가겠다는 그를 막았다",
        out:"어깨를 잡아 앉혔다. 아래에서 나던 소리가 얼마 뒤에 멎었다.",
        log:"진지를 지켰다. 골짜기의 그 사람은 두고 왔다." }
    ] },

  { time:"06:20", slug:"아침 6시 20분", who:0,
    lead:"해가 오른다. 탄약이 얼마 남지 않았다.",
    say:"“한 사람당 열 발 남짓입니다. 지금 물러서면 여기까지입니다.”",
    opts:[
      { t:"물러선다", s:"사람을 아낀다. 적 절반이 빠져나간다.", pic:24,
        shots:2, vol:[4,1600], gain:-1,
        out:"능선을 타고 뒤로 빠졌다. 골짜기에 남아 있던 적이 반대편으로 빠져나가는 것이 보였다.",
        log:"물러섰다. 적 절반이 빠져나갔다." },
      { t:"끝까지 간다", s:"남은 것을 다 쓴다. 끝을 본다.", pic:25,
        shots:8, vol:[14,2600], risk:1, gain:1,
        out:"남은 것을 다 쐈다. 총열이 뜨거워 손을 못 댈 지경이 되어서야 조용해졌다.",
        log:"끝까지 쐈다. 골짜기에서 나간 자가 적었다." }
    ] }
];

function fight(step){
  if(step === 0) startField("봉오동", ["골짜기 밖","어귀","골짜기 안","덫 안"], 1, "04:40");
  var B = BO_BEATS[step];
  S.b.time = B.time;
  scene("1920. 6. 7 · " + B.slug, "봉오동 골짜기", "deep", "battle");
  var who = S.front[B.who] || alive()[0];

  function render(o){
    show(
      '<div class="stage-top">'+steps(3,step)+'<span class="count">봉오동 · 박자 '+(step+1)+' / 3</span></div>' +
      (o
        ? stage(who, null, '<strong>— '+esc(o.t)+'</strong> ' + esc(o.out),
                SC[[4,13,14][step]]) +
          actbar('<button class="btn" type="button" id="next">' +
            (step<2 ? "다음 박자" : "총성이 멎는다") + '</button>')
        : stage(who, B.say, esc(B.lead), SC[[4,13,14][step]]) +
          optList(B.opts) +
          actbar('', B.hint || "선택이 사상자 수를 바꿉니다."))
    );
    if(o) $("next").addEventListener("click", function(){
      if(step < 2) fight(step+1); else ep03Result();
    });
    else bindOpts(function(i){ resolve(B.opts[i]); });
  }

  function resolve(o){
    if(o.pos !== undefined) S.b.pos = o.pos;
    S.b.shots = Math.min(8, S.b.shots + o.shots);
    if(o.risk)  S.risk += o.risk;
    if(o.gain)  S.gain += o.gain;
    if(o.trust) S.trust = clamp(S.trust + o.trust, 0, 10);
    if(o.rescued) S.rescued = true;
    if(o.bond) bond(who, o.bond);
    S.b.log.push({ t:B.time, s:o.log });
    drawHud();
    render(o);
    bang(o.vol[0], o.vol[1]);
  }

  render(null);
}

/* ===================== 청산리 — 두 박자 ===================== */

var CH_CAPS = [
  "백운평. 새벽안개가 자작나무 사이에 걸려 있다.",
  "어랑촌. 고지 하나를 두고 온종일 밀고 밀렸다."
];

var CH_BEATS = [
  { time:"10.21", slug:"10. 21 · 새벽", place:"백운평 골짜기", node:1, who:0,
    lead:"안개다. 열 걸음 앞이 안 보인다. 일본군 선발대가 골짜기로 들어오고 있다.",
    say:"“안개라 앞이 안 보입니다. 붙어서 쏘면 맞힙니다. 대신 물러설 틈이 없습니다.”",
    opts:[
      { t:"붙어서 쏜다", s:"명중률이 오른다. 위험도 오른다.", pic:26,
        shots:5, vol:[11,2600], risk:1,
        out:"스무 걸음까지 붙였다. 안개 속에서 첫 발이 나가자 골짜기 전체가 터졌다.",
        log:"백운평에서 붙어 쏘았다. 선발대가 무너졌다." },
      { t:"거리를 둔다", s:"안전하다. 적을 놓칠 수 있다.", pic:27,
        shots:3, vol:[6,3000],
        out:"거리를 두고 쏘았다. 안개 속으로 물러나는 그림자를 다 잡지는 못했다.",
        log:"백운평에서 거리를 두었다. 절반은 물러났다." }
    ] },

  { time:"10.22", slug:"10. 22 · 낮", place:"어랑촌 고지", node:3, who:1,
    lead:"고지 하나가 골짜기 전체를 내려다본다. 일본군 본대가 그리로 올라붙고 있다.",
    say:"“저 고지를 먼저 잡아야 합니다. 늦으면 우리가 내려다보입니다.”",
    opts:[
      { t:"고지를 먼저 잡는다", s:"온종일 버텨야 한다.", pic:28,
        shots:8, vol:[14,2800], risk:1, gain:1,
        out:"먼저 올라가 엎드렸다. 해가 질 때까지 내려오지 않았다. 물도 밥도 없었다.",
        log:"어랑촌 고지를 먼저 잡고 온종일 버텼다." },
      { t:"숲으로 물러나 유인한다", s:"사람을 아낀다. 전과는 작다.", pic:29,
        shots:4, vol:[7,3000], gain:-1,
        out:"고지를 내주고 숲으로 물러났다. 따라 들어온 만큼만 잡았다.",
        log:"고지를 내주고 숲에서 잡았다." }
    ] }
];

function chungsan(step){
  step = step || 0;
  if(step === 0) startField("청산리", ["숲 밖","백운평","완루구","어랑촌"], 1, "10.21");
  var B = CH_BEATS[step];
  S.b.time = B.time;
  scene("1920. " + B.slug, B.place, "deep", "battle");
  var who = S.front[B.who] || alive()[0];

  function render(o){
    show(
      '<div class="stage-top">'+steps(2,step)+'<span class="count">청산리 · 박자 '+(step+1)+' / 2</span></div>' +
      (o
        ? stage(who, null, '<strong>— '+esc(o.t)+'</strong> ' + esc(o.out),
                SC[[5,13][step]]) +
          actbar('<button class="btn" type="button" id="next">' +
            (step<1 ? "이튿날" : "엿새가 지난다") + '</button>')
        : stage(who, B.say, esc(B.lead), SC[[5,13][step]]) +
          optList(B.opts) +
          actbar('', "청산리는 엿새 동안 열 몇 차례 이어졌습니다. 그 가운데 두 번입니다."))
    );
    if(o) $("next").addEventListener("click", function(){
      if(step < 1) chungsan(step+1); else chungsanResult();
    });
    else bindOpts(function(i){ resolve(B.opts[i]); });
  }

  function resolve(o){
    S.b.pos = B.node;
    S.b.shots = Math.min(8, S.b.shots + o.shots);
    if(o.risk) S.risk += o.risk;
    if(o.gain) S.gain += o.gain;
    if(o.bond) bond(who, o.bond);
    S.b.log.push({ t:B.time, s:o.log });
    drawHud();
    render(o);
    bang(o.vol[0], o.vol[1]);
  }

  render(null);
}

function chungsanResult(){
  endField();
  var fit = S.front.filter(function(m){ return S.good.indexOf(m.skill)>=0; }).length;
  var n = clamp(1 + S.risk - (fit>=2?1:0), 0, 2);
  var dead = S.front.filter(function(m){ return m.alive; }).slice(0, n);
  scene("1920. 10. 26 · 해질녘", "청산리", "dusk");
  show(
    artChungsan() + '<p class="eyebrow">1920년 10월 21 ~ 26일 · 청산리 대첩</p><h2>엿새가 지났다</h2>' +
    battleLog() +
    '<p class="narr">또 이겼다. 부대는 더 작아졌다. ' +
      (S.gain >= 1 ? "골짜기마다 적이 남았다." : "잡은 만큼 놓치기도 했다.") + '</p>' +
    '<details class="ev-src"><summary>교과서 근거</summary><p>교과서 30쪽 — 김좌진의 북로 군정서와 홍범도의 대한 독립군 등 독립군 연합 부대가 청산리 일대에서 6일간 10여 차례 전투를 벌여 일본군을 크게 무찔렀다(청산리 대첩).</p></details>' +
    actbar('<button class="btn" type="button" id="n2">'+(n?"돌아온 사람을 센다":"전열을 정비한다")+'</button>')
  );
  $("n2").addEventListener("click", function(){
    fallen(dead, "청산리", "자작나무 숲에서", gando);
  });
}

function ep03Result(){
  endField();
  var fit = S.front.filter(function(m){ return S.good.indexOf(m.skill) >= 0; }).length;
  var worked = S.ambush && S.trust >= 4;
  var n = clamp((worked?0:1) + S.risk - (fit>=2?1:0), 0, 3);
  var dead = [];
  S.front.forEach(function(m){ if(dead.length<n) dead.push(m); });
  alive().forEach(function(m){ if(dead.length<n && dead.indexOf(m)<0) dead.push(m); });

  scene("1920. 6. 7 · 아침", "봉오동", "dawn");
  show(
    artBattle() +
    '<p class="eyebrow">1920년 6월 7일 · 봉오동 전투</p>' +
    battleLog() +
    '<h2>'+(n===0 ? "아무도 잃지 않았다" : (worked ? "덫이 닫혔다" : (S.ambush ? "절반의 매복" : "값비싼 승리")))+'</h2>' +
    '<p class="narr">' + (worked
      ? "빈 마을로 들어선 일본군은 사방 능선에서 사격을 받았다. 총성이 한참 이어지다 조용해졌다."
      : (S.ambush ? "몇 집이 남았고, 연기가 오르는 마을에 일본군은 경계하며 들어왔다."
                  : "골짜기의 이점을 잃었다. 벌판에서 맞붙어 물러서게는 했다.")) +
      (S.gain>=2 ? " 골짜기에 남은 적이 적지 않았다." : (S.gain<0 ? " 적의 절반은 빠져나갔다." : "")) + '</p>' +
    (S.rescued ? '<p class="narr">골짜기 바닥에 있던 사람은 업혀 올라왔다.</p>' : '') +
    '<details class="ev-src"><summary>교과서 근거</summary><p>교과서 30쪽 — 1920년 6월 독립군 연합 부대가 봉오동 일대에서 일본군을 기습하여 크게 승리하였다(봉오동 전투).</p></details>' +
    actbar('<button class="btn" type="button" id="next">'+(n?"돌아온 사람을 센다":"전열을 정비한다")+'</button>')
  );
  $("next").addEventListener("click", function(){
    fallen(dead, "봉오동", "능선 위에서", function(){ askQ("q2", ep05, SC[14]); });
  });
}

function fallen(list, where, how, done){
  if(!list.length) return done();
  var i = 0;
  function one(){
    var m = list[i];
    m.alive = false; m.where = where; m.how = how;
    S.mourn = m.name; S.lost.push(m.name);
    var wasMine = (S.escort === m);
    scene(null, where, "deep");
    snd.toll();
    show(
      '<div class="fallen-screen">' +
        '<span class="fallen-face"><img src="'+FACE[m.face]+'" alt=""></span>' +
        '<div class="fallen-body">' +
          '<p class="fallen-tag fade-1">돌아오지 못했다</p>' +
          '<p class="fallen-name fade-1">'+esc(m.name)+
            (m.call ? ' <span class="fallen-call">나를 '+esc(m.call)+'이라 불렀다</span>' : '')+'</p>' +
          '<p class="fallen-meta fade-1">'+esc(m.origin)+'에서. '+m.age+'세. '+esc(where)+' · '+esc(how)+'</p>' +
          '<p class="fallen-line fade-2">'+esc(m.line)+'</p></div></div>' +
      '<div class="keepsake fade-2">' +
        '<div class="kp"><span class="kp-l">함께 한 일</span><ul class="kp-list">' +
          (m.bond.length ? m.bond.map(function(b){ return '<li>'+esc(b)+'</li>'; }).join("")
                         : '<li class="thin">함께 한 일이 없다. 이름만 알고 있었다.</li>') +
        '</ul></div>' +
        '<div class="kp"><span class="kp-l">남긴 것</span>' +
          '<p class="kp-keep">'+esc(m.keep)+'</p>' +
          (m.last ? '<p class="kp-last">'+esc(m.last)+'</p>' : '') +
        '</div>' +
      '</div>' +
      (wasMine ? '<p class="narr warnline">내 옆자리가 비었다.</p>' : '') +
      actbar('<button class="btn ghost" type="button" id="next">'+
        (i+1<list.length?"다음":"명부에 적는다")+'</button>',
        (i+1)+" / "+list.length + " · 남은 사람 " + (alive().length) + "명")
    );
    $("next").addEventListener("click", function(){
      i++; if(i<list.length) one(); else { S.mourn = null; reseat(); done(); }
    });
  }
  one();
}

/* ===================== 청산리 이후 ===================== */

function ep05(){
  S.phase = 2;
  scene("1920. 10 · 낮", "청산리 일대", "day");
  show(
    narrate('봉오동에서 패한 일제가 <strong>훈춘 사건</strong>을 빌미로 대군을 파견했다.', SC[5]) +
    '<p class="callout-src">훈춘 사건 — 일제에 매수된 마적이 훈춘의 일본 영사관을 공격하고 일본인을 살해한 사건. <span class="cite-inline">'+esc(BOOK)+' · 30쪽</span></p>' +
    actbar('<button class="btn" type="button" id="next">누구를 앞에 세울 것인가</button>')
  );
  $("next").addEventListener("click", function(){
    deploy("청산리", "숲 앞줄", ["사격","정찰"], function(){ chungsan(0); });
  });
}

function gando(){
  scene("1920. 10 ~ 이듬해 봄", "간도 일대", "dusk");
  var living = alive();
  var t = living.length > 1 ? living[living.length-1] : null;
  show(
    narrate('불탄 마을의 이름이 들어온다.' +
      (t ? ' <em>'+esc(t.origin)+'</em>. '+esc(t.name)+'의 고향이다. 그는 사흘 뒤 소대를 떠났고 돌아오지 않았다.' : ''),
      SC[6]) +
    '<p class="eyebrow">1920년 10월 ~ 이듬해 봄</p><h2>돌아온 값</h2>' +
    '<div class="note-box warn"><h3>교과서 31쪽</h3><p>일제는 독립군 근거지를 없애고 잇따른 패배를 보복하려 하였다. 1920년 10월 초부터 이듬해 봄까지 간도 지역의 한국인을 학살하고, 한국인 마을을 불살랐다(간도 참변).</p></div>' +
    actbar('<button class="btn" type="button" id="next">겨울이 온다</button>')
  );
  $("next").addEventListener("click", function(){
    if(t){ bond(t, "고향 마을이 불탔다"); fallen([t], "간도", "불탄 고향으로 돌아가 돌아오지 않았다", record); }
    else record();
  });
}

function record(){
  scene("1921. 2 · 겨울", "밀산 · 임시 숙영지", "winter");
  show(
    narrate('지난해 일을 적어야 한다. 손에 들어온 기록 두 장이 서로 다른 말을 한다. ' +
            '한쪽은 적 사망 <em>157명</em>, 다른 쪽은 전사 <em>1명</em>.', SC[7]) +
    actbar('<button class="btn" type="button" id="next">첫 번째 기록</button>')
  );
  $("next").addEventListener("click", function(){ assess(0); });
}

function assess(i){
  scene("1921. 2 · 겨울", "밀산 · 임시 숙영지", "winter");
  var id = BATTLE_DOCS[i], s = SOURCES[id], v = S.verdicts[id] || {};
  show(
    artPapers() +
    '<div class="stage-top">'+steps(2,i)+'<span class="count">기록 '+(i+1)+' / 2</span></div>' +
    '<div class="solo"><div class="solo-head">' +
      '<span class="doc-seal" style="border-color:var(--red);color:var(--red-2)">閱</span>' +
      '<span><span class="solo-title">'+bookTag(s)+esc(s.title)+'</span>' +
      '<span class="solo-badges">'+s.badges.map(function(b){return "<span>"+esc(b)+"</span>";}).join("")+'</span></span></div>' +
      '<div class="sheet"><span class="chop">'+esc(s.chop)+'</span>'+s.text+
      '<span class="note">'+esc(s.note)+'</span></div>' +
      '<div class="solo-judge"><p class="judge-label">얼마나 믿겠습니까</p>' +
      '<div class="chips" id="lv">' + ["높음","보통","낮음"].map(function(l){
        return '<button class="chip" type="button" data-lv="'+l+'" aria-pressed="'+(v.level===l)+'">'+l+'</button>';
      }).join("") + '</div>' +
      '<p class="judge-label">그렇게 본 근거</p>' +
      '<div class="chips" id="rs">' + REASONS.map(function(r){
        return '<button class="chip" type="button" data-rs="'+r.key+'" aria-pressed="'+(v.reason===r.key)+'">'+esc(r.label)+'</button>';
      }).join("") + '</div></div></div>' +
    actbar('<button class="btn" type="button" id="next" disabled>'+(i<1?"다음 기록 ▶":"기록을 마친다")+'</button>')
  );
  function refresh(){ var w = S.verdicts[id]||{}; $("next").disabled = !(w.level && w.reason); }
  refresh();
  $("lv").querySelectorAll("[data-lv]").forEach(function(b){
    b.addEventListener("click", function(){
      S.verdicts[id] = S.verdicts[id]||{}; S.verdicts[id].level = b.getAttribute("data-lv");
      $("lv").querySelectorAll("[data-lv]").forEach(function(o){ o.setAttribute("aria-pressed", o===b?"true":"false"); });
      refresh();
    });
  });
  $("rs").querySelectorAll("[data-rs]").forEach(function(b){
    b.addEventListener("click", function(){
      S.verdicts[id] = S.verdicts[id]||{}; S.verdicts[id].reason = b.getAttribute("data-rs");
      $("rs").querySelectorAll("[data-rs]").forEach(function(o){ o.setAttribute("aria-pressed", o===b?"true":"false"); });
      refresh();
    });
  });
  $("next").addEventListener("click", function(){ if(i<1) assess(i+1); else assessResult(); });
}

function reasonLabel(k){
  var r = REASONS.filter(function(x){ return x.key===k; })[0];
  return r ? r.label : k;
}

function assessResult(){
  scene("1921. 2 · 겨울", "밀산 · 임시 숙영지", "winter");
  var both = S.verdicts["s-bo-1"].level === "높음" && S.verdicts["s-bo-2"].level === "높음";
  show(
    artPapers() +
    '<p class="eyebrow">기록을 마치다</p><h2>같은 전투, 다른 기록</h2>' +
    (both ? '<div class="note-box warn"><h3>모순</h3><p>둘 다 「높음」으로 두었습니다. 숫자가 100배 넘게 차이 납니다.</p></div>'
          : '<div class="note-box good"><h3>일관성</h3><p>충돌하는 두 기록에 서로 다른 신뢰도를 매겼습니다.</p></div>') +
    BATTLE_DOCS.map(function(id){
      var s = SOURCES[id], v = S.verdicts[id], fb = FEEDBACK[id];
      var ok = fb.best.indexOf(v.reason) >= 0;
      return '<div class="note-box'+(ok?" good":"")+'"><h3>'+esc(s.title)+'</h3>' +
        '<p class="verdict-line" style="color:'+(ok?"var(--jade)":"#C9A15E")+'">'+esc(v.level)+' · '+esc(reasonLabel(v.reason))+'</p>' +
        '<p>'+esc(fb.text)+'</p></div>';
    }).join("") +
    actbar('<button class="btn" type="button" id="next">봄이 오기 전에 북쪽으로</button>')
  );
  $("next").addEventListener("click", jayusi);
}

/* ===================== 자유시 — 넉 장면 ===================== */

/* 1) 밀산 — 왜 남의 나라로 가는가 */
function jayusi(){
  S.phase = 3;
  scene("1920. 12 · 눈", "밀산 · 국경 마을", "winter");
  var e = S.escort && S.escort.alive ? S.escort : alive()[0];
  show(
    speaks(e, "“러시아 땅으로 간다고 들었습니다. …왜 남의 나라로 갑니까.”",
      [{t:"무기와 식량을 준다고 한다", s:"러시아 혁명 정부가 약소민족을 돕겠다고 했다. 총을 준다고 한다."},
       {t:"여기서는 겨울을 못 넘긴다", s:"근거지가 없다. 마을이 없으면 부대도 없다."}],
      SC[10],
      '간도의 마을이 탔다. 우리를 먹여 주던 곳이 없어졌다. 흩어져 있던 부대들이 밀산에 모여 <strong>대한 독립 군단</strong>을 만들었다.') +
    '<details class="ev-src"><summary>교과서 근거</summary><p>교과서 31쪽 — 간도 참변 이후 독립군은 밀산에 모여 대한 독립 군단을 조직하고, 러시아령 자유시로 이동하였다.</p></details>' +
    actbar('', "선택지가 둘이지만, 갈 수 있는 곳은 하나였습니다.")
  );
  bindOpts(function(i){
    S.why = i === 0 ? "무기와 식량" : "갈 곳이 없어서";
    S.log.push("자유시로 간 까닭 — " + S.why);
    scene("1921. 1 ~ 3", "밀산 → 자유시", "winter");
    show(
      artMilsan() +
      '<p class="eyebrow">국경을 넘다</p><h2>'+(i===0?"준다고 했다":"갈 곳이 없었다")+'</h2>' +
      '<p class="narr">얼어붙은 강을 건넜다. 이번에는 신발을 벗지 않았다. 벗으면 발이 얼어붙기 때문이다.</p>' +
      '<p class="narr">스무 날을 걸어 <em>자유시</em>에 닿았다. 러시아 사람들은 이 도시를 스보보드니라 불렀다. ' +
      '<span class="cite-inline">「자유」라는 뜻이다.</span></p>' +
      actbar('<button class="btn" type="button" id="next">부대가 모여 있다</button>')
    );
    $("next").addEventListener("click", jayusiOrders);
  });
}

/* 2) 두 개의 사령부 */
function jayusiOrders(){
  scene("1921. 3 ~ 6", "자유시 (스보보드니)", "winter");
  show(
    artJayusiTown() +
    '<p class="eyebrow">1921년 봄 · 자유시</p><h2>총사령부가 둘이다</h2>' +
    '<p class="narr">만주에서 넘어온 부대가 여럿 모였다. 그런데 <em>우리를 지휘하겠다는 곳이 두 군데</em>다. ' +
      '둘 다 우리말을 쓰고, 둘 다 독립을 말한다.</p>' +
    '<div class="docs">'+["s-jy-order","s-jy-refuse"].map(docCard).join("")+'</div>' +
    optList([
      {t:"통고에 따른다", s:"지휘를 한곳으로 모은다. 우리 총의 주인이 바뀐다.", pic:30},
      {t:"따르지 않는다", s:"총은 우리가 쥔다. 명령을 어긴 부대가 된다.", pic:31},
      {t:"어느 쪽에도 서지 않는다", s:"양쪽 다 우리를 자기편으로 보지 않는다.", pic:38}
    ]) +
    actbar('', "두 문서를 다 펼쳐 보고 정하세요. 일본군은 이 자리에 없습니다.")
  );
  bindDocs();
  bindOpts(function(i){
    S.side = ["따름","거부","중립"][i];
    S.log.push("자유시 지휘권 — " + S.side);
    scene(null, null, "winter");
    show(
      artJayusiTown() +
      '<p class="eyebrow">1921년 6월 · 자유시</p><h2>'+esc(["지휘를 넘겼다","총을 쥔 채 남았다","어느 편도 아니다"][i])+'</h2>' +
      '<p class="narr">'+esc([
        "우리 부대의 이름이 다른 부대의 명부 아래로 들어갔다. 윤재호가 그 줄을 오래 들여다본다.",
        "명령을 어긴 부대로 적혔다. 그날부터 배급이 끊겼다.",
        "양쪽 명부 어디에도 우리 이름이 없다. 없는 부대가 되었다."
      ][i])+'</p>' +
      actbar('<button class="btn" type="button" id="next">6월 28일</button>')
    );
    $("next").addEventListener("click", jayusiDay);
  });
}

/* 3) 6월 28일 — 무장 해제 */
function jayusiDay(){
  scene("1921. 6. 28 · 낮", "자유시 · 수라셰프카", "deep", "battle");
  var e = S.escort && S.escort.alive ? S.escort : alive()[0];
  show(
    speaks(e, "“…저 사람, 조선말을 합니다. 우리 쪽 사람입니다.”",
      [{t:"총을 내려놓는다", s:"명령에 따른다. 우리를 겨눈 사람도 조선 사람이다.", pic:30},
       {t:"내려놓지 않는다", s:"여기까지 들고 온 총이다. 남의 손에 넘기지 않는다.", pic:31},
       {t:"밤을 기다렸다 빠져나간다", s:"총은 두고 사람만 뺀다. 강을 건너야 한다.", pic:32}],
      SC[8],
      '장갑차가 들어왔다. 러시아 적군이다. 기관총이 우리 쪽을 향한다. 앞에 통역이 섰다. ' +
      '<em>우리말로</em> 외친다 — 무장을 해제하라. 응하지 않으면 발포한다.') +
    actbar('', "세 선택 가운데 사람이 죽지 않는 길은 없습니다.")
  );
  bindOpts(function(i){
    var living = alive();
    var base = [1,2,1][i];
    /* 앞서 선 편과 명령이 어긋나면 한 사람 더 잃는다 */
    if((S.side === "거부" && i === 0) || (S.side === "따름" && i === 1)) base++;
    var n = Math.max(0, Math.min(base, living.length - 1));
    var dead = living.slice(0).sort(function(a,b){
      return (a === S.escort ? 1 : 0) - (b === S.escort ? 1 : 0);   /* 곁에 둔 사람이 마지막까지 남는다 */
    }).slice(0, n);

    S.jayusiChoice = ["무장 해제","거부","탈출"][i];
    S.log.push("6월 28일 — " + S.jayusiChoice);
    snd.volley(i === 1 ? 16 : 9, i === 1 ? 2600 : 2000);

    scene(null, null, "deep");
    show(
      artJayusi() +
      '<p class="eyebrow">1921년 6월 28일</p><h2>'+esc(["총을 내려놓았다","총을 놓지 않았다","강으로 갔다"][i])+'</h2>' +
      '<p class="narr">'+esc([
        "총을 눈 위에 놓았다. 줄이 길었다. 무장을 다 거둔 뒤에도 총성이 났다.",
        "사격이 시작됐다. 마주 선 쪽에서도 우리말이 들렸다. 명령도 비명도 우리말이었다.",
        "밤에 강으로 내려갔다. 얼음이 풀린 강이었다. 건너지 못한 사람이 있다."
      ][i])+'</p>' +
      '<div class="note-box warn"><h3>교과서 31쪽</h3><p>독립군을 통합하는 과정에서 지휘권을 두고 다툼이 일어났고, 러시아 적군이 개입하여 강제로 무장 해제를 진행하면서 여러 독립군이 피해를 입었다(자유시 참변).</p></div>' +
      actbar('<button class="btn" type="button" id="next">'+(n?"돌아오지 못한 사람을 센다":"인원을 센다")+'</button>')
    );
    $("next").addEventListener("click", function(){
      fallen(dead, "자유시", ["무장을 푼 뒤에","같은 말을 쓰는 총 앞에서","얼음이 풀린 강에서"][i], jayusiCount);
    });
  });
}

/* 4) 숫자 — 이번에는 일본군이 낸 숫자가 아니다 */
function jayusiCount(){
  scene("1921. 7", "자유시 이후", "winter");
  show(
    artPapers() +
    '<p class="eyebrow">기록</p><h2>같은 날, 두 개의 숫자</h2>' +
    '<p class="narr">얼마나 죽었는지 아무도 같은 숫자를 대지 않는다. ' +
      '봉오동에서는 일본군과 우리의 숫자가 달랐다. <em>이번에는 둘 다 우리 쪽 기록이다.</em></p>' +
    '<div class="docs">'+["s-jy-n1","s-jy-n2"].map(docCard).join("")+'</div>' +
    '<p class="cite">연구자마다 집계가 다릅니다. 교과서는 수치를 싣지 않고 「여러 독립군이 피해를 입었다」고만 적습니다.</p>' +
    actbar('<button class="btn" type="button" id="next">이 일을 무엇이라 적을 것인가</button>')
  );
  bindDocs();
  $("next").addEventListener("click", function(){ askQ("q3", jayusiAfter, SC[11]); });
}

/* 5) 떠난 자리 */
function jayusiAfter(){
  scene("1921. 가을", "연해주 · 자유시 이후", "dusk");
  var live = alive();
  show(
    '<p class="eyebrow">남은 사람</p><h2>'+(live.length ? live.length+"명이 남았다" : "아무도 남지 않았다")+'</h2>' +
    '<p class="narr">일본군은 이 자리에 없었다. 그런데 부대는 여기서 가장 크게 부서졌다. ' +
      '살아남은 사람들은 흩어졌다. 만주로 돌아간 사람, 러시아에 남은 사람, 시베리아로 끌려간 사람.</p>' +
    '<p class="narr">우리가 따랐던 <em>'+esc(S.figure.real)+'</em>도 이 자리에 있었다. ' +
      (S.figure.key === "hong"
        ? '그는 살아남았고, 러시아에 남았다. 그 뒤의 일은 명부에 적힌 대로다.'
        : '그의 뒤 이야기는 명부에 적힌 대로다.') + '</p>' +
    (live.length ? '<div class="facegrid small">' + live.map(function(m){
        return '<div class="fc survived"><span class="fc-img"><img src="'+FACE[m.face]+'" alt=""></span>' +
          '<span class="fc-n">'+esc(m.name)+'</span><span class="fc-u">'+esc(m.origin)+'</span></div>';
      }).join("") + '</div>' : '') +
    actbar('<button class="btn" type="button" id="next">그 뒤의 일</button>')
  );
  $("next").addEventListener("click", function(){ timeline(0); });
}

/* ===================== 증언 — 그 뒤에 남은 기록 ===================== */

function memberBy(name){
  return S.squad.filter(function(m){ return m.name === name; })[0];
}

/* 1) 오늘 남아 있는 숫자 */
function witness0(){
  SIM = false;
  scene("오늘", "남아 있는 기록", "winter");
  var v1 = S.verdicts["s-bo-1"] || {}, v2 = S.verdicts["s-bo-2"] || {};
  show(
    artPapers() +
    '<p class="eyebrow">증언 1 / 3</p><h2>확정된 숫자가 없다</h2>' +
    '<p class="narr">당신이 지나온 세 자리에 대해, 오늘 남아 있는 숫자는 이렇습니다. ' +
      '<em>어느 것도 하나로 정해지지 않았습니다.</em></p>' +
    '<div class="wit">' +
      '<div class="w-row"><span class="w-h">봉오동 · 1920. 6</span>' +
        '<p>『독립신문』은 적 사망 157명, 일본군 보고서는 자군 전사 1명이라 적었습니다. ' +
        '교과서는 「크게 승리하였다」고만 적고 수치를 싣지 않습니다.</p>' +
        '<p class="w-you">당신의 판단 — 『독립신문』 '+esc(v1.level||"-")+' · 일본군 보고 '+esc(v2.level||"-")+'</p></div>' +
      '<div class="w-row"><span class="w-h">간도 참변 · 1920. 10 ~ 이듬해 봄</span>' +
        '<p>박은식의 『한국독립운동지혈사』는 피살 3,469명, 불탄 집 3,209채, 학교 36곳, 교회 14곳으로 집계했습니다. ' +
        '조사 주체마다 수치가 다르고, 오늘날에도 확정되지 않았습니다.</p>' +
        '<p class="w-src">현대어 요약 · 교과서 밖 자료</p></div>' +
      '<div class="w-row"><span class="w-h">자유시 참변 · 1921. 6</span>' +
        '<p>집행한 쪽은 사망 36명이라 보고했고, 『독립신문』은 사망 272명·익사 31명·행방불명 250명이라 보도했습니다. ' +
        '차이는 여덟 배가 넘습니다.</p>' +
        '<p class="w-you">당신의 6월 28일 — '+esc(S.jayusiChoice||"-")+'</p></div>' +
    '</div>' +
    actbar('<button class="btn" type="button" id="next">이름은 어떻게 남는가</button>')
  );
  $("next").addEventListener("click", witness1);
}

/* 2) 이름이 남는 조건 */
function witness1(){
  scene("오늘", "이름", "deep");
  var y = memberBy("윤재호");
  var kept = y && y.answered === "적어 두라";
  show(
    '<p class="eyebrow">증언 2 / 3</p><h2>이름이 남는 데에는 조건이 있었다</h2>' +
    '<div class="facegrid small">' + ROSTER.map(function(r){
      return '<div class="fc">' + (r.face
        ? '<span class="fc-img"><img src="'+FACE[r.face]+'" alt=""></span>'
        : '<span class="fc-img none">사진이<br>전하지<br>않는다</span>') +
        '<span class="fc-n">'+esc(r.name)+'</span><span class="fc-u">'+esc(r.life)+'</span></div>';
    }).join("") + '</div>' +
    '<p class="narr">위 여섯은 이름이 남았습니다. 부대를 지휘했거나, 곁에 기록을 남길 사람이 있었거나, ' +
      '살아남은 누군가가 그 이름을 계속 말했기 때문입니다.</p>' +
    '<div class="wit">' +
      '<div class="w-row"><span class="w-h">안무</span>' +
        '<p>여섯 가운데 한 사람은 사진조차 전하지 않습니다. 교과서에도 이름만 실립니다.</p></div>' +
      '<div class="w-row"><span class="w-h">홍범도</span>' +
        '<p>1943년 카자흐스탄에서 세상을 떠난 뒤, 유해가 돌아온 것은 <em>2021년 8월</em>입니다. ' +
        '일흔여덟 해가 걸렸습니다.</p></div>' +
      '<div class="w-row"><span class="w-h">이름이 남지 않은 사람들</span>' +
        '<p>봉오동과 청산리에서 총을 든 사람 대다수는 오늘날 이름을 알 수 없습니다. ' +
        '명부가 남지 않았고, 남은 명부도 잡히면 그대로 처형 명단이 되었기 때문입니다.</p></div>' +
    '</div>' +
    (y ? '<div class="note-box'+(kept?" good":" warn")+'"><h3>당신이 한 일</h3>' +
      '<p>' + (kept
        ? "윤재호에게 <strong>이름을 적어 두라</strong>고 했습니다. 그 공책이 남았다면, 이 게임의 여섯 가운데 몇은 이름이 남았을 것입니다."
        : "윤재호에게 <strong>공책을 태우라</strong>고 했습니다. 부대는 안전해졌고, 이름은 그의 머릿속에만 남았습니다. 그가 돌아오지 못하면 함께 사라집니다.") +
      '</p></div>' : '') +
    actbar('<button class="btn" type="button" id="next">당신의 여섯</button>')
  );
  $("next").addEventListener("click", witness2);
}

/* 3) 공훈록에 적히지 못한 자리 */
function witness2(){
  scene("오늘", "공훈록", "deep");
  show(
    '<p class="eyebrow">증언 3 / 3</p><h2>이 양식에 적히지 못한 자리</h2>' +
    '<p class="narr">독립유공자 공훈록은 이런 양식으로 적힙니다. ' +
      '성명, 본적, 생몰년, 공적 개요, 훈격. <em>당신의 여섯을 이 양식에 넣어 보면 이렇게 됩니다.</em></p>' +
    '<div class="merits">' + S.squad.map(function(m){
      return '<article class="merit'+(m.alive?"":" gone")+'">' +
        '<span class="mr-face"><img src="'+FACE[m.face]+'" alt=""></span>' +
        '<div class="mr-body">' +
          '<p class="mr-n">'+esc(m.name)+'</p>' +
          '<dl class="mr-dl">' +
            '<dt>본적</dt><dd>'+esc(m.origin)+'</dd>' +
            '<dt>당시 나이</dt><dd>'+m.age+'세</dd>' +
            '<dt>공적 개요</dt><dd>'+esc(m.bond.length ? m.bond.join(" · ") : "확인되지 않음")+'</dd>' +
            '<dt>최후</dt><dd>'+(m.alive ? "확인되지 않음" : esc(m.where)+' · '+esc(m.how))+'</dd>' +
            '<dt>훈격</dt><dd class="mr-none">기록 없음</dd>' +
          '</dl>' +
        '</div></article>';
    }).join("") + '</div>' +
    '<div class="note-box"><h3>이 게임이 한 일</h3>' +
      '<p>위 여섯 실존 인물의 최후는 당신이 무엇을 했든 바뀌지 않았습니다. 실제로 있었던 일이기 때문입니다.</p>' +
      '<p>바뀐 것은 아래 여섯입니다. 어디에 보낼지, 언제 쏠지, 누구를 앞에 세울지, ' +
      '누구를 곁에 둘지 — 당신이 골랐습니다.</p>' +
      '<p>그런데 <strong>아래 여섯의 이름과 얼굴은 지어낸 것입니다.</strong> ' +
      '봉오동과 청산리에서 죽은 대다수는 오늘날 이름을 알 수 없습니다. 안무의 사진조차 전하지 않습니다.</p>' +
      '<p>그러니 이 카드들의 「훈격 — 기록 없음」은 게임의 장치가 아닙니다. ' +
      '<em>그 자리에 실제로 있었던 사람들에 대한 오늘의 상태입니다.</em> ' +
      '당신이 방금 여섯에게 이름을 붙여 준 일은, 역사가 하지 못한 일입니다.</p></div>' +
    actbar('<button class="btn" type="button" id="next">명부를 펼친다</button>')
  );
  $("next").addEventListener("click", ending);
}

var ORDER = [1,2,3,4,0,5];

function timeline(k){
  if(k >= ORDER.length) return witness0();
  var r = ROSTER[ORDER[k]];
  var last = (r.year === 0);
  SIM = false;
  scene(last ? "1945. 8. 15" : String(r.year), last ? "광복" : "만주 · 뤼순 · 하얼빈 · 크즐오르다", "deep");
  show(
    '<div class="epi">' +
      (r.face ? '<span class="epi-face"><img src="'+FACE[r.face]+'" alt=""></span>'
              : '<span class="epi-face none">사진이<br>전하지<br>않는다</span>') +
      '<div class="epi-body"><p class="year fade-1">'+(last?"1945":r.year)+'</p>' +
      '<p class="ename fade-1">'+esc(r.name)+' <span class="elife">'+esc(r.life)+'</span></p>' +
      '<p class="narr fade-2">'+esc(r.fate)+'</p></div></div>' +
    actbar('<button class="btn ghost" type="button" id="next">'+(k+1>=ORDER.length?"명부를 덮는다":"다음")+'</button>')
  );
  $("next").addEventListener("click", function(){ timeline(k+1); });
}

function ending(){
  scene("지금", "명부", "deep");
  var lost = S.squad.filter(function(m){ return !m.alive; });
  var live = S.squad.filter(function(m){ return m.alive; });

  var rec =
    "[독립군의 별 · 명부]\n근거 교과서 — 동아출판 『고등학교 한국사2』 20 · 28 · 30~33쪽\n\n" +
    "따른 사람: " + S.figure.real + "\n" +
    "주민의 신망 " + S.trust + " / 10\n" +
    "주둔지에서 내린 결정\n" + (S.log.length ? S.log.map(function(l){ return "· "+l; }).join("\n") : "· 없음") + "\n" +
    "이름 적기: " + (S.quiz.name ? (S.quiz.name.ok ? "맞힘 (틀린 횟수 " + S.quiz.name.tries + ")" : "못 맞힘 — 적은 것: " + S.quiz.name.picked) : "미응답") + "\n" +
    "부대 이름 문항: " + ["q1","q2","q3"].map(function(k){
      var v = S.quiz[k]; return v ? (v.ok?"정답":"오답("+v.picked+")") : "미응답"; }).join(" / ") + "\n" +
    "봉오동: " + (S.ambush?"매복":"정면") + " / " + (S.union?"연합":"단독") + "\n" +
    "곁에 둔 사람: " + (S.escort ? S.escort.name + (S.escort.alive?" (살아남음)":" (돌아오지 못함)") : "없음") + "\n" +
    "자유시: " + (S.why||"-") + " / 지휘권 " + (S.side||"-") + " / 6월 28일 " + (S.jayusiChoice||"-") + "\n\n" +
    "내 소대 여섯\n" + S.squad.map(function(m){
      return "· " + m.name + " (" + m.origin + " · " + m.age + "세) — " +
        (m.alive ? "살아남음" : m.where + "에서") +
        (m.answered ? "\n    내가 한 말: " + m.answered : "") +
        (!m.alive && m.last ? "\n    " + m.last : "");
    }).join("\n") + "\n\n" +
    "전과 기록 판단\n" + BATTLE_DOCS.map(function(id){
      var v = S.verdicts[id];
      return "· " + SOURCES[id].title + " → " + v.level + " (" + reasonLabel(v.reason) + ")";
    }).join("\n") + "\n\n" +
    "서술 1 — 여섯 가운데 가장 오래 남는 이름은 누구였고 그 까닭은 무엇인가. 세 문장으로 쓰시오." + "\n(학생 작성)\n\n" +
    "서술 2 — 같은 사건을 두고 기록마다 숫자가 다른 까닭을, 봉오동과 자유시의 예를 들어 쓰시오." + "\n(학생 작성)\n\n" +
    "서술 3 — 이 소대 여섯은 지어낸 이름이다. 실제로 그 자리에 있었으나 이름이 남지 않은 사람들에 대해 오늘 무엇을 할 수 있는가." + "\n(학생 작성)";

  show(
    artStar() + '<p class="eyebrow">명부</p><h2>남은 것</h2>' +
    '<div class="ledgerbook"><h3 class="mhead">이름이 역사에 남은 사람</h3><div class="facegrid small">' +
      ROSTER.map(function(r){
        var lv = r.year === 0;
        return '<div class="fc'+(lv?" survived":"")+'">' + (r.face
          ? '<span class="fc-img"><img src="'+FACE[r.face]+'" alt=""></span>'
          : '<span class="fc-img none">사진<br>없음</span>') +
          '<span class="fc-n">'+esc(r.name)+'</span><span class="fc-u">'+(lv?"광복을 봄":r.year)+'</span></div>';
      }).join("") + '</div></div>' +
    '<div class="ledgerbook"><h3 class="mhead">내 소대 — 잃은 사람 '+lost.length+', 남은 사람 '+live.length+'</h3>' +
      '<div class="facegrid small">' + S.squad.map(function(m){
        return '<div class="fc'+(m.alive?" survived":" gone")+'">' +
          '<span class="fc-img"><img src="'+FACE[m.face]+'" alt=""></span>' +
          '<span class="fc-n">'+esc(m.name)+'</span>' +
          '<span class="fc-u">'+(m.alive?"살아남음":esc(m.where))+'</span></div>';
      }).join("") + '</div></div>' +
    '<div class="note-box"><h3>남는 것</h3>' +
      '<p>이 명부는 당신이 만든 것입니다. 아래 칸을 복사해 두면, 이 여섯의 이름은 적어도 한 군데에는 남습니다.</p></div>' +
    '<div class="section-head"><h3>판단 기록 카드</h3><span class="hint">수행평가 자료</span></div>' +
    '<div class="card-out">'+esc(rec)+'</div>' +
    actbar('<button class="btn" type="button" id="copy">기록 복사</button><button class="btn ghost" type="button" id="again">다시 하기</button>')
  );
  $("copy").addEventListener("click", function(){
    if(navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(rec).then(function(){ toast("명부를 복사했습니다."); }, function(){ toast("복사 실패"); });
    else toast("카드 안의 글을 직접 선택해 복사해 주세요.");
  });
  $("again").addEventListener("click", scrTitle);
}

/* 모든 버튼에 조작음 */
document.addEventListener("click", function(e){
  var b = e.target && e.target.closest ? e.target.closest("button") : null;
  if(!b) return;
  if(b.disabled){ snd.deny(); return; }
  if(b.id === "sndbtn") return;
  if(b.classList.contains("btn")) snd.commit();
  else if(!b.classList.contains("tk") && !b.classList.contains("sq")) snd.tick();
}, true);

/* ============ 화면 모드 ============
   모바일 세로에서 진행 버튼이 화면 밖으로 밀려, 학생이 "터치가 안 된다"고
   느끼고 가로로 돌리던 문제를 없앤다. 모바일 모드는 진행 버튼을 화면
   아래에 고정하고 그림을 낮춰 한 화면에 담는다. */
var MODEKEY = "dgb-mode";
function modeGet(){
  try { return localStorage.getItem(MODEKEY) || "auto"; } catch(e){ return "auto"; }
}
function modeIsMobile(){
  var m = modeGet();
  if(m === "mobile") return true;
  if(m === "wide") return false;
  return Math.min(innerWidth, innerHeight) <= 820 &&
         (("ontouchstart" in window) || navigator.maxTouchPoints > 0);
}
function modeApply(){
  var mob = modeIsMobile();
  document.documentElement.classList.toggle("m-mobile", mob);
  document.documentElement.classList.toggle("m-wide", !mob);
}
function modeSet(v){
  try { localStorage.setItem(MODEKEY, v); } catch(e){}
  modeApply();
}
function modeLabel(){
  var m = modeGet();
  return m === "mobile" ? "모바일" : (m === "wide" ? "태블릿·PC" : "자동");
}
modeApply();

var rz; window.addEventListener("resize", function(){
  clearTimeout(rz);
  rz = setTimeout(function(){ modeApply(); paintSky(); fitStage(); }, 180);
});

scrTitle();

})();
