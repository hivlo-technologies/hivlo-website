const $=s=>document.querySelector(s);
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const get=u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw 0;return r.json()}).catch(()=>null);
const fmtDate=d=>{try{return new Date(d+'T12:00:00').toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'})}catch(e){return d}};
const fmtSize=b=>b>1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB';
const LABEL={'':'HIVLO core',inventory:'HIVLO + Inventory',reports:'HIVLO + Report Builder','inventory+reports':'HIVLO + Inventory + Report Builder'};
function release(r,full){const w=el('div','rel');w.appendChild(el('h3',0,(r.title||'Build '+r.build)));
 const m=el('div','meta');m.appendChild(el('span','pill '+(r.kind||''),(r.kind||'update')));m.appendChild(document.createTextNode('Build '+r.build+' · '+fmtDate(r.date)));w.appendChild(m);
 if(r.summary)w.appendChild(el('p',0,r.summary));
 if(r.notes&&r.notes.length&&full!==false){const u=el('ul');r.notes.forEach(n=>u.appendChild(el('li',0,n)));w.appendChild(u)}return w}
async function renderReleases(sel,limit){const t=$(sel);if(!t)return;const d=await get('releases.json');
 if(!d||!d.releases||!d.releases.length){t.appendChild(el('p','lead','No updates have been posted yet.'));return}
 d.releases.slice(0,limit||999).forEach(r=>t.appendChild(release(r)))}
async function renderLatest(){const d=await get('updates/latest.json');
 document.querySelectorAll('[data-build]').forEach(e=>e.textContent=d&&d.build?d.build:'—');
 const t=$('#downloads');if(!t)return;t.textContent='';
 if(!d||!d.variants||!d.variants.length){t.appendChild(el('p','lead','The installer for the current build is being prepared. Please check back soon, or ask your HIVLO supplier.'));return}
 d.variants.forEach(v=>{const key=(v.products||[]).slice().sort().join('+');const row=el('div','dlrow');const l=el('div');
  l.appendChild(el('strong',0,(LABEL[key]||'HIVLO update')+' · Build '+d.build));
  l.appendChild(el('small',0,v.file+' · '+fmtSize(v.size||0)));if(v.sha256)l.appendChild(el('small',0,'SHA-256: '+v.sha256));
  const a=el('a','btn dl','Download');a.href='updates/'+encodeURIComponent(v.file);a.setAttribute('download','');row.appendChild(l);row.appendChild(a);t.appendChild(row)});
 const s=d.setup;if(s&&s.file){const row=el('div','dlrow');const l=el('div');l.appendChild(el('strong',0,'First-time server setup · Build '+d.build));
  l.appendChild(el('small',0,s.file+' · '+fmtSize(s.size||0)));if(s.sha256)l.appendChild(el('small',0,'SHA-256: '+s.sha256));
  const a=el('a','btn dl','Download');a.href='downloads/'+encodeURIComponent(s.file);a.setAttribute('download','');row.appendChild(l);row.appendChild(a);t.insertBefore(row,t.firstChild)}}
renderLatest();renderReleases('#latestRelease',1);renderReleases('#allReleases');
