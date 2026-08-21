/* =========================================================
   EVERYTHING EVERYTHING
   SITE-WIDE JAVASCRIPT
   ---------------------------------------------------------
   No Supabase
   Products are hosted directly on the website

   FEATURES
   - Product catalogue
   - Category filtering
   - Shared cart
   - LocalStorage cart persistence
   - Product sizes
   - Gift filtering
   - Grocery builder
   - Custom platter
   - WhatsApp checkout
   - Paystack checkout
========================================================= */


/* =========================================================
   1. CONFIGURATION
========================================================= */

const PAYSTACK_PUBLIC_KEY =
    "PASTE_YOUR_PAYSTACK_PUBLIC_KEY_HERE";

const WHATSAPP_NUMBER =
    "233595485044";

const CART_STORAGE_KEY =
    "everythingEverythingCart";


/* =========================================================
   2. PRODUCT DATABASE
   ---------------------------------------------------------
   Replace these products later with your real products.

   image:
   Replace with your actual image path, for example:

   "assets/products/shirt-1.jpg"

   price:
   Enter the price in Ghana cedis.
========================================================= */

const PRODUCTS = [

    /* =====================================================
       GROCERIES
    ===================================================== */

    {
        id: "grocery-rice",
        name: "Premium Rice",
        category: "Groceries",
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
        price: 30,
        image: "",
        icon: "🍌",
        description: "Fresh plantain.",
        stock: true
    },


    /* =====================================================
       CLOTHING
    ===================================================== */

    {
        id: "women-dress-01",
        name: "Elegant Women's Dress",
        category: "Women's Clothing",
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
        price: 100,
        image: "",
        icon: "👕",
        description: "Comfortable everyday T-shirt.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: true
    },


    /* =====================================================
       JEWELRY
    ===================================================== */

    {
        id: "jewelry-necklace-01",
        name: "Classic Necklace",
        category: "Jewelry",
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
        price: 250,
        image: "",
        icon: "⌚",
        description: "Clean and stylish everyday watch.",
        stock: true
    },


    /* =====================================================
       GIFTS
    ===================================================== */

    {
        id: "gift-birthday",
        name: "Birthday Gift Box",
        category: "Gifts",
        giftType: "Birthday",
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
        giftType: "Romantic",
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
        giftType: "Premium",
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
        giftType: "General",
        price: 180,
        image: "",
        icon: "🎀",
        description: "A beautiful gift for any occasion.",
        stock: true
    }

];


/* =========================================================
   3. CART
========================================================= */

let cart = loadCart();


/* =========================================================
   4. LOAD CART
========================================================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                CART_STORAGE_KEY
            );

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Could not load cart:",
            error
        );

        return [];
    }
}


/* =========================================================
   5. SAVE CART
========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Could not save cart:",
            error
        );
    }
}


/* =========================================================
   6. GET PRODUCT
========================================================= */

function getProduct(productId) {

    return PRODUCTS.find(
        product =>
            product.id === productId
    );
}


/* =========================================================
   7. ADD PRODUCT TO CART
========================================================= */

function addProductToCart(
    productId,
    size = ""
) {

    const product =
        getProduct(productId);

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

        alert(
            "Please select a size first."
        );

        return;
    }


    addToCart({

        id: product.id,

        name: product.name,

        price: product.price,

        category: product.category,

        icon: product.icon,

        image: product.image,

        size,

        desc: product.description

    });
}


/* =========================================================
   8. GENERIC ADD TO CART
========================================================= */

function addToCart(item) {

    const cartItem = {

        id:
            item.id ||
            createCartItemId(),

        name:
            item.name ||
            "Product",

        price:
            Number(item.price) || 0,

        category:
            item.category ||
            "General",

        icon:
            item.icon ||
            "🛍️",

        image:
            item.image ||
            "",

        desc:
            item.desc ||
            "",

        size:
            item.size ||
            "",

        details:
            item.details ||
            null,

        quantity:
            Number(item.quantity) || 1

    };


    const existingIndex =
        cart.findIndex(item =>

            item.id === cartItem.id &&
            item.size === cartItem.size &&
            item.desc === cartItem.desc

        );


    if (
        existingIndex !== -1 &&
        !cartItem.details
    ) {

        cart[existingIndex].quantity +=
            cartItem.quantity;

    } else {

        cart.push(cartItem);

    }


    saveCart();

    updateCart();

    updatePlatter();

    showCartToast(
        `${cartItem.name} added to cart`
    );
}


/* =========================================================
   9. UNIQUE CART ID
========================================================= */

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
   10. UPDATE CART
========================================================= */

function updateCart() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    const itemCount =
        cart.reduce(
            (total, item) =>
                total +
                (item.quantity || 1),
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

        cartItems.innerHTML = `
            <div style="
                padding:30px 0;
                text-align:center;
                color:#64748b;
            ">
                <div style="
                    font-size:40px;
                    margin-bottom:10px;
                ">
                    🛒
                </div>

                <strong>
                    Your cart is empty
                </strong>

                <p style="
                    margin-top:6px;
                    font-size:12px;
                ">
                    Add something from our store.
                </p>
            </div>
        `;

        if (cartTotal) {

            cartTotal.textContent =
                "GH₵0.00";
        }

        return;
    }


    cartItems.innerHTML =
        cart
            .map(
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
                                        ? `
                                            <small>
                                                Size:
                                                ${escapeHTML(item.size)}
                                            </small>
                                        `
                                        : ""
                                }

                                ${
                                    item.desc
                                        ? `
                                            <small>
                                                ${escapeHTML(item.desc)}
                                            </small>
                                        `
                                        : ""
                                }

                                <strong>
                                    GH₵${formatMoney(subtotal)}
                                </strong>

                            </div>


                            <div class="cart-item-actions">

                                ${
                                    !item.details
                                        ? `
                                            <div class="quantity-controls">

                                                <button
                                                    onclick="changeQuantity(${index}, -1)"
                                                >
                                                    −
                                                </button>

                                                <span>
                                                    ${quantity}
                                                </span>

                                                <button
                                                    onclick="changeQuantity(${index}, 1)"
                                                >
                                                    +
                                                </button>

                                            </div>
                                        `
                                        : ""
                                }

                                <button
                                    class="remove"
                                    onclick="removeItem(${index})"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");


    if (cartTotal) {

        cartTotal.textContent =
            `GH₵${formatMoney(getCartTotal())}`;
    }
}


/* =========================================================
   11. CHANGE QUANTITY
========================================================= */

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) +
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

    updatePlatter();
}


/* =========================================================
   12. REMOVE ITEM
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

    updatePlatter();
}


/* =========================================================
   13. CART TOTAL
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
   14. OPEN CART
========================================================= */

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) {
        return;
    }


    overlay.classList.add("open");

    document.body.classList.add(
        "cart-open"
    );

    updateCart();
}


/* =========================================================
   15. CLOSE CART
========================================================= */

function closeCart(event) {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) {
        return;
    }


    if (
        !event ||
        event.target === overlay
    ) {

        overlay.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "cart-open"
        );
    }
}


/* =========================================================
   16. CREATE PRODUCT CARDS
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
            product =>
                product.stock !== false
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
            .map(
                product =>
                    createProductCard(
                        product
                    )
            )
            .join("");


    initializeSizeButtons();

    initializeProductButtons();
}


/* =========================================================
   17. PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const hasImage =
        product.image &&
        product.image.trim();


    const imageHTML =
        hasImage
            ? `
                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                >
            `
            : `
                <span style="
                    font-size:60px;
                ">
                    ${product.icon}
                </span>
            `;


    const sizeHTML =
        product.sizes &&
        product.sizes.length
            ? `
                <div class="ee-size-label">
                    Select Size
                </div>

                <div
                    class="ee-size-options"
                    data-product="${escapeHTML(product.id)}"
                >

                    ${product.sizes
                        .map(
                            size =>
                                `
                                    <button
                                        type="button"
                                        data-size="${escapeHTML(size)}"
                                    >
                                        ${escapeHTML(size)}
                                    </button>
                                `
                        )
                        .join("")}

                </div>
            `
            : "";


    return `
        <article
            class="ee-fashion-card product-card"
            data-product-id="${escapeHTML(product.id)}"
            data-category="${escapeHTML(product.category)}"
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
   18. PRODUCT BUTTONS
========================================================= */

function initializeProductButtons() {

    const buttons =
        document.querySelectorAll(
            ".ee-add-fashion-cart"
        );


    buttons.forEach(button => {

        if (
            button.dataset.cartListener ===
            "true"
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.productId;


                const card =
                    this.closest(
                        ".product-card, .ee-fashion-card"
                    );


                const product =
                    getProduct(productId);


                if (!product) {

                    console.error(
                        "Product not found:",
                        productId
                    );

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


        button.dataset.cartListener =
            "true";
    });
}


/* =========================================================
   19. SIZE BUTTONS
========================================================= */

function initializeSizeButtons() {

    const buttons =
        document.querySelectorAll(
            ".ee-size-options button"
        );


    buttons.forEach(button => {

        if (
            button.dataset.sizeListener ===
            "true"
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const parent =
                    this.parentElement;


                parent
                    .querySelectorAll(
                        "button"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "selected"
                            )
                    );


                this.classList.add(
                    "selected"
                );

            }
        );


        button.dataset.sizeListener =
            "true";
    });
}


/* =========================================================
   20. CATEGORY FILTER
========================================================= */

function initializeCategoryFilters() {

    const buttons =
        document.querySelectorAll(
            ".ee-category-btn"
        );


    const cards =
        document.querySelectorAll(
            ".product-card, .ee-fashion-card"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        if (
            button.dataset.filterListener ===
            "true"
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const filter =
                    this.dataset.category ||
                    this.dataset.filter ||
                    "all";


                buttons.forEach(
                    item =>
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
                        category.toLowerCase() ===
                        filter.toLowerCase()
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";
                    }

                });

            }
        );


        button.dataset.filterListener =
            "true";
    });
}


/* =========================================================
   21. GIFT FILTER
========================================================= */

function initializeGiftFilters() {

    const buttons =
        document.querySelectorAll(
            ".ee-gift-btn"
        );


    const cards =
        document.querySelectorAll(
            ".ee-gift-card"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        if (
            button.dataset.giftListener ===
            "true"
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const filter =
                    this.dataset.gift ||
                    "all";


                buttons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                cards.forEach(card => {

                    const type =
                        card.dataset.giftType ||
                        "";


                    if (
                        filter === "all" ||
                        type === filter
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";
                    }

                });

            }
        );


        button.dataset.giftListener =
            "true";
    });
}


/* =========================================================
   22. GROCERY BUILDER
========================================================= */

const GROCERY_INGREDIENTS = {

    "Jollof Rice": [

        {
            name: "Rice",
            price: 85,
            icon: "🍚"
        },

        {
            name: "Chicken",
            price: 75,
            icon: "🍗"
        },

        {
            name: "Tomatoes",
            price: 25,
            icon: "🍅"
        },

        {
            name: "Onions",
            price: 20,
            icon: "🧅"
        },

        {
            name: "Cooking Oil",
            price: 65,
            icon: "🫗"
        }

    ],


    "Fried Rice": [

        {
            name: "Rice",
            price: 85,
            icon: "🍚"
        },

        {
            name: "Chicken",
            price: 75,
            icon: "🍗"
        },

        {
            name: "Vegetables",
            price: 30,
            icon: "🥕"
        },

        {
            name: "Eggs",
            price: 25,
            icon: "🥚"
        }

    ],


    "Waakye": [

        {
            name: "Rice",
            price: 85,
            icon: "🍚"
        },

        {
            name: "Beans",
            price: 35,
            icon: "🫘"
        },

        {
            name: "Plantain",
            price: 30,
            icon: "🍌"
        },

        {
            name: "Egg",
            price: 15,
            icon: "🥚"
        }

    ]

};


function loadGroceryBuilder() {

    const mealSelect =
        document.getElementById(
            "meal"
        );

    if (!mealSelect) {
        return;
    }


    const meals =
        Object.keys(
            GROCERY_INGREDIENTS
        );


    mealSelect.innerHTML =
        meals
            .map(
                meal =>
                    `
                        <option value="${escapeHTML(meal)}">
                            ${escapeHTML(meal)}
                        </option>
                    `
            )
            .join("");


    showIngredients(
        mealSelect.value
    );


    if (
        mealSelect.dataset.listenerAttached !==
        "true"
    ) {

        mealSelect.addEventListener(
            "change",
            function () {

                showIngredients(
                    this.value
                );

            }
        );


        mealSelect.dataset.listenerAttached =
            "true";
    }
}


/* =========================================================
   23. SHOW INGREDIENTS
========================================================= */

function showIngredients(
    mealName
) {

    const container =
        document.getElementById(
            "ingredientList"
        );


    if (!container) {
        return;
    }


    const items =
        GROCERY_INGREDIENTS[
            mealName
        ] || [];


    container.innerHTML =
        items
            .map(
                (item, index) =>
                    `
                        <label
                            class="ingredient-option"
                        >

                            <input
                                type="checkbox"
                                value="${index}"
                                data-price="${item.price}"
                                data-name="${escapeHTML(item.name)}"
                                onchange="updateCustomTotal()"
                            >

                            <span class="ingredient-icon">
                                ${item.icon}
                            </span>

                            <span class="ingredient-info">

                                <strong>
                                    ${escapeHTML(item.name)}
                                </strong>

                                <small>
                                    GH₵${formatMoney(item.price)}
                                </small>

                            </span>

                        </label>
                    `
            )
            .join("");


    updateCustomTotal();
}


/* =========================================================
   24. GROCERY TOTAL
========================================================= */

function updateCustomTotal() {

    const container =
        document.getElementById(
            "ingredientList"
        );

    const totalElement =
        document.getElementById(
            "builderTotal"
        );


    if (
        !container ||
        !totalElement
    ) {
        return;
    }


    const selected =
        container.querySelectorAll(
            "input[type='checkbox']:checked"
        );


    let total = 0;


    selected.forEach(
        input => {

            total +=
                Number(
                    input.dataset.price
                ) || 0;

        }
    );


    totalElement.textContent =
        `GH₵${formatMoney(total)}`;
}


/* =========================================================
   25. ADD CUSTOM PLATTER
========================================================= */

function addCustomPlatter() {

    const mealSelect =
        document.getElementById(
            "meal"
        );

    const ingredientList =
        document.getElementById(
            "ingredientList"
        );


    if (
        !mealSelect ||
        !ingredientList
    ) {
        return;
    }


    const selected =
        ingredientList.querySelectorAll(
            "input[type='checkbox']:checked"
        );


    if (!selected.length) {

        alert(
            "Please select at least one ingredient."
        );

        return;
    }


    const items = [];


    selected.forEach(
        input => {

            items.push({

                name:
                    input.dataset.name,

                price:
                    Number(
                        input.dataset.price
                    ) || 0

            });

        }
    );


    const total =
        items.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );


    addToCart({

        id:
            createCartItemId(),

        name:
            `${mealSelect.value} Grocery Platter`,

        price:
            total,

        category:
            "Groceries",

        icon:
            "🧺",

        desc:
            items
                .map(
                    item => item.name
                )
                .join(", "),

        details:
            items

    });


    openCart();
}


/* =========================================================
   26. PLATTER
========================================================= */

function updatePlatter() {

    const container =
        document.getElementById(
            "platterItems"
        );

    const totalElement =
        document.getElementById(
            "platterTotal"
        );


    if (!container) {
        return;
    }


    if (!cart.length) {

        container.innerHTML = `
            <div class="empty-platter">

                <div style="font-size:45px">
                    🍽️
                </div>

                <h3>
                    Your platter is empty
                </h3>

                <p>
                    Add products from our store
                    to create your order.
                </p>

            </div>
        `;


        if (totalElement) {

            totalElement.textContent =
                "GH₵0.00";
        }


        return;
    }


    container.innerHTML =
        cart
            .map(
                (item, index) => {

                    const quantity =
                        item.quantity || 1;

                    const subtotal =
                        Number(item.price) *
                        quantity;


                    return `
                        <div class="platter-item-row">

                            <div class="platter-item-icon">
                                ${item.icon}
                            </div>

                            <div class="platter-item-info">

                                <strong>
                                    ${escapeHTML(item.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(item.category)}
                                </small>

                                ${
                                    item.size
                                        ? `
                                            <small>
                                                Size:
                                                ${escapeHTML(item.size)}
                                            </small>
                                        `
                                        : ""
                                }

                            </div>

                            <div class="platter-item-price">

                                GH₵${formatMoney(subtotal)}

                                <button
                                    onclick="removeItem(${index})"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    `;
                }
            )
            .join("");


    if (totalElement) {

        totalElement.textContent =
            `GH₵${formatMoney(
                getCartTotal()
            )}`;
    }
}


/* =========================================================
   27. WHATSAPP CHECKOUT
========================================================= */

function checkoutWhatsApp() {

    if (!cart.length) {

        alert(
            "Please add something to your cart first."
        );

        return;
    }


    const name =
        getInputValue(
            "customerName"
        );

    const location =
        getInputValue(
            "customerLocation"
        );


    if (
        !name ||
        !location
    ) {

        alert(
            "Please enter your name and delivery location."
        );

        return;
    }


    const lines =
        cart.map(
            item => {

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
                    ` — GH₵${formatMoney(
                        subtotal
                    )}`;


                return line;
            }
        );


    const message =
`Hi Everything Everything! I'd like to place an order:

${lines.join("\n")}

Total: GH₵${formatMoney(
    getCartTotal()
)}

Name: ${name}

Delivery location: ${location}`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            message
        )}`;


    window.open(
        url,
        "_blank",
        "noopener"
    );
}


/* =========================================================
   28. PAYSTACK
========================================================= */

function showEmailThenPay() {

    const emailField =
        document.getElementById(
            "emailField"
        );


    if (!emailField) {

        checkoutPaystack();

        return;
    }


    if (
        emailField.style.display ===
        "none" ||
        !emailField.style.display
    ) {

        emailField.style.display =
            "block";


        const input =
            document.getElementById(
                "customerEmail"
            );


        if (input) {
            input.focus();
        }


        return;
    }


    checkoutPaystack();
}


/* =========================================================
   29. PAYSTACK CHECKOUT
========================================================= */

function checkoutPaystack() {

    if (!cart.length) {

        alert(
            "Please add something to your cart first."
        );

        return;
    }


    const name =
        getInputValue(
            "customerName"
        );

    const location =
        getInputValue(
            "customerLocation"
        );

    const email =
        getInputValue(
            "customerEmail"
        );

    const phone =
        getInputValue(
            "customerPhone"
        );


    if (
        !name ||
        !location ||
        !email
    ) {

        alert(
            "Please enter your name, delivery location and email."
        );

        return;
    }


    if (
        !PAYSTACK_PUBLIC_KEY ||
        PAYSTACK_PUBLIC_KEY.includes(
            "PASTE_YOUR"
        )
    ) {

        alert(
            "Your Paystack public key has not been added yet."
        );

        return;
    }


    if (
        typeof PaystackPop ===
        "undefined"
    ) {

        alert(
            "Paystack could not be loaded. Please refresh the page."
        );

        return;
    }


    const reference =
        createPaymentReference();


    const popup =
        new PaystackPop();


    popup.newTransaction({

        key:
            PAYSTACK_PUBLIC_KEY,

        email,

        amount:
            Math.round(
                getCartTotal() * 100
            ),

        currency:
            "GHS",

        reference,

        firstName:
            name.split(" ")[0] || "",

        phone,

        metadata: {

            name,

            phone,

            location,

            cart:
                cart.map(
                    item => ({

                        name:
                            item.name,

                        price:
                            item.price,

                        quantity:
                            item.quantity || 1,

                        category:
                            item.category,

                        size:
                            item.size || "",

                        description:
                            item.desc || ""

                    })
                )

        },


        onSuccess:
            function(transaction) {

                handleSuccessfulPayment(
                    transaction.reference ||
                    reference
                );

            },


        onCancel:
            function() {

                console.log(
                    "Payment cancelled."
                );

            },


        onError:
            function(error) {

                console.error(
                    "Paystack error:",
                    error
                );

                alert(
                    "There was a problem opening Paystack."
                );

            }

    });
}


/* =========================================================
   30. PAYMENT REFERENCE
========================================================= */

function createPaymentReference() {

    return (
        "EE_" +
        Date.now() +
        "_" +
        Math.floor(
            Math.random() * 100000
        )
    );
}


/* =========================================================
   31. SUCCESSFUL PAYMENT
========================================================= */

function handleSuccessfulPayment(
    reference
) {

    const order =
        {

            reference,

            customer: {

                name:
                    getInputValue(
                        "customerName"
                    ),

                location:
                    getInputValue(
                        "customerLocation"
                    ),

                email:
                    getInputValue(
                        "customerEmail"
                    ),

                phone:
                    getInputValue(
                        "customerPhone"
                    )

            },

            items:
                [...cart],

            total:
                getCartTotal()

        };


    /*
       Save the order locally.

       Later we can connect this to
       a secure backend / Paystack verification.
    */

    localStorage.setItem(
        "lastEverythingEverythingOrder",
        JSON.stringify(order)
    );


    cart = [];

    saveCart();

    updateCart();

    updatePlatter();

    closeCart();


    alert(
        `Payment successful!\n\n` +
        `Reference: ${reference}\n\n` +
        `Thank you for shopping with Everything Everything.`
    );
}


/* =========================================================
   32. MEAL SELECTION
========================================================= */

function chooseMeal(
    mealName
) {

    const mealSelect =
        document.getElementById(
            "meal"
        );


    if (!mealSelect) {

        window.location.href =
            `groceries.html?meal=${encodeURIComponent(
                mealName
            )}`;

        return;
    }


    mealSelect.value =
        mealName;


    showIngredients(
        mealName
    );


    const build =
        document.getElementById(
            "build"
        );


    if (build) {

        build.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =========================================================
   33. URL MEAL
========================================================= */

function handleMealURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const meal =
        params.get("meal");


    if (!meal) {
        return;
    }


    if (
        GROCERY_INGREDIENTS[meal]
    ) {

        const mealSelect =
            document.getElementById(
                "meal"
            );


        if (mealSelect) {

            mealSelect.value =
                meal;

            showIngredients(
                meal
            );
        }
    }
}


/* =========================================================
   34. CART TOAST
========================================================= */

function showCartToast(
    message
) {

    let toast =
        document.getElementById(
            "eeCartToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "eeCartToast";

        toast.className =
            "ee-cart-toast";

        document.body.appendChild(
            toast
        );
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
   35. INPUT HELPER
========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value.trim()
        : "";
}


/* =========================================================
   36. MONEY
========================================================= */

function formatMoney(value) {

    return Number(
        value || 0
    ).toFixed(2);
}


/* =========================================================
   37. HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
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
   38. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Cart
        */

        updateCart();


        /*
           Platter
        */

        updatePlatter();


        /*
           Grocery builder
        */

        loadGroceryBuilder();


        /*
           Product cards
           Only renders automatically if
           a product container exists.
        */

        const productContainer =
            document.querySelector(
                "[data-product-grid]"
            );


        if (productContainer) {

            renderProducts(
                "[data-product-grid]"
            );
        }


        /*
           Existing product cards
        */

        initializeProductButtons();

        initializeSizeButtons();


        /*
           Filters
        */

        initializeCategoryFilters();

        initializeGiftFilters();


        /*
           Grocery URL
        */

        handleMealURL();

    }
);
