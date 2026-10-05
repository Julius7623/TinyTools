window.RMX=(()=>{const q=matchMedia('(prefers-reduced-motion:reduce)');return{get matches(){return q.matches||document.documentElement.dataset.motion==='off'}}})();
(()=>{
const D=document,R=D.documentElement,$=s=>D.querySelector(s);
const P={
home:'<path d=\"M4 11.2 12 4l8 7.2\"/><path d=\"M6.5 9.6V19a1 1 0 0 0 1 1h3v-5h3v5h3a1 1 0 0 0 1-1V9.6\"/>',
dl:'<path d=\"M12 4v10M8 10.5l4 4 4-4\"/><path d=\"M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3\"/>',
pdf:'<path d=\"M7 3h6.5L19 8.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M13.5 3v4a1.5 1.5 0 0 0 1.500 1.500H19\"/><path d=\"M9 13h6M9 16.5h4\"/>',
img:'<rect x=\"4\" y=\"5\" width=\"16\" height=\"14\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"1.5\"/><path d=\"M5 17l4.500-4.500 3 3 2-2L19 17\"/>',
vid:'<rect x=\"4\" y=\"6\" width=\"12\" height=\"12\" rx=\"3\"/><path d=\"M16 11l4-2.500v7L16 13\"/>',
qr:'<rect x=\"4\" y=\"4\" width=\"6.500\" height=\"6.500\" rx=\"1.500\"/><rect x=\"13.500\" y=\"4\" width=\"6.500\" height=\"6.500\" rx=\"1.500\"/><rect x=\"4\" y=\"13.500\" width=\"6.500\" height=\"6.500\" rx=\"1.500\"/><path d=\"M14 14h2.500v2.500H14zM19.500 14v.01M19.500 17.500V20H17\"/>',
txt:'<path d=\"M5 6h14M12 6v13M9 19h6\"/>',
word:'<path d=\"M7 3h6.5L19 8.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M13.5 3v4a1.5 1.5 0 0 0 1.500 1.500H19\"/><path d=\"M8.800 12.500l1.300 5 1.900-4 1.900 4 1.300-5\"/>',
gear:'<path d="M5 8h8M19 8h0M5 16h0M11 16h8"/><circle cx="16" cy="8" r="2.600"/><circle cx="8" cy="16" r="2.600"/>',
help:'<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.600 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.4-1.100.9-1.100 1.700M12 17h.01\"/>'};
const TOOLS=[
{n:'Video Downloader',p:'/grab',d:'Save a video from a link',i:'dl',live:1},
{n:'QR Maker',p:'/qr',d:'Make a QR code',i:'qr',live:1},
{n:'PDF to Word',p:'/pdf2word',d:'Turn a PDF into a Word file',i:'word',live:1}];
const ico=k=>`<span class="ico"><svg viewBox="0 0 24 24">${P[k]}</svg></span>`;
window.GlassKit={noVT:/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),TOOLS,ico,cards(el){el.innerHTML=TOOLS.map((t,i)=>{const tag=t.live?'a':'div',h=t.live?` href="${t.p}"`:'';
 return `<${tag} class="glass card ${t.live?'live':'soon'}"${h} style="--n:${i}">${ico(t.i)}<span class="ct"><b>${t.n}</b><p>${t.d}</p></span><i class="chev" aria-hidden="true"></i></${tag}>`}).join('')}};
// Warna bar Safari: dua strip tipis opak di tepi atas/bawah (Safari iOS 26 mengambil warna bar dari elemen fixed opak teratas di tepi).
// Warnanya mengikuti ALPHA scrim frame demi frame, jadi bar dan halaman meredup/terang barengan dengan kurva yang sama.
let es=[],tt=[],raf=0;
const edges=(c,fresh)=>{const sc=D.querySelector('.scrim'),z=sc&&sc.style.display!=='none'?60:-1;
 if(!fresh&&es.length&&es[0].isConnected){es.forEach(e=>{e.style.background=c;e.style.zIndex=z});return}
 es.forEach(e=>e.remove());es=['top','bottom'].map(s=>{const e=D.createElement('i');e.setAttribute('aria-hidden','true');e.style.cssText='position:fixed;left:0;right:0;'+s+':0;height:6px;pointer-events:none;background:'+c+';z-index:'+z;D.body.append(e);return e})};
const baseRGB=()=>{const p=D.createElement('i');p.style.cssText='position:fixed;width:0;height:0;background:var(--bg)';D.body.append(p);const m=(getComputedStyle(p).backgroundColor.match(/[\d.]+/g)||[242,242,247]).map(Number);p.remove();return m};
const paint=(m,al,fresh)=>{const k=1-al,c=`rgb(${Math.round(m[0]*k)},${Math.round(m[1]*k)},${Math.round(m[2]*k)})`;let t=D.querySelector('meta[name=theme-color]');if(!t){t=D.createElement('meta');t.name='theme-color';D.head.append(t)}t.content=c;edges(c,fresh)};
const ease=(()=>{const cx=3*.4,bx=3*(.2-.4)-cx,ax=1-cx-bx,cy=0,by=3*1-cy,ay=1-cy-by,X=t=>((ax*t+bx)*t+cx)*t,Y=t=>((ay*t+by)*t+cy)*t,dX=t=>(3*ax*t+2*bx)*t+cx;   // cubic-bezier(.4,0,.2,1), kurva yang sama dengan transisi scrim
 return x=>{if(x<=0)return 0;if(x>=1)return 1;let t=x;for(let i=0;i<6;i++){const e=X(t)-x;if(Math.abs(e)<1e-4)break;const d=dX(t);if(Math.abs(d)<1e-6)break;t-=e/d}return Y(t)}})();
const tcolor=()=>{const B=D.body,s=D.querySelector('.scrim'),dim=B.classList.contains('menu')||B.classList.contains('dim'),tg=dim?(parseFloat(getComputedStyle(D.documentElement).getPropertyValue('--scrim-a'))||.32):0;
 cancelAnimationFrame(raf);tt.forEach(clearTimeout);
 const R0=D.documentElement,th=R0.dataset.theme,BGc=x=>x==='dark'?[0,0,0]:[242,242,247];
 if(th!==tcolor.th){const from=BGc(tcolor.th||th),to=BGc(th),first=!tcolor.th;tcolor.th=th;
  if(!first&&!dim&&!RMX.matches){const t1=performance.now(),D2=GlassKit.noVT?550:500;
   const tk=()=>{const p=Math.min(1,(performance.now()-t1)/D2),e=ease(p);paint(from.map((v,i)=>v+(to[i]-v)*e),0,true);if(p<1)raf=requestAnimationFrame(tk);else{paint(to,0,true);tt=[450,900].map(ms=>setTimeout(()=>paint(baseRGB(),0,true),ms))}};tk();return}}
 const fin=()=>{paint(baseRGB(),tg,true);tt=[450,900].map(ms=>setTimeout(()=>paint(baseRGB(),tg,true),ms))};   // akhir: strip dibuat ulang agar Safari mengambil ulang warnanya
 if(!s||s.style.display==='none'||RMX.matches){fin();return}
 const m=baseRGB(),v0=getComputedStyle(s).backgroundColor.match(/[\d.]+/g)||[],a0=v0.length>3?+v0[3]:1,t0=performance.now(),DUR=400,LEAD=tg>0?90:-50;   // buka menu: bar mendahului halaman (+90 ms); tutup menu: bar menyusul halaman (-50 ms)
 const tick=()=>{const p=(performance.now()-t0+LEAD)/DUR;paint(m,a0+(tg-a0)*ease(p),true);if(p<1)raf=requestAnimationFrame(tick);else fin()};   // strip dibuat ulang tiap frame: Safari hanya membaca ulang warna bar saat ada elemen baru, bukan saat warna elemen lama diubah
 tick()};
new MutationObserver(()=>tcolor()).observe(D.documentElement,{attributes:true,attributeFilter:['data-theme']});
D.body?tcolor():D.addEventListener('DOMContentLoaded',tcolor);
D.addEventListener('visibilitychange',()=>{if(!D.hidden)tcolor()});addEventListener('pageshow',tcolor);
// scrim disembunyikan total (display:none) saat tidak dipakai: Safari bisa menyimpan warna scrim yang sedang memudar dan tidak memperbaruinya
const scr=()=>D.querySelector('.scrim'),showSc=()=>{const s=scr();if(s&&s.style.display==='none'){s.style.display='';void s.offsetWidth}},hideSc=()=>setTimeout(()=>{const s=scr(),B=D.body;if(s&&!B.classList.contains('menu')&&!B.classList.contains('dim'))s.style.display='none'},520);
GlassKit.dim=v=>{if(v)showSc();D.body.classList.toggle('dim',!!v);tcolor();if(!v)hideSc()};
const here=location.pathname.replace(/\/$/,'').replace(/\.html$/,'')||'/';
const item=(t,cur,pg)=>{const live=t.live||t.home,tag=live?'a':'div';
 return `<${tag} class="di${pg?' pg':''}${cur?' cur':''}${live?'':' soon'}"${live?` href="${t.p}"`:' aria-disabled="true"'}${cur?' aria-current="page"':''}>${ico(t.i)}<span class="tx"><b>${t.n}</b></span></${tag}>`};
function mount(){
 const mb=$('#mb');if(!mb)return;
 const sc=D.createElement('div'),dr=D.createElement('nav');
 sc.className='scrim';sc.style.display='none';dr.className='drawer';dr.id='dr';dr.setAttribute('aria-label','Tools');dr.setAttribute('role','dialog');dr.setAttribute('aria-modal','true');dr.inert=true;
 dr.innerHTML='<div class="dh"><b class="logo" role="img" aria-label="MyTinyTools"><span class="wm" aria-hidden="true">MyTinyT<span class="oo">oo<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M6 3 Q50 24 94 3"/></svg></span>ls</span></b><button class="x" aria-label="Close menu"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>'
  +item({n:'Home',p:'/',i:'home',home:1},'/'===here,1)+'<p class="dl">Tools</p>'+TOOLS.map(t=>item(t,t.p===here)).join('')+'<hr class="dsep">'+item({n:'How to use',p:'/how',i:'help',home:1},'/how'===here,1)+'<p class="dc">Made by <b translate="no">Joel G. Thompson</b> &middot; <a class="lk" href="/legal">Privacy &amp; Terms</a></p>';
 D.body.append(sc,dr);
 const mq=matchMedia('(min-width:1280px)'),side=()=>{if(mq.matches)D.body.classList.remove('menu');dr.inert=mq.matches?false:!D.body.classList.contains('menu')};mq.addEventListener('change',side);side();
 const set=v=>{if(v)showSc();D.body.classList.toggle('menu',v);tcolor();if(!v)hideSc();mb.setAttribute('aria-expanded',v);dr.inert=!v;(v?dr.querySelector('.x'):mb).focus({preventScroll:true})};
 mb.onclick=()=>{set(true)};sc.onclick=()=>{set(false)};dr.querySelector('.x').onclick=()=>{set(false)};
 dr.onclick=e=>{if(e.target.closest('a'))set(false)};
 D.addEventListener('keydown',e=>e.key==='Escape'&&D.body.classList.contains('menu')&&set(false));
}
function themeInit(){
 const tsw=$('#tsw');if(!tsw||D.body.hasAttribute('data-own-theme'))return;
 const dark=()=>R.dataset.theme==='dark',st=v=>{try{localStorage.setItem('theme',v)}catch(e){}};
 const sync=()=>{tsw.classList.toggle('on',dark());tsw.setAttribute('aria-checked',dark())};
 const apply=v=>{R.dataset.theme=v?'dark':'light';st(R.dataset.theme);sync()};
 const set=v=>{if(GlassKit.noVT||!D.startViewTransition||!R.classList.contains('ready')||RMX.matches){apply(v);return}
  R.classList.add('vt-theme');let vt;try{vt=D.startViewTransition(()=>apply(v))}catch(e){apply(v);R.classList.remove('vt-theme');return}
  const done=()=>R.classList.remove('vt-theme');vt.finished.then(done,done)};   // crossfade seluruh halaman: halus di Safari/Chrome terbaru
 let id=null,x0=0,p0=0,trv=0,mv=false;
 tsw.addEventListener('pointerdown',e=>{if(e.button)return;id=e.pointerId;tsw.setPointerCapture(id);tsw.querySelector('.kn').getAnimations().forEach(a=>a.cancel());x0=e.clientX;trv=tsw.offsetWidth-44;p0=dark()?trv:0;mv=false;clearTimeout(tsw._t);tsw.classList.add('press')});
 tsw.addEventListener('pointermove',e=>{if(e.pointerId!==id)return;const dx=e.clientX-x0;if(!mv&&Math.abs(dx)<4)return;mv=true;tsw.classList.add('drag');{const x=p0+dx,q=o=>5*(1-Math.exp(-o/30));tsw.style.setProperty('--x',(x<0?-q(-x):x>trv?trv+q(x-trv):x)+'px')}});
 const end=(e,ok)=>{if(e.pointerId!==id)return;id=null;let v=dark();if(ok)v=mv?parseFloat(tsw.style.getPropertyValue('--x'))>trv/2:!v;tsw.classList.remove('drag');tsw.style.removeProperty('--x');clearTimeout(tsw._t);if(v!==dark()){tsw._t=setTimeout(()=>tsw.classList.remove('press'),220);set(v)}else{tsw.classList.remove('press');if(mv)GlassKit.jelly(tsw.querySelector('.kn'),.7,dark()?'right':'left')}};
 tsw.addEventListener('pointerup',e=>end(e,true));tsw.addEventListener('pointercancel',e=>end(e,false));
 tsw.addEventListener('click',e=>{if(e.detail===0)set(!dark())});
 sync();requestAnimationFrame(()=>requestAnimationFrame(()=>R.classList.add('ready')));
}
const go=()=>{mount();themeInit();const c=$('#cards');if(c)GlassKit.cards(c)};
D.readyState==='loading'?D.addEventListener('DOMContentLoaded',go):go();
})();

(()=>{ // tahan / tap / scroll / keyboard. Pakai Web Animations supaya animasi masuk (CSS) tidak ikut terulang
const D=document,SEL='button,a.card,a.di,.rc',RM=RMX,E='cubic-bezier(.4,0,.2,1)',S='cubic-bezier(.34,1.56,.64,1)';
let el=null,x0=0,y0=0,t1,t2,quiet=0,ls=0,touch=0;const A=new WeakMap();
const go=(e,k,o)=>{if(RM.matches)return;const a=e.animate(k,o);A.set(e,[...(A.get(e)||[]),a])};
const swap=(e,k,o)=>{const old=A.get(e)||[];A.delete(e);if(k)go(e,k,o);old.forEach(a=>a.cancel())};
const hold=e=>{e.classList.add('holding');go(e,[{scale:1,opacity:1},{scale:.965,opacity:.88}],{duration:180,easing:E,fill:'forwards'})};
const arm=e=>{e.classList.add('armed');go(e,[{scale:.965,opacity:.88},{scale:.94,opacity:.76}],{duration:380,easing:S,fill:'forwards'})};
const TAP=[{scale:.94,opacity:.8},{scale:1.035,opacity:1,offset:.5},{scale:1,opacity:1}];
const end=c=>{if(!el)return;clearTimeout(t1);clearTimeout(t2);const e=el,seen=e.classList.contains('holding'),q=quiet;el=null;e.classList.remove('holding','armed');
 if(c==='cancel'&&!seen||q&&c==='tapped'||c==='tapped'&&e.hasAttribute('data-fast'))return swap(e); // tombol yang menghilang sendiri tidak diberi pantulan, supaya transisi keluarnya terlihat
 if(c==='tapped')swap(e,TAP,{duration:450,easing:S});
 else swap(e,[{scale:.95,opacity:.8},{scale:1,opacity:1}],{duration:400,easing:E})};
D.addEventListener('scroll',()=>{ls=Date.now();end('cancel')},true);
D.addEventListener('pointerdown',ev=>{end();if(ev.button>0)return;const b=ev.target.closest(SEL);
 if(!b||b.disabled||b.getAttribute('aria-disabled')==='true'||b.closest('.sw,.seg,.gs-seg,.gs-sw'))return;el=b;x0=ev.clientX;y0=ev.clientY;touch=ev.pointerType!=='mouse';
 quiet=Date.now()-ls<250?1:0; // layar masih bergulir: sentuhan ini hanya menghentikan scroll
 if(quiet)return;
 t1=setTimeout(()=>el&&hold(el),touch?130:40);t2=setTimeout(()=>el&&arm(el),touch?600:450)});
D.addEventListener('pointermove',ev=>{if(!el)return;
 if(Math.hypot(ev.clientX-x0,ev.clientY-y0)>(touch?6:10)||(!touch&&!el.contains(ev.target)))end('cancel')});
D.addEventListener('pointerup',ev=>{if(!el)return;const e=el,ok=el.contains(ev.target);end(ok?'tapped':'cancel');
 if(ok&&touch&&e.hasAttribute('data-fast')&&!e.disabled){e.click();e._ft=Date.now()}}); // aksi langsung saat jari diangkat, tanpa menunggu click
D.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-fast]');if(b&&b._ft&&ev.detail&&Date.now()-b._ft<700){ev.stopImmediatePropagation();ev.preventDefault()}},true);
['pointercancel','contextmenu','blur'].forEach(n=>addEventListener(n,()=>end('cancel')));
const pick=ev=>{const b=ev.target.closest&&ev.target.closest(SEL);return b&&!b.disabled&&b.getAttribute('aria-disabled')!=='true'&&!b.closest('.sw,.seg,.gs-seg,.gs-sw')?b:null};
D.addEventListener('keydown',ev=>{if(ev.repeat||ev.key!=='Enter'&&ev.key!==' ')return;const b=pick(ev);if(b)hold(b)});
D.addEventListener('keyup',ev=>{const b=pick(ev);if(b&&b.classList.contains('holding')&&!el){b.classList.remove('holding','armed');swap(b,TAP,{duration:450,easing:S})}});
})();

(()=>{ // morph: kotak tumbuh/menyusut mengikuti isi baru dan isi baru memudar masuk. Maknanya "isi berubah"; elemen di bawahnya ikut bergeser mulus
const RM=RMX,E='cubic-bezier(.32,.72,0,1)';
GlassKit.morph=(el,fn,o={})=>{
 if(!el||RM.matches||!el.animate)return fn();
 const h0=el.offsetHeight;if(el._m)el._m.cancel();
 fn();
 const h1=el.offsetHeight;
 if(o.fade!==false)[...el.children].forEach((c,i)=>c.animate([{opacity:0,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:380,delay:Math.min(i,6)*45,easing:E,fill:'backwards'}));
 if(Math.abs(h1-h0)<2)return;
 if(el._ov===undefined)el._ov=el.style.overflow;el.style.overflow='hidden';
 const a=el._m=el.animate([{height:h0+'px'},{height:h1+'px'}],{duration:Math.min(620,300+Math.abs(h1-h0)*1.2),easing:E});
 const end=()=>{if(el._m===a){el._m=null;el.style.overflow=el._ov;el._ov=undefined}};a.onfinish=end;a.oncancel=end;
}})();

(()=>{ // blend: teks lama memudar keluar sambil teks baru memudar masuk (dengan blur tipis), tinggi kotak ikut berubah mulus. Maknanya "pesan ini berganti", bukan kedip
const RM=RMX,E='cubic-bezier(.32,.72,0,1)';
GlassKit.blend=(el,txt,on=true)=>{
 if(!el)return;const cur=el._bt!==undefined?el._bt:el.textContent;
 if(cur===txt&&el.childElementCount<=1&&el.textContent.trim()===txt.trim())return;
 el.querySelectorAll('[data-g]').forEach(g=>g.remove());
 const now=performance.now(),fast=now-(el._ts||0)<260;el._ts=now;
 if(!on||fast||RM.matches||!el.animate||!cur){if(el._m)el._m.cancel();el._bt=txt;el.textContent=txt;return}
 const pos=getComputedStyle(el).position;el._bt=txt;
 GlassKit.morph(el,()=>{
  const g=document.createElement('span'),n=document.createElement('span');
  g.dataset.g='';g.setAttribute('aria-hidden','true');g.textContent=cur;g.style.cssText='position:absolute;inset:0;pointer-events:none';
  n.textContent=txt;if(pos==='static')el.style.position='relative';
  el.replaceChildren(n,g);
  n.style.display='block';n.animate([{opacity:0,filter:'blur(3px)',translate:'0 5px'},{opacity:1,filter:'blur(0)',translate:'0 0'}],{duration:320,delay:60,easing:E,fill:'backwards'});
  g.animate([{opacity:1,filter:'blur(0)',translate:'0 0'},{opacity:0,filter:'blur(3px)',translate:'0 -4px'}],{duration:170,easing:'ease-out',fill:'forwards'}).onfinish=()=>{g.remove();if(pos==='static')el.style.position=''};
 },{fade:false});
}})();

(()=>{ // jelly: kaca memanjang searah gerak lalu memantul dan mengendap, seperti benda cair yang berhenti. Maknanya "sudah mendarat di pilihan ini"
const RM=RMX;
GlassKit.jelly=(el,d,o='center')=>{if(!el||!el.animate||RM.matches)return;const A=Math.min(.16+.1*d,.4)*(o==='center'?1:.55),f=x=>x.toFixed(3),e='cubic-bezier(.4,0,.3,1)',S=(x,y,t)=>({transform:`scale(${f(x)},${f(y)})`,offset:t,easing:e});
 el.style.transformOrigin=o+' center';   // di ujung, kaca bertumpu pada dinding track: melar ke dalam, tidak keluar
 const a=el.animate([S(1,1,0),S(1+A,1-A*.55,.2),S(1-A*.5,1+A*.35,.42),S(1+A*.22,1-A*.12,.62),S(1-A*.08,1+A*.05,.8),S(1,1,1)],{duration:1140});a.onfinish=a.oncancel=()=>{el.style.transformOrigin=''}};
new MutationObserver(()=>{const k=document.querySelector('.sw .kn'),H=document.documentElement;if(k&&H.classList.contains('ready'))GlassKit.jelly(k,.5,H.dataset.theme==='dark'?'right':'left')}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
})();
(()=>{ // warna bilah browser mengikuti tema; kelas "theming" menandai saat pergantian berlangsung
const R=document.documentElement,D=document;let t;
const mk=n=>{let m=D.querySelector('meta[name='+n+']');if(!m){m=D.createElement('meta');m.name=n;D.head.append(m)}return m};
const sync=()=>{const d=R.dataset.theme==='dark';if(!D.querySelector('meta[name=theme-color]'))mk('theme-color').content=d?'#000':'#f2f2f7';mk('color-scheme').content=d?'dark':'light'};
new MutationObserver(()=>{R.classList.add('theming');clearTimeout(t);t=setTimeout(()=>R.classList.remove('theming'),650);sync()}).observe(R,{attributes:true,attributeFilter:['data-theme']});sync();
})();
(()=>{ // Tombol "Clear" otomatis di setiap kolom ketik (kolom link Video Downloader punya tombolnya sendiri)
const D=document,OK=/^(text|url|tel|search|password|email)$/i;
const enhance=i=>{
 if(i.dataset.cw||i.id==='u'||i.hasAttribute('data-noclear')||i.readOnly||!OK.test(i.type||'text'))return;
 i.dataset.cw=1;
 const w=D.createElement('span'),b=D.createElement('button'),lb=i.getAttribute('aria-label')||(i.closest('label')&&i.closest('label').textContent)||i.placeholder||'';
 w.className='cw';b.type='button';b.className='cl';b.textContent='Clear';b.setAttribute('aria-label','Clear '+lb.trim());
 i.replaceWith(w);w.append(i,b);
 const sync=()=>w.classList.toggle('has',!!i.value&&!i.disabled);
 i.addEventListener('input',sync);i.addEventListener('change',sync);
 b.addEventListener('mousedown',e=>e.preventDefault());b.setAttribute('data-fast',''); // keyboard tetap terbuka
 b.addEventListener('click',()=>{i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));i.focus({preventScroll:true})});
 sync()};
const scan=r=>(r.matches&&r.matches('input')?[r]:[...(r.querySelectorAll?r.querySelectorAll('input'):[])]).forEach(enhance);
const run=()=>{scan(D.body);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>n.nodeType===1&&scan(n)))).observe(D.body,{childList:true,subtree:true})};
D.readyState==='loading'?D.addEventListener('DOMContentLoaded',run):run();
})();

/* Simpan file: di PWA iOS pakai lembar Bagikan (hindari pratinjau Quick Look), selain itu unduhan biasa */
GlassKit.app=(/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))&&(navigator.standalone===true||matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches);
GlassKit.save=async(blob,name)=>{
 if(GlassKit.app&&navigator.canShare){try{const f=new File([blob],name,{type:blob.type||'application/octet-stream'});if(navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){if(e&&e.name==='AbortError')return}}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),60000)};

(()=>{ // Settings: tema, gaya kaca (Clear / Default / Tinted), Solid, kurangi animasi, hapus data. Disimpan di localStorage 'mtt'; diterapkan sebelum cat lewat skrip kecil di <head>
const D=document,R=D.documentElement,KEY='mtt',$=s=>D.querySelector(s);
const LENS='data:image/png;base64,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';
const DEF={g:50,s:0,m:0};let st=Object.assign({},DEF);
try{Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const STOPS={'--gk-mix':[34,62,90,'%'],'--gk-blur':[16,40,48,'px'],'--gk-sat':[150,200,200,'%'],'--gk-sp':[35,100,100,'%'],'--gk-bp':[45,100,100,'%'],'--gk-mb':[12,20,24,'px']};   // batas Clear dibuat tidak terlalu bening supaya teks tetap terbaca
const vars=v=>{const o={};for(const k in STOPS){const a=STOPS[k],x=v<=50?a[0]+(a[1]-a[0])*v/50:a[1]+(a[2]-a[1])*(v-50)/50;o[k]=x.toFixed(1)+a[3]}return o};
const apply=()=>{const o=vars(st.g);for(const k in o)R.style.setProperty(k,o[k]);
 st.s?R.dataset.glass='solid':delete R.dataset.glass;st.m?R.dataset.motion='off':delete R.dataset.motion};
const save=()=>{try{if(st.g===50&&!st.s&&!st.m)localStorage.removeItem(KEY);else localStorage.setItem(KEY,JSON.stringify(Object.assign({},st,{css:Object.entries(vars(st.g)).map(e=>e.join(':')).join(';')})))}catch(e){}};
const themeMode=()=>{try{return localStorage.getItem('theme')||'auto'}catch(e){return'auto'}};
const setTheme=m=>{try{m==='auto'?localStorage.removeItem('theme'):localStorage.setItem('theme',m)}catch(e){}
 const d=m==='auto'?matchMedia('(prefers-color-scheme:dark)').matches:m==='dark';R.dataset.theme=d?'dark':'light';
 const t=$('#tsw');if(t){t.classList.toggle('on',d);t.setAttribute('aria-checked',d)}};
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{if(themeMode()==='auto')setTheme('auto')});
const label=v=>v<=4?'Clear':Math.abs(v-50)<=4?'Default':v>=96?'Tinted':v<50?'Between Clear and Default':'Between Default and Tinted';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let sh,opener,open=false,armT,themeSeg,lq,setLq;
const X='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';

/* ---- Segmented berlensa (sama dengan di QR): ketuk atau geser kaca ---- */
function Seg(el,start,on){
 const bs=[...el.querySelectorAll('button')],th=el.querySelector('.thumb'),n=bs.length;
 let cur=start,id=null,x0=0,p0=0,sw=0,mv=false,grab=false;
 el.style.setProperty('--n',n);
 if(window.CSS&&CSS.supports('filter','url(#lens)')){th.innerHTML='<div class="lensclip"><div class="lens" aria-hidden="true">'+bs.map(b=>'<span>'+b.textContent+'</span>').join('')+'</div></div>';el.classList.add('has-lens');
  const NS='http://www.w3.org/2000/svg',fid='glens'+(Seg.k=(Seg.k||0)+1),sv=D.createElementNS(NS,'svg');
  sv.setAttribute('width','0');sv.setAttribute('height','0');sv.style.position='absolute';
  sv.innerHTML='<filter id="'+fid+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage href="'+LENS+'" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="12" xChannelSelector="R" yChannelSelector="G"/></filter>';
  el.append(sv);th.firstChild.style.filter='url(#'+fid+')';
  const fit=()=>{const im=sv.querySelector('feImage'),c=getComputedStyle(th);im.setAttribute('width',parseFloat(c.width)||1);im.setAttribute('height',parseFloat(c.height)||1)};fit();new ResizeObserver(fit).observe(th)}
 const paint=()=>{el.style.setProperty('--i',cur);cur===0||cur===n-1?el.setAttribute('data-edge',''):el.removeAttribute('data-edge');bs.forEach((b,i)=>{b.setAttribute('aria-checked',i===cur);b.tabIndex=i===cur?0:-1})};
 const set=(i,quiet)=>{i=clamp(i,0,n-1);const ch=i!==cur,d=Math.abs(i-cur);cur=i;paint();if(ch&&!quiet){GlassKit.jelly(th,d,i===0?'left':i===n-1?'right':'center');on(i)}};
 let lx=0,lt=0,sxT=0;const rb=v=>{const mx=(n-1)*sw,q=o=>6*(1-Math.exp(-o/30));return v<0?-q(-v):v>mx?mx+q(v-mx):v};
 const at=x=>{const r=el.getBoundingClientRect();return clamp(Math.floor((x-r.left-4)/((r.width-8)/n)),0,n-1)};
 const onGlass=e=>{const r=th.getBoundingClientRect(),m=4;return e.clientX>=r.left-m&&e.clientX<=r.right+m&&e.clientY>=r.top-m&&e.clientY<=r.bottom+m};
 el.addEventListener('pointerdown',e=>{if(e.button)return;id=e.pointerId;el.setPointerCapture(id);th.getAnimations().forEach(a=>a.cancel());x0=lx=e.clientX;lt=performance.now();mv=false;grab=onGlass(e);
  if(grab){sw=th.offsetWidth;p0=cur*sw;el.classList.add('press')}});
 el.addEventListener('pointermove',e=>{
  if(id===null){el.style.cursor=onGlass(e)?'grab':'pointer';return}
  if(e.pointerId!==id||!grab)return;
  const dx=e.clientX-x0;if(!mv&&Math.abs(dx)<4)return;mv=true;el.classList.add('drag');el.style.setProperty('--x',rb(p0+dx)+'px');const t=performance.now(),v=(e.clientX-lx)/Math.max(t-lt,1);lx=e.clientX;lt=t;el.style.setProperty('--sx',1+Math.min(Math.abs(v)*.08,.08));clearTimeout(sxT);sxT=setTimeout(()=>el.style.removeProperty('--sx'),70)});
 const end=(e,ok)=>{if(e.pointerId!==id)return;id=null;let i=cur;const pv=cur;
  if(ok){if(grab)i=mv?Math.round(parseFloat(el.style.getPropertyValue('--x'))/sw):at(e.clientX);
         else if(Math.abs(e.clientX-x0)<8)i=at(e.clientX)}
  grab=false;el.classList.remove('press','drag');el.style.removeProperty('--x');el.style.removeProperty('--sx');set(i);if(mv&&i===pv)GlassKit.jelly(th,.7,i===0?'left':i===n-1?'right':'center')};
 el.addEventListener('pointerup',e=>end(e,true));el.addEventListener('pointercancel',e=>end(e,false));
 el.addEventListener('click',e=>{if(e.detail===0){const b=e.target.closest('button');if(b)set(bs.indexOf(b))}});
 el.addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(d){e.preventDefault();set(cur+d);bs[cur].focus()}});
 paint();return{set}
}

/* ---- Slider kaca: kapsul putih, saat ditekan jadi lensa yang membesar dan meregang; menempel (snap) di Clear / Default / Tinted ---- */
function Slider(el,start,on){
 const kb=el.querySelector('.kb');let v=start,id=null,grab=false,mv=false,lx=0,lt=0,sxT=0,tw=0;
 const paint=()=>{el.style.setProperty('--p',v);el.setAttribute('aria-valuenow',Math.round(v));el.setAttribute('aria-valuetext',label(v))};
 const snap=x=>{for(const p of[0,50,100])if(Math.abs(x-p)<=4)return p;return x};
 const val=e=>{const r=el.getBoundingClientRect();return clamp((e.clientX-r.left)/r.width*100,0,100)};
 const set=(x,quiet)=>{x=clamp(x,0,100);const ch=Math.round(x)!==Math.round(v);v=x;paint();if(ch&&!quiet)on(v)};
 const onKnob=e=>{const r=kb.getBoundingClientRect(),m=6;return e.clientX>=r.left-m&&e.clientX<=r.right+m&&e.clientY>=r.top-m&&e.clientY<=r.bottom+m};
 el.addEventListener('pointerdown',e=>{if(e.button||el.getAttribute('aria-disabled')==='true')return;id=e.pointerId;el.setPointerCapture(id);kb.getAnimations().forEach(a=>a.cancel());
  grab=onKnob(e);mv=false;lx=e.clientX;lt=performance.now();tw=0;el.classList.add('press');if(grab)el.classList.add('drag');
  if(!grab){set(snap(val(e)))}});
 el.addEventListener('pointermove',e=>{if(e.pointerId!==id)return;
  el.classList.add('drag');mv=true;set(snap(val(e)));
  const t=performance.now(),s=(e.clientX-lx)/Math.max(t-lt,1);lx=e.clientX;lt=t;el.style.setProperty('--sx',1+Math.min(Math.abs(s)*.08,.1));clearTimeout(sxT);sxT=setTimeout(()=>el.style.removeProperty('--sx'),70)});
 const end=(e,ok)=>{if(e.pointerId!==id)return;id=null;el.classList.remove('press','drag');el.style.removeProperty('--sx');
  if(ok&&!mv&&!grab)set(snap(val(e)));
  GlassKit.jelly(kb,.6,v<=0?'left':v>=100?'right':'center');on(v,1)};
 el.addEventListener('pointerup',e=>end(e,true));el.addEventListener('pointercancel',e=>end(e,false));
 el.addEventListener('keydown',e=>{const k={ArrowRight:5,ArrowUp:5,ArrowLeft:-5,ArrowDown:-5,PageUp:25,PageDown:-25}[e.key];
  if(k){e.preventDefault();set(snap(Math.round(v/5)*5+k))}else if(e.key==='Home'){e.preventDefault();set(0)}else if(e.key==='End'){e.preventDefault();set(100)}});
 paint();return{set}
}

const sw=(k,t)=>`<button type="button" class="gs-sw" role="switch" data-k="${k}" aria-checked="false" aria-label="${t}"><i></i></button>`;
const sync=()=>{if(!sh)return;
 themeSeg.set(['auto','light','dark'].indexOf(themeMode()),1);
 setLq(st.g,1);lq.setAttribute('aria-disabled',!!st.s);
 sh.querySelector('[data-k=s]').setAttribute('aria-checked',!!st.s);sh.querySelector('[data-k=m]').setAttribute('aria-checked',!!st.m);
 ticks()};
const ticks=()=>sh.querySelectorAll('.gs-tk span').forEach(s=>s.classList.toggle('on',!st.s&&Math.abs(st.g-s.dataset.g)<=4));
const flip=(btn,key)=>{st[key]=st[key]?0:1;btn.setAttribute('aria-checked',!!st[key]);GlassKit.jelly(btn.querySelector('i'),.5,st[key]?'right':'left');apply();save();sync()};
const build=()=>{if(sh)return;
 sh=D.createElement('div');sh.className='gs';sh.id='gs';sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-labelledby','gs-t');sh.inert=true;
 sh.innerHTML='<div class="gs-ov"></div><div class="gs-pn"><div class="gs-hd"><h2 id="gs-t">Settings</h2><button type="button" class="x" aria-label="Close settings">'+X+'</button></div>'
 +'<h3>Appearance</h3><div class="gs-grp"><div class="gs-row col"><b>Theme</b><div class="seg sm" id="gs-th" role="radiogroup" aria-label="Theme"><span class="thumb"></span><button type="button" role="radio">Auto</button><button type="button" role="radio">Light</button><button type="button" role="radio">Dark</button></div></div></div>'
 +'<h3>Glass</h3><div class="gs-grp"><div class="gs-row col"><div class="gs-pv" aria-hidden="true"><i>Liquid glass</i></div>'
 +'<div class="gs-lq" id="gs-lq" role="slider" tabindex="0" aria-label="Glass style" aria-valuemin="0" aria-valuemax="100"><div class="trk"><span class="fill"></span><span class="tk" style="left:0"></span><span class="tk" style="left:50%"></span><span class="tk" style="left:100%"></span></div><span class="kb"></span></div>'
 +'<div class="gs-tk" aria-hidden="true"><span data-g="0">Clear</span><span data-g="50">Default</span><span data-g="100">Tinted</span></div></div>'
 +'<div class="gs-row"><div><b>Solid</b><small>Turn glass off. Easier to read and lighter on older phones.</small></div>'+sw('s','Solid, no glass')+'</div></div>'
 +'<h3>Motion</h3><div class="gs-grp"><div class="gs-row"><div><b>Reduce animations</b><small>Fewer movements and transitions.</small></div>'+sw('m','Reduce animations')+'</div></div>'
 +'<div class="gs-foot"><button type="button" class="gs-btn" id="gs-rs">Reset appearance</button><button type="button" class="gs-btn warn" id="gs-cl">Clear saved data on this device</button></div>'
 +'<p class="gs-note">Clearing removes everything this site saved in this browser, including these settings.</p></div>';
 D.body.append(sh);
 sh.querySelector('.gs-ov').onclick=()=>shut();sh.querySelector('.x').onclick=()=>shut();
 themeSeg=Seg(sh.querySelector('#gs-th'),Math.max(0,['auto','light','dark'].indexOf(themeMode())),i=>setTheme(['auto','light','dark'][i]));
 lq=sh.querySelector('#gs-lq');
 const lqc=Slider(lq,st.g,(v,done)=>{st.g=v;apply();ticks();if(done)save()});
 setLq=(x,q)=>lqc.set(x,q);
 sh.querySelectorAll('.gs-tk span').forEach(s=>s.onclick=()=>{if(st.s)return;st.g=+s.dataset.g;lqc.set(st.g,1);GlassKit.jelly(lq.querySelector('.kb'),.8,st.g===0?'left':st.g===100?'right':'center');apply();save();ticks()});
 sh.querySelector('[data-k=s]').onclick=e=>flip(e.currentTarget,'s');
 sh.querySelector('[data-k=m]').onclick=e=>flip(e.currentTarget,'m');
 sh.querySelector('#gs-rs').onclick=()=>{st=Object.assign({},DEF);apply();save();setTheme('auto');sync()};
 const cl=sh.querySelector('#gs-cl');
 cl.onclick=()=>{if(!cl.dataset.arm){cl.dataset.arm=1;cl.textContent='Tap again to confirm';armT=setTimeout(()=>{delete cl.dataset.arm;cl.textContent='Clear saved data on this device'},3500);return}
  clearTimeout(armT);try{localStorage.clear();sessionStorage.clear()}catch(e){}location.reload()}};
const shut=()=>{if(!open)return;open=false;sh.classList.remove('on');D.body.classList.remove('gs-open');GlassKit.dim(false);
 [$('main'),$('header')].forEach(e=>e&&(e.inert=false));
 setTimeout(()=>{if(!open)sh.inert=true},420);
 const t=opener&&opener.isConnected&&!opener.closest('[inert]')&&opener.offsetParent?opener:$('#mb');t&&t.focus({preventScroll:true})};
const show=()=>{build();if(open)return;open=true;opener=D.activeElement;
 const dr=$('#dr');if(D.body.classList.contains('menu')&&dr)dr.querySelector('.x').click();
 [$('main'),$('header')].forEach(e=>e&&(e.inert=true));
 sh.inert=false;D.body.classList.add('gs-open');GlassKit.dim(true);sync();
 requestAnimationFrame(()=>requestAnimationFrame(()=>{sh.classList.add('on');sh.querySelector('.x').focus({preventScroll:true})}))};
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&open)shut()});
const mount=()=>{const dr=$('#dr'),dc=dr&&dr.querySelector('.dc');if(!dc)return;
 const b=D.createElement('button');b.type='button';b.className='di pg';b.innerHTML=GlassKit.ico('gear')+'<span class="tx"><b>Settings</b></span>';
 b.setAttribute('aria-haspopup','dialog');b.onclick=show;dc.before(b)};
apply();D.readyState==='loading'?D.addEventListener('DOMContentLoaded',mount):mount();
})();
