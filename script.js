const products = [
  {name:"English Breakfast Pack", price:50, icon:"🍳", desc:"Beans, sausages, eggs, bread, tea/coffee, milk and more."},
  {name:"Rice & Stew Pack", price:80, icon:"🍚", desc:"Rice, stew ingredients and your choice of protein."},
  {name:"Jollof Pack", price:100, icon:"🍲", desc:"Jollof ingredients plus your choice of protein."},
  {name:"Fried Rice Pack", price:90, icon:"🥘", desc:"Fried rice ingredients plus your choice of protein."},
  {name:"Fufu Pack", price:120, icon:"🥣", desc:"Cassava and plantain with light, groundnut or palm-nut soup ingredients."}
];

let cart = [];

function renderProducts(){
  document.getElementById("products").innerHTML = products.map((p,i)=>`
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">GH₵${p.price}</div>
        <button class="btn primary" onclick="addToCart(${i})">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

function addToCart(i){
  cart.push({...products[i]});
  updateCart();
  openCart();
}
function addCustomPlatter(){
  const meal = document.getElementById("meal");
  const protein = document.getElementById("protein");
  const extras = document.getElementById("extras");
  const total = Number(meal.value)+Number(protein.value)+Number(extras.value);
  cart.push({name:`Custom ${meal.options[meal.selectedIndex].text.split(" —")[0]} Platter`,price:total,icon:"🧺",desc:"Custom platter"});
  updateCart(); openCart();
}
function updateBuilder(){
  const total = Number(meal.value)+Number(protein.value)+Number(extras.value);
  document.getElementById("builderTotal").textContent = `GH₵${total}`;
}
["meal","protein","extras"].forEach(id=>document.getElementById(id).addEventListener("change",updateBuilder));

function updateCart(){
  document.getElementById("cartCount").textContent = cart.length;
  const box = document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<p style="color:#65736c;padding:20px 0">Your cart is empty.</p>';document.getElementById("cartTotal").textContent="GH₵0";return;}
  box.innerHTML=cart.map((item,i)=>`
    <div class="cart-item">
      <div><b>${item.icon} ${item.name}</b><br><small>GH₵${item.price}</small></div>
      <button class="remove" onclick="removeItem(${i})">Remove</button>
    </div>`).join("");
  document.getElementById("cartTotal").textContent=`GH₵${cart.reduce((s,x)=>s+x.price,0)}`;
}
function removeItem(i){cart.splice(i,1);updateCart();}
function openCart(){document.getElementById("cartOverlay").classList.add("open");updateCart();}
function closeCart(e){if(!e || e.target.id==="cartOverlay")document.getElementById("cartOverlay").classList.remove("open");}

function checkoutWhatsApp(){
  if(!cart.length){alert("Please add something to your cart first.");return;}
  const name=document.getElementById("customerName").value.trim() || "Customer";
  const location=document.getElementById("customerLocation").value.trim() || "Not provided";
  const total=cart.reduce((s,x)=>s+x.price,0);
  const items=cart.map(x=>`• ${x.name} — GH₵${x.price}`).join("\n");
  const msg=`Hello Everything Everything! I'd like to place an order.\n\n${items}\n\nTotal: GH₵${total}\nName: ${name}\nDelivery location: ${location}`;
  window.open(`https://wa.me/233547026348?text=${encodeURIComponent(msg)}`,"_blank");
}
renderProducts(); updateCart();
