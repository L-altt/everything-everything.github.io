/* =========================================================
   EVERYTHING EVERYTHING
   SITE-WIDE JAVASCRIPT
   ---------------------------------------------------------
   Static products — NO SUPABASE
   Paystack retained
   WhatsApp retained
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
   Replace these products, prices and images later.
========================================================= */

const products = [

    /* =========================
       GROCERIES
    ========================= */

    {
        id: "grocery-rice",
        name: "Premium Long Grain Rice",
        category: "Groceries",
        subcategory: "Staples",
        price: 85,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
        description: "Quality long grain rice suitable for everyday meals.",
        icon: "🍚"
    },

    {
        id: "grocery-oil",
        name: "Cooking Oil",
        category: "Groceries",
        subcategory: "Cooking Essentials",
        price: 65,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
        description: "Everyday cooking oil for your kitchen.",
        icon: "🫗"
    },

    {
        id: "grocery-pasta",
        name: "Premium Pasta",
        category: "Groceries",
        subcategory: "Staples",
        price: 35,
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=800&q=80",
        description: "Easy-to-prepare pasta for quick and delicious meals.",
        icon: "🍝"
    },

    {
        id: "grocery-cereal",
        name: "Breakfast Cereal",
        category: "Groceries",
        subcategory: "Breakfast",
        price: 55,
        image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=800&q=80",
        description: "A convenient breakfast option for busy mornings.",
        icon: "🥣"
    },

    {
        id: "grocery-fruit",
        name: "Fresh Fruit Selection",
        category: "Groceries",
        subcategory: "Fresh Produce",
        price: 70,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
        description: "A colourful selection of fresh fruits.",
        icon: "🍎"
    },

    {
        id: "grocery-snacks",
        name: "Snack Selection",
        category: "Groceries",
        subcategory: "Snacks",
        price: 45,
        image: "https://images.unsplash.com/photo-1621939514649-280e2aa4c6b9?auto=format&fit=crop&w=800&q=80",
        description: "A selection of tasty snacks for any occasion.",
        icon: "🍿"
    },


    /* =========================
       WOMEN'S CLOTHING
    ========================= */

    {
        id: "women-dress",
        name: "Classic Women's Dress",
        category: "Clothing",
        subcategory: "Women",
        price: 280,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description: "Elegant everyday dress with a clean modern silhouette.",
        icon: "👗",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "women-top",
        name: "Women's Casual Top",
        category: "Clothing",
        subcategory: "Women",
        price: 150,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        description: "Simple and versatile top for everyday styling.",
        icon: "👚",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "women-skirt",
        name: "Women's Pleated Skirt",
        category: "Clothing",
        subcategory: "Women",
        price: 190,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=800&q=80",
        description: "A stylish pleated skirt designed for effortless outfits.",
        icon: "👗",
        sizes: ["S", "M", "L", "XL"]
    },


    /* =========================
       MEN'S CLOTHING
    ========================= */

    {
        id: "men-shirt",
        name: "Classic Men's Shirt",
        category: "Clothing",
        subcategory: "Men",
        price: 180,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        description: "Smart casual shirt suitable for different occasions.",
        icon: "👔",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: "men-polo",
        name: "Classic Polo Shirt",
        category: "Clothing",
        subcategory: "Men",
        price: 160,
        image: "https://images.unsplash.com/photo-1625910513413-5fc45b1f0c4f?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable polo shirt with a timeless design.",
        icon: "👕",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: "men-trousers",
        name: "Smart Casual Trousers",
        category: "Clothing",
        subcategory: "Men",
        price: 220,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
        description: "Clean-cut trousers for smart and casual occasions.",
        icon: "👖",
        sizes: ["30", "32", "34", "36", "38", "40"]
    },


    /* =========================
       JEWELRY
    ========================= */

    {
        id: "jewelry-necklace",
        name: "Elegant Gold Necklace",
        category: "Jewelry",
        subcategory: "Necklaces",
        price: 350,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        description: "Elegant necklace designed to complement any outfit.",
        icon: "📿"
    },

    {
        id: "jewelry-bracelet",
        name: "Classic Bracelet",
        category: "Jewelry",
        subcategory: "Bracelets",
        price: 180,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
        description: "A simple bracelet for everyday elegance.",
        icon: "📿"
    },

    {
        id: "jewelry-earrings",
        name: "Elegant Earrings",
        category: "Jewelry",
        subcategory: "Earrings",
        price: 150,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        description: "Elegant earrings that add a polished finishing touch.",
        icon: "💎"
    },

    {
        id: "jewelry-ring",
        name: "Classic Fashion Ring",
        category: "Jewelry",
        subcategory: "Rings",
        price: 120,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        description: "Minimal fashion ring with a sophisticated appearance.",
        icon: "💍",
        sizes: ["6", "7", "8", "9", "10"]
    },


    /* =========================
       GIFTS
    ========================= */

    {
        id: "gift-birthday",
        name: "Birthday Gift Box",
        category: "Gifts",
        subcategory: "Birthday",
        price: 250,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
        description: "A thoughtful gift box prepared for birthdays.",
        icon: "🎁"
    },

    {
        id: "gift-romantic",
        name: "Romantic Gift Set",
        category: "Gifts",
        subcategory: "Romantic",
        price: 320,
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
        description: "A carefully selected gift set for someone special.",
        icon: "❤️"
    },

    {
        id: "gift-selfcare",
        name: "Self-Care Gift Box",
        category: "Gifts",
        subcategory: "Self Care",
        price: 280,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
        description: "A relaxing collection of self-care essentials.",
        icon: "🧴"
    },

    {
        id: "gift-premium",
        name: "Premium Gift Box",
        category: "Gifts",
        subcategory: "Premium",
        price: 450,
        image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=80",
        description: "A premium gift collection for important occasions.",
        icon: "🎁"
    }

];


/* =========================================================
   3. CART
========================================================= */

let cart = loadCart();


function loadCart() {

    try {

        const saved =
            localStorage.getItem(CART_STORAGE_KEY);

        if (!saved) return [];

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Cart loading error:",
            error
        );

        return [];
    }
}


function saveCart() {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );
}


/* =========================================================
   4. PRODUCT RENDERING
========================================================= */

function renderProducts(
    containerId,
    productList = products
) {

    const container =
        document.getElementById(containerId);

    if (!container) return;


    if (!productList.length) {

        container.innerHTML = `
            <div class="empty-products">
                <h3>No products found</h3>
                <p>Try another category or search term.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        productList.map(product => {

            const sizes =
                product.sizes || [];


            return `
                <article
                    class="ee-fashion-card product-card"
                    data-product-id="${product.id}"
                >

                    <div class="ee-fashion-image">

                        <img
                            src="${product.image}"
                            alt="${escapeHTML(product.name)}"
                            loading="lazy"
                        >

                        <span class="ee-badge">
                            ${escapeHTML(product.category)}
                        </span>

                    </div>


                    <div class="ee-fashion-info">

                        <small class="product-category">
                            ${escapeHTML(product.subcategory || "")}
                        </small>

                        <h4>
                            ${escapeHTML(product.name)}
                        </h4>

                        <p class="ee-product-description">
                            ${escapeHTML(product.description)}
                        </p>


                        <div class="ee-price">
                            GH₵${formatMoney(product.price)}
                        </div>


                        ${
                            sizes.length
                            ? `
                                <div class="ee-size-label">
                                    Select size
                                </div>

                                <div class="ee-size-options">

                                    ${sizes.map(size => `
                                        <button
                                            type="button"
                                            data-size="${escapeHTML(size)}"
                                        >
                                            ${escapeHTML(size)}
                                        </button>
                                    `).join("")}

                                </div>
                            `
                            : ""
                        }


                        <button
                            class="ee-add-fashion-cart"
                            type="button"
                            onclick="addProductFromCard('${product.id}')"
                        >
                            Add to Cart
                        </button>

                    </div>

                </article>
            `;

        }).join("");


    initializeSizeButtons();
}


/* =========================================================
   5. RENDER HOME PRODUCTS
========================================================= */

function renderHomeProducts() {

    const container =
        document.getElementById(
            "homeProducts"
        );

    if (!container) return;


    renderProducts(
        "homeProducts",
        products.slice(0, 8)
    );
}


/* =========================================================
   6. RENDER CATEGORY
========================================================= */

function renderCategoryProducts(
    category,
    containerId
) {

    const filtered =
        products.filter(
            product =>
                product.category.toLowerCase() ===
                category.toLowerCase()
        );


    renderProducts(
        containerId,
        filtered
    );
}


/* =========================================================
   7. SEARCH
========================================================= */

function searchProducts(
    searchTerm,
    containerId = "productGrid"
) {

    const term =
        String(searchTerm || "")
            .trim()
            .toLowerCase();


    if (!term) {

        renderProducts(
            containerId,
            products
        );

        return;
    }


    const results =
        products.filter(product => {

            const searchable = [

                product.name,

                product.category,

                product.subcategory,

                product.description

            ]
                .join(" ")
                .toLowerCase();


            return searchable.includes(term);

        });


    renderProducts(
        containerId,
        results
    );
}


/* =========================================================
   8. CATEGORY FILTER
========================================================= */

function filterProducts(
    category,
    containerId = "productGrid"
) {

    if (
        !category ||
        category.toLowerCase() === "all"
    ) {

        renderProducts(
            containerId,
            products
        );

        return;
    }


    const filtered =
        products.filter(
            product =>
                product.category.toLowerCase() ===
                category.toLowerCase()
        );


    renderProducts(
        containerId,
        filtered
    );
}


/* =========================================================
   9. ADD PRODUCT FROM CARD
========================================================= */

function addProductFromCard(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const card =
        document.querySelector(
            `[data-product-id="${productId}"]`
        );


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


    addToCart({

        ...product,

        size:
            selectedSize

    });
}


/* =========================================================
   10. ADD TO CART
========================================================= */

function addToCart(item) {

    const cartItem = {

        id:
            item.id ||
            createCartItemId(),

        name:
            item.name || "Product",

        price:
            Number(item.price) || 0,

        image:
            item.image || "",

        icon:
            item.icon || "🛍️",

        category:
            item.category || "General",

        desc:
            item.description ||
            item.desc ||
            "",

        size:
            item.size || "",

        quantity:
            Number(item.quantity) || 1

    };


    const existingIndex =
        cart.findIndex(existing =>

            existing.id === cartItem.id &&
            existing.size === cartItem.size

        );


    if (existingIndex !== -1) {

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
   11. CART ID
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
   12. UPDATE CART
========================================================= */

function updateCart() {

    const countElement =
        document.getElementById(
            "cartCount"
        );

    const itemsElement =
        document.getElementById(
            "cartItems"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    const count =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.quantity || 1),
            0
        );


    if (countElement) {

        countElement.textContent =
            count;
    }


    if (!itemsElement) {
        return;
    }


    if (!cart.length) {

        itemsElement.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something from our store.</p>
            </div>
        `;


        if (totalElement) {

            totalElement.textContent =
                "GH₵0.00";
        }


        return;
    }


    itemsElement.innerHTML =
        cart.map((item, index) => {

            const quantity =
                item.quantity || 1;


            const subtotal =
                Number(item.price) *
                quantity;


            return `
                <div class="cart-item">

                    <div class="cart-item-info">

                        ${
                            item.image
                            ? `
                                <img
                                    src="${item.image}"
                                    alt=""
                                    class="cart-product-image"
                                >
                            `
                            : `
                                <span class="cart-product-icon">
                                    ${item.icon}
                                </span>
                            `
                        }


                        <div>

                            <b>
                                ${escapeHTML(item.name)}
                            </b>

                            <small>
                                ${escapeHTML(item.category)}
                            </small>

                            ${
                                item.size
                                ? `
                                    <small>
                                        Size: ${escapeHTML(item.size)}
                                    </small>
                                `
                                : ""
                            }

                            <strong>
                                GH₵${formatMoney(subtotal)}
                            </strong>

                        </div>

                    </div>


                    <div class="cart-item-actions">

                        <div class="quantity-controls">

                            <button
                                type="button"
                                onclick="changeQuantity(${index}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(${index}, 1)"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove"
                            type="button"
                            onclick="removeItem(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");


    if (totalElement) {

        totalElement.textContent =
            `GH₵${formatMoney(getCartTotal())}`;
    }
}


/* =========================================================
   13. QUANTITY
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
   14. REMOVE
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
   15. CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.price) *
                    (item.quantity || 1)
                );

        },
        0
    );
}


/* =========================================================
   16. OPEN CART
========================================================= */

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.add(
        "open"
    );


    updateCart();
}


/* =========================================================
   17. CLOSE CART
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
    }
}


/* =========================================================
   18. SIZE BUTTONS
========================================================= */

function initializeSizeButtons() {

    document
        .querySelectorAll(
            ".ee-size-options button"
        )
        .forEach(button => {

            if (
                button.dataset.sizeListener
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
   19. GIFT FILTER
========================================================= */

function initializeGiftFilters() {

    const buttons =
        document.querySelectorAll(
            ".ee-gift-btn"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    this.dataset.gift;


                buttons.forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );


                this.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".ee-gift-card"
                    )
                    .forEach(card => {

                        const type =
                            card.dataset.giftType;


                        card.style.display =
                            (
                                filter === "all" ||
                                type === filter
                            )
                            ? ""
                            : "none";

                    });

            }
        );

    });
}


/* =========================================================
   20. PLATTER
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

                <div>
                    🍽️
                </div>

                <h3>
                    Your platter is empty
                </h3>

                <p>
                    Add groceries, clothing,
                    jewelry or gifts to create
                    your custom platter.
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
        cart.map((item, index) => {

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
                                    Size: ${escapeHTML(item.size)}
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

        }).join("");


    if (totalElement) {

        totalElement.textContent =
            `GH₵${formatMoney(getCartTotal())}`;
    }
}


/* =========================================================
   21. WHATSAPP CHECKOUT
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


    if (!name || !location) {

        alert(
            "Please enter your name and delivery location."
        );

        return;
    }


    const lines =
        cart.map(item => {

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
`Hello Everything Everything! 👋

I'd like to place an order:

${lines.join("\n")}

Total: GH₵${formatMoney(getCartTotal())}

Name: ${name}
Delivery location: ${location}`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank"
    );
}


/* =========================================================
   22. SHOW EMAIL THEN PAY
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
   23. PAYSTACK
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
            "Your Paystack public key has not been connected yet."
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

            customer_name:
                name,

            delivery_location:
                location,

            cart:
                cart.map(item => ({

                    name:
                        item.name,

                    price:
                        item.price,

                    quantity:
                        item.quantity || 1,

                    category:
                        item.category,

                    size:
                        item.size || ""

                }))

        },


        onSuccess:
            function(transaction) {

                alert(
                    "Payment successful!\n\n" +
                    "Reference: " +
                    transaction.reference
                );


                /*
                   Clear cart after successful
                   payment.
                */

                cart = [];

                saveCart();

                updateCart();

                updatePlatter();

                closeCart();

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
   24. PAYMENT REFERENCE
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
   25. PRODUCT ICON
========================================================= */

function getProductIcon(
    category
) {

    const value =
        String(category)
            .toLowerCase();


    if (
        value.includes("jewelry")
    ) {
        return "💍";
    }


    if (
        value.includes("clothing")
    ) {
        return "👕";
    }


    if (
        value.includes("gift")
    ) {
        return "🎁";
    }


    if (
        value.includes("grocery")
    ) {
        return "🛒";
    }


    return "🛍️";
}


/* =========================================================
   26. INPUT HELPER
========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";
}


/* =========================================================
   27. MONEY
========================================================= */

function formatMoney(value) {

    return Number(
        value || 0
    ).toFixed(2);
}


/* =========================================================
   28. HTML ESCAPE
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
   29. CART TOAST
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
   30. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        !menuButton ||
        !mobileMenu
    ) {
        return;
    }


    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );
}


/* =========================================================
   31. GLOBAL SEARCH INPUT
========================================================= */

function initializeSearch() {

    const searchInputs =
        document.querySelectorAll(
            "[data-product-search]"
        );


    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            function () {

                const target =
                    this.dataset.productSearch ||
                    "productGrid";


                searchProducts(
                    this.value,
                    target
                );

            }
        );

    });
}


/* =========================================================
   32. CATEGORY BUTTONS
========================================================= */

function initializeCategoryButtons() {

    document
        .querySelectorAll(
            "[data-category-filter]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.categoryFilter;


                    const target =
                        this.dataset.target ||
                        "productGrid";


                    document
                        .querySelectorAll(
                            "[data-category-filter]"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );


                    this.classList.add(
                        "active"
                    );


                    filterProducts(
                        category,
                        target
                    );

                }
            );

        });
}


/* =========================================================
   33. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Cart
        */

        updateCart();

        updatePlatter();


        /*
           Product sections.
           These only render when the
           matching containers exist.
        */

        renderHomeProducts();


        if (
            document.getElementById(
                "groceriesGrid"
            )
        ) {

            renderCategoryProducts(
                "Groceries",
                "groceriesGrid"
            );

        }


        if (
            document.getElementById(
                "clothingGrid"
            )
        ) {

            renderCategoryProducts(
                "Clothing",
                "clothingGrid"
            );

        }


        if (
            document.getElementById(
                "jewelryGrid"
            )
        ) {

            renderCategoryProducts(
                "Jewelry",
                "jewelryGrid"
            );

        }


        if (
            document.getElementById(
                "giftsGrid"
            )
        ) {

            renderCategoryProducts(
                "Gifts",
                "giftsGrid"
            );

        }


        /*
           UI
        */

        initializeSizeButtons();

        initializeGiftFilters();

        initializeMobileMenu();

        initializeSearch();

        initializeCategoryButtons();

    }
);


/* =========================================================
   34. MAKE FUNCTIONS AVAILABLE TO HTML
========================================================= */

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.addToCart =
    addToCart;

window.addProductFromCard =
    addProductFromCard;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

window.checkoutWhatsApp =
    checkoutWhatsApp;

window.showEmailThenPay =
    showEmailThenPay;

window.checkoutPaystack =
    checkoutPaystack;

window.filterProducts =
    filterProducts;

window.searchProducts =
    searchProducts;

window.renderProducts =
    renderProducts;

window.updateCart =
    updateCart;

window.updatePlatter =
    updatePlatter;
