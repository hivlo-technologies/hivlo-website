(function(){
const NS='http://www.w3.org/2000/svg',S=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const hexPts=(cx,cy,r)=>[...Array(6)].map((_,i)=>{const a=Math.PI/180*(60*i-30);return (cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1)}).join(' ');
const G={people:{name:'People',color:'#F4B400',text:'#1b1b1b',msg:'Children, the care team, families and social workers. Each person sees what they are allowed to see and does their part, in one place.',cells:['Children','Care team','Families|& partners']},
info:{name:'Information',color:'#2F5F94',text:'#fff',msg:'Enter it once and it flows to every place it is needed: the child’s record, documents, case notes and the reports built from them.',cells:['Child|record','Documents','Case notes']},
proc:{name:'Processes',color:'#F7931E',text:'#1b1b1b',msg:'Admission, IDP, MDT meetings and reviews, through to reunification. Due dates and traffic lights keep every step moving.',cells:['Admission','IDP & MDT','Reunification']}};
window.HIVLO_GROUPS=G;
// hero art
const h=document.getElementById('heroart');
if(h){const R=62,cx=200,cy=200;S('polygon',{points:hexPts(cx,cy,R+4),fill:'#F4B400'},h);
 const t=S('text',{x:cx,y:cy-2,'text-anchor':'middle','font-weight':800,'font-size':30,fill:'#0B2A4A','font-family':'system-ui'},h);t.textContent='CMP';
 const t2=S('text',{x:cx,y:cy+22,'text-anchor':'middle','font-size':12,fill:'#0B2A4A','font-family':'system-ui'},h);t2.textContent='one record';
 const W=Math.sqrt(3)*(R+4)+6,cols=['#F4B400','#2F5F94','#F7931E','#F4B400','#2F5F94','#F7931E'];
 for(let i=0;i<6;i++){const a=Math.PI/180*(60*i);const x=cx+W*Math.cos(a),y=cy+W*Math.sin(a);S('polygon',{points:hexPts(x,y,R-6),fill:cols[i],opacity:.9},h)}
 const beeO=S('g',{transform:'translate(335 62) rotate(-18) scale(1.1)'},h);const bee=S('g',{class:'bee'},beeO);
 bee.innerHTML='<path d="M-34 4Q-52-22-30-36Q-12-24-10-2z" fill="#e9f3ff" stroke="#0B2A4A" stroke-width="3.5" transform="translate(6 -6)"/><path d="M-8-6Q-12-34 12-40Q26-26 14-4z" fill="#e9f3ff" stroke="#0B2A4A" stroke-width="3.5"/><ellipse cx="0" cy="8" rx="30" ry="22" fill="#F4B400" stroke="#0B2A4A" stroke-width="3.5"/><path d="M-10-12Q-14 8-8 28M6-13Q3 8 8 28" stroke="#0B2A4A" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="31" cy="1" r="13" fill="#0B2A4A"/><circle cx="35" cy="-2" r="3.2" fill="#fff"/><path d="M36-11q4-12 12-12M30-12q0-13 7-17" stroke="#0B2A4A" stroke-width="3" fill="none" stroke-linecap="round"/>'}
// hive
const svg=document.getElementById('hive');if(!svg)return;
const C={x:500,y:330},D=235,R=56,off=60;
const spec=[['people',-90,[90,210,330]],['info',30,[270,30,150]],['proc',150,[270,30,150]]];
const rad=a=>a*Math.PI/180;
spec.forEach(([k,ang,dirs])=>{const g=G[k],x0=C.x+D*Math.cos(rad(ang)),y0=C.y+D*Math.sin(rad(ang));
 const grp=S('g',{'data-g':k,class:'cell'},svg);
 // flow paths (curved, slightly bowed)
 const mx=(x0+C.x)/2+ (k==='info'?-30:k==='proc'?30:0),my=(y0+C.y)/2;
 const pid='p-'+k,fw=S('path',{id:pid,d:`M${x0},${y0} Q${mx},${my} ${C.x},${C.y}`,fill:'none',stroke:g.color,'stroke-width':3,'stroke-dasharray':'2 9','stroke-linecap':'round',opacity:.7},grp);
 const rv=S('path',{id:pid+'r',d:`M${C.x},${C.y} Q${mx},${my} ${x0},${y0}`,fill:'none',stroke:'none'},grp);
 [[pid,0],[pid+'r',1.6]].forEach(([id,b])=>{const d=S('circle',{r:6,fill:g.color,stroke:'#fff','stroke-width':2,class:'dot'},grp);const m=S('animateMotion',{dur:'3.2s',repeatCount:'indefinite',begin:b+'s'},d);S('mpath',{href:'#'+id},m)});
 dirs.forEach((d,i)=>{const x=x0+off*Math.cos(rad(d)),y=y0+off*Math.sin(rad(d));
  S('polygon',{points:hexPts(x,y,R),fill:g.color,stroke:'#fff','stroke-width':3},grp);
  const parts=g.cells[i].split('|');parts.forEach((p,j)=>{const t=S('text',{x,y:y+4+(j-(parts.length-1)/2)*16,'text-anchor':'middle','font-size':14,'font-weight':700,fill:g.text},grp);t.textContent=p})});
 const lab=S('text',{x:x0,y:y0+(ang===-90?-100:ang===30?100:100),'text-anchor':'middle','font-size':0},grp)});
// centre
const ctr=S('g',{},svg);S('polygon',{points:hexPts(C.x,C.y,78),fill:'#0B2A4A',stroke:'#F4B400','stroke-width':5},ctr);
let t=S('text',{x:C.x,y:C.y-4,'text-anchor':'middle','font-size':22,'font-weight':800,fill:'#F4B400'},ctr);t.textContent='HIVLO CMP';
t=S('text',{x:C.x,y:C.y+18,'text-anchor':'middle','font-size':12,fill:'#cfdcf5'},ctr);t.textContent='one connected record';
// buttons + mobile list
const bar=document.getElementById('flowbtns'),msg=document.getElementById('flowmsg'),list=document.getElementById('flowlist');
function pick(k){bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.k===k)));
 svg.querySelectorAll('.cell').forEach(c=>c.classList.toggle('dim',k!=='all'&&c.dataset.g!==k));
 msg.textContent=k==='all'?'Choose People, Information or Processes to see how each one flows through HIVLO CMP.':G[k].msg}
[['all','All']].concat(Object.keys(G).map(k=>[k,G[k].name])).forEach(([k,n])=>{const b=document.createElement('button');b.type='button';b.dataset.k=k;b.setAttribute('aria-pressed','false');
 if(k!=='all'){const i=document.createElement('i');i.style.background=G[k].color;b.appendChild(i)}b.appendChild(document.createTextNode(n));b.onclick=()=>pick(k);bar.appendChild(b)});
Object.keys(G).forEach(k=>{const c=document.createElement('div');c.className='card';const h3=document.createElement('h3'),i=document.createElement('i');i.style.background=G[k].color;h3.appendChild(i);h3.appendChild(document.createTextNode(G[k].name));
 const p=document.createElement('p');p.textContent=G[k].msg;const q=document.createElement('p');q.style.marginTop='6px';q.textContent=G[k].cells.map(x=>x.replace('|',' ')).join(' · ');c.append(h3,p,q);list.appendChild(c)});
pick('all');
})();
