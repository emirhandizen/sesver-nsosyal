const original = document.querySelector('#originalText');
const simple = document.querySelector('#simpleText');
const status = document.querySelector('#status');
const listenBtn = document.querySelector('#listenBtn');
const simplifyBtn = document.querySelector('#simplifyBtn');
const describeBtn = document.querySelector('#describeBtn');
const description = document.querySelector('#imageDescription');
const profileDialog = document.querySelector('#profileDialog');
const composerDialog = document.querySelector('#composerDialog');
const speechRate = document.querySelector('#speechRate');
let speaking = false;

function announce(message){status.textContent=message;}
function stopSpeech(){speechSynthesis.cancel();speaking=false;listenBtn.innerHTML='<span aria-hidden="true">▶</span><span>Dinle</span>';}

listenBtn.addEventListener('click',()=>{
  if(!('speechSynthesis' in window)){announce('Bu tarayıcı sesli okumayı desteklemiyor.');return;}
  if(speaking){stopSpeech();announce('Sesli okuma durduruldu.');return;}
  const utterance=new SpeechSynthesisUtterance(simple.hidden?original.textContent:simple.textContent);
  utterance.lang='tr-TR';utterance.rate=Number(speechRate.value);
  utterance.onend=()=>{stopSpeech();announce('Sesli okuma tamamlandı.');};
  speechSynthesis.speak(utterance);speaking=true;
  listenBtn.innerHTML='<span aria-hidden="true">■</span><span>Durdur</span>';announce('Gönderi sesli okunuyor.');
});

simplifyBtn.addEventListener('click',()=>{
  const showing=simple.hidden;simple.hidden=!showing;original.hidden=showing;simplifyBtn.setAttribute('aria-pressed',String(showing));
  simplifyBtn.querySelector('span:last-child').textContent=showing?'Orijinale dön':'Sadeleştir';
  stopSpeech();announce(showing?'Daha anlaşılır demo sürümü gösteriliyor. Anlam kaybı olasılığı için orijinale dönebilirsiniz.':'Orijinal metin gösteriliyor.');
});

describeBtn.addEventListener('click',()=>{
  description.hidden=!description.hidden;describeBtn.setAttribute('aria-expanded',String(!description.hidden));
  announce(description.hidden?'Görsel betimlemesi kapatıldı.':'Düzenlenebilir yapay zekâ betimlemesi gösterildi.');
});

document.querySelectorAll('#openProfile,#sideProfileBtn').forEach(b=>b.addEventListener('click',()=>profileDialog.showModal()));
document.querySelector('#openComposer').addEventListener('click',()=>composerDialog.showModal());
speechRate.addEventListener('input',()=>document.querySelector('#rateOutput').value=`${speechRate.value}×`);
profileDialog.addEventListener('close',()=>{
  if(profileDialog.returnValue==='save'){
    const auto=document.querySelector('#autoDescribe').checked;description.hidden=!auto;describeBtn.setAttribute('aria-expanded',String(auto));announce('Erişilebilirlik profili kaydedildi.');
  }
});

document.querySelector('#runCheck').addEventListener('click',()=>{
  const text=document.querySelector('#composerText').value.trim();const alt=document.querySelector('#altInput').value.trim();const issues=[];
  if(!alt)issues.push('Görsel açıklaması eksik.');
  if(/afiş(te|i|in)/i.test(text)&&!/(tarih|saat|yer|konum)/i.test(text))issues.push('Afişteki temel tarih, saat veya yer bilgisi metinde bulunmuyor.');
  if(text.length>240)issues.push('Metin uzun; paragraf veya kısa cümlelere bölünebilir.');
  const list=document.querySelector('#checkList');list.innerHTML='';
  issues.forEach(x=>{const li=document.createElement('li');li.className='warning';li.textContent=x;list.append(li);});
  const ok=document.createElement('li');ok.className='ok';ok.textContent=issues.length?'Kontrol tamamlandı; paylaşım engellenmedi.':'Temel erişilebilirlik kontrolleri karşılandı.';list.append(ok);
  const score=document.querySelector('#checkScore');score.textContent=issues.length?`${issues.length} öneri`:'Uygun';score.style.color=issues.length?'#9a6700':'#18794e';
});

document.querySelector('#shareBtn').addEventListener('click',()=>announce('Demo gönderisi paylaşıldı. Erişilebilirlik kontrolü kararı kullanıcıya bıraktı.'));
window.addEventListener('beforeunload',stopSpeech);

