const ICONS = {
  laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M2 20h20l-1.5-4h-17z"/></svg>',
  gpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="10" rx="1"/><circle cx="7" cy="12" r="2"/><circle cx="13" cy="12" r="2"/><line x1="18" y1="9" x2="18" y2="15"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="6" width="12" height="12" rx="1"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="15" x2="22" y2="15"/></svg>',
  ssd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="8" rx="1"/><circle cx="7" cy="12" r="1"/><line x1="11" y1="12" x2="17" y2="12"/></svg>',
  ram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="5" width="16" height="8" rx="1"/><line x1="7" y1="13" x2="7" y2="17"/><line x1="11" y1="13" x2="11" y2="17"/><line x1="15" y1="13" x2="15" y2="17"/><line x1="17" y1="13" x2="17" y2="17"/></svg>'
};

const LAPTOPS = [
  {id:'l1', name:'ASUS Gaming V16 V3607', 
  tag:'Performance',
  desc:'14-core CPU, 16GB GPU, 32GB RAM. Built for compiling and rendering in the same session.',
  price:110142,
  icon:'laptop',
  image:"images/asus_v3607.jpg", alt:"asus_v3607" },
  {id:'l2', name:'ROG Strix SCAR 18 ',
  tag:'Ultraportable',
  desc:'1.1kg, fanless, 20hr battery. For people who work from wherever the day takes them.',
  price:72442,
  icon:'laptop',
  image:"images/ROG Strix SCAR 18.jpg", alt:"ROG Strix SCAR 18"},
  {id:'l3', name:'ROG Zephyrus G16',
  tag:'Performance',
  desc:'16" 4K panel, 24GB GPU. Color-accurate out of the box for design and video work.',
  price:139142,
  icon:'laptop',
  image:"images/ROG Zephyrus G16.jpg", alt:"ROG Zephyrus G16"},
  {id:'l4', name:'ASUS Zenbook S 14 UM5406',
    tag:'Ultraportable',
    desc:'Entry-level, 8-core, all-day battery. The one we recommend for coursework.',
    price:43442,
    icon:'laptop',
    image:"images/ASUS Zenbook S 14 UM5406.jpg", alt:"ASUS Zenbook S 14 UM5406"}
];
const parts = [
  {id:'p1', name:'XLR8 GeForce RTX 4070 VERTO',
  tag:'GPU', desc:'12GB GDDR7, triple-fan, 2.4-slot. Fits most mid-tower cases without a riser.',
  price:37642,
  icon:'gpu',
  image:"images/XLR8 GeForce RTX 4070 VERTO.jpg", alt:"XLR8 GeForce RTX 4070 VERTO"
  },
  {id:'p2', name:'Modular Gaming 850W Power Supply',
  tag:'PSU',
  desc:'Fully modular, 92% efficiency, 10-year warranty on the unit itself.',
  price:9222,
  icon:'chip',
  image:"images/Modular Gaming 850W Power Supply.jpg", alt:"Modular Gaming 850W Power Supply"
  },
  {id:'p3', name:'KingSpec mSATA SSD Internal Solid State Drive 256GBData',
  tag:'Storage',
  desc:'Gen4 x4, 7200MB/s read. Rated for 1200 TBW.',
  price:8062,
  icon:'ssd',
  image:"images/KingSpec mSATA SSD Internal Solid State Drive 256GBData.jpg", alt:"KingSpec mSATA SSD Internal Solid State Drive 256GBData"
  },
  {id:'p4', name:'SKILL Ripjaws V Series 16GB',
  tag:'Memory',
  desc:'DDR5-6000, CL30, two sticks. Tested for stability at rated speed, not just POST.',
  price:6902,
  icon:'ram',
  image:"images/SKILL Ripjaws V Series 16GB.jpg", alt:"SKILL Ripjaws V Series 16GB"
  }
];

let cart = [];

function productCard(p){
  return `<div class="card">
    <div class="card-tag">${p.tag}</div>
    <div class="card-visual">
      <!-- Dito kukuha ang HTML sa dynamic na image URL ng bawat item -->
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="card-name">${p.name}</div>
    <div class="card-desc">${p.desc}</div>
    <div class="card-foot">
      <div class="card-price">₱${p.price.toLocaleString()}</div>
      <button class="add-btn" data-id="${p.id}">Add to cart</button>
    </div>
  </div>`;
}


document.getElementById('laptopGrid').innerHTML = LAPTOPS.map(productCard).join('');
document.getElementById('partsGrid').innerHTML = parts.map(productCard).join('');

const ALL_PRODUCTS = [...LAPTOPS, ...parts];

document.querySelectorAll('.add-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-id');
    const product = ALL_PRODUCTS.find(p=>p.id===id);
    cart.push(product);
    renderCart();
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    setTimeout(()=>{ btn.textContent='Add to cart'; btn.classList.remove('added'); }, 1200);
  });
});

function renderCart(){
  document.getElementById('cartCount').textContent = cart.length;
  const itemsEl = document.getElementById('drawerItems');
  if(cart.length === 0){
    itemsEl.innerHTML = '<div class="drawer-empty">Your cart is empty.</div>';
  } else {
    itemsEl.innerHTML = cart.map((item, i)=>`
      <div class="drawer-item">
        <div>
          <div class="di-name">${item.name}</div>
          <div class="di-meta">${item.tag}</div>
        </div>
        <div style="display:flex; align-items:center; gap:14px;">
          <span>₱${item.price.toLocaleString()}</span>
          <button class="di-remove" data-i="${i}">remove</button>
        </div>
      </div>`).join('');
    itemsEl.querySelectorAll('.di-remove').forEach(b=>{
      b.addEventListener('click', ()=>{
        cart.splice(parseInt(b.getAttribute('data-i')), 1);
        renderCart();
      });
    });
  }
  const total = cart.reduce((sum, item)=> sum + item.price, 0);
  document.getElementById('drawerTotal').textContent = '₱' + total.toLocaleString();
}

const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

renderCart();

// PCB trace signature in hero
(function(){
  const svg = document.getElementById('heroTrace');
  const paths = [
    'M0,80 L180,80 L220,120 L520,120',
    'M0,220 L120,220 L150,190 L400,190 L440,230 L900,230',
    'M1240,60 L1020,60 L980,100 L700,100',
    'M1240,340 L1080,340 L1040,300 L760,300',
    'M0,460 L260,460 L300,420 L640,420'
  ];
  const nodes = [[220,120],[520,120],[150,190],[440,230],[980,100],[700,100],[1040,300],[760,300],[300,420],[640,420]];
  let svgContent = '';
  paths.forEach((d,i)=>{
    svgContent += `<path d="${d}" fill="none" stroke="#a8763a" stroke-width="1.2" opacity="0" class="trace-path">
      <animate attributeName="opacity" from="0" to="0.35" dur="0.6s" begin="${i*0.15}s" fill="freeze"/>
    </path>`;
  });
  nodes.forEach((n,i)=>{
    svgContent += `<circle cx="${n[0]}" cy="${n[1]}" r="3" fill="#e0983f" opacity="0">
      <animate attributeName="opacity" from="0" to="0.6" dur="0.4s" begin="${0.3+i*0.08}s" fill="freeze"/>
    </circle>`;
  });
  svg.innerHTML = svgContent;
})();
