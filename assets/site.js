(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var nav=d.querySelector('.nav');
function sc(){nav&&nav.classList.toggle('scrolled',scrollY>20)}sc();addEventListener('scroll',sc,{passive:true});
var bg=d.querySelector('.burger');
if(bg){bg.addEventListener('click',function(){var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
d.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');bg.setAttribute('aria-expanded','false')})})}
/* reveal */
var els=d.querySelectorAll('[data-r]');
if('IntersectionObserver' in window&&!rm){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
/* spotlight */
d.querySelectorAll('.glass').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
/* tilt */
if(!rm&&matchMedia('(hover:hover)').matches)d.querySelectorAll('.stage').forEach(function(s){var t=s.querySelector('.tilt');if(!t)return;s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform='rotateY('+(x*8)+'deg) rotateX('+(-y*8)+'deg)'});s.addEventListener('pointerleave',function(){t.style.transform=''})});
/* hex field */
var cv=d.getElementById('hexfield');
if(cv&&!rm){var c=cv.getContext('2d'),W,H,px=-999,py=-999,S=46,dpr=Math.min(devicePixelRatio||1,2),t0=0;
function rs(){var b=cv.getBoundingClientRect();W=b.width;H=b.height;cv.width=W*dpr;cv.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0)}rs();addEventListener('resize',rs);
cv.parentNode.addEventListener('pointermove',function(e){var b=cv.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top});
cv.parentNode.addEventListener('pointerleave',function(){px=py=-999});
function hx(x,y,r){c.beginPath();for(var i=0;i<6;i++){var a=Math.PI/3*i+Math.PI/6;c.lineTo(x+r*Math.cos(a),y+r*Math.sin(a))}c.closePath()}
function f(t){c.clearRect(0,0,W,H);var w=S*Math.sqrt(3),h=S*1.5;
for(var row=-1;row*h<H+S;row++)for(var col=-1;col*w<W+w;col++){var x=col*w+(row&1?w/2:0),y=row*h;var dx=x-px,dy=y-py,dist=Math.sqrt(dx*dx+dy*dy);var g=Math.max(0,1-dist/260);var wave=.5+.5*Math.sin(t/1800+x*.006+y*.004);
var a=.035+wave*.03+g*.5;hx(x,y,S-3);c.strokeStyle='rgba(244,180,0,'+a.toFixed(3)+')';c.lineWidth=1;c.stroke();if(g>.35){c.fillStyle='rgba(244,180,0,'+((g-.35)*.14).toFixed(3)+')';c.fill()}}
requestAnimationFrame(f)}
var vis=true;if('IntersectionObserver' in window)new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!vis){vis=true;requestAnimationFrame(f)}vis=v}).observe(cv);
(function loop(t){if(vis){f(t)}else return})(0)}
else if(cv){cv.style.display='none'}
})();
(function(){var t=document.getElementById('tour');if(!t)return;
var tabs=[].slice.call(t.querySelectorAll('[role=tab]'));
function sel(b,f){tabs.forEach(function(x){var on=x===b;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;var p=document.getElementById('tp-'+x.dataset.t);if(p)p.hidden=!on});if(f)b.focus()}
tabs.forEach(function(b,i){b.addEventListener('click',function(){sel(b)});b.addEventListener('keydown',function(e){var k=e.key,n=-1;if(k==='ArrowDown'||k==='ArrowRight')n=(i+1)%tabs.length;else if(k==='ArrowUp'||k==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(k==='Home')n=0;else if(k==='End')n=tabs.length-1;if(n>-1){e.preventDefault();sel(tabs[n],true)}})})})();
