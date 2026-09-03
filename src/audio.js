/* ===================== 소리 =====================
   배경음 — 선생님이 만든 다섯 곡. 40초 이음매 없는 루프(Opus).
   효과음 — 브라우저에서 합성. 총성·종·물·종이.
*/

var BGM_SRC = {
  night:"__BGM_NIGHT__", day:"__BGM_DAY__", battle:"__BGM_BATTLE__",
  winter:"__BGM_WINTER__", ledger:"__BGM_LEDGER__",
  /* 시작 화면 — 인트로 영상에 깔린 그 사극 스코어를, 영상이 끝난 그 마디부터 이어 받는다 */
  title:"__BGM_TITLE__"
};

/* 하늘의 분위기 → 어느 곡을 틀 것인가 */
var BGM_MAP = {
  night:"night", dawn:"day", day:"day",
  dusk:"winter", winter:"winter", deep:"ledger", battle:"battle"
};

var snd = (function(){

  var AC = null, master = null, musicBus = null, sfxBus = null, verb = null;
  var on = true, started = false;
  var buffers = {}, playing = null, curKey = null;

  try { on = (localStorage.getItem("dgb-snd") !== "off"); } catch(e){}

  function ctx(){
    if(AC) return AC;
    var C = window.AudioContext || window.webkitAudioContext;
    if(!C) return null;
    AC = new C();

    master = AC.createGain();
    master.gain.value = on ? 1 : 0;

    var comp = AC.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3.5; comp.release.value = .3;

    verb = AC.createConvolver();
    var len = Math.floor(AC.sampleRate * 2.2);
    var ir = AC.createBuffer(2, len, AC.sampleRate);
    for(var ch=0; ch<2; ch++){
      var d = ir.getChannelData(ch);
      for(var i=0;i<len;i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, 2.8);
    }
    verb.buffer = ir;
    var wet = AC.createGain(); wet.gain.value = .22;
    verb.connect(wet); wet.connect(comp);

    musicBus = AC.createGain(); musicBus.gain.value = .62;
    sfxBus   = AC.createGain(); sfxBus.gain.value = 1;
    musicBus.connect(comp); sfxBus.connect(comp); sfxBus.connect(verb);
    comp.connect(master); master.connect(AC.destination);
    return AC;
  }

  /* --- 곡을 미리 풀어 둔다 --- */
  function b64ToBytes(uri){
    var s = uri.slice(uri.indexOf(",")+1);
    var bin = atob(s), n = bin.length, a = new Uint8Array(n);
    for(var i=0;i<n;i++) a[i] = bin.charCodeAt(i);
    return a.buffer;
  }

  function preload(){
    var A = ctx(); if(!A) return;
    Object.keys(BGM_SRC).forEach(function(k){
      if(buffers[k] || !BGM_SRC[k] || BGM_SRC[k].length < 100) return;
      try {
        A.decodeAudioData(b64ToBytes(BGM_SRC[k]), function(buf){
          buffers[k] = buf;
          if(curKey === k && !playing) spin(k, 0.8);
        }, function(){ buffers[k] = null; });
      } catch(e){ buffers[k] = null; }
    });
  }

  function spin(key, fade){
    var A = ctx(); if(!A || !buffers[key]) return;
    var src = A.createBufferSource();
    src.buffer = buffers[key];
    src.loop = true;
    var g = A.createGain();
    g.gain.value = 0.0001;
    src.connect(g); g.connect(musicBus);
    src.start();
    g.gain.setTargetAtTime(1, A.currentTime, (fade || 1.2) / 3);
    playing = { src:src, gain:g };
  }

  function mood(skyName){
    var key = BGM_MAP[skyName] || "night";
    music(key);
  }

  function music(key, fade){
    var A = ctx(); if(!A || !started) return;
    if(curKey === key) return;
    curKey = key;

    if(playing){
      var old = playing;
      old.gain.gain.setTargetAtTime(0.0001, A.currentTime, .45);
      setTimeout(function(){ try { old.src.stop(); } catch(e){} }, 2200);
      playing = null;
    }
    if(buffers[key]) spin(key, fade || 1.4);
  }

  /* --- 효과음(합성) --- */

  function noiseBuf(sec){
    var A = ctx();
    var n = Math.round(A.sampleRate*sec);
    var b = A.createBuffer(1, n, A.sampleRate);
    var d = b.getChannelData(0);
    for(var i=0;i<n;i++) d[i] = Math.random()*2-1;
    return b;
  }

  /* 총성이 울리는 동안 음악을 살짝 눌러 준다 */
  function duck(amount, hold){
    if(!musicBus || !AC) return;
    var t = AC.currentTime;
    musicBus.gain.cancelScheduledValues(t);
    musicBus.gain.setTargetAtTime(.62*amount, t, .05);
    musicBus.gain.setTargetAtTime(.62, t + (hold||1.2), .5);
  }

  function shot(far){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    var s = A.createBufferSource(); s.buffer = noiseBuf(.4);
    var f = A.createBiquadFilter();
    f.type = far ? "lowpass" : "highpass";
    f.frequency.value = far ? 780 : 380;
    var g = A.createGain();
    var peak = far ? .10 : .38;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + .004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (far ? .34 : .18));
    s.connect(f); f.connect(g); g.connect(sfxBus);
    s.start(t); s.stop(t + .45);

    var o = A.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(far ? 86 : 145, t);
    o.frequency.exponentialRampToValueAtTime(40, t + .13);
    var og = A.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(far ? .09 : .24, t + .006);
    og.gain.exponentialRampToValueAtTime(0.0001, t + .24);
    o.connect(og); og.connect(sfxBus);
    o.start(t); o.stop(t + .3);
  }

  function volley(count, spread){
    if(!on) return;
    count = count || 9; spread = spread || 2200;
    duck(.45, spread/1000 + .8);
    for(var i=0;i<count;i++){
      setTimeout(function(){ shot(Math.random() < .55); }, Math.random()*spread);
    }
  }

  function toll(){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    duck(.35, 4.5);
    [1, 2.02, 2.97, 4.13].forEach(function(m, k){
      var o = A.createOscillator();
      o.type = k ? "sine" : "triangle";
      o.frequency.value = 73.42 * m;
      var g = A.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(.28 / (k+1.4), t + .02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 5.5 - k*.7);
      o.connect(g); g.connect(sfxBus);
      o.start(t); o.stop(t + 6);
    });
  }

  function water(){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    var s = A.createBufferSource(); s.buffer = noiseBuf(3); s.loop = true;
    var f = A.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1300; f.Q.value = .8;
    var g = A.createGain(); g.gain.value = 0;
    s.connect(f); f.connect(g); g.connect(sfxBus);
    s.start(t);
    g.gain.setTargetAtTime(.09, t, .8);
    g.gain.setTargetAtTime(0, t + 5, 1.4);
    s.stop(t + 10);
  }

  function paper(){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    var s = A.createBufferSource(); s.buffer = noiseBuf(.25);
    var f = A.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 2600;
    var g = A.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(.12, t + .03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + .22);
    s.connect(f); f.connect(g); g.connect(sfxBus);
    s.start(t); s.stop(t + .3);
  }

  function chime(){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    [1, 2.01].forEach(function(m,k){
      var o = A.createOscillator(); o.type = "sine";
      o.frequency.value = 523.25 * m;
      var g = A.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(.16/(k+1), t + .01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g); g.connect(sfxBus);
      o.start(t); o.stop(t + 1.8);
    });
  }

  /* --- 조작음 --- */

  function blip(freq, dur, vol, type){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    var o = A.createOscillator(); o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    var g = A.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + .006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(sfxBus);
    o.start(t); o.stop(t + dur + .05);
  }

  /* 가벼운 딸깍 — 모든 버튼 */
  function tick(){
    var A = ctx(); if(!A || !on) return;
    var t = A.currentTime;
    var s = A.createBufferSource(); s.buffer = noiseBuf(.05);
    var f = A.createBiquadFilter(); f.type = "bandpass";
    f.frequency.value = 2400; f.Q.value = 2.2;
    var g = A.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(.10, t + .003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + .05);
    s.connect(f); f.connect(g); g.connect(sfxBus);
    s.start(t); s.stop(t + .08);
  }

  /* 결정 — 낮은 목탁 같은 두 음 */
  function commit(){
    blip(392, .13, .14, "triangle");
    setTimeout(function(){ blip(523.25, .22, .12, "triangle"); }, 70);
  }

  /* 배치 지정 */
  function assign(){ blip(659.25, .09, .10, "square"); }
  function unassign(){ blip(329.63, .09, .07, "square"); }

  /* 막힘 */
  function deny(){ blip(110, .16, .18, "sawtooth"); }

  /* 지표 변화 */
  function up(){ blip(587.33, .18, .11, "sine"); }
  function down(){ blip(196, .26, .13, "sine"); }

  function start(){
    var A = ctx(); if(!A) return;
    if(A.state === "suspended") A.resume();
    started = true;
    preload();
    if(curKey && buffers[curKey] && !playing) spin(curKey, 1.2);
  }

  function setOn(v){
    on = v;
    try { localStorage.setItem("dgb-snd", v ? "on" : "off"); } catch(e){}
    if(master && AC) master.gain.setTargetAtTime(v ? 1 : 0, AC.currentTime, .2);
    if(v && AC && AC.state === "suspended") AC.resume();
  }

  return {
    start:start, mood:mood, music:music,
    shot:shot, volley:volley, toll:toll, water:water, paper:paper, chime:chime,
    tick:tick, commit:commit, assign:assign, unassign:unassign, deny:deny, up:up, down:down,
    setOn:setOn, isOn:function(){ return on; }
  };
})();
