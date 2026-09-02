/* ===================== 하늘 — 장면마다 시각과 계절이 바뀐다 ===================== */

var MOODS = {
  night:  { sky:["#070910","#0D1119","#141A24","#0A0D13"], star:.85, ridge:["#11161F","#0B0F16","#06080C"], snow:0, glow:1 },
  dawn:   { sky:["#141726","#2A2436","#5A3A34","#2A1E1C"], star:.28, ridge:["#241C24","#17121A","#0B0910"], snow:0, glow:.35 },
  day:    { sky:["#2A3444","#3C4858","#55606C","#2E3540"], star:0,   ridge:["#333C48","#232A34","#161B22"], snow:0, glow:0 },
  dusk:   { sky:["#161B28","#2E2733","#4A2E2C","#1C1618"], star:.4,  ridge:["#241E26","#16121A","#0A0810"], snow:0, glow:.5 },
  winter: { sky:["#1A1E26","#262B34","#333A44","#1C2028"], star:.15, ridge:["#2C323C","#1E232B","#12161C"], snow:1, glow:0 },
  deep:   { sky:["#05070C","#090C13","#0E1219","#06080D"], star:.95, ridge:["#0D1118","#080B10","#04060A"], snow:0, glow:1.3 }
};

var curMood = "night";

function paintSky(mood){
  if(mood) curMood = mood;
  var M = MOODS[curMood] || MOODS.night;
  var c = document.getElementById("sky");
  var w = c.clientWidth, h = c.clientHeight;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = w*dpr; c.height = h*dpr;
  var g = c.getContext("2d");
  g.setTransform(dpr,0,0,dpr,0,0);

  var sky = g.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,   M.sky[0]);
  sky.addColorStop(.52, M.sky[1]);
  sky.addColorStop(.80, M.sky[2]);
  sky.addColorStop(1,   M.sky[3]);
  g.fillStyle = sky; g.fillRect(0,0,w,h);

  var seed = 7;
  function rnd(){ seed = (seed*1103515245 + 12345) & 0x7fffffff; return seed/0x7fffffff; }

  if(M.star > 0){
    for(var i=0;i<260;i++){
      var x = rnd()*w, y = rnd()*h*0.62, r = rnd()*1.15+.25, a = (rnd()*.7+.18) * M.star;
      g.globalAlpha = a; g.fillStyle = "#E9E3CF";
      g.beginPath(); g.arc(x,y,r,0,6.284); g.fill();
    }
  }

  if(M.glow > 0){
    var sx = w*0.74, sy = h*0.17;
    var glow = g.createRadialGradient(sx,sy,0,sx,sy,46*M.glow);
    glow.addColorStop(0,"rgba(240,226,187,"+(.85*M.glow)+")");
    glow.addColorStop(.25,"rgba(217,196,141,"+(.28*M.glow)+")");
    glow.addColorStop(1,"rgba(217,196,141,0)");
    g.globalAlpha = 1; g.fillStyle = glow;
    g.beginPath(); g.arc(sx,sy,46*M.glow,0,6.284); g.fill();
    g.fillStyle = "#F4EBD3";
    g.beginPath(); g.arc(sx,sy,2.1,0,6.284); g.fill();
  }

  var shapes = [
    {base:.70, amp:.085, f:1.0, ph:0.4},
    {base:.80, amp:.070, f:1.7, ph:2.1},
    {base:.90, amp:.055, f:2.6, ph:4.7}
  ];
  shapes.forEach(function(r, k){
    g.globalAlpha = 1; g.fillStyle = M.ridge[k];
    g.beginPath(); g.moveTo(0,h);
    for(var x=0;x<=w;x+=4){
      var t = x/w*Math.PI*2*r.f + r.ph;
      var y = h*r.base - Math.sin(t)*h*r.amp - Math.sin(t*2.3+1.1)*h*r.amp*.42 - Math.sin(t*4.7+.3)*h*r.amp*.16;
      g.lineTo(x,y);
    }
    g.lineTo(w,h); g.closePath(); g.fill();
  });

  if(M.snow){
    for(var s=0;s<220;s++){
      var sxp = rnd()*w, syp = rnd()*h, sr = rnd()*1.6+.4;
      g.globalAlpha = rnd()*.5+.15; g.fillStyle = "#E8E4D9";
      g.beginPath(); g.arc(sxp,syp,sr,0,6.284); g.fill();
    }
  }
  g.globalAlpha = 1;
}

/* ===================== 장면 그림 — Higgsfield 로 그린 재현 일러스트 ===================== */

var SC = {
  1:"__SC1__", 2:"__SC2__", 3:"__SC3__", 4:"__SC4__", 5:"__SC5__",
  6:"__SC6__", 7:"__SC7__", 8:"__SC8__", 9:"__SC9__",
  10:"__SC10__", 11:"__SC11__", 12:"__SC12__", 13:"__SC13__",
  14:"__SC14__", 15:"__SC15__", 16:"__SC16__", 17:"__SC17__",
  20:"__SC20__", 21:"__SC21__", 22:"__SC22__", 23:"__SC23__", 24:"__SC24__", 25:"__SC25__", 26:"__SC26__", 27:"__SC27__", 28:"__SC28__", 29:"__SC29__", 30:"__SC30__", 31:"__SC31__", 32:"__SC32__", 33:"__SC33__", 34:"__SC34__", 35:"__SC35__", 36:"__SC36__", 37:"__SC37__", 38:"__SC38__"
};

function fig(n, cap){
  return '<figure class="plate">' +
    '<img class="scene-img" src="' + SC[n] + '" alt="' + cap + '">' +
    '<figcaption><span class="repro">재현 그림</span>' + cap + '</figcaption>' +
  '</figure>';
}

function artPanorama(){ return fig(1, "두만강을 건넌다. 물이 허리까지 오고, 신발은 손에 들었다."); }
function artFire(){     return fig(2, "북간도의 한 마을. 모닥불 앞에 세 사람이 앉아 있다."); }
function artUnits(union){
  return fig(3, union
    ? "세 부대가 한자리에 모였다. 교과서 30쪽이 적은 연합이다."
    : "부대는 흩어진 채 벌판에 서 있다. 추격 부대는 하나씩 훑어 올라온다.");
}
function artValley(){   return fig(4, "봉오동. 사방이 산으로 둘러싸인 골짜기와 그 아래 마을."); }
function artBattle(){   return fig(4, "능선에서 내려다본 골짜기. 안개가 걷히고 있다."); }
function artChungsan(){ return fig(5, "청산리. 시월의 자작나무 숲에 연기가 낮게 깔린다."); }
function artGando(){    return fig(6, "불탄 한인 마을. 사람은 없고 기둥만 남았다."); }
function artDesk(){     return fig(7, "밀산의 겨울 숙영지. 등잔 하나와 종이 몇 장."); }
function artJayusi(){   return fig(8, "자유시. 눈 위에 총을 내려놓는 줄이 길다."); }
function artMilsan(){   return fig(10, "밀산의 국경 마을. 눈길 위로 부대들이 모여 대오를 이룬다."); }
function artJayusiTown(){ return fig(11, "자유시의 눈 덮인 광장. 여러 부대의 깃발이 따로 서 있다."); }
function artRaid(){    return fig(15, "얼어붙은 강을 건너 주재소로 들어간다. 불빛 하나가 문 앞에 걸려 있다."); }
function artVillage(){ return fig(16, "한인 농가의 문 앞. 곡식 항아리는 이미 비어 있다."); }
function artBanner(){  return fig(17, "부대의 깃발과 펼쳐 놓은 명부. 이름은 여기에만 적혀 있다."); }
function artPapers(){  return fig(12, "등잔 밑에 놓인 두 장의 기록. 같은 일을 두고 다른 말을 한다."); }
function artStar(){     return fig(9, "이름이 지워진 종이 한 장과, 그 위의 별."); }
