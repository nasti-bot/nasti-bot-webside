// ---- GLOBAL BG ----
var bgC=document.getElementById('bgCanvas'),bgX=bgC.getContext('2d'),bgW,bgH;
function rBg(){var d=Math.min(window.devicePixelRatio||1,2);bgW=window.innerWidth;bgH=document.documentElement.scrollHeight;bgC.width=bgW*d;bgC.height=bgH*d;bgC.style.width=bgW+'px';bgC.style.height=bgH+'px';bgX.setTransform(d,0,0,d,0,0)}
function dBg(){bgX.clearRect(0,0,bgW,bgH);var s=64;bgX.strokeStyle='rgba(200,192,216,.15)';bgX.lineWidth=.4;for(var y=s;y<bgH;y+=s){bgX.beginPath();bgX.moveTo(0,y);bgX.lineTo(bgW,y);bgX.stroke()}for(var x=s;x<bgW;x+=s){bgX.beginPath();bgX.moveTo(x,0);bgX.lineTo(x,bgH);bgX.stroke()}}
rBg();dBg();

// ---- HERO BG ----
var hC=document.getElementById('heroCanvas'),hX=hC.getContext('2d'),hW,hH;
function rHero(){var d=Math.min(window.devicePixelRatio||1,2);hW=window.innerWidth;hH=window.innerHeight;hC.width=hW*d;hC.height=hH*d;hC.style.width=hW+'px';hC.style.height=hH+'px';hX.setTransform(d,0,0,d,0,0)}
function dHero(tm){hX.clearRect(0,0,hW,hH);var t=tm*.001,cx=hW*.5,cy=hH*.45,mr=Math.min(hW*.38,hH*.38);
  hX.strokeStyle='rgba(180,172,200,.12)';hX.lineWidth=.3;
  for(var x=cx-mr*1.6;x<cx+mr*1.6;x+=48){hX.beginPath();hX.moveTo(x,cy-mr*1.6);hX.lineTo(x,cy+mr*1.6);hX.stroke()}
  for(var y=cy-mr*1.6;y<cy+mr*1.6;y+=48){hX.beginPath();hX.moveTo(cx-mr*1.6,y);hX.lineTo(cx+mr*1.6,y);hX.stroke()}
  hX.strokeStyle='rgba(46,170,220,.12)';hX.lineWidth=.5;
  hX.beginPath();hX.moveTo(cx-mr*1.5,cy);hX.lineTo(cx+mr*1.5,cy);hX.moveTo(cx,cy-mr*1.5);hX.lineTo(cx,cy+mr*1.5);hX.stroke();
  for(var i=0;i<18;i++){hX.beginPath();hX.arc(cx,cy,mr*(.06+i*.055),0,Math.PI*2);hX.strokeStyle='rgba(46,170,220,'+(.01+(1-i/18)*.06)+')';hX.lineWidth=i%3===0?.5:.25;hX.stroke()}
  for(var i=0;i<32;i++){var a=Math.PI*2/32*i;hX.beginPath();hX.moveTo(cx+Math.cos(a)*mr*.08,cy+Math.sin(a)*mr*.08);hX.lineTo(cx+Math.cos(a)*mr*1.2,cy+Math.sin(a)*mr*1.2);hX.strokeStyle='rgba(46,170,220,'+(i%8===0?.08:.03)+')';hX.lineWidth=i%8===0?.5:.2;hX.stroke()}
  hX.save();hX.translate(cx,cy);hX.rotate(t*.025);var fx=0,fy=0,fp=0,fc=1,fs=mr*.011;var ds=[[1,0],[0,1],[-1,0],[0,-1]];
  for(var i=0;i<40;i++){var nx=fp+fc;fp=fc;fc=nx;var l=fc*fs,ddx=ds[i%4][0],ddy=ds[i%4][1],ndx=fx+ddx*l,ndy=fy+ddy*l,aR=l,cax,cay,sa,ea;
    if(i%4===0){cax=fx;cay=fy-aR;sa=-Math.PI/2;ea=0}else if(i%4===1){cax=fx+aR;cay=fy;sa=Math.PI;ea=Math.PI*1.5}else if(i%4===2){cax=fx;cay=fy+aR;sa=Math.PI/2;ea=Math.PI}else{cax=fx-aR;cay=fy;sa=0;ea=Math.PI/2}
    hX.beginPath();hX.arc(cax,cay,aR,sa,ea);hX.strokeStyle='rgba(46,170,220,.2)';hX.lineWidth=.7;hX.stroke();fx=ndx;fy=ndy;if(Math.abs(fx)>mr*.75||Math.abs(fy)>mr*.75)break}
  hX.restore();
  for(var k=0;k<3;k++){hX.beginPath();for(var i=0;i<3;i++){var a=Math.PI*2/3*i+t*(.5+k*.25),px=cx+Math.cos(a)*mr*(.2+k*.12),py=cy+Math.sin(a)*mr*(.2+k*.12);if(i===0)hX.moveTo(px,py);else hX.lineTo(px,py)}hX.closePath();hX.fillStyle='rgba(46,170,220,'+(.02+k*.015)+')';hX.fill();hX.strokeStyle='rgba(46,170,220,'+(.15+k*.12)+')';hX.lineWidth=.5+k*.15;hX.stroke()}
  for(var i=0;i<6;i++){var oR=mr*(.45+i*.08),ang=t*(.35-i*.04)+i*1,dx=cx+Math.cos(ang)*oR,dy=cy+Math.sin(ang)*oR*.45;hX.beginPath();hX.arc(dx,dy,1.2,0,Math.PI*2);hX.fillStyle='rgba(46,170,220,.5)';hX.fill()}
  hX.beginPath();hX.arc(cx,cy,2,0,Math.PI*2);hX.fillStyle='rgba(46,170,220,.7)';hX.fill();
  requestAnimationFrame(dHero)}
rHero();requestAnimationFrame(dHero);

// ---- HERO GRAPHIC ----
var hgC=document.getElementById('heroGraphic');if(hgC){var hgX=hgC.getContext('2d'),hgW,hgH;
  function rHg(){var d=Math.min(window.devicePixelRatio||1,2),re=hgC.parentElement.getBoundingClientRect();hgW=re.width;hgH=re.height;hgC.width=hgW*d;hgC.height=hgH*d;hgC.style.width=hgW+'px';hgC.style.height=hgH+'px';hgX.setTransform(d,0,0,d,0,0)}
  function dHg(tm){rHg();hgX.clearRect(0,0,hgW,hgH);var t=tm*.001,cx=hgW*.5,cy=hgH*.5,r=Math.min(hgW,hgH)*.42;
    hgX.save();hgX.translate(cx,cy);hgX.rotate(t*.45);var dR=r*.55;hgX.beginPath();hgX.moveTo(0,-dR);hgX.lineTo(dR*.65,0);hgX.lineTo(0,dR);hgX.lineTo(-dR*.65,0);hgX.closePath();hgX.fillStyle='rgba(46,170,220,.06)';hgX.fill();hgX.strokeStyle='rgba(46,170,220,.35)';hgX.lineWidth=1.5;hgX.stroke();
    hgX.save();hgX.rotate(t*-.65);var idR=r*.25;hgX.beginPath();hgX.moveTo(0,-idR);hgX.lineTo(idR,0);hgX.lineTo(0,idR);hgX.lineTo(-idR,0);hgX.closePath();hgX.fillStyle='rgba(160,232,255,.12)';hgX.fill();hgX.strokeStyle='rgba(46,170,220,.5)';hgX.lineWidth=1.2;hgX.stroke();hgX.restore();hgX.restore();
    hgX.beginPath();for(var i=0;i<6;i++){var a=Math.PI/3*i-Math.PI/6,px=cx+Math.cos(a)*r*.85,py=cy+Math.sin(a)*r*.85;if(i===0)hgX.moveTo(px,py);else hgX.lineTo(px,py)}hgX.closePath();hgX.strokeStyle='rgba(160,152,184,.3)';hgX.lineWidth=1;hgX.stroke();
    hgX.beginPath();hgX.arc(cx,cy,r*.88,0,Math.PI*2);hgX.strokeStyle='rgba(160,152,184,.2)';hgX.lineWidth=.8;hgX.stroke();
    for(var i=0;i<40;i++){var sa=Math.PI*2/40*i+t*.08;hgX.beginPath();hgX.arc(cx,cy,r*.88,sa,sa+Math.PI*2/40*.35);hgX.strokeStyle='rgba(46,170,220,.18)';hgX.lineWidth=.5;hgX.stroke()}
    for(var i=0;i<2;i++){var ang=t*(.5+i*.3)+i*Math.PI,dx=cx+Math.cos(ang)*r*.88,dy=cy+Math.sin(ang)*r*.88;hgX.beginPath();hgX.arc(dx,dy,2.5,0,Math.PI*2);hgX.fillStyle='rgba(46,170,220,.6)';hgX.fill()}
    hgX.beginPath();hgX.arc(cx,cy,2.5,0,Math.PI*2);hgX.fillStyle='rgba(46,170,220,.8)';hgX.fill();
    requestAnimationFrame(dHg)}
  requestAnimationFrame(dHg)}

// ---- ENTRY CARD CANVASES ----
function sC(id,fn){var c=document.getElementById(id);if(!c)return;var x=c.getContext('2d'),w,h;
  function rs(){var d=Math.min(window.devicePixelRatio||1,2),re=c.parentElement.getBoundingClientRect();w=re.width;h=re.height;c.width=w*d;c.height=h*d;c.style.width=w+'px';c.style.height=h+'px';x.setTransform(d,0,0,d,0,0)}
  function dr(tm){rs();fn(x,w,h,tm);requestAnimationFrame(dr)}requestAnimationFrame(dr)}

// Card 1 - 项目 (data viz)
sC('entryCanvas1',function(X,w,h,tm){X.clearRect(0,0,w,h);var t=tm*.001,cx=w*.5,cy=h*.5,mr=Math.min(w,h)*.45;
  var g=X.createLinearGradient(0,0,w,h);g.addColorStop(0,'#0d1428');g.addColorStop(.5,'#0f1a30');g.addColorStop(1,'#0c1428');X.fillStyle=g;X.fillRect(0,0,w,h);
  X.strokeStyle='rgba(46,170,220,.06)';X.lineWidth=.3;for(var x=0;x<w;x+=40){X.beginPath();X.moveTo(x,0);X.lineTo(x,h);X.stroke()}for(var y=0;y<h;y+=40){X.beginPath();X.moveTo(0,y);X.lineTo(w,y);X.stroke()}
  for(var i=0;i<8;i++){X.beginPath();X.arc(cx,cy,mr*(.25+i*.1),0,Math.PI*2);X.strokeStyle='rgba(46,170,220,'+(.04+i*.012)+')';X.lineWidth=.4;X.stroke()}
  for(var k=0;k<2;k++){X.beginPath();for(var i=0;i<3;i++){var a=Math.PI*2/3*i+t*(.4+k*.35),px=cx+Math.cos(a)*mr*(.25+k*.18),py=cy+Math.sin(a)*mr*(.25+k*.18);if(i===0)X.moveTo(px,py);else X.lineTo(px,py)}X.closePath();X.fillStyle='rgba(46,170,220,'+(.025+k*.02)+')';X.fill();X.strokeStyle='rgba(92,200,240,'+(.18+k*.15)+')';X.lineWidth=.5+k*.2;X.stroke()}
  for(var i=0;i<10;i++){var oR=mr*(.42+(i%3)*.12),ang=t*(.35-i*.025)+i,dx=cx+Math.cos(ang)*oR,dy=cy+Math.sin(ang)*oR*.5;X.beginPath();X.arc(dx,dy,1.2,0,Math.PI*2);X.fillStyle='rgba(136,220,248,.45)';X.fill()}
  X.beginPath();X.arc(cx,cy,2,0,Math.PI*2);X.fillStyle='rgba(160,232,255,.7)';X.fill()});

// Card 2 - AI动画 (dreamy particles)
sC('entryCanvas2',function(X,w,h,tm){X.clearRect(0,0,w,h);var t=tm*.001,cx=w*.5,cy=h*.5,mr=Math.min(w,h)*.45;
  var g=X.createLinearGradient(0,0,w,h);g.addColorStop(0,'#100830');g.addColorStop(.5,'#0a1230');g.addColorStop(1,'#120828');X.fillStyle=g;X.fillRect(0,0,w,h);
  for(var i=0;i<50;i++){var sd=i*36.8,px=(Math.sin(t*.2+sd)*.5+.5)*w,py=(Math.cos(t*.16+sd*1.3)*.5+.5)*h,sz=1+(i%3)*.7;X.beginPath();X.arc(px,py,sz,0,Math.PI*2);X.fillStyle='hsla(225,55%,'+(60+i*1.5)+'%,'+(.3+(i%4)*.1)+')';X.fill();var gl=X.createRadialGradient(px,py,0,px,py,sz*2.5);gl.addColorStop(0,'rgba(136,220,248,.12)');gl.addColorStop(1,'rgba(136,220,248,0)');X.beginPath();X.arc(px,py,sz*2.5,0,Math.PI*2);X.fillStyle=gl;X.fill()}
  X.strokeStyle='rgba(136,220,248,.08)';X.lineWidth=.5;for(var k=0;k<3;k++){X.beginPath();for(var x=0;x<=w;x+=3){var yy=h*(.25+k*.22)+Math.sin(x*.006+t*.3+k)*h*.08;if(x===0)X.moveTo(x,yy);else X.lineTo(x,yy)}X.stroke()}});

// ---- SCROLL SPY ----
var secs=['hero','works','contact'],dots=document.querySelectorAll('.scroll-dot'),navs=document.querySelectorAll('.nav-links a');
function upd(){var cur='hero';for(var i=0;i<secs.length;i++){var el=document.getElementById(secs[i]);if(el&&el.getBoundingClientRect().top<=window.innerHeight*.4)cur=secs[i]}for(var i=0;i<dots.length;i++)dots[i].classList.toggle('active',dots[i].dataset.section===cur);for(var i=0;i<navs.length;i++)navs[i].classList.toggle('active',navs[i].getAttribute('href')==='#'+cur)}
window.addEventListener('scroll',upd,{passive:true});
for(var i=0;i<dots.length;i++)dots[i].addEventListener('click',(function(s){return function(){var el=document.getElementById(s);if(el)el.scrollIntoView({behavior:'smooth'})}})(dots[i].dataset.section));
var rt,st;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){rBg();dBg();rHero()},200)});
window.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(function(){rBg();dBg()},300)},{passive:true});
