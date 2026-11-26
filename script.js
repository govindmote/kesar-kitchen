const MENU={
 Starters:[["Paneer Tikka","Smoky tandoor paneer, mint chutney",320,"🍢",1,"#ffe6b0"],["Chicken 65","Crisp curry-leaf fried chicken",360,"🍗",0,"#ffd2c4"],["Dahi Ke Kebab","Hung-curd patties, pickled onion",300,"🧆",1,"#e9f0b8"],["Prawn Koliwada","Spiced gram-flour crust, lime",460,"🍤",0,"#ffd9b8"]],
 Mains:[["Butter Chicken","Tomato-butter gravy, kasuri methi",480,"🍛",0,"#ffcfa8"],["Dal Makhani","Black lentils simmered overnight",380,"🍲",1,"#f0d9b5"],["Lamb Biryani","Dum-cooked basmati, raita",560,"🍚",0,"#fff0b3"],["Palak Kofta","Spinach gravy, cashew dumplings",400,"🥬",1,"#cfe8c4"]],
 Desserts:[["Gulab Jamun Tart","Warm syrup, pistachio, cream",220,"🥧",1,"#f6d0dc"],["Kulfi Falooda","Rose, vermicelli, basil seed",240,"🍨",1,"#ffd6e8"],["Mango Phirni","Chilled rice pudding, saffron",200,"🥭",1,"#ffe48a"]],
 Beverages:[["Mango Lassi","Thick, cold, cardamom",160,"🥭",1,"#ffe48a"],["Masala Chai","Ginger, tulsi, jaggery",90,"🍵",1,"#e8d3b8"],["Jaljeera Soda","Cumin, mint, black salt",130,"🥤",1,"#cdeedd"],["Filter Coffee","South Indian decoction",110,"☕",1,"#e3cdb4"]]
};
const tabs=document.getElementById('tabs'),grid=document.getElementById('grid');
const EXT=['jpg','jpeg','png','webp'];
const img=n=>{const s=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `<img src="images/${s}.jpg" data-s="${s}" data-e="0" alt="" loading="lazy" onerror="nextExt(this)">`};
function nextExt(i){const e=+i.dataset.e+1;if(e<EXT.length){i.dataset.e=e;i.src=`images/${i.dataset.s}.${EXT[e]}`}else i.remove()}
let cur='Starters';
function show(cat){cur=cat;
  [...tabs.children].forEach(b=>b.setAttribute('aria-selected',b.dataset.c===cat));
  grid.innerHTML=MENU[cat].map((d,i)=>`<article class="dish" style="animation-delay:${i*70}ms"><div class="pic" data-i="${i}" role="button" tabindex="0" aria-label="${d[0]}, enlarge" style="background:radial-gradient(circle,#fff8 0,${d[5]} 75%)" >${d[3]}${img(d[0])}</div><div class="body"><h3><span class="veg${d[4]?'':' nv'}" title="${d[4]?'Vegetarian':'Non-vegetarian'}"></span>${d[0]}</h3><p>${d[1]}</p><div class="pr"><span class="price">₹${d[2]}</span><button class="add" data-n="${d[0]}">${tr('add')}</button></div></div></article>`).join('');
}
Object.keys(MENU).forEach(c=>{const b=document.createElement('button');b.className='tab';b.role='tab';b.dataset.c=c;b.textContent=c;b.onclick=()=>show(c);tabs.appendChild(b)});


// mobile nav
const bg=document.getElementById('burger'),ln=document.getElementById('links');
bg.onclick=()=>{const o=ln.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
ln.onclick=e=>{if(e.target.tagName==='A'){ln.classList.remove('open');bg.setAttribute('aria-expanded',false)}};

// reservation
let guests=2,time='';
const gc=document.getElementById('gc'),dt=document.getElementById('dt');
dt.min=new Date().toISOString().slice(0,10);
document.getElementById('minus').onclick=()=>{guests=Math.max(1,guests-1);gc.textContent=guests};
document.getElementById('plus').onclick=()=>{guests=Math.min(10,guests+1);gc.textContent=guests};
const slots=document.getElementById('slots');
['12:30 pm','1:30 pm','7:30 pm','8:30 pm','9:30 pm'].forEach(t=>{const b=document.createElement('button');b.type='button';b.className='slot';b.setAttribute('aria-pressed','false');b.textContent=t;b.onclick=()=>{time=t;[...slots.children].forEach(x=>x.setAttribute('aria-pressed',x===b))};slots.appendChild(b)});
const $=id=>document.getElementById(id);
$('rf').addEventListener('submit',e=>{
  e.preventDefault();
  const nm=$('nm').value.trim(),ph=$('ph').value.replace(/\D/g,''),d=dt.value;
  const errs={nm:nm.length<2?'Enter your name.':'',ph:ph.length!==10?'Enter a 10-digit phone number.':'',dt:!d||d<dt.min?'Choose today or a later date.':'',tm:time?'':'Pick a time slot.'};
  Object.entries(errs).forEach(([k,v])=>$('e-'+k).textContent=v);
  if(Object.values(errs).some(Boolean))return;
  const pretty=new Date(d+'T00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
  $('formBox').innerHTML=`<div class="done"><div class="tick">✅</div><h3>Request sent, ${nm.split(' ')[0]}</h3><p>Table for ${guests} on ${pretty} at ${time}.<br>We’ll call ${ph} to confirm.</p><button class="btn" onclick="location.reload()">Make another booking</button></div>`;
});

// ---- language ----
const T={en:{menu:"Menu",chef:"Our chef",reviews:"Reviews",reserve:"Reserve",hero:"Slow-cooked Indian food, plated for sharing.",sub:"Wood-fired breads, hand-ground masalas and a dessert counter you’ll plan your evening around. Open daily on Koregaon Park Road, Pune.",book:"Book a table",see:"See the menu",menuT:"The menu",menuL:"Everything is made to order. Tell your server about allergies and we’ll adjust.",revT:"What guests say",resT:"Reserve a table",resL:"Pick a date, party size and time. We’ll confirm by phone within the hour.",send:"Request reservation",mapT:"Find us",dir:"Get directions",add:"Add",cart:"Your order",total:"Total",empty:"Your cart is empty.",order:"Place pickup order",placed:"Order placed. We’ll call you shortly."},
hi:{menu:"मेन्यू",chef:"हमारी शेफ",reviews:"समीक्षाएँ",reserve:"आरक्षण",hero:"धीमी आँच पर पका भारतीय खाना, बाँटकर खाने के लिए सजा हुआ।",sub:"लकड़ी की आग पर बनी रोटियाँ, हाथ से पिसे मसाले और एक मिठाई काउंटर जिसके लिए आप शाम की योजना बनाएँगे। पुणे के कोरेगाँव पार्क रोड पर रोज़ खुला।",book:"टेबल बुक करें",see:"मेन्यू देखें",menuT:"हमारा मेन्यू",menuL:"सब कुछ ऑर्डर पर बनता है। एलर्जी हो तो वेटर को बताएँ, हम बदलाव कर देंगे।",revT:"मेहमान क्या कहते हैं",resT:"टेबल आरक्षित करें",resL:"तारीख़, लोगों की संख्या और समय चुनें। हम एक घंटे के भीतर फ़ोन पर पुष्टि करेंगे।",send:"आरक्षण का अनुरोध भेजें",mapT:"हमें ढूँढें",dir:"रास्ता देखें",add:"जोड़ें",cart:"आपका ऑर्डर",total:"कुल",empty:"आपकी टोकरी ख़ाली है।",order:"पिकअप ऑर्डर दें",placed:"ऑर्डर मिल गया। हम जल्द फ़ोन करेंगे।"},
mr:{menu:"मेन्यू",chef:"आमच्या शेफ",reviews:"अभिप्राय",reserve:"आरक्षण",hero:"मंद आचेवर शिजवलेले भारतीय जेवण, वाटून खाण्यासाठी सजवलेले.",sub:"लाकडाच्या आगीवर भाजलेल्या भाकरी-रोट्या, हाताने वाटलेले मसाले आणि एक मिठाईचा काउंटर. पुण्यातील कोरेगाव पार्क रोडवर रोज खुले.",book:"टेबल बुक करा",see:"मेन्यू पाहा",menuT:"आमचा मेन्यू",menuL:"सर्व काही ऑर्डरनुसार बनते. अ‍ॅलर्जी असल्यास वेटरला सांगा, आम्ही बदल करू.",revT:"पाहुणे काय म्हणतात",resT:"टेबल राखून ठेवा",resL:"तारीख, व्यक्तींची संख्या आणि वेळ निवडा. आम्ही तासाभरात फोनवर पुष्टी करू.",send:"आरक्षणाची विनंती पाठवा",mapT:"आम्हाला शोधा",dir:"मार्ग पाहा",add:"जोडा",cart:"तुमची ऑर्डर",total:"एकूण",empty:"तुमची टोपली रिकामी आहे.",order:"पिकअप ऑर्डर द्या",placed:"ऑर्डर मिळाली. आम्ही लवकरच फोन करू."}};
let lang='en';try{lang=localStorage.getItem('lang')||'en'}catch(e){}
if(!T[lang])lang='en';
const tr=k=>T[lang][k];
function applyLang(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}
  document.documentElement.lang=l;$('lang').value=l;
  document.querySelectorAll('[data-t]').forEach(e=>e.textContent=T[l][e.dataset.t]);
  show(cur);renderCart();}
$('lang').onchange=e=>applyLang(e.target.value);

// ---- cart ----
const cart={},money=n=>'₹'+n.toLocaleString('en-IN'),all=Object.values(MENU).flat(),find=n=>all.find(d=>d[0]===n);
const drawer=$('drawer');
const setCart=o=>{drawer.classList.toggle('open',o);$('scrim').classList.toggle('on',o);drawer.setAttribute('aria-hidden',!o)};
function addItem(n){cart[n]=(cart[n]||0)+1;renderCart()}
function renderCart(){
  const names=Object.keys(cart),count=names.reduce((s,n)=>s+cart[n],0),total=names.reduce((s,n)=>s+cart[n]*find(n)[2],0);
  $('cc').textContent=count;$('cc').hidden=!count;
  $('cl').innerHTML=names.length?names.map(n=>`<li><span>${n}<br><small>${money(find(n)[2])}</small></span><span class="qty"><button data-m="${n}" aria-label="Remove one">−</button> ${cart[n]} <button data-p="${n}" aria-label="Add one">+</button></span></li>`).join(''):`<li>${tr('empty')}</li>`;
  $('ct').textContent=money(total);$('co').disabled=!count;
}
$('cl').onclick=e=>{const m=e.target.dataset.m,p=e.target.dataset.p;if(p)cart[p]++;if(m&&--cart[m]<1)delete cart[m];renderCart()};
$('co').onclick=()=>{Object.keys(cart).forEach(k=>delete cart[k]);renderCart();$('cl').innerHTML=`<li>✅ ${tr('placed')}</li>`};
$('cartbtn').onclick=()=>setCart(true);$('cx').onclick=$('scrim').onclick=()=>setCart(false);

// ---- lightbox gallery ----
let li=0;
function openLb(i){const L=MENU[cur];li=(i+L.length)%L.length;const d=L[li];
  $('lbbig').innerHTML=d[3]+img(d[0]);$('lbbig').style.background=`radial-gradient(circle,#fff8 0,${d[5]} 75%)`;
  $('lbname').textContent=d[0];$('lbdesc').textContent=d[1];$('lbprice').textContent=money(d[2]);
  $('lba').textContent=tr('add');$('lba').dataset.n=d[0];$('lb').classList.add('on');$('lbx').focus()}
const closeLb=()=>$('lb').classList.remove('on');
grid.addEventListener('click',e=>{const a=e.target.closest('.add');if(a){addItem(a.dataset.n);return}const p=e.target.closest('.pic');if(p)openLb(+p.dataset.i)});
grid.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList.contains('pic'))openLb(+e.target.dataset.i)});
$('lbp').onclick=()=>openLb(li-1);$('lbn').onclick=()=>openLb(li+1);$('lbx').onclick=closeLb;
$('lba').onclick=()=>addItem($('lba').dataset.n);
$('lb').onclick=e=>{if(e.target.id==='lb')closeLb()};
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLb();setCart(false)}
  if($('lb').classList.contains('on')){if(e.key==='ArrowLeft')openLb(li-1);if(e.key==='ArrowRight')openLb(li+1)}
});

applyLang(lang);