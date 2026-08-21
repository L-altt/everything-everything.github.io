/* =========================================================
   EVERYTHING EVERYTHING
   SITE-WIDE JAVASCRIPT
   =========================================================

   Preserved functionality:

   ✓ Supabase grocery data
   ✓ Shared cart
   ✓ LocalStorage cart
   ✓ Clothing sizes
   ✓ Jewelry sizes
   ✓ Gift filters
   ✓ Custom grocery platters
   ✓ Combined platter
   ✓ WhatsApp checkout
   ✓ Paystack checkout
   ✓ Cart drawer
   ✓ Cart toast
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
    supabase =
        window.supabase.createClient(
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
   4. PAGE DETECTION
========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";


function isPage(pageName) {
    return currentPage === pageName;
}


/* =========================================================
   5. LOAD CART
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
   6. SAVE CART
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
   7. SUPABASE GROCERY DATA
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

        console.error(
            "Supabase client is not available."
        );

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
                    .eq("in_stock", true),

                supabase
                    .from("meals")
                    .select("*")

            ]);


        const {
            data: ingredientRows,
            error: ingredientError
        } = ingredientResponse;


        const {
            data: mealRows,
            error: mealError
        } = mealResponse;


        if (ingredientError) {
            throw ingredientError;
        }


        if (mealError) {
            throw mealError;
        }


        ingredients = {};


        (ingredientRows || [])
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


        (mealRows || [])
            .forEach(row => {

                let ids =
                    row.ingredient_ids;


                if (
                    typeof ids === "string"
                ) {

                    try {

                        ids =
                            JSON.parse(ids);

                    } catch {

                        ids = [];

                    }

                }


                if (!Array.isArray(ids)) {
                    ids = [];
                }


                mealCategories[row.name] =
                    ids;

            });


        populateMealSelect();

    } catch (error) {

        console.error(
            "Supabase grocery loading error:",
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
   8. POPULATE MEALS
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
            .map(meal => `
                <option
                    value="${escapeHTML(meal)}"
                >
                    ${escapeHTML(meal)}
                </option>
            `)
            .join("");


    showIngredients(
        mealSelect.value
    );


    if (
        !mealSelect.dataset.listenerAttached
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
   9. SHOW INGREDIENTS
========================================================= */

function showIngredients(mealName) {

    const container =
        document.getElementById(
            "ingredientList"
        );


    if (!container) {
        return;
    }


    const selectedIngredients =
        mealCategories[mealName];


    if (!selectedIngredients) {

        container.innerHTML = "";

        updateCustomTotal();

        return;
    }


    container.innerHTML =
        selectedIngredients
            .map(id => {

                const item =
                    ingredients[id];


                if (!item) {
                    return "";
                }


                return `
                    <label
                        class="ingredient-option"
                    >

                        <input
                            type="checkbox"
                            value="${escapeHTML(item.id)}"
                            onchange="updateCustomTotal()"
                        >

                        <span
                            class="ingredient-icon"
                        >
                            ${item.icon}
                        </span>

                        <span
                            class="ingredient-info"
                        >

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

            })
            .join("");


    updateCustomTotal();
}


/* =========================================================
   10. CUSTOM TOTAL
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


    selected.forEach(input => {

        const item =
            ingredients[input.value];


        if (item) {
            total += item.price;
        }

    });


    totalElement.textContent =
        `GH₵${formatMoney(total)}`;
}


/* =========================================================
   11. ADD CUSTOM PLATTER
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


    const meal =
        mealSelect.value;


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


    selected.forEach(input => {

        const item =
            ingredients[input.value];


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

    });


    const total =
        selectedItems.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );


    addToCart({

        name:
            `${meal} Grocery Platter`,

        price:
            total,

        icon:
            "🧺",

        category:
            "Groceries",

        desc:
            selectedItems
                .map(item => item.name)
                .join(", "),

        details:
            selectedItems

    });


    openCart();
}


/* =========================================================
   12. ADD TO CART
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
            Number(item.price) ||
            0,

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
            Number(item.quantity) ||
            1

    };


    const existingIndex =
        cart.findIndex(existing =>

            existing.name ===
                cartItem.name &&

            existing.price ===
                cartItem.price &&

            existing.size ===
                cartItem.size &&

            existing.desc ===
                cartItem.desc

        );


    if (
        existingIndex !== -1 &&
        !cartItem.details
    ) {

        cart[
            existingIndex
        ].quantity +=
            cartItem.quantity;

    } else {

        cart.push(
            cartItem
        );

    }


    saveCart();

    updateCart();

    updatePlatter();

    showCartToast(
        `${cartItem.name} added to basket`
    );
}


/* =========================================================
   13. UNIQUE CART ID
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
   14. UPDATE CART
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
            <div
                style="
                    padding:30px 0;
                    color:#5b6b7d;
                    text-align:center;
                "
            >

                <div
                    style="
                        font-size:38px;
                        margin-bottom:10px;
                    "
                >
                    🛒
                </div>

                <p>
                    Your basket is empty.
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
                        <div
                            class="cart-item"
                        >

                            <div
                                class="cart-item-info"
                            >

                                <b>
                                    ${item.icon}
                                    ${escapeHTML(item.name)}
                                </b>

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

                                <strong>
                                    GH₵${formatMoney(subtotal)}
                                </strong>

                            </div>


                            <div
                                class="cart-item-actions"
                            >

                                ${
                                    !item.details
                                        ? `
                                            <div
                                                class="quantity-controls"
                                            >

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


    const total =
        getCartTotal();


    if (cartTotal) {

        cartTotal.textContent =
            `GH₵${formatMoney(total)}`;

    }
}


/* =========================================================
   15. QUANTITY
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

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    updateCart();

    updatePlatter();
}


/* =========================================================
   16. REMOVE ITEM
========================================================= */

function removeItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();

    updatePlatter();
}


/* =========================================================
   17. OPEN CART
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
   18. CLOSE CART
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
   19. FASHION / JEWELRY / GIFTS
========================================================= */

function initializeProductButtons() {

    const buttons =
        document.querySelectorAll(
            ".ee-add-fashion-cart"
        );


    buttons.forEach(button => {

        if (
            button.dataset.cartListener
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

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
    });
}


/* =========================================================
   20. SIZE BUTTONS
========================================================= */

function initializeSizeButtons() {

    const sizeButtons =
        document.querySelectorAll(
            ".ee-size-options button"
        );


    sizeButtons.forEach(button => {

        if (
            button.dataset.sizeListener
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const container =
                    this.parentElement;


                container
                    .querySelectorAll(
                        "button"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    });


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
   21. PRODUCT ICON
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
   22. GIFT FILTER
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


                cards.forEach(card => {

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

                });

            }
        );

    });
}


/* =========================================================
   23. PLATTER PAGE
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
                    Visit Groceries, Clothing,
                    Jewelry or Gifts and add
                    something to your platter.
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
                        <div
                            class="platter-item-row"
                        >

                            <div
                                class="platter-item-icon"
                            >
                                ${item.icon}
                            </div>


                            <div
                                class="platter-item-info"
                            >

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


                            <div
                                class="platter-item-price"
                            >

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


    const total =
        getCartTotal();


    if (totalElement) {

        totalElement.textContent =
            `GH₵${formatMoney(total)}`;

    }
}


/* =========================================================
   24. CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (sum, item) =>
            sum +
            (
                Number(item.price) *
                (item.quantity || 1)
            ),
        0
    );
}


/* =========================================================
   25. WHATSAPP CHECKOUT
========================================================= */

function checkoutWhatsApp() {

    if (!cart.length) {

        alert(
            "Please add something to your basket first."
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


    const total =
        getCartTotal();


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


            if (item.desc) {

                line +=
                    ` (${item.desc})`;

            }


            return line;

        });


    const message =
`Hi Everything Everything! I'd like to place an order:

${lines.join("\n")}

Total: GH₵${formatMoney(total)}

Name: ${name}
Delivery location: ${location}`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener"
    );
}


/* =========================================================
   26. SHOW EMAIL
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
   27. PAYSTACK CHECKOUT
========================================================= */

function checkoutPaystack() {

    if (!cart.length) {

        alert(
            "Please add something to your basket first."
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
                cart.map(item => ({

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

                }))

        },


        onSuccess:
            async function(transaction) {

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
                    "Paystack payment cancelled."
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
   28. PAYMENT REFERENCE
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
   29. FINALIZE ORDER
========================================================= */

async function finalizeOrder(
    reference,
    customer,
    total
) {

    const itemsSnapshot =
        cart.map(item => ({

            name:
                item.name,

            price:
                Number(item.price),

            quantity:
                item.quantity || 1,

            category:
                item.category,

            size:
                item.size || "",

            desc:
                item.desc || ""

        }));


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
                "Order verification failed:",
                result
            );


            alert(
                "Payment was completed, but we couldn't automatically confirm the order. " +
                "Please contact us on WhatsApp and provide payment reference: " +
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
            `Payment successful!\n\n` +
            `Reference: ${reference}\n\n` +
            `We'll be in touch about delivery.`
        );


    } catch (error) {

        console.error(
            "Order finalization error:",
            error
        );


        alert(
            "Payment was completed, but there was a problem confirming your order. " +
            "Please contact us on WhatsApp with payment reference: " +
            reference
        );

    }
}


/* =========================================================
   30. CHOOSE MEAL
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
            `groceries.html?meal=${encodeURIComponent(mealName)}`;

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
   31. HANDLE MEAL URL
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
        300
    );
}


/* =========================================================
   32. CART TOAST
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
   33. GET INPUT
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
   34. MONEY
========================================================= */

function formatMoney(
    value
) {

    return Number(
        value || 0
    ).toFixed(2);
}


/* =========================================================
   35. HTML ESCAPE
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


/* =========================================================
   36. INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Cart works everywhere.
        */

        updateCart();


        /*
           Platter page.
        */

        updatePlatter();


        /*
           Grocery builder.
        */

        loadData();


        /*
           Clothing / Jewelry / Gifts.
        */

        initializeProductButtons();


        /*
           Sizes.
        */

        initializeSizeButtons();


        /*
           Gift filters.
        */

        initializeGiftFilters();


        /*
           Grocery meal URL.
        */

        handleMealURL();

    }
);
