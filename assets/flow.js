(function(){
const NS='http://www.w3.org/2000/svg',S=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const hexPts=(cx,cy,r)=>[...Array(6)].map((_,i)=>{const a=Math.PI/180*(60*i-30);return (cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1)}).join(' ');
const G={people:{name:'People',color:'#F4B400',text:'#1b1b1b',msg:'Children, the care team, families and social workers. Each person sees what they are allowed to see and does their part, in one place.',cells:['Children','Care team','Families|& partners']},
info:{name:'Information',color:'#2F5F94',text:'#fff',msg:'Enter it once and it flows to every place it is needed: the child’s record, documents, case notes and the reports built from them.',cells:['Child|record','Documents','Case notes']},
proc:{name:'Processes',color:'#F7931E',text:'#1b1b1b',msg:'Admission, IDP, MDT meetings and reviews, through to reunification. Due dates and traffic lights keep every step moving.',cells:['Admission','IDP & MDT','Reunification']}};
const DET={people:[['Children','Every child has one record: personal details, documents, family, learning, wellbeing and history, in one place.','Children','person'],['Care team','Care workers, therapists and other staff each sign in with their own role and see only what that role allows.','Care|team','team'],['Families & partners','Family contacts and schools are kept with the child, including visits, consents and out-weekends.','Families|& partners','family'],['Social workers','The child’s social worker is recorded on the record, so court dates, reviews and reports always point to the right person.','Social|workers','social'],['Host parents','Host parents and their placements are kept with the family information, next to the child they care for.','Host|parents','host'],['Managers','Administrators set up users and roles, decide who sees what, and see what needs attention on the dashboard.','Managers','manager']],
info:[['Child record','Details, history and a traffic-light summary for each area. Enter it once and it shows wherever it is needed.','Child|record','record'],['Documents','Court orders, reports and other papers are stored with the child they belong to, not in a separate filing cabinet.','Documents','doc'],['Case notes','Notes, incidents and visits record who wrote them and when. Nothing is deleted, only voided with a reason.','Case|notes','notes'],['Education','School, extra-murals and school reports, including importing a school report instead of typing it in.','Education','edu'],['Health & wellbeing','Medical, therapy and behaviour records. Health details are only shown to people who hold the Medical privilege.','Health &|wellbeing','heart'],['Reports','Ready-made reports and printouts, Excel export, and an optional Report Builder that drafts MDT, panel and DSD reports.','Reports','chart']],
proc:[['Admission','Admission steps and consents are completed once and carry straight into the child’s record.','Admission','door'],['IDP','Individual development plans have review dates that show as green, amber or red, so nothing is forgotten.','IDP','flag'],['MDT meetings','Multidisciplinary team meetings are planned and recorded, with an optional drafted meeting pack from the child’s record.','MDT|meetings','mdt'],['Court orders','Court orders and their dates are tracked with the child, so a renewal never sneaks up on you.','Court|orders','scales'],['Out-weekends','Out-weekends and visits are planned and recorded, with family contact kept alongside.','Out-|weekends','cal'],['Reunification','The path home is planned and followed step by step until the child goes back to family.','Reunifi-|cation','home']]};
window.HIVLO_GROUPS=G;
// hero art
const h=document.getElementById('heroart');
if(h){const R=62,cx=200,cy=200;S('polygon',{points:hexPts(cx,cy,R+4),fill:'#F4B400'},h);
 const t=S('text',{x:cx,y:cy-2,'text-anchor':'middle','font-weight':800,'font-size':30,fill:'#0B2A4A','font-family':'system-ui'},h);t.textContent='CMP';
 const t2=S('text',{x:cx,y:cy+22,'text-anchor':'middle','font-size':12,fill:'#0B2A4A','font-family':'system-ui'},h);t2.textContent='one record';
 const W=Math.sqrt(3)*(R+4)+6,cols=['#F4B400','#2F5F94','#F7931E','#F4B400','#2F5F94','#F7931E'];
 for(let i=0;i<6;i++){const a=Math.PI/180*(60*i);const x=cx+W*Math.cos(a),y=cy+W*Math.sin(a);S('polygon',{points:hexPts(x,y,R-6),fill:cols[i],opacity:.9},h)}
 const FP='M340,60 C300,8 180,8 120,50 C40,100 20,200 60,280 C100,360 240,385 320,330 C385,285 385,160 300,130 C240,108 200,150 200,200 C200,250 252,262 282,220 C312,172 362,110 340,60Z';
 S('path',{d:FP,fill:'none',stroke:'#F4B400','stroke-width':2,'stroke-dasharray':'2 9','stroke-linecap':'round',opacity:.55},h);
 const beeO=S('g',{},h);S('animateMotion',{dur:'18s',repeatCount:'indefinite',path:FP,calcMode:'spline',keyTimes:'0;1',keySplines:'.2 0 .8 1'},beeO);
 const beeS=S('g',{transform:'rotate(-8) scale(.8)'},beeO);const bee=S('g',{class:'bee'},beeS);
 bee.innerHTML='<path d="M-34 4Q-52-22-30-36Q-12-24-10-2z" fill="#e9f3ff" stroke="#0B2A4A" stroke-width="3.5" transform="translate(6 -6)"/><path d="M-8-6Q-12-34 12-40Q26-26 14-4z" fill="#e9f3ff" stroke="#0B2A4A" stroke-width="3.5"/><ellipse cx="0" cy="8" rx="30" ry="22" fill="#F4B400" stroke="#0B2A4A" stroke-width="3.5"/><path d="M-10-12Q-14 8-8 28M6-13Q3 8 8 28" stroke="#0B2A4A" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="31" cy="1" r="13" fill="#0B2A4A"/><circle cx="35" cy="-2" r="3.2" fill="#fff"/><path d="M36-11q4-12 12-12M30-12q0-13 7-17" stroke="#0B2A4A" stroke-width="3" fill="none" stroke-linecap="round"/>'}
// hive
const svg=document.getElementById('hive');if(!svg)return;
const ICON={person:'c:12,8,3.4~M5.5 20c0-3.8 2.9-6.2 6.5-6.2s6.5 2.4 6.5 6.2',team:'c:12,8,3~c:5,10.5,2.2~c:19,10.5,2.2~M6.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5~M1.5 18c0-2 1.3-3.4 3.2-3.8~M22.5 18c0-2-1.3-3.4-3.2-3.8',family:'c:8,8,2.6~c:16,8,2.6~c:12,15,2~M3.5 18c0-3 2-4.5 4.5-4.5~M20.5 18c0-3-2-4.5-4.5-4.5~M9 21c0-2 1.3-3 3-3s3 1 3 3',social:'c:10,8,3~M4 20c0-3.4 2.6-5.6 6-5.6~M14.5 17l2.2 2.2 4.3-4.6',host:'M3 12l9-8 9 8~M5.5 10.5V20h13v-9.5~c:12,14,2~M8.5 20c0-2 1.5-3 3.5-3s3.5 1 3.5 3',manager:'M12 3l7.5 3v5.5c0 4.5-3 7.8-7.5 9.5-4.5-1.7-7.5-5-7.5-9.5V6z~M8.5 12l2.5 2.5 4.5-5',record:'r:3.5,5,17,14,2~c:9,11,2.2~M6 17c.4-2 5.2-2 6 0~M14 10h4~M14 14h4',doc:'M7 3h7l5 5v13H7z~M14 3v5h5~M10 13h6~M10 17h6',notes:'M4 6h11~M4 11h7~M4 16h5~M13 19l1-4 6-6 3 3-6 6z',edu:'M2 9l10-5 10 5-10 5z~M6 11.5v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4~M22 9v6',heart:'M12 20.5s-8.5-5-8.5-11A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 6-8.5 11-8.5 11z',chart:'M4 4v16h16~M8 16v-5~M12 16V8~M16 16v-3',door:'M10 4h8v16h-8~M3 12h10~M10 9l3 3-3 3',flag:'M6 21V4~M6 4h11l-2 4 2 4H6',mdt:'c:12,6,2.6~c:5.5,17,2.6~c:18.5,17,2.6~M10.5 8l-3.6 7~M13.5 8l3.6 7~M8.2 17h7.6',scales:'M12 4v16~M7 20h10~M5 8h14~M5 8l-2.5 6a3 3 0 0 0 5 0z~M19 8l-2.5 6a3 3 0 0 0 5 0z',cal:'r:4,6,16,14,2~M4 10h16~M8 4v4~M16 4v4',home:'M3 12l9-8 9 8~M6 10.5V20h12v-9.5~M10 20v-5h4v5'};
const defs=S('defs',{},svg);
const gl=S('filter',{id:'glow',x:'-30%',y:'-30%',width:'160%',height:'160%'},defs);S('feGaussianBlur',{in:'SourceGraphic',stdDeviation:4,result:'b'},gl);const fm=S('feMerge',{},gl);S('feMergeNode',{in:'b'},fm);S('feMergeNode',{in:'SourceGraphic'},fm);
Object.keys(G).forEach(k=>{const rg=S('radialGradient',{id:'g-'+k,cx:'50%',cy:'40%',r:'75%'},defs);S('stop',{offset:'0%','stop-color':G[k].color,'stop-opacity':.55},rg);S('stop',{offset:'100%','stop-color':'#0B2A4A','stop-opacity':.95},rg)});
const rgc=S('radialGradient',{id:'g-centre',cx:'50%',cy:'50%',r:'70%'},defs);S('stop',{offset:'0%','stop-color':'#1d4a78'},rgc);S('stop',{offset:'100%','stop-color':'#0B2A4A'},rgc);
const C={x:500,y:395},D=265,R=44,off=R*1.732+4;
const spec=[['people',-90],['info',30],['proc',150]];
const rad=a=>a*Math.PI/180;
spec.forEach(([k,ang])=>{const g=G[k],x0=C.x+D*Math.cos(rad(ang)),y0=C.y+D*Math.sin(rad(ang));
 const grp=S('g',{'data-g':k,class:'cell'},svg);
 const mx=(x0+C.x)/2+ (k==='info'?-30:k==='proc'?30:0),my=(y0+C.y)/2;
 const pid='p-'+k,fw=S('path',{id:pid,d:`M${x0},${y0} Q${mx},${my} ${C.x},${C.y}`,fill:'none',stroke:g.color,'stroke-width':3,'stroke-dasharray':'2 9','stroke-linecap':'round',opacity:.7},grp);
 const rv=S('path',{id:pid+'r',d:`M${C.x},${C.y} Q${mx},${my} ${x0},${y0}`,fill:'none',stroke:'none'},grp);
 [[pid,0],[pid+'r',1.6]].forEach(([id,b])=>{const d=S('circle',{r:6,fill:g.color,stroke:'#fff','stroke-width':2,class:'dot'},grp);const m=S('animateMotion',{dur:'3.2s',repeatCount:'indefinite',begin:b+'s'},d);S('mpath',{href:'#'+id},m)});
 // cluster label hex in the middle
 S('polygon',{points:hexPts(x0,y0,R),fill:g.color,stroke:'#FFD54A','stroke-width':3,filter:'url(#glow)'},grp);
 const lt=S('text',{x:x0,y:y0+5,'text-anchor':'middle','font-size':14,'font-weight':800,fill:k==='info'?'#fff':'#0B2A4A'},grp);lt.textContent=g.name==='Information'?'Info':g.name;
 [0,60,120,180,240,300].forEach((d,i)=>{const x=x0+off*Math.cos(rad(d)),y=y0+off*Math.sin(rad(d));
  const pg=S('g',{class:'hxg'},grp),pop=S('g',{class:'pop'},pg);
  S('polygon',{points:hexPts(x,y,R),fill:'url(#g-'+k+')',stroke:'#F4B400','stroke-width':2.5,filter:'url(#glow)',class:'hxp'},pop);
  const ic=S('g',{transform:`translate(${x-8.6} ${y-28}) scale(.72)`,fill:'none',stroke:'#FFD54A','stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'},pop);
  (ICON[DET[k][i][3]]||'').split('~').forEach(sh=>{if(!sh)return;if(sh.startsWith('c:')){const [cx,cy,r]=sh.slice(2).split(',');S('circle',{cx,cy,r},ic)}else if(sh.startsWith('r:')){const [rx,ry,w,h,rr]=sh.slice(2).split(',');S('rect',{x:rx,y:ry,width:w,height:h,rx:rr},ic)}else S('path',{d:sh},ic)});
  const parts=DET[k][i][2].split('|'),base=y+(parts.length===1?14:8);
  parts.forEach((p,j)=>{const t=S('text',{x,y:base+j*12,'text-anchor':'middle','font-size':11,'font-weight':700,fill:'#fff'},pop);t.textContent=p});
  const hit=S('polygon',{points:hexPts(x,y,R),fill:'rgba(0,0,0,0)',class:'hx','data-k':k,'data-i':i,tabindex:0,role:'button','aria-label':DET[k][i][0]+': '+DET[k][i][1]},pg);
  hit._pop=pop;hit._x=x;hit._y=y;hit._dx=Math.cos(rad(d))*16;hit._dy=Math.sin(rad(d))*16;
  hit.addEventListener('pointerenter',()=>hot(hit));hit.addEventListener('pointerleave',()=>cool());hit.addEventListener('focus',()=>hot(hit));hit.addEventListener('blur',()=>cool());
  hit.onclick=()=>{hot(hit);pick(k,i)};hit.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(k,i)}}});});

const tip=document.createElement('div');tip.className='hxtip';tip.hidden=true;svg.parentNode.style.position='relative';svg.parentNode.appendChild(tip);
const top=S('g',{style:'pointer-events:none'},svg);let cur=null;
function hot(h){if(cur===h)return;cool();cur=h;const k=h.dataset.k,i=h.dataset.i;h.parentNode.classList.add('hot');
 const c=h._pop.cloneNode(true);c.classList.add('lift');c.style.setProperty('--dx',h._dx+'px');c.style.setProperty('--dy',h._dy+'px');top.appendChild(c);requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add('go')));
 tip.textContent='';const t=document.createElement('strong');t.textContent=DET[k][i][0];const p=document.createElement('span');p.textContent=DET[k][i][1];tip.append(t,p);tip.style.borderLeftColor=G[k].color;tip.hidden=false;
 const sr=svg.getBoundingClientRect(),pr=svg.parentNode.getBoundingClientRect(),sc=sr.width/1000;
 const cx=sr.left-pr.left+(h._x+h._dx)*sc,cy=sr.top-pr.top+(h._y+h._dy+30)*sc,w=Math.min(270,pr.width-24);tip.style.width=w+'px';
 const hw=44*1.2*sc,right=cx<pr.width/2;let left=right?cx+hw+10:cx-hw-10-w;left=Math.max(8,Math.min(pr.width-w-8,left));
 tip.style.left=left+'px';tip.style.top=Math.max(8,Math.min(pr.height-tip.offsetHeight-8,cy-tip.offsetHeight/2))+'px'}
function cool(){if(!cur)return;cur.parentNode.classList.remove('hot');cur=null;top.textContent='';tip.hidden=true}
document.addEventListener('pointerdown',e=>{if(!svg.contains(e.target))cool()});
// centre
const ctr=S('g',{},svg);S('polygon',{points:hexPts(C.x,C.y,78),fill:'url(#g-centre)',stroke:'#FFD54A','stroke-width':4,filter:'url(#glow)'},ctr);
let t=S('text',{x:C.x,y:C.y-4,'text-anchor':'middle','font-size':22,'font-weight':800,fill:'#F4B400'},ctr);t.textContent='HIVLO CMP';
t=S('text',{x:C.x,y:C.y+18,'text-anchor':'middle','font-size':12,fill:'#cfdcf5'},ctr);t.textContent='one connected record';
// buttons + mobile list
const bar=document.getElementById('flowbtns'),msg=document.getElementById('flowmsg'),list=document.getElementById('flowlist');
function pick(k,i){bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.k===k)));
 svg.querySelectorAll('.cell').forEach(c=>c.classList.toggle('dim',k!=='all'&&c.dataset.g!==k));
 svg.querySelectorAll('.hx').forEach(h=>h.parentNode.classList.toggle('sel',h.dataset.k===k&&String(h.dataset.i)===String(i)));
 msg.textContent='';
 if(k==='all'){msg.textContent='Choose People, Information or Processes, or click any hexagon, to see how it flows through HIVLO CMP.';return}
 const p=document.createElement('span');p.textContent=G[k].msg;msg.appendChild(p);
 if(i!==undefined){const d=document.createElement('span');d.className='cdet';const st=document.createElement('strong');st.textContent=DET[k][i][0];d.appendChild(st);d.appendChild(document.createTextNode(' '+DET[k][i][1]));msg.appendChild(d)}
 else{const d=document.createElement('span');d.className='cdet hint';d.textContent='Click a hexagon for more detail.';msg.appendChild(d)}}
[['all','All']].concat(Object.keys(G).map(k=>[k,G[k].name])).forEach(([k,n])=>{const b=document.createElement('button');b.type='button';b.dataset.k=k;b.setAttribute('aria-pressed','false');
 if(k!=='all'){const i=document.createElement('i');i.style.background=G[k].color;b.appendChild(i)}b.appendChild(document.createTextNode(n));b.onclick=()=>pick(k);bar.appendChild(b)});
Object.keys(G).forEach(k=>{const c=document.createElement('div');c.className='card';const h3=document.createElement('h3'),i=document.createElement('i');i.style.background=G[k].color;h3.appendChild(i);h3.appendChild(document.createTextNode(G[k].name));
 const p=document.createElement('p');p.textContent=G[k].msg;const q=document.createElement('p');q.style.marginTop='6px';c.append(h3,p);DET[k].forEach(([t,d])=>{const r=document.createElement('p');r.style.marginTop='8px';const b=document.createElement('strong');b.textContent=t;r.appendChild(b);r.appendChild(document.createTextNode(' '+d));c.appendChild(r)});list.appendChild(c)});
pick('all');
})();
