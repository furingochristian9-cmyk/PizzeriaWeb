let cart = [];

function addToCart(name, price) {
  price = parseFloat(price.replace("€",""));
  const item = cart.find(i => i.name === name);
  if(item) item.qty++;
  else cart.push({name, price, qty:1});
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  const itemsDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  if(!cartDiv) return;

  itemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    itemsDiv.innerHTML += `<div class="cart-item">${item.name} x${item.qty} - ${(item.price*item.qty).toFixed(2)}€</div>`;
  });
  totalSpan.textContent = total.toFixed(2) + "€";
  cartDiv.style.display = cart.length>0?"block":"none";
}

function confirmOrder() {
  if(cart.length===0) return;
  let summary = "📦 Riepilogo Ordine:\n\n";
  cart.forEach(item => summary += `${item.name} x${item.qty} - ${(item.price*item.qty).toFixed(2)}€\n`);
  summary += "\nTotale: " + document.getElementById("total").textContent;
  alert(summary);
  cart = [];
  updateCart();
}
