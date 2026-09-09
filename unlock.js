const form=document.getElementById('unlock-form');
const field=document.getElementById('password');
const button=document.getElementById('unlock');
const status=document.getElementById('unlock-status');
const base=new URL('./',location.href);
const bytes64=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
async function getFile(path){const r=await fetch(new URL(path,base));if(!r.ok)throw new Error('Die Vorschau ist gerade nicht erreichbar. Bitte versuche es erneut.');return r.arrayBuffer()}
async function decryptFile(path,key){const data=new Uint8Array(await getFile(path));return crypto.subtle.decrypt({name:'AES-GCM',iv:data.slice(0,12)},key,data.slice(12))}
form.addEventListener('submit',async event=>{
 event.preventDefault();if(button.disabled)return;
 button.disabled=true;status.dataset.error='false';status.textContent='Vorschau wird geöffnet …';
 try{
  if(!crypto.subtle||!window.DecompressionStream)throw new Error('Bitte öffne die Vorschau in einem aktuellen Browser.');
  const config=JSON.parse(new TextDecoder().decode(await getFile('release.json')));
  const secret=new TextEncoder().encode(field.value);field.value='';
  const material=await crypto.subtle.importKey('raw',secret,'PBKDF2',false,['deriveKey']);secret.fill(0);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes64(config.salt),iterations:config.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  let view;
  try{view=JSON.parse(new TextDecoder().decode(await decryptFile(config.view,key)))}
  catch(error){if(error.name==='OperationError')throw new Error('Das Passwort stimmt nicht. Bitte versuche es noch einmal.');throw error}
  window.officePublication={loadModel:async progress=>{
   progress('Modell wird geladen …');const compressed=await decryptFile(config.scene,key);progress('Modell wird vorbereitet …');
   return new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }};
  document.querySelector('link[href="login.css"]')?.remove();
  const style=document.createElement('style');style.textContent=view.css;document.head.append(style);
  document.body.innerHTML=view.body;
  await import(new URL(config.viewer,base).href);
 }catch(error){status.dataset.error='true';status.textContent=error.message||'Die Vorschau konnte nicht geöffnet werden.';field.focus()}
 finally{button.disabled=false}
});
