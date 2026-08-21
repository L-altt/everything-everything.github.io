/* =========================================================
   EVERYTHING EVERYTHING — PHASE 1
   Product catalogue
   Category filtering
   Shopping basket
   WhatsApp checkout
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const WHATSAPP_NUMBER = "233547023648";

const CART_STORAGE_KEY = "everythingEverythingCart";


/* =========================================================
   PRODUCT DATABASE
========================================================= */

const PRODUCTS = [

    /* -------------------------
       GROCERIES
    ------------------------- */

    {
        id: "grocery-rice",
        name: "Premium Rice",
        category: "Groceries",
        type: "groceries",
        price: 85,
        image: "",
        icon: "🍚",
        description: "Quality rice for everyday meals.",
        stock: true
    },

    {
        id: "grocery-oil",
        name: "Cooking Oil",
        category: "Groceries",
        type: "groceries",
        price: 65,
        image: "",
        icon: "🫗",
        description: "Cooking oil for your kitchen.",
        stock: true
    },

    {
        id: "grocery-chicken",
        name: "Chicken",
        category: "Groceries",
        type: "groceries",
        price: 75,
        image: "",
        icon: "🍗",
        description: "Fresh chicken for your favourite meals.",
        stock: true
    },

    {
        id: "grocery-tomato",
        name: "Fresh Tomatoes",
        category: "Groceries",
        type: "groceries",
        price: 25,
        image: "",
        icon: "🍅",
        description: "Fresh tomatoes for cooking.",
        stock: true
    },

    {
        id: "grocery-onion",
        name: "Onions",
        category: "Groceries",
        type: "groceries",
        price: 20,
        image: "",
        icon: "🧅",
        description: "Fresh onions.",
        stock: true
    },

    {
        id: "grocery-plantain",
        name: "Plantain",
        category: "Groceries",
        type: "groceries",
        price: 30,
        image: "",
        icon: "🍌",
        description: "Fresh plantain.",
        stock: true
    },


    /* -------------------------
       CLOTHING
    ------------------------- */

    {
        id: "women-dress-01",
        name: "Elegant Women's Dress",
        category: "Women's Clothing",
        type: "clothing",
        price: 250,
        image: "",
        icon: "👗",
        description: "Elegant everyday and occasion dress.",
        sizes: ["S", "M", "L", "XL"],
        stock: true
    },

    {
        id: "women-top-01",
        name: "Women's Casual Top",
        category: "Women's Clothing",
        type: "clothing",
        price: 150,
        image: "",
        icon: "👚",
        description: "Simple and stylish casual top.",
        sizes: ["S", "M", "L", "XL"],
        stock: true
    },

    {
        id: "women-skirt-01",
        name: "Women's Skirt",
        category: "Women's Clothing",
        type: "clothing",
        price: 180,
        image: "",
        icon: "👗",
        description: "Comfortable stylish skirt.",
        sizes: ["S", "M", "L", "XL"],
        stock: true
    },

    {
        id: "men-shirt-01",
        name: "Classic Men's Shirt",
        category: "Men's Clothing",
        type: "clothing",
        price: 180,
        image: "",
        icon: "👔",
        description: "Classic shirt suitable for casual or formal wear.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: true
    },

    {
        id: "men-tshirt-01",
        name: "Men's Basic T-Shirt",
        category: "Men's Clothing",
        type: "clothing",
        price: 100,
        image: "",
        icon: "👕",
        description: "Comfortable everyday T-shirt.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: true
    },


    /* -------------------------
       JEWELRY
    ------------------------- */

    {
        id: "jewelry-necklace-01",
        name: "Classic Necklace",
        category: "Jewelry",
        type: "jewelry",
        price: 120,
        image: "",
        icon: "📿",
        description: "Elegant necklace for everyday wear.",
        stock: true
    },

    {
        id: "jewelry-bracelet-01",
        name: "Elegant Bracelet",
        category: "Jewelry",
        type: "jewelry",
        price: 95,
        image: "",
        icon: "📿",
        description: "Simple elegant bracelet.",
        stock: true
    },

    {
        id: "jewelry-earrings-01",
        name: "Classic Earrings",
        category: "Jewelry",
        type: "jewelry",
        price: 80,
        image: "",
        icon: "💎",
        description: "Elegant earrings for any occasion.",
        stock: true
    },

    {
        id: "jewelry-ring-01",
        name: "Classic Ring",
        category: "Jewelry",
        type: "jewelry",
        price: 100,
        image: "",
        icon: "💍",
        description: "Simple stylish ring.",
        stock: true
    },

    {
        id: "jewelry-watch-01",
        name: "Classic Watch",
        category: "Jewelry",
        type: "jewelry",
        price: 250,
        image: "",
        icon: "⌚",
        description: "Clean and stylish everyday watch.",
        stock: true
    },


    /* -------------------------
       GIFTS
    ------------------------- */

    {
        id: "gift-birthday",
        name: "Birthday Gift Box",
        category: "Gifts",
        type: "gifts",
        price: 200,
        image: "",
        icon: "🎁",
        description: "A thoughtful birthday gift box.",
        stock: true
    },

    {
        id: "gift-romantic",
        name: "Love Gift Box",
        category: "Gifts",
        type: "gifts",
        price: 250,
        image: "",
        icon: "❤️",
        description: "A special gift for someone you love.",
        stock: true
    },

    {
        id: "gift-premium",
        name: "Premium Gift Box",
        category: "Gifts",
        type: "gifts",
        price: 350,
        image: "",
        icon: "🎁",
        description: "A premium collection of thoughtful gifts.",
        stock: true
    },

    {
        id: "gift-general",
        name: "Special Gift Box",
        category: "Gifts",
        type: "gifts",
        price: 180,
        image: "",
        icon: "🎀",
        description: "A beautiful gift for any occasion.",
        stock: true
    }

];


/* =========================================================
   CART
========================================================= */

let cart = loadCart();


function loadCart() {

    try {

        const saved = localStorage.getItem(CART_STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error("Could not load cart:", error);

        return [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error("Could not save cart:", error);

    }

}


/* =========================================================
   PRODUCT HELPERS
========================================================= */

function getProduct(productId) {

    return PRODUCTS.find(
        product => product.id === productId
    );

}


function addProductToCart(productId, size = "") {

    const product = getProduct(productId);

    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    if (
        product.sizes &&
        product.sizes.length &&
        !size
    ) {

        alert("Please select a size first.");

        return;

    }


    addToCart({

        id: product.id,

        name: product.name,

        price: product.price,

        category: product.category,

        icon: product.icon,

        image: product.image,

        size: size,

        desc: product.description

    });

}


function addToCart(item) {

    const cartItem = {

        id: item.id || createCartItemId(),

        name: item.name || "Product",

        price: Number(item.price) || 0,

        category: item.category || "General",

        icon: item.icon || "🛍️",

        image: item.image || "",

        desc: item.desc || "",

        size: item.size || "",

        quantity: Number(item.quantity) || 1

    };


    const existingIndex = cart.findIndex(entry =>

        entry.id === cartItem.id &&

        entry.size === cartItem.size

    );


    if (existingIndex !== -1) {

        cart[existingIndex].quantity +=
            cartItem.quantity;

    } else {

        cart.push(cartItem);

    }


    saveCart();

    updateCart();

    showCartToast(
        `${cartItem.name} added to basket`
    );

}


function createCartItemId() {

    return (
        "EE_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );

}


/* =========================================================
   CART DISPLAY
========================================================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    const itemCount = cart.reduce(

        (total, item) =>
            total + (item.quantity || 1),

        0

    );


    if (cartCount) {

        cartCount.textContent =
            itemCount;

    }


    if (!cartItems) {
        return;
    }


    if (!cart.length) {

        cartItems.innerHTML =
            `<p class="empty-cart">
                Your basket is empty.
            </p>`;

        if (cartTotal) {

            cartTotal.textContent =
                "GH₵0.00";

        }

        return;

    }


    cartItems.innerHTML = cart.map(

        (item, index) => {

            const quantity =
                item.quantity || 1;

            const subtotal =
                Number(item.price) *
                quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <b>
                            ${item.icon}
                            ${escapeHTML(item.name)}
                        </b>

                        <small>
                            ${escapeHTML(item.category)}
                        </small>

                        ${
                            item.size
                            ?
                            `<small>
                                Size:
                                ${escapeHTML(item.size)}
                            </small>`
                            :
                            ""
                        }

                        <strong>
                            GH₵${formatMoney(subtotal)}
                        </strong>

                    </div>


                    <div class="cart-item-actions">

                        <div class="quantity-controls">

                            <button
                                type="button"
                                onclick="changeQuantity(${index}, -1)"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(${index}, 1)"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            class="remove"
                            onclick="removeItem(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }

    ).join("");


    if (cartTotal) {

        cartTotal.textContent =
            `GH₵${formatMoney(getCartTotal())}`;

    }

}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) +
        amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    cart.splice(index, 1);

    saveCart();

    updateCart();

}


/* =========================================================
   TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(

        (total, item) =>

            total +
            (
                Number(item.price) *
                (item.quantity || 1)
            ),

        0

    );

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");


    if (!overlay) {
        return;
    }


    overlay.classList.add("open");

    document.body.classList.add("cart-open");

    updateCart();

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart(event) {

    const overlay =
        document.getElementById("cartOverlay");


    if (!overlay) {
        return;
    }


    if (
        !event ||
        event.target === overlay
    ) {

        overlay.classList.remove("open");

        document.body.classList.remove(
            "cart-open"
        );

    }

}


/* =========================================================
   PRODUCT RENDERING
========================================================= */

function renderProducts(
    containerSelector,
    products = PRODUCTS
) {

    const container =
        document.querySelector(
            containerSelector
        );


    if (!container) {
        return;
    }


    const available =
        products.filter(
            product => product.stock !== false
        );


    if (!available.length) {

        container.innerHTML = `
            <p style="
                color:#64748b;
                padding:20px 0;
            ">
                No products available.
            </p>
        `;

        return;

    }


    container.innerHTML =
        available
            .map(createProductCard)
            .join("");


    initializeSizeButtons();

    initializeProductButtons();

    initializeCategoryFilters();

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const hasImage =
        product.image &&
        product.image.trim();


    const imageHTML = hasImage

        ?

        `
        <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
        >
        `

        :

        `
        <span style="font-size:60px;">
            ${product.icon}
        </span>
        `;


    const sizeHTML =

        product.sizes &&
        product.sizes.length

        ?

        `
        <div class="ee-size-label">
            Select Size
        </div>

        <div
            class="ee-size-options"
            data-product="${escapeHTML(product.id)}"
        >

            ${product.sizes.map(size => `

                <button
                    type="button"
                    data-size="${escapeHTML(size)}"
                >
                    ${escapeHTML(size)}
                </button>

            `).join("")}

        </div>
        `

        :

        "";


    return `

        <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
            data-category="${escapeHTML(product.type)}"
        >

            <div class="ee-fashion-image">

                ${imageHTML}

            </div>


            <div class="ee-fashion-info">

                <h4>
                    ${escapeHTML(product.name)}
                </h4>


                <p class="ee-product-description">
                    ${escapeHTML(product.description || "")}
                </p>


                <div class="ee-price">
                    GH₵${formatMoney(product.price)}
                </div>


                ${sizeHTML}


                <button
                    type="button"
                    class="ee-add-fashion-cart"
                    data-product-id="${escapeHTML(product.id)}"
                >
                    Add to Cart
                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   ADD TO CART BUTTONS
========================================================= */

function initializeProductButtons() {

    const buttons =
        document.querySelectorAll(
            ".ee-add-fashion-cart"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.productId;


                const card =
                    this.closest(
                        ".product-card"
                    );


                const product =
                    getProduct(productId);


                if (!product) {
                    return;
                }


                let selectedSize = "";


                if (card) {

                    const selected =
                        card.querySelector(
                            ".ee-size-options button.selected"
                        );


                    if (selected) {

                        selectedSize =
                            selected.dataset.size ||
                            selected.textContent.trim();

                    }

                }


                if (
                    product.sizes &&
                    product.sizes.length &&
                    !selectedSize
                ) {

                    alert(
                        "Please select a size before adding this item."
                    );

                    return;

                }


                addProductToCart(
                    productId,
                    selectedSize
                );

            }
        );

    });

}


/* =========================================================
   SIZE BUTTONS
========================================================= */

function initializeSizeButtons() {

    const buttons =
        document.querySelectorAll(
            ".ee-size-options button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const parent =
                    this.parentElement;


                parent
                    .querySelectorAll("button")
                    .forEach(item =>
                        item.classList.remove(
                            "selected"
                        )
                    );


                this.classList.add(
                    "selected"
                );

            }
        );

    });

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function initializeCategoryFilters() {

    const buttons =
        document.querySelectorAll(
            ".stock-filter"
        );


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    this.dataset.category ||
                    "all";


                buttons.forEach(item =>
                    item.classList.remove(
                        "active"
                    )
                );


                this.classList.add(
                    "active"
                );


                cards.forEach(card => {

                    const category =
                        card.dataset.category ||
                        "";


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display =
                            "none";

                    }

                });

            }
        );

    });

}


/* =========================================================
   WHATSAPP CHECKOUT
========================================================= */

function checkoutWhatsApp() {

    if (!cart.length) {

        alert(
            "Your basket is empty. Please add something first."
        );

        return;

    }


    const name =
        getInputValue("customerName");


    const location =
        getInputValue("customerLocation");


    if (!name || !location) {

        alert(
            "Please enter your name and delivery location."
        );

        return;

    }


    const lines = cart.map(item => {

        const quantity =
            item.quantity || 1;


        const subtotal =
            Number(item.price) *
            quantity;


        let line =
            `• ${item.name}`;


        if (quantity > 1) {

            line +=
                ` × ${quantity}`;

        }


        if (item.size) {

            line +=
                ` — Size: ${item.size}`;

        }


        line +=
            ` — GH₵${formatMoney(subtotal)}`;


        return line;

    });


    const message =

`Hi Everything Everything! 👋

I'd like to place an order.

MY ORDER:
${lines.join("\n")}

TOTAL:
GH₵${formatMoney(getCartTotal())}

CUSTOMER DETAILS:
Name: ${name}
Delivery location: ${location}

Please confirm my order and let me know the delivery details.

Thank you!`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   TOAST
========================================================= */

function showCartToast(message) {

    const toast =
        document.getElementById(
            "eeCartToast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        `✓ ${message}`;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toast._timeout
    );


    toast._timeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   HELPERS
========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

}


function formatMoney(value) {

    return Number(
        value || 0
    ).toFixed(2);

}


function escapeHTML(value) {

    return String(value ?? "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

        renderProducts(
            "#productGrid"
        );

    }
);
