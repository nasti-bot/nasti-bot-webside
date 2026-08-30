// ---- HERO BG - Geometric blueprint ----
var hC=document.getElementById('heroCanvas'),hX=hC.getContext('2d'),hW,hH;
function rH(){var d=Math.min(window.devicePixelRatio||1,2);hW=window.innerWidth;hH=window.innerHeight;hC.width=hW*d;hC.height=hH*d;hC.style.width=hW+'px';hC.style.height=hH+'px';hX.setTransform(d,0,0,d,0,0)}
function dH(tm){hX.clearRect(0,0,hW,hH);var t=tm*.001,cx=hW*.5,cy=hH*.42,mr=Math.min(hW*.38,hH*.38);
  var gs=64;hX.strokeStyle='rgba(255,255,255,.04)';hX.lineWidth=.3;
  for(var x=0;x<hW;x+=gs){hX.beginPath();hX.moveTo(x,0);hX.lineTo(x,hH);hX.stroke()}
  for(var y=0;y<hH;y+=gs){hX.beginPath();hX.moveTo(0,y);hX.lineTo(hW,y);hX.stroke()}
  hX.strokeStyle='rgba(255,255,255,.08)';hX.lineWidth=.5;
  hX.beginPath();hX.moveTo(cx-mr*1.8,cy);hX.lineTo(cx+mr*1.8,cy);hX.moveTo(cx,cy-mr*1.8);hX.lineTo(cx,cy+mr*1.8);hX.stroke();
  for(var i=0;i<24;i++){hX.beginPath();hX.arc(cx,cy,mr*(.04+i*.04),0,Math.PI*2);hX.strokeStyle='rgba(48,120,232,'+(.02+(1-i/24)*.06)+')';hX.lineWidth=i%5===0?.6:.2;hX.stroke()}
  for(var i=0;i<40;i++){var a=Math.PI*2/40*i;hX.beginPath();hX.moveTo(cx+Math.cos(a)*mr*.15,cy+Math.sin(a)*mr*.15);hX.lineTo(cx+Math.cos(a)*mr*1.35,cy+Math.sin(a)*mr*1.35);hX.strokeStyle='rgba(48,120,232,'+(i%8===0?.08:.03)+')';hX.lineWidth=i%8===0?.4:.2;hX.stroke()}
  hX.save();hX.translate(cx,cy);hX.rotate(t*.03);
  var hR=mr*.65;hX.beginPath();for(var i=0;i<6;i++){var a=Math.PI/3*i-Math.PI/6;var px=Math.cos(a)*hR,py=Math.sin(a)*hR;if(i===0)hX.moveTo(px,py);else hX.lineTo(px,py)}hX.closePath();hX.strokeStyle='rgba(96,160,248,.15)';hX.lineWidth=1;hX.stroke();
  for(var i=0;i<6;i++){var a=Math.PI/3*i-Math.PI/6;hX.beginPath();hX.moveTo(Math.cos(a)*hR*.2,Math.sin(a)*hR*.2);hX.lineTo(Math.cos(a)*hR,Math.sin(a)*hR);hX.strokeStyle='rgba(48,120,232,.06)';hX.lineWidth=.3;hX.stroke()}
  hX.restore();
  for(var k=0;k<3;k++){hX.beginPath();for(var i=0;i<3;i++){var a=Math.PI*2/3*i+t*(.45+k*.25);var px=cx+Math.cos(a)*mr*(.18+k*.13),py=cy+Math.sin(a)*mr*(.18+k*.13);if(i===0)hX.moveTo(px,py);else hX.lineTo(px,py)}hX.closePath();hX.fillStyle='rgba(48,120,232,'+(.015+k*.015)+')';hX.fill();hX.strokeStyle='rgba(96,160,248,'+(.1+k*.12)+')';hX.lineWidth=.5+k*.2;hX.stroke()}
  for(var i=0;i<8;i++){var oR=mr*(.48+(i%3)*.1),ang=t*(.3-i*.025)+i;var dx=cx+Math.cos(ang)*oR,dy=cy+Math.sin(ang)*oR*.4;hX.beginPath();hX.arc(dx,dy,1,0,Math.PI*2);hX.fillStyle='rgba(96,160,248,.45)';hX.fill()}
  hX.beginPath();hX.arc(cx,cy,1.8,0,Math.PI*2);hX.fillStyle='rgba(96,160,248,.6)';hX.fill();
  requestAnimationFrame(dH)}
rH();requestAnimationFrame(dH);

// ---- GALLERY CANVASES ----
function sC(id,fn){var c=document.getElementById(id);if(!c)return;var x=c.getContext('2d'),w,h;
  function rs(){var d=Math.min(window.devicePixelRatio||1,2),re=c.parentElement.getBoundingClientRect();w=re.width;h=re.height;c.width=w*d;c.height=h*d;c.style.width=w+'px';c.style.height=h+'px';x.setTransform(d,0,0,d,0,0)}
  function dr(tm){rs();fn(x,w,h,tm);requestAnimationFrame(dr)}requestAnimationFrame(dr)}

// gc1: Purple flowers
sC('gc1',function(X,w,h,tm){X.clearRect(0,0,w,h);var t=tm*.001;
  X.fillStyle='#0e0e14';X.fillRect(0,0,w,h);
  X.save();X.translate(w*.5,h*.5);X.rotate(t*.12);
  for(var i=0;i<8;i++){var a=Math.PI*2/8*i,pr=Math.min(w,h)*.12,px=Math.cos(a)*pr*.4,py=Math.sin(a)*pr*.4;
    X.beginPath();X.ellipse(px,py,pr*.65,pr*.3,a,0,Math.PI*2);
    X.fillStyle='rgba(120,90,180,'+(.15+Math.sin(t*.5+i)*.08)+')';X.fill();
    X.strokeStyle='rgba(160,130,220,.2)';X.lineWidth=.4;X.stroke();
  }
  X.restore();
  var gl=X.createRadialGradient(w*.5,h*.5,0,w*.5,h*.5,Math.min(w,h)*.1);
  gl.addColorStop(0,'rgba(180,140,240,.25)');gl.addColorStop(1,'rgba(0,0,0,0)');
  X.beginPath();X.arc(w*.5,h*.5,Math.min(w,h)*.1,0,Math.PI*2);X.fillStyle=gl;X.fill();
  for(var i=0;i<16;i++){var sd=i*47.3,sx=(Math.sin(t*.25+sd)*.5+.5)*w,sy=(Math.cos(t*.2+sd*1.2)*.5+.5)*h;
    X.beginPath();X.arc(sx,sy,.6+(i%3)*.4,0,Math.PI*2);X.fillStyle='rgba(160,130,220,'+(.1+(i%4)*.06)+')';X.fill();
  }
});

// gc2: Dreamy particles
sC('gc2',function(X,w,h,tm){X.clearRect(0,0,w,h);var t=tm*.001;
  X.fillStyle='#0c0c12';X.fillRect(0,0,w,h);
  for(var i=0;i<40;i++){var sd=i*35.8,sx=(Math.sin(t*.2+sd)*.5+.5)*w,sy=(Math.cos(t*.16+sd*1.1)*.5+.5)*h;
    X.beginPath();X.arc(sx,sy,.8+(i%3)*.5,0,Math.PI*2);
    X.fillStyle='rgba(96,160,248,'+(.15+(i%4)*.08)+')';X.fill();
    var gl=X.createRadialGradient(sx,sy,0,sx,sy,3);gl.addColorStop(0,'rgba(96,160,248,.15)');gl.addColorStop(1,'rgba(0,0,0,0)');
    X.beginPath();X.arc(sx,sy,3,0,Math.PI*2);X.fillStyle=gl;X.fill();
  }
  X.strokeStyle='rgba(96,160,248,.08)';X.lineWidth=.4;
  for(var k=0;k<3;k++){X.beginPath();for(var x=0;x<=w;x+=3){var yy=h*(.3+k*.2)+Math.sin(x*.008+t*.3+k)*h*.06;
    if(x===0)X.moveTo(x,yy);else X.lineTo(x,yy);}X.stroke();}
});

// gc3: Neon city
sC('gc3',function(X,w,h,tm){X.clearRect(0,0,w,h);var t=tm*.001;
  X.fillStyle='#0a0a10';X.fillRect(0,0,w,h);
  var vx=w*.5,vy=h*.32;
  for(var i=1;i<=10;i++){var prog=i/10,sc=prog*prog*.6,yy=vy+(h-vy)*prog,hw=w*.48*sc+w*.02;
    X.beginPath();X.moveTo(vx-hw,yy);X.lineTo(vx+hw,yy);
    X.strokeStyle='rgba(255,255,255,'+(.03+prog*.06)+')';X.lineWidth=.4;X.stroke();
  }
  for(var i=0;i<12;i++){var xf=(i/11-.5)*2;X.beginPath();X.moveTo(vx,vy);X.lineTo(vx+xf*w*.45*xf*xf,h);
    X.strokeStyle='rgba(255,255,255,.03)';X.stroke();}
  for(var i=0;i<3;i++){var sx=vx+Math.sin(t*.4+i*2.2)*w*.25,sy=vy+(h-vy)*(.28+i*.16);
    X.beginPath();X.moveTo(sx-18,sy);X.lineTo(sx+18,sy);
    X.strokeStyle='rgba(96,160,248,'+(.2+i*.06)+')';X.lineWidth=.8;X.stroke();
  }
  X.fillStyle='rgba(6,6,12,.9)';X.fillRect(0,h*.68,w,h*.32);
  for(var bx=0;bx<w;bx+=8){for(var by=h*.7;by<h*.86;by+=7){
    if(Math.sin(bx*.22+by*.55)>.1){X.beginPath();X.arc(bx,by,.5,0,Math.PI*2);X.fillStyle='rgba(96,160,248,.2)';X.fill();}
  }}
});

// ---- SCROLL UPDATE ----
var scrollRow=document.getElementById('galleryScroll'),countEl=document.querySelector('.gallery-count');
if(scrollRow&&countEl){
  var cards=scrollRow.querySelectorAll('.g-card');
  function updScroll(){if(!cards.length)return;var sL=scrollRow.scrollLeft,cW=scrollRow.clientWidth;
    var idx=Math.round(sL/(cards[0].offsetWidth+20));var cur=Math.min(idx+1,cards.length);
    countEl.innerHTML=cur+' <span style="color:#555;font-weight:400">/ '+cards.length+' WORKS</span>';
  }
  scrollRow.addEventListener('scroll',updScroll,{passive:true});
}

var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(rH,200)});
