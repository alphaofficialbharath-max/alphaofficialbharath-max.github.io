'use strict';
/* Typeflow - all local logic, no network calls. Pure helpers at top are reused by offline math checks. */

function countWords(t){var m=(t||'').match(/\S+/g);return m?m.length:0;}
function countSentences(t){t=(t||'');var m=t.match(/[^.!?]*[.!?]+/g);var n=m?m.length:0;var tail=t.replace(/[^.!?]*[.!?]+/g,'');if((tail.match(/\S+/g)||[]).length>0)n++;return n;}
function computeWpm(correctChars,minutes){if(!(minutes>0)){return 0;}return Math.round((correctChars/5)/minutes);}
function computeAccuracy(correct,total){if(!(total>0)){return 100;}return Math.round((correct/total)*100);}
function readingTime(words){var sec=Math.round((words||0)/200*60);if(!(sec>0)){return '0 sec';}if(sec<60){return sec+' sec';}var m=Math.floor(sec/60),s=sec%60;return s?(m+' min '+s+' sec'):(m+' min');}

var TYPE_WORDS=['the','of','and','to','in','is','it','you','that','he','was','for','on','are','with','as','his','they','be','at','one','have','this','from','or','had','by','but','not','what','all','were','we','when','your','can','said','there','use','an','each','which','she','do','how','their','if','will','up','other','about','out','many','then','them','these','so','some','her','would','make','like','him','into','time','has','look','two','more','write','go','see','number','no','way','could','people','my','than','first','water','been','call','who','oil','its','now','find','long','down','day','did','get','come','made','may','part','over','new','sound','take','only','little','work','know','place','year','live','me','back','give','most','very','after','thing','our','just','name','good','sentence','man','think','say','great','where','help','through','much','before','line','right','too','mean','old','any','same','tell','boy','follow','came','want','show','also','around','form','three','small','set','put','end','does','another','well','large','must','big','even','such','because','turn','here','why','ask','went','light','kind','off','need','house','picture','try','us','again','animal','point','mother','world','near','build','self','earth','father','word','own','sun','hand','tree','city','story','game','rank','exam','speed','clear','focus','train','habit','daily','learn','simple','steady','smooth','rhythm','walk','open','close','paper','music','river','stone','green','white','black','orange','fruit','milk','school','study','read','pass','mark','best','next','last','few','still','night','morning','evening','future','strong','brave','quiet','clean','fresh','early','young','patient','curious','careful','honest'];
var TYPE_QUOTES=['Simplicity is the ultimate sophistication.','Practice does not make perfect. Only perfect practice makes perfect.','The quick brown fox jumps over the lazy dog.','Discipline is the bridge between goals and accomplishment.','It always seems impossible until it is done.','Hard work beats talent when talent does not work hard.','Typing is thinking made visible on the screen.'];

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function makeWordLine(n){var out=[],last='';for(var i=0;i<n;i++){var w=pick(TYPE_WORDS);var guard=0;while(w===last&&guard<10){w=pick(TYPE_WORDS);guard++;}last=w;out.push(w);}return out.join(' ');}

if (typeof document==='undefined'){
  module.exports={countWords:countWords,countSentences:countSentences,computeWpm:computeWpm,computeAccuracy:computeAccuracy,readingTime:readingTime,makeWordLine:makeWordLine};
}else{
  document.addEventListener('DOMContentLoaded',function(){initTyping();initCounter();initSW();});
}

function initSW(){
  if('serviceWorker' in navigator && location.protocol!=='file:'){
    navigator.serviceWorker.register('/sw.js').catch(function(){/* offline shell unavailable (e.g. sub-folder host) - ignore */});
  }
}

/* ---------- typing speed test ---------- */
function initTyping(){
  var d=document;
  var box=d.getElementById('text-display');
  if(!box){return;}
  var input=d.getElementById('type-input');
  var elTime=d.getElementById('stat-time');
  var elWpm=d.getElementById('stat-wpm');
  var elAcc=d.getElementById('stat-acc');
  var elResults=d.getElementById('results');
  var elEndWpm=d.getElementById('end-wpm');
  var elEndAcc=d.getElementById('end-acc');
  var elEndChars=d.getElementById('end-chars');
  var elShare=d.getElementById('share-text');
  var modeBtns=[],i;
  for(i=0;i<d.querySelectorAll('.mode').length;i++){modeBtns.push(d.querySelectorAll('.mode')[i]);}

  var st={seconds:30,target:'',start:0,running:false,finished:false,tick:null,correct:0,total:0};

  function setMode(btn){
    for(i=0;i<modeBtns.length;i++){modeBtns[i].setAttribute('aria-pressed',modeBtns[i]===btn?'true':'false');}
    st.seconds=parseInt(btn.getAttribute('data-seconds'),10);
    restart();
  }
  for(i=0;i<modeBtns.length;i++){(function(b){b.addEventListener('click',function(){setMode(b);});})(modeBtns[i]);}

  function newTarget(){
    st.target=st.seconds===0?pick(TYPE_QUOTES):makeWordLine(st.seconds===30?45:80);
  }
  function render(){
    box.textContent='';
    for(var j=0;j<st.target.length;j++){
      var s=d.createElement('span');
      s.textContent=st.target.charAt(j);
      if(j===0){s.className='cur';}
      box.appendChild(s);
    }
  }
  function paint(v){
    var spans=box.children,lim=Math.min(v.length,st.target.length);
    st.correct=0;
    for(var j=0;j<spans.length;j++){
      var cls='';
      if(j<lim){ if(v.charAt(j)===st.target.charAt(j)){cls='done';st.correct++;}else{cls='bad';} }
      else if(j===lim){cls='cur';}
      spans[j].className=cls;
    }
  }
  function elapsed(){return st.running?((Date.now()-st.start)/1000):0;}
  function showStats(){
    var mins=elapsed()/60;
    var wpm=st.running?computeWpm(st.correct,mins):0;
    var acc=computeAccuracy(st.correct,st.total);
    elWpm.textContent=String(wpm);
    elAcc.textContent=String(acc);
    if(st.seconds===0){elTime.textContent=String(Math.floor(elapsed()));}
    else{elTime.textContent=String(Math.max(0,Math.ceil(st.seconds-elapsed())));}
  }
  function finish(){
    if(st.finished){return;}
    st.finished=true;
    clearInterval(st.tick);
    var timed=st.seconds>0;
    var mins=timed?(st.seconds/60):(elapsed()/60);
    var wpm=computeWpm(st.correct,mins);
    var acc=computeAccuracy(st.correct,st.total);
    var label=timed?(st.seconds+' sec test'):'quote test';
    elEndWpm.textContent=String(wpm);
    elEndAcc.textContent=String(acc);
    elEndChars.textContent=String(st.total);
    elShare.value='My Typeflow score: '+wpm+' WPM with '+acc+'% accuracy ('+label+'). Can you beat me?';
    elResults.hidden=false;
    if(input){input.readOnly=true;}
  }
  function validate(){
    var v=input.value;
    if(v.length>st.target.length+80){v=v.slice(0,st.target.length+80);input.value=v;}
    st.total=v.length;
    paint(v);
    showStats();
    if(st.seconds===0&&v.length>=st.target.length){finish();return;}
  }
  function start(){
    st.running=true;
    st.start=Date.now();
    st.tick=setInterval(function(){showStats();if(st.seconds>0&&elapsed()>=st.seconds){finish();}},250);
    showStats();
  }
  function restart(){
    clearInterval(st.tick);
    st.running=false;st.finished=false;st.correct=0;st.total=0;st.tick=null;
    elResults.hidden=true;
    if(input){input.readOnly=false;input.value='';}
    newTarget();render();
    elWpm.textContent='0';elAcc.textContent='100';elTime.textContent=String(st.seconds>0?st.seconds:0);
  }
  d.getElementById('btn-restart').addEventListener('click',function(){restart();if(input&&input.focus){input.focus();}});
  d.getElementById('btn-again').addEventListener('click',function(){restart();if(input&&input.focus){input.focus();}});
  d.getElementById('btn-copy').addEventListener('click',function(){
    var btn=d.getElementById('btn-copy');
    var text=elShare.value||'';
    function done(msg){btn.textContent=msg;window.setTimeout(function(){btn.textContent='Copy score';},1600);}
    if(navigator.clipboard&&navigator.clipboard.writeText&&location.protocol!=='file:'){
      navigator.clipboard.writeText(text).then(function(){done('Copied');}).catch(function(){fallback();});
    }else{fallback();}
    function fallback(){
      elShare.select();
      try{d.execCommand('copy');done('Copied');}catch(err){done('Select and copy manually');}
    }
  });
  input.addEventListener('input',function(){if(st.finished){return;}if(!st.running){start();}validate();});
  input.addEventListener('keydown',function(e){if(e.key==='Escape'){restart();}});
  setMode(modeBtns[0]);
}

/* ---------- word counter ---------- */
function initCounter(){
  var d=document;
  var t=d.getElementById('wc-input');
  if(!t){return;}
  var eW=d.getElementById('wc-words'),eC=d.getElementById('wc-chars'),eS=d.getElementById('wc-sentences'),eR=d.getElementById('wc-read');
  function run(){
    var v=t.value;
    var w=countWords(v);
    eW.textContent=String(w);
    eC.textContent=String(v.length);
    eS.textContent=String(countSentences(v));
    eR.textContent=readingTime(w);
  }
  t.addEventListener('input',run);
  run();
}
