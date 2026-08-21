/* =========================================================
   EVERYTHING EVERYTHING
   MAIN SITE JAVASCRIPT
   =========================================================
   Features:
   - Shared cart
   - LocalStorage persistence
   - Supabase grocery data
   - Grocery/custom platter builder
   - Clothing sizes
   - Jewelry sizes
   - Gift filters
   - Platter page
   - WhatsApp checkout
   - Paystack checkout
   - Mobile navigation
   - Smooth navigation
========================================================= */


/* =========================================================
   1. CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://spplkkeeisaozamrsfwg.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_py0X361Nk1IT8YGrsj_xsQ_OQe2jBYM";

const PAYSTACK_PUBLIC_KEY =
    "PASTE_YOUR_PAYSTACK_PUBLIC_KEY_HERE";

const VERIFY_FUNCTION_URL =
    `${SUPABASE_URL}/functions/v1/verify-payment`;

const WHATSAPP_NUMBER =
    "233595485044";

const CART_STORAGE_KEY =
    "everythingEverythingCart";


/* =========================================================
   2. SUPABASE
========================================================= */

let supabase = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {
    supabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}


/* =========================================================
   3. GLOBAL DATA
========================================================= */

let ingredients = {};
let mealCategories = {};

let cart = loadCart();


/* =========================================================
   4. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeSite
);


function initializeSite() {

    /*
       Core site functions
    */

    updateCart();
    updatePlatter();

    initializeNavigation();
    initializeCartButtons();

    initializeProductButtons();
    initializeSizeButtons();
    initializeGiftFilters();

    initializeStockButtons();

    loadData();
    handleMealURL();

}


/* =========================================================
   5. NAVIGATION
========================================================= */

function initializeNavigation() {

    const menuButton =
        document.querySelector(
            "[data-menu-toggle]"
        );

    const mobileMenu =
        document.querySelector(
            "[data-mobile-menu]"
        );


    if (
        menuButton &&
        mobileMenu
    ) {

        menuButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.toggle(
                    "open"
                );

                menuButton.classList.toggle(
                    "active"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    function () {

                        mobileMenu.classList.remove(
                            "open"
                        );

                        menuButton.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /*
       Smooth scrolling for internal links.
    */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                function(event) {

                    const targetID =
                        this.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

}


/* =========================================================
   6. STOCK BUTTONS
========================================================= */

function initializeStockButtons() {

    document
        .querySelectorAll(
            "[data-stock-link]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    const target =
                        document.getElementById(
                            "stock"
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

}


/* =========================================================
   7. CART STORAGE
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


    } catch(error) {

        console.error(
            "Cart loading error:",
            error
        );

        return [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );


    } catch(error) {

        console.error(
            "Cart saving error:",
            error
        );

    }

}


/* =========================================================
   8. CART BUTTONS
========================================================= */

function initializeCartButtons() {

    document
        .querySelectorAll(
            "[data-open-cart]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openCart
            );

        });

}


/* =========================================================
   9. ADD TO CART
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

        icon:
            item.icon ||
            "🛍️",

        category:
            item.category ||
            "General",

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
        cart.findIndex(existing =>

            existing.name === cartItem.name &&
            existing.price === cartItem.price &&
            existing.size === cartItem.size &&
            existing.desc === cartItem.desc

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
   10. CART ID
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
   11. UPDATE CART
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
            (sum, item) =>
                sum +
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
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something from our stock to get started.</p>
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
                (item,index) => {

                    const quantity =
                        item.quantity || 1;


                    const subtotal =
                        Number(item.price) *
                        quantity;


                    return `
                        <div class="cart-item">

                            <div class="cart-item-info">

                                <div class="cart-item-name">

                                    <span>
                                        ${item.icon}
                                    </span>

                                    <strong>
                                        ${escapeHTML(item.name)}
                                    </strong>

                                </div>


                                ${
                                    item.category
                                    ? `
                                        <small>
                                            ${escapeHTML(item.category)}
                                        </small>
                                    `
                                    : ""
                                }


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


                                <strong class="cart-item-price">
                                    GH₵${formatMoney(subtotal)}
                                </strong>

                            </div>


                            <div class="cart-item-actions">

                                ${
                                    !item.details
                                    ? `
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
                                    `
                                    : ""
                                }


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
            )
            .join("");


    const total =
        getCartTotal();


    if (cartTotal) {

        cartTotal.textContent =
            `GH₵${formatMoney(total)}`;

    }

}


/* =========================================================
   12. CHANGE QUANTITY
========================================================= */

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) +
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index,1);

    }


    saveCart();

    updateCart();
    updatePlatter();

}


/* =========================================================
   13. REMOVE ITEM
========================================================= */

function removeItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(index,1);

    saveCart();

    updateCart();
    updatePlatter();

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


    overlay.classList.add(
        "open"
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

    }

}


/* =========================================================
   16. SUPABASE GROCERY DATA
========================================================= */

async function loadData() {

    const ingredientList =
        document.getElementById(
            "ingredientList"
        );

    const mealSelect =
        document.getElementById(
            "meal"
        );


    /*
       No grocery builder on this page.
    */

    if (
        !ingredientList ||
        !mealSelect
    ) {

        return;

    }


    if (!supabase) {

        ingredientList.innerHTML = `
            <p>
                Grocery data could not be connected.
                Please refresh the page.
            </p>
        `;

        return;

    }


    try {

        const [
            ingredientResponse,
            mealResponse
        ] =
            await Promise.all([

                supabase
                    .from("ingredients")
                    .select("*")
                    .eq("in_stock",true),

                supabase
                    .from("meals")
                    .select("*")

            ]);


        if (
            ingredientResponse.error
        ) {

            throw ingredientResponse.error;

        }


        if (
            mealResponse.error
        ) {

            throw mealResponse.error;

        }


        ingredients = {};


        (
            ingredientResponse.data ||
            []
        )
        .forEach(row => {

            ingredients[row.id] = {

                id:
                    row.id,

                name:
                    row.name,

                price:
                    Number(row.price) || 0,

                unit:
                    row.unit || "",

                icon:
                    row.icon || "🛒"

            };

        });


        mealCategories = {};


        (
            mealResponse.data ||
            []
        )
        .forEach(row => {

            let ids =
                row.ingredient_ids;


            if (
                typeof ids ===
                "string"
            ) {

                try {

                    ids =
                        JSON.parse(ids);

                } catch {

                    ids = [];

                }

            }


            if (
                !Array.isArray(ids)
            ) {

                ids = [];

            }


            mealCategories[
                row.name
            ] = ids;

        });


        populateMealSelect();


    } catch(error) {

        console.error(
            "Supabase error:",
            error
        );


        ingredientList.innerHTML = `
            <p>
                Sorry, we couldn't load the grocery menu.
                Please refresh the page.
            </p>
        `;

    }

}


/* =========================================================
   17. MEAL SELECT
========================================================= */

function populateMealSelect() {

    const mealSelect =
        document.getElementById(
            "meal"
        );


    if (!mealSelect) {
        return;
    }


    const meals =
        Object.keys(
            mealCategories
        );


    if (!meals.length) {

        mealSelect.innerHTML = `
            <option>
                No meals available
            </option>
        `;

        return;

    }


    mealSelect.innerHTML =
        meals
            .map(
                meal => `
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
        !mealSelect.dataset.listenerAttached
    ) {

        mealSelect.addEventListener(
            "change",
            function() {

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
   18. INGREDIENTS
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


    const selectedIngredients =
        mealCategories[
            mealName
        ];


    if (!selectedIngredients) {

        container.innerHTML = "";

        updateCustomTotal();

        return;

    }


    container.innerHTML =
        selectedIngredients
            .map(
                id => {

                    const item =
                        ingredients[id];


                    if (!item) {
                        return "";
                    }


                    return `
                        <label class="ingredient-option">

                            <input
                                type="checkbox"
                                value="${escapeHTML(item.id)}"
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
                                    ${escapeHTML(item.unit)}
                                </small>

                            </span>

                        </label>
                    `;

                }
            )
            .join("");


    updateCustomTotal();

}


/* =========================================================
   19. CUSTOM TOTAL
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

            const item =
                ingredients[
                    input.value
                ];


            if (item) {

                total +=
                    item.price;

            }

        }
    );


    totalElement.textContent =
        `GH₵${formatMoney(total)}`;

}


/* =========================================================
   20. ADD CUSTOM PLATTER
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


    const selectedItems = [];


    selected.forEach(
        input => {

            const item =
                ingredients[
                    input.value
                ];


            if (!item) {
                return;
            }


            selectedItems.push({

                name:
                    item.name,

                price:
                    item.price,

                unit:
                    item.unit,

                icon:
                    item.icon

            });

        }
    );


    const total =
        selectedItems.reduce(
            (sum,item) =>
                sum +
                Number(item.price),
            0
        );


    addToCart({

        name:
            `${mealSelect.value} Grocery Platter`,

        price:
            total,

        icon:
            "🧺",

        category:
            "Groceries",

        desc:
            selectedItems
                .map(
                    item => item.name
                )
                .join(", "),

        details:
            selectedItems

    });


    openCart();

}


/* =========================================================
   21. PRODUCT BUTTONS
========================================================= */

function initializeProductButtons() {

    document
        .querySelectorAll(
            ".ee-add-fashion-cart"
        )
        .forEach(
            button => {

                if (
                    button.dataset.cartListener
                ) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function() {

                        const name =
                            this.dataset.name ||
                            "Product";


                        const price =
                            Number(
                                this.dataset.price
                            ) || 0;


                        const category =
                            this.dataset.category ||
                            "General";


                        const card =
                            this.closest(
                                ".ee-fashion-card"
                            );


                        let selectedSize =
                            "";


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


                        const hasSizes =
                            card &&
                            card.querySelector(
                                ".ee-size-options"
                            );


                        if (
                            hasSizes &&
                            !selectedSize
                        ) {

                            alert(
                                "Please select a size before adding this item."
                            );

                            return;

                        }


                        addToCart({

                            name,

                            price,

                            category,

                            size:
                                selectedSize,

                            icon:
                                getProductIcon(
                                    category
                                )

                        });

                    }
                );


                button.dataset.cartListener =
                    "true";

            }
        );

}


/* =========================================================
   22. SIZE BUTTONS
========================================================= */

function initializeSizeButtons() {

    document
        .querySelectorAll(
            ".ee-size-options button"
        )
        .forEach(
            button => {

                if (
                    button.dataset.sizeListener
                ) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function() {

                        const container =
                            this.parentElement;


                        container
                            .querySelectorAll(
                                "button"
                            )
                            .forEach(
                                btn =>
                                    btn.classList.remove(
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

            }
        );

}


/* =========================================================
   23. PRODUCT ICON
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
        value.includes("women")
    ) {
        return "👗";
    }


    if (
        value.includes("men")
    ) {
        return "👔";
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
   24. GIFT FILTERS
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


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    const filter =
                        this.dataset.gift;


                    buttons.forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    cards.forEach(
                        card => {

                            const type =
                                card.dataset.giftType;


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

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   25. PLATTER
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

                <div class="empty-platter-icon">
                    🍽️
                </div>

                <h3>
                    Your platter is empty
                </h3>

                <p>
                    Browse our stock and add
                    something to your order.
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
                (item,index) => {

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


                                ${
                                    item.desc
                                    ? `
                                        <small>
                                            ${escapeHTML(item.desc)}
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
   26. CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (sum,item) =>
            sum +
            (
                Number(item.price) *
                (item.quantity || 1)
            ),
        0
    );

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
            "Please fill in your name and delivery location."
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


                if (
                    quantity > 1
                ) {

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


                if (item.desc) {

                    line +=
                        ` (${item.desc})`;

                }


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
   28. PAYSTACK EMAIL
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


        const emailInput =
            document.getElementById(
                "customerEmail"
            );


        if (emailInput) {

            emailInput.focus();

        }


        return;

    }


    checkoutPaystack();

}


/* =========================================================
   29. PAYSTACK
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
            "Please fill in your name, delivery location, and email."
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


    const total =
        getCartTotal();


    const reference =
        createPaymentReference();


    const customer = {

        name,

        phone,

        location,

        email

    };


    const popup =
        new PaystackPop();


    popup.newTransaction({

        key:
            PAYSTACK_PUBLIC_KEY,

        email,

        amount:
            Math.round(
                total * 100
            ),

        currency:
            "GHS",

        reference,

        firstName:
            name.split(" ")[0] ||
            "",

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
                            item.quantity ||
                            1,

                        category:
                            item.category,

                        size:
                            item.size ||
                            "",

                        desc:
                            item.desc ||
                            ""

                    })
                )

        },


        onSuccess:
            async function(
                transaction
            ) {

                const paymentReference =
                    transaction.reference ||
                    reference;


                await finalizeOrder(
                    paymentReference,
                    customer,
                    total
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
                    "There was a problem opening the payment window."
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
   31. FINALIZE ORDER
========================================================= */

async function finalizeOrder(
    reference,
    customer,
    total
) {

    const itemsSnapshot =
        cart.map(
            item => ({

                name:
                    item.name,

                price:
                    Number(item.price),

                quantity:
                    item.quantity ||
                    1,

                category:
                    item.category,

                size:
                    item.size ||
                    "",

                desc:
                    item.desc ||
                    ""

            })
        );


    try {

        const response =
            await fetch(
                VERIFY_FUNCTION_URL,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${SUPABASE_ANON_KEY}`

                    },

                    body:
                        JSON.stringify({

                            reference,

                            customer,

                            items:
                                itemsSnapshot,

                            total

                        })

                }
            );


        const result =
            await response.json();


        if (
            !response.ok ||
            result.error
        ) {

            console.error(
                "Verification failed:",
                result
            );


            alert(
                "Payment was completed, but we couldn't automatically confirm the order.\n\n" +
                "Payment reference: " +
                reference
            );


            return;

        }


        cart = [];

        saveCart();

        updateCart();
        updatePlatter();

        closeCart();


        alert(
            `Payment successful!\n\nReference: ${reference}`
        );


    } catch(error) {

        console.error(
            "Order finalization error:",
            error
        );


        alert(
            "Payment was completed, but there was a problem confirming your order.\n\n" +
            "Payment reference: " +
            reference
        );

    }

}


/* =========================================================
   32. CHOOSE MEAL
========================================================= */

function chooseMeal(
    mealName
) {

    const mealSelect =
        document.getElementById(
            "meal"
        );


    if (!mealSelect) {

        const url =
            `index.html?meal=${encodeURIComponent(
                mealName
            )}#stock`;


        window.location.href =
            url;


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
            behavior:
                "smooth"
        });

    }

}


/* =========================================================
   33. MEAL URL
========================================================= */

function handleMealURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const meal =
        params.get(
            "meal"
        );


    if (!meal) {
        return;
    }


    const mealSelect =
        document.getElementById(
            "meal"
        );


    if (!mealSelect) {
        return;
    }


    setTimeout(
        () => {

            if (
                mealCategories[meal]
            ) {

                mealSelect.value =
                    meal;

                showIngredients(
                    meal
                );

            }

        },
        500
    );

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

function getInputValue(
    id
) {

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

function formatMoney(
    value
) {

    return Number(
        value || 0
    ).toFixed(2);

}


/* =========================================================
   37. HTML ESCAPE
========================================================= */

function escapeHTML(
    value
) {

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
