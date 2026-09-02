/* ===================== 하늘 — 키아트에서 뽑은 색으로 =====================
   시작 화면 그림이 기준이다. 같은 밤, 같은 안개, 같은 별빛 안에서 게임이 돈다.
   sky   하늘 4단 그러데이션 (위에서 아래로)
   ridge 능선 3겹 — 가까울수록 어둡고, 멀수록 안개에 녹는다
   mist  안개 띠의 짙기 / 색
   star  별의 밀도 · glow 큰 별의 세기
*/

var MOODS = {
  night:  { sky:["#050A13","#0A1322","#16243A","#0D1727"], star:.9,  glow:1.15,
            ridge:["#161E29","#0E1620","#080F18"], mist:.42, mistC:"143,166,190" },
  dawn:   { sky:["#0E1526","#242A42","#5A4048","#2A2230"], star:.3,  glow:.4,
            ridge:["#221F2B","#161520","#0C0D15"], mist:.34, mistC:"198,180,178" },
  day:    { sky:["#1B2942","#293C56","#40566F","#1E2B3C"], star:0,   glow:0,
            ridge:["#25313F","#19222E","#0F161F"], mist:.26, mistC:"170,190,210" },
  dusk:   { sky:["#101827","#2B2A3D","#4A3340","#1A1826"], star:.45, glow:.55,
            ridge:["#1F1D30","#131321","#090A13"], mist:.4,  mistC:"170,168,196" },
  winter: { sky:["#101A28","#1B2536","#2A3A4E","#131C28"], star:.2,  glow:0,
            ridge:["#26333F","#1A242F","#101821"], mist:.5,  mistC:"186,204,222" },
  deep:   { sky:["#03060C","#070D18","#0E1A2C","#050A12"], star:1,   glow:1.5,
            ridge:["#141C27","#0C131C","#050910"], mist:.62, mistC:"126,148,174" }
};

var curMood = "night";

function paintSky(mood){
  if(mood) curMood = mood;
  var M = MOODS[curMood] || MOODS.night;
  var c = document.getElementById("sky");
  if(!c) return;
  var w = c.clientWidth, h = c.clientHeight;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = w*dpr; c.height = h*dpr;
  var g = c.getContext("2d");
  g.setTransform(dpr,0,0,dpr,0,0);

  /* 하늘 */
  var sky = g.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,   M.sky[0]);
  sky.addColorStop(.48, M.sky[1]);
  sky.addColorStop(.78, M.sky[2]);
  sky.addColorStop(1,   M.sky[3]);
  g.fillStyle = sky; g.fillRect(0,0,w,h);

  var seed = 7;
  function rnd(){ seed = (seed*1103515245 + 12345) & 0x7fffffff; return seed/0x7fffffff; }

  /* 잔별 */
  if(M.star > 0){
    for(var i=0;i<300;i++){
      var x = rnd()*w, y = rnd()*h*0.66, r = rnd()*1.1+.22;
      g.globalAlpha = (rnd()*.65+.15) * M.star;
      g.fillStyle = "#DCE7F4";
      g.beginPath(); g.arc(x,y,r,0,6.284); g.fill();
    }
  }

  /* 큰 별 — 그림의 그 별. 팔각 광채 */
  if(M.glow > 0){
    var sx = w*0.755, sy = h*0.155, R = 54*M.glow;
    var halo = g.createRadialGradient(sx,sy,0,sx,sy,R*2.2);
    halo.addColorStop(0,  "rgba(255,246,222,"+(.55*M.glow)+")");
    halo.addColorStop(.18,"rgba(227,180,87,"+(.20*M.glow)+")");
    halo.addColorStop(1,  "rgba(227,180,87,0)");
    g.globalAlpha = 1; g.fillStyle = halo;
    g.beginPath(); g.arc(sx,sy,R*2.2,0,6.284); g.fill();
    drawStarburst(g, sx, sy, R*1.9, R*0.30, M.glow);
  }

  /* 능선 — 멀수록 안개에 녹는다 */
  var shapes = [
    {base:.92, amp:.055, f:2.6, ph:4.7, fade:.0},
    {base:.83, amp:.070, f:1.7, ph:2.1, fade:.22},
    {base:.73, amp:.088, f:1.0, ph:0.4, fade:.40}
  ];
  for(var k=shapes.length-1;k>=0;k--){
    var r = shapes[k];
    g.globalAlpha = 1;
    g.fillStyle = M.ridge[k];
    g.beginPath(); g.moveTo(0,h);
    for(var x=0;x<=w;x+=4){
      var t = x/w*Math.PI*2*r.f + r.ph;
      var y = h*r.base - Math.sin(t)*h*r.amp - Math.sin(t*2.3+1.1)*h*r.amp*.42
                       - Math.sin(t*4.7+.3)*h*r.amp*.16;
      g.lineTo(x,y);
    }
    g.lineTo(w,h); g.closePath(); g.fill();

    /* 능선 밑동에 안개가 걸린다 */
    if(r.fade > 0){
      var f = g.createLinearGradient(0, h*r.base - h*r.amp, 0, h*(r.base+.10));
      f.addColorStop(0, "rgba("+M.mistC+",0)");
      f.addColorStop(1, "rgba("+M.mistC+","+(r.fade*M.mist)+")");
      g.fillStyle = f; g.fill();
    }
  }

  if(curMood === "winter"){
    for(var s=0;s<240;s++){
      var sxp = rnd()*w, syp = rnd()*h, sr = rnd()*1.5+.4;
      g.globalAlpha = rnd()*.45+.12; g.fillStyle = "#DCE7F4";
      g.beginPath(); g.arc(sxp,syp,sr,0,6.284); g.fill();
    }
  }
  g.globalAlpha = 1;

  /* CSS 안개 띠에 이 장면의 색과 짙기를 넘긴다 */
  var root = document.documentElement.style;
  root.setProperty("--mist-c", M.mistC);
  root.setProperty("--mist-a", String(M.mist));
}

/* 그림 속 별 모양 — 긴 십자 광채에 짧은 대각 광채 */
function drawStarburst(g, x, y, long, short, k){
  g.save();
  g.translate(x,y);
  g.globalCompositeOperation = "lighter";
  for(var i=0;i<8;i++){
    var len = (i % 2 === 0) ? long : short;
    g.rotate(Math.PI/4);
    var grd = g.createLinearGradient(0,0,len,0);
    grd.addColorStop(0, "rgba(255,250,235,"+(.9*k)+")");
    grd.addColorStop(1, "rgba(255,250,235,0)");
    g.fillStyle = grd;
    g.beginPath();
    g.moveTo(0,0);
    g.lineTo(len, -Math.max(.7, len*0.018));
    g.lineTo(len,  Math.max(.7, len*0.018));
    g.closePath(); g.fill();
  }
  g.fillStyle = "rgba(255,252,242,"+Math.min(1,.95*k)+")";
  g.beginPath(); g.arc(0,0,2.4,0,6.284); g.fill();
  g.restore();
}

/* ===================== 장면 그림 ===================== */

var SC = {
  1:"__SC1__", 2:"__SC2__", 3:"__SC3__", 4:"__SC4__", 5:"__SC5__",
  6:"__SC6__", 7:"__SC7__", 8:"__SC8__", 9:"__SC9__",
  10:"__SC10__", 11:"__SC11__", 12:"__SC12__", 13:"__SC13__",
  14:"__SC14__", 15:"__SC15__", 16:"__SC16__", 17:"__SC17__",
  20:"__SC20__", 21:"__SC21__", 22:"__SC22__", 23:"__SC23__", 24:"__SC24__",
  25:"__SC25__", 26:"__SC26__", 27:"__SC27__", 28:"__SC28__", 29:"__SC29__",
  30:"__SC30__", 31:"__SC31__", 32:"__SC32__", 33:"__SC33__", 34:"__SC34__",
  35:"__SC35__", 36:"__SC36__", 37:"__SC37__", 38:"__SC38__"
};

function fig(n, cap){
  return '<figure class="plate">' +
    '<img class="scene-img" src="' + SC[n] + '" alt="' + cap + '">' +
    '<span class="plate-vig"></span>' +
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

/* 시그니처 — 그림 속 별. 구분선과 현재 단계에만 쓴다 */
function starMark(cls){
  return '<svg class="starmark '+(cls||"")+'" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z"/>' +
    '<path d="M12 4.5 L12.7 11.3 L19.5 12 L12.7 12.7 L12 19.5 L11.3 12.7 L4.5 12 L11.3 11.3 Z" opacity=".55"/>' +
  '</svg>';
}
