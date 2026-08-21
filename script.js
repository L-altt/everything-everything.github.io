// ===============================
// EVERYTHING EVERYTHING
// Custom Grocery Platter System
// Now backed by Supabase (data) + Paystack (payments)
// ===============================

// ---- FILL THESE IN ----
const SUPABASE_URL = "https://spplkkeeisaozamrsfwg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_py0X361Nk1IT8YGrsj_xsQ_OQe2jBYM";
const PAYSTACK_PUBLIC_KEY = "pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // switch to pk_live_ when ready
const VERIFY_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/verify-payment`;
// ------------------------

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let ingredients = {};   // filled from DB: { id: {name, price, unit, icon} }
let mealCategories = {}; // filled from DB: { "Meal Name": [ingredientId, ...] }
let cart = [];


// ======================================
// LOAD DATA FROM SUPABASE
// ======================================

async function loadData() {
  const { data: ingredientRows, error: ingErr } = await supabase
    .from("ingredients")
    .select("*")
    .eq("in_stock", true);

  const { data: mealRows, error: mealErr } = await supabase
    .from("meals")
    .select("*");

  if (ingErr || mealErr) {
    console.error(ingErr || mealErr);
    document.getElementById("ingredientList").innerHTML =
      "<p>Sorry, we couldn't load the menu right now. Please refresh.</p>";
    return;
  }

  ingredients = {};
  ingredientRows.forEach(row => {
    ingredients[row.id] = {
      name: row.name,
      price: Number(row.price),
      unit: row.unit,
      icon: row.icon
    };
  });

  mealCategories = {};
  mealRows.forEach(row => {
    mealCategories[row.name] = row.ingredient_ids;
  });

  populateMealSelect();
}

function populateMealSelect() {
  const mealSelect = document.getElementById("meal");
  mealSelect.innerHTML = Object.keys(mealCategories)
    .map(name => `<option value="${name}">${name}</option>`)
    .join("");

  showIngredients(mealSelect.value);

  mealSelect.addEventListener("change", function () {
    showIngredients(this.value);
  });
}


// ======================================
// DISPLAY INGREDIENTS
// ======================================

function showIngredients(mealName) {

  const container = document.getElementById("ingredientList");
  const selectedIngredients = mealCategories[mealName];

  if (!selectedIngredients) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = selectedIngredients.map(key => {
    const item = ingredients[key];
    if (!item) return "";

    return `
      <label class="ingredient-option">
        <input type="checkbox" value="${key}" onchange="updateCustomTotal()">
        <span class="ingredient-icon">${item.icon}</span>
        <span class="ingredient-info">
          <strong>${item.name}</strong>
          <small>GH₵${item.price} / ${item.unit}</small>
        </span>
      </label>
    `;
  }).join("");

  updateCustomTotal();
}


// ======================================
// UPDATE CUSTOM TOTAL
// ======================================

function updateCustomTotal() {
  const selected = document.querySelectorAll("#ingredientList input[type='checkbox']:checked");
  let total = 0;
  selected.forEach(input => { total += ingredients[input.value].price; });
  document.getElementById("builderTotal").textContent = `GH₵${total}`;
}


// ======================================
// ADD CUSTOM PLATTER TO CART
// ======================================

function addCustomPlatter() {
  const meal = document.getElementById("meal").value;
  const selected = document.querySelectorAll("#ingredientList input[type='checkbox']:checked");

  if (selected.length === 0) {
    alert("Please select at least one ingredient.");
    return;
  }

  const selectedItems = [];
  selected.forEach(input => {
    const item = ingredients[input.value];
    selectedItems.push({ name: item.name, price: item.price, unit: item.unit });
  });

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  cart.push({
    name: `${meal} Grocery Platter`,
    price: total,
    icon: "🧺",
    desc: selectedItems.map(item => item.name).join(", ")
  });

  updateCart();
  openCart();
}


// ======================================
// CART
// ======================================

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  const box = document.getElementById("cartItems");

  if (!cart.length) {
    box.innerHTML = '<p style="color:#65736c;padding:20px 0">Your cart is empty.</p>';
    document.getElementById("cartTotal").textContent = "GH₵0";
    return;
  }

  box.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div>
        <b>${item.icon} ${item.name}</b><br>
        <small>${item.desc}</small><br>
        <small>GH₵${item.price}</small>
      </div>
      <button class="remove" onclick="removeItem(${i})">Remove</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cartTotal").textContent = `GH₵${total}`;
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
  updateCart();
}

function closeCart(e) {
  if (!e || e.target.id === "cartOverlay") {
    document.getElementById("cartOverlay").classList.remove("open");
  }
}
// ======================================
// CHECKOUT — WHATSAPP
// ======================================

function checkoutWhatsApp() {
  if (!cart.length) {
    alert("Please add something to your cart first.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const location = document.getElementById("customerLocation").value.trim();

  if (!name || !location) {
    alert("Please fill in your name and delivery location.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const lines = cart.map(item =>
    `• ${item.name} — GH₵${item.price}${item.desc ? ` (${item.desc})` : ""}`
  );

  const message =
`Hi Everything Everything! I'd like to place an order:

${lines.join("\n")}

Total: GH₵${total}

Name: ${name}
Delivery location: ${location}`;

  const phone = "233595485044"; // matches your existing WhatsApp link
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}


// ======================================
// SHOW EMAIL FIELD BEFORE PAYSTACK
// ======================================

function showEmailThenPay() {
  const emailField = document.getElementById("emailField");

  if (emailField.style.display === "none") {
    emailField.style.display = "block";
    document.getElementById("customerEmail").focus();
    return; // give them a chance to fill it in before triggering payment
  }

  checkoutPaystack();
}


// ======================================
// CHECKOUT — PAYSTACK
// ======================================

function checkoutPaystack() {
  if (!cart.length) {
    alert("Please add something to your cart first.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const location = document.getElementById("customerLocation").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const phone = document.getElementById("customerPhone")?.value.trim() || "";

  if (!name || !location || !email) {
    alert("Please fill in your name, delivery location, and email.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const reference = "EE_" + Date.now() + "_" + Math.floor(Math.random() * 100000);

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: Math.round(total * 100), // pesewas
    currency: "GHS",
    ref: reference,
    metadata: { name, phone, location },
    callback: function (response) {
      // Payment succeeded on Paystack's side — now verify server-side and save the order
      finalizeOrder(response.reference, { name, phone, location, email }, total);
    },
    onClose: function () {
      // user closed the payment popup without paying — nothing to do
    }
  });

  handler.openIframe();
}

async function finalizeOrder(reference, customer, total) {
  const itemsSnapshot = cart.map(item => ({
    name: item.name,
    price: item.price,
    desc: item.desc
  }));

  try {
    const res = await fetch(VERIFY_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        reference,
        customer,
        items: itemsSnapshot,
        total
      })
    });

    const result = await res.json();

    if (!res.ok || result.error) {
      alert("Payment received, but we couldn't confirm your order automatically. Please message us on WhatsApp with your payment reference: " + reference);
      return;
    }

    cart = [];
    updateCart();
    closeCart();
    alert(`Payment successful! Your order is confirmed.\nReference: ${reference}\nWe'll be in touch about delivery.`);

  } catch (err) {
    console.error(err);
    alert("Payment received, but something went wrong confirming your order. Please message us on WhatsApp with your payment reference: " + reference);
  }
}


// ======================================
// BUILD SECTION SCROLL HELPER
// ======================================

function chooseMeal(mealName) {
  const mealSelect = document.getElementById("meal");
  mealSelect.value = mealName;
  showIngredients(mealName);
  document.getElementById("build").scrollIntoView({ behavior: "smooth" });
}


// ======================================
// INITIAL SETUP
// ======================================

loadData();
updateCart();
