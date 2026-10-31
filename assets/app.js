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
 document.querySelectorAll('[data-build]').forEach(e=>e.textContent=d&&d.build?d.build:'\u2014');
 const t=$('#downloads');if(!t)return;t.textContent='';
 const mail=(what)=>'mailto:support@hivlo.co.za?subject='+encodeURIComponent('HIVLO CMP download request: '+what)+'&body='+encodeURIComponent('Hello,\n\nPlease send me the download link for: '+what+'\n\nOrganisation:\nContact person:\nCurrent build (Administration > Updates):\n');
 const rows=[];if(d&&d.setup&&d.setup.file)rows.push(['First-time server setup',d.setup]);
 (d&&d.variants||[]).forEach(v=>{const key=(v.products||[]).slice().sort().join('+');rows.push([(LABEL[key]||'HIVLO update'),v])});
 if(!rows.length){const r=el('div','dlrow');const l=el('div');l.appendChild(el('strong',0,'HIVLO CMP \u00B7 Build '+(d&&d.build||'')));l.appendChild(el('small',0,'Send us a short email and we will reply with a private download link.'));
  const x=el('a','btn dl','Request download');x.href=mail('Build '+(d&&d.build||'current'));r.appendChild(l);r.appendChild(x);t.appendChild(r);return}
 rows.forEach(([name,v])=>{const row=el('div','dlrow');const l=el('div');l.appendChild(el('strong',0,name+' \u00B7 Build '+d.build));
  l.appendChild(el('small',0,v.file+(v.size?' \u00B7 '+fmtSize(v.size):'')));if(v.sha256)l.appendChild(el('small',0,'SHA-256: '+v.sha256));
  const x=el('a','btn dl','Request download');x.href=mail(name+', Build '+d.build);row.appendChild(l);row.appendChild(x);t.appendChild(row)})}
renderLatest();renderReleases('#latestRelease',1);renderReleases('#allReleases');
