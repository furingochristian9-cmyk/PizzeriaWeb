// ================== PIZZE ==================
const pizze = [
  { nome:'Margherita', descrizione:'Pomodoro, mozzarella, basilico fresco.', prezzo:7.00, img:'img/pizza1.jpeg' },
  { nome:'Diavola', descrizione:'Pomodoro, mozzarella, salame piccante.', prezzo:8.50, img:'img/pizza2.jpeg' },
  { nome:'Capricciosa', descrizione:'Pomodoro, prosciutto, funghi, olive.', prezzo:9.00, img:'img/pizza3.jpeg' },
  { nome:'Quattro Formaggi', descrizione:'Mozzarella, gorgonzola, fontina, parmigiano.', prezzo:9.50, img:'img/pizza4.jpeg' },
  { nome:'Vegetariana', descrizione:'Pomodoro, mozzarella e verdure grigliate.', prezzo:8.00, img:'img/pizza5.jpeg' },
  { nome:'Bufalina', descrizione:'Pomodoro, mozzarella di bufala, basilico.', prezzo:9.00, img:'img/pizza6.jpeg' },
  { nome:'Tonno e Cipolla', descrizione:'Pomodoro, mozzarella, tonno, cipolla rossa.', prezzo:8.50, img:'img/pizza7.jpeg' },
  { nome:'Frutti di Mare', descrizione:'Pomodoro, frutti di mare misti, prezzemolo.', prezzo:10.00, img:'img/pizza8.jpeg' }
];

const container = document.getElementById('pizzaContainer');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const popupPrice = document.getElementById('popupPrice');
const orderForm = document.getElementById('orderForm');
const cartSummary = document.getElementById('cartSummary');

let cartCount = 0;
let cartTotal = 0;

// Mostra pizze
function mostraPizze(lista) {
  if(!container) return;
  container.innerHTML = '';
  lista.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <div class="pizza-info">
        <h3>${p.nome}</h3>
        <p>${p.descrizione}</p>
        <span class="price">€${p.prezzo.toFixed(2)}</span>
      </div>
    `;
    card.addEventListener('click', () => apriPopup(p));
    container.appendChild(card);
  });
}

// Popup
function apriPopup(pizza){
  popupImg.src = pizza.img;
  popupTitle.textContent = pizza.nome;
  popupDesc.textContent = pizza.descrizione;
  popupPrice.textContent = `€${pizza.prezzo.toFixed(2)}`;
  popup.classList.remove('hidden');
}

const closePopup = document.getElementById('closePopup');
if(closePopup) closePopup.addEventListener('click', ()=> popup.classList.add('hidden'));

// Ricerca
const searchInput = document.getElementById('searchInput');
if(searchInput){
  searchInput.addEventListener('input', e=>{
    const val = e.target.value.toLowerCase();
    const filtrate = pizze.filter(p => p.nome.toLowerCase().includes(val));
    mostraPizze(filtrate);
  });
}

// Ordina
if(orderForm){
  orderForm.addEventListener('submit', e=>{
    e.preventDefault();
    const qty = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(popupPrice.textContent.replace('€',''));
    cartCount += qty;
    cartTotal += price * qty;
    cartSummary.textContent = `Carrello: ${cartCount} pizze — Totale: €${cartTotal.toFixed(2)}`;
    alert(`Grazie ${document.getElementById('name').value}! Hai ordinato ${qty}x ${popupTitle.textContent}`);
    popup.classList.add('hidden');
    orderForm.reset();
  });
}

// Inizializza
mostraPizze(pizze);

// FORM CONTATTI
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert("Grazie! La tua richiesta è stata inviata con successo!");
    contactForm.reset();
  });
}
