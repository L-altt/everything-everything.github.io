// ===============================
// EVERYTHING EVERYTHING
// Custom Grocery Platter System
// ===============================

// Temporary prices.
// Change these prices whenever you get your actual market/selling prices.

const ingredients = {

  // GENERAL
  rice: {
    name: "Rice",
    price: 30,
    unit: "1 kg",
    icon: "🍚"
  },

  tomatoes: {
    name: "Tomatoes",
    price: 15,
    unit: "portion",
    icon: "🍅"
  },

  onions: {
    name: "Onions",
    price: 10,
    unit: "portion",
    icon: "🧅"
  },

  pepper: {
    name: "Pepper",
    price: 5,
    unit: "portion",
    icon: "🌶️"
  },

  cookingOil: {
    name: "Cooking Oil",
    price: 30,
    unit: "500 ml",
    icon: "🫗"
  },

  ginger: {
    name: "Ginger",
    price: 5,
    unit: "portion",
    icon: "🫚"
  },

  garlic: {
    name: "Garlic",
    price: 5,
    unit: "portion",
    icon: "🧄"
  },

  seasoning: {
    name: "Seasoning",
    price: 5,
    unit: "pack",
    icon: "🧂"
  },

  salt: {
    name: "Salt",
    price: 3,
    unit: "pack",
    icon: "🧂"
  },

  eggs: {
    name: "Eggs",
    price: 25,
    unit: "6 eggs",
    icon: "🥚"
  },

  chicken: {
    name: "Chicken",
    price: 35,
    unit: "portion",
    icon: "🍗"
  },

  beef: {
    name: "Beef",
    price: 40,
    unit: "portion",
    icon: "🥩"
  },

  fish: {
    name: "Fish",
    price: 35,
    unit: "portion",
    icon: "🐟"
  },


  // ENGLISH BREAKFAST
  bread: {
    name: "Bread",
    price: 15,
    unit: "loaf",
    icon: "🍞"
  },

  sausages: {
    name: "Sausages",
    price: 25,
    unit: "pack",
    icon: "🌭"
  },

  bakedBeans: {
    name: "Baked Beans",
    price: 15,
    unit: "tin",
    icon: "🥫"
  },

  milk: {
    name: "Milk",
    price: 30,
    unit: "1 litre",
    icon: "🥛"
  },

  tea: {
    name: "Tea",
    price: 15,
    unit: "pack",
    icon: "🫖"
  },

  coffee: {
    name: "Coffee",
    price: 25,
    unit: "pack",
    icon: "☕"
  },

  sugar: {
    name: "Sugar",
    price: 15,
    unit: "500 g",
    icon: "🍬"
  },

  margarine: {
    name: "Butter / Margarine",
    price: 20,
    unit: "pack",
    icon: "🧈"
  },


  // JOLLOF
  tomatoPaste: {
    name: "Tomato Paste",
    price: 10,
    unit: "tin",
    icon: "🥫"
  },

  curry: {
    name: "Curry Powder",
    price: 8,
    unit: "pack",
    icon: "🧂"
  },

  thyme: {
    name: "Thyme",
    price: 8,
    unit: "pack",
    icon: "🌿"
  },

  bayLeaves: {
    name: "Bay Leaves",
    price: 5,
    unit: "pack",
    icon: "🌿"
  },

  carrots: {
    name: "Carrots",
    price: 10,
    unit: "portion",
    icon: "🥕"
  },

  greenBeans: {
    name: "Green Beans",
    price: 10,
    unit: "portion",
    icon: "🫛"
  },

  greenPepper: {
    name: "Green Pepper",
    price: 10,
    unit: "portion",
    icon: "🫑"
  },


  // FRIED RICE
  sweetCorn: {
    name: "Sweet Corn",
    price: 15,
    unit: "tin",
    icon: "🌽"
  },

  springOnions: {
    name: "Spring Onions",
    price: 8,
    unit: "bunch",
    icon: "🌱"
  },

  soySauce: {
    name: "Soy Sauce",
    price: 15,
    unit: "bottle",
    icon: "🫙"
  },


  // FUFU
  cassava: {
    name: "Cassava",
    price: 20,
    unit: "portion",
    icon: "🥔"
  },

  plantain: {
    name: "Plantain",
    price: 20,
    unit: "bunch",
    icon: "🍌"
  },

  groundnutPaste: {
    name: "Groundnut Paste",
    price: 25,
    unit: "pack",
    icon: "🥜"
  },

  palmNut: {
    name: "Palm Nut",
    price: 25,
    unit: "pack",
    icon: "🥥"
  },


  // WAAKYE
  blackEyedBeans: {
    name: "Black-eyed Beans",
    price: 20,
    unit: "500 g",
    icon: "🫘"
  },

  waakyeLeaves: {
    name: "Waakye Leaves",
    price: 5,
    unit: "pack",
    icon: "🌿"
  },

  gari: {
    name: "Gari",
    price: 15,
    unit: "500 g",
    icon: "🌾"
  },

  spaghetti: {
    name: "Spaghetti",
    price: 15,
    unit: "pack",
    icon: "🍝"
  },

  friedPlantain: {
    name: "Plantain",
    price: 20,
    unit: "portion",
    icon: "🍌"
  },

  shito: {
    name: "Shito",
    price: 20,
    unit: "bottle",
    icon: "🌶️"
  },


  // BANKU
  cornDough: {
    name: "Corn Dough",
    price: 20,
    unit: "portion",
    icon: "🌽"
  },

  cassavaDough: {
    name: "Cassava Dough",
    price: 15,
    unit: "portion",
    icon: "🥔"
  },

  tilapia: {
    name: "Tilapia",
    price: 45,
    unit: "fish",
    icon: "🐟"
  },

  gardenEggs: {
    name: "Garden Eggs",
    price: 10,
    unit: "portion",
    icon: "🍆"
  },


  // KENKEY
  kenkey: {
    name: "Kenkey",
    price: 10,
    unit: "serving",
    icon: "🍚"
  },

  smokedFish: {
    name: "Smoked Fish",
    price: 30,
    unit: "portion",
    icon: "🐟"
  }
};


// ======================================
// MEAL CATEGORIES
// ======================================

const mealCategories = {

  "English Breakfast": [
    "bread",
    "eggs",
    "sausages",
    "bakedBeans",
    "milk",
    "tea",
    "coffee",
    "sugar",
    "margarine"
  ],

  "Rice & Stew": [
    "rice",
    "tomatoes",
    "tomatoPaste",
    "onions",
    "pepper",
    "cookingOil",
    "ginger",
    "garlic",
    "seasoning",
    "salt",
    "chicken",
    "beef",
    "fish"
  ],

  "Jollof": [
    "rice",
    "tomatoes",
    "tomatoPaste",
    "onions",
    "pepper",
    "cookingOil",
    "ginger",
    "garlic",
    "seasoning",
    "salt",
    "curry",
    "thyme",
    "bayLeaves",
    "chicken",
    "beef",
    "sausages",
    "carrots",
    "greenBeans",
    "greenPepper"
  ],

  "Fried Rice": [
    "rice",
    "carrots",
    "greenBeans",
    "sweetCorn",
    "greenPepper",
    "onions",
    "springOnions",
    "cookingOil",
    "eggs",
    "chicken",
    "sausages",
    "soySauce",
    "seasoning",
    "salt",
    "ginger",
    "garlic"
  ],

  "Fufu": [
    "cassava",
    "plantain",
    "tomatoes",
    "pepper",
    "onions",
    "ginger",
    "garlic",
    "seasoning",
    "salt",
    "groundnutPaste",
    "palmNut",
    "chicken",
    "beef",
    "fish"
  ],

  "Waakye": [
    "rice",
    "blackEyedBeans",
    "waakyeLeaves",
    "salt",
    "cookingOil",
    "onions",
    "pepper",
    "tomatoes",
    "gari",
    "spaghetti",
    "friedPlantain",
    "eggs",
    "chicken",
    "beef",
    "fish",
    "shito"
  ],

  "Banku & Tilapia": [
    "cornDough",
    "cassavaDough",
    "salt",
    "tilapia",
    "onions",
    "pepper",
    "ginger",
    "garlic",
    "seasoning",
    "cookingOil",
    "tomatoes",
    "shito",
    "gardenEggs"
  ],

  "Kenkey & Fish": [
    "kenkey",
    "fish",
    "smokedFish",
    "tomatoes",
    "onions",
    "pepper",
    "shito",
    "cookingOil",
    "gardenEggs"
  ]
};


// ======================================
// CART
// ======================================

let cart = [];


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

    return `
      <label class="ingredient-option">
        <input
          type="checkbox"
          value="${key}"
          onchange="updateCustomTotal()"
        >

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

  const selected = document.querySelectorAll(
    "#ingredientList input[type='checkbox']:checked"
  );

  let total = 0;

  selected.forEach(input => {
    total += ingredients[input.value].price;
  });

  document.getElementById("builderTotal").textContent = `GH₵${total}`;
}


// ======================================
// ADD CUSTOM PLATTER
// ======================================

function addCustomPlatter() {

  const meal = document.getElementById("meal").value;

  const selected = document.querySelectorAll(
    "#ingredientList input[type='checkbox']:checked"
  );

  if (selected.length === 0) {
    alert("Please select at least one ingredient.");
    return;
  }

  const selectedItems = [];

  selected.forEach(input => {
    const item = ingredients[input.value];

    selectedItems.push({
      name: item.name,
      price: item.price,
      unit: item.unit
    });
  });

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

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

    box.innerHTML =
      '<p style="color:#65736c;padding:20px 0">Your cart is empty.</p>';

    document.getElementById("cartTotal").textContent = "GH₵0";

    return;
  }

  box.innerHTML = cart.map((item, i) => `

    <div class="cart-item">

      <div>
        <b>${item.icon} ${item.name}</b>

        <br>

        <small>${item.desc}</small>

        <br>

        <small>GH₵${item.price}</small>
      </div>

      <button
        class="remove"
        onclick="removeItem(${i})"
      >
        Remove
      </button>

    </div>

  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  document.getElementById("cartTotal").textContent =
    `GH₵${total}`;
}


function removeItem(i) {

  cart.splice(i, 1);

  updateCart();
}


// ======================================
// CART OPEN / CLOSE
// ======================================

function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("open");

  updateCart();
}


function closeCart(e) {

  if (
    !e ||
    e.target.id === "cartOverlay"
  ) {
    document
      .getElementById("cartOverlay")
      .classList.remove("open");
  }
}


// ======================================
// WHATSAPP CHECKOUT
// ======================================

function checkoutWhatsApp() {

  if (!cart.length) {

    alert("Please add something to your cart first.");

    return;
  }

  const name =
    document.getElementById("customerName").value.trim()
    || "Customer";

  const location =
    document.getElementById("customerLocation").value.trim()
    || "Not provided";

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const items = cart.map(item =>
    `• ${item.name} — GH₵${item.price}\n  ${item.desc}`
  ).join("\n\n");

  const message =
`Hello Everything Everything! I'd like to place an order.

${items}

Total: GH₵${total}

Name: ${name}
Delivery location: ${location}`;

  // CURRENT WHATSAPP NUMBER
  // Change this number later if necessary.
  const whatsappNumber = "233547026348";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}


// ======================================
// INITIAL SETUP
// ======================================

const mealSelect = document.getElementById("meal");

mealSelect.addEventListener("change", function () {

  showIngredients(this.value);

});


// Show first meal immediately
showIngredients(mealSelect.value);

updateCart();
function chooseMeal(mealName) {

  const mealSelect = document.getElementById("meal");

  mealSelect.value = mealName;

  showIngredients(mealName);

  document
    .getElementById("build")
    .scrollIntoView({
      behavior: "smooth"
    });
}
