// ===============================
// PRODUCT DATA
// ===============================

const products = [
    {
        id: 1,
        name: "Fresh Milk",
        price: 60,
        image: "https://via.placeholder.com/250x180?text=Milk"
    },
    {
        id: 2,
        name: "Buffalo Milk",
        price: 70,
        image: "https://via.placeholder.com/250x180?text=Buffalo+Milk"
    },
    {
        id: 3,
        name: "Fresh Paneer",
        price: 300,
        image: "https://via.placeholder.com/250x180?text=Paneer"
    },
    {
        id: 4,
        name: "Fresh Dahi",
        price: 80,
        image: "https://via.placeholder.com/250x180?text=Dahi"
    },
    {
        id: 5,
        name: "Sweet Lassi",
        price: 50,
        image: "https://via.placeholder.com/250x180?text=Lassi"
    },
    {
        id: 6,
        name: "Fresh Mawa",
        price: 400,
        image: "https://via.placeholder.com/250x180?text=Mawa"
    },
    {
        id: 7,
        name: "Fresh Butter",
        price: 250,
        image: "https://via.placeholder.com/250x180?text=Butter"
    },
    {
        id: 8,
        name: "Pure Ghee",
        price: 550,
        image: "https://via.placeholder.com/250x180?text=Ghee"
    }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Save Cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    showMessage(product.name + " added to cart!");
}


// ===============================
// MESSAGE
// ===============================

function showMessage(message) {

    const messageBox = document.getElementById("message");

    if (messageBox) {

        messageBox.textContent = message;

        setTimeout(function() {
            messageBox.textContent = "";
        }, 2000);
    }
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts() {

    const container = document.getElementById("productContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartContainer = document.getElementById("cartContainer");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cart">
                    Your cart is empty.
                    <br><br>
                    <a href="products.html" class="btn">
                        Continue Shopping
                    </a>
                </td>
            </tr>
        `;

        calculateTotal();
        return;
    }


    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <img src="${item.image}" 
                     alt="${item.name}"
                     class="cart-image">
                <br>
                ${item.name}
            </td>

            <td>
                <input
                    type="number"
                    min="1"
                    value="${item.quantity}"
                    class="quantity-input"
                    onchange="updateQuantity(${index}, this.value)"
                >
            </td>

            <td>₹${item.price}</td>

            <td>₹${subtotal}</td>

            <td>
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </td>
        `;

        cartContainer.appendChild(row);
    });

    calculateTotal();
}


// ===============================
// UPDATE QUANTITY
// ===============================

function updateQuantity(index, quantity) {

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }

    cart[index].quantity = quantity;

    saveCart();

    displayCart();

    updateCartCount();
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}


// ===============================
// CALCULATE TOTAL
// ===============================

function calculateTotal() {

    const totalElement = document.getElementById("grandTotal");

    if (!totalElement) {
        return;
    }

    const total = cart.reduce(function(sum, item) {

        return sum + (item.price * item.quantity);

    }, 0);

    totalElement.textContent = "₹" + total;
}


// ===============================
// CHECKOUT VALIDATION
// ===============================

function setupCheckout() {

    const form = document.getElementById("checkoutForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const address = document.getElementById("address").value.trim();

        const city = document.getElementById("city").value.trim();

        const pincode = document.getElementById("pincode").value.trim();

        const phone = document.getElementById("phone").value.trim();


        const nameError = document.getElementById("nameError");

        const addressError = document.getElementById("addressError");

        const pincodeError = document.getElementById("pincodeError");

        const phoneError = document.getElementById("phoneError");


        nameError.textContent = "";
        addressError.textContent = "";
        pincodeError.textContent = "";
        phoneError.textContent = "";


        let valid = true;


        // Name
        if (name === "") {

            nameError.textContent = "Name is required.";

            valid = false;
        }


        // Address
        if (address === "") {

            addressError.textContent = "Address is required.";

            valid = false;
        }


        // Pincode
        if (!/^\d{6}$/.test(pincode)) {

            pincodeError.textContent =
                "Pincode must be exactly 6 digits.";

            valid = false;
        }


        // Phone
        if (!/^\d{10}$/.test(phone)) {

            phoneError.textContent =
                "Phone must be exactly 10 digits.";

            valid = false;
        }


        // Success
        if (valid) {

            localStorage.removeItem("cart");

            cart = [];

            document.getElementById("confirmation").innerHTML = `
                <div class="success-message">
                    <h2>Order Placed Successfully! 🎉</h2>
                    <p>Thank you for shopping with DairyShop.</p>
                </div>
            `;

            form.reset();

            updateCartCount();
        }

    });
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function() {

    displayProducts();

    displayCart();

    updateCartCount();

    setupCheckout();

});