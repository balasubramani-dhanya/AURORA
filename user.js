gsap.registerPlugin(ScrollTrigger);

gsap.from(".navbar", {
  y: -80,
  opacity: 0,
  duration: 0.8
});

gsap.from(".hero h1", {
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from(".hero p", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from(".hero button", {
  y: 20,
  opacity: 1,
  duration: 1,
  delay: 0.6
});

gsap.from("#productList .product-card", {
  scrollTrigger: "#productList",
  scale: 0.9,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15
});

gsap.from(".ima img", {
  x: -100,
  opacity: 0,
  duration: 1
});

gsap.from(".info", {
  x: 100,
  opacity: 0,
  duration: 1
});

gsap.utils.toArray(".feature-box").forEach((box) => {
  gsap.from(box, {
    scrollTrigger: {
      trigger: box,
      start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});
gsap.from(".feature-box i", {
  scrollTrigger: ".features",
  scale: 0,
  duration: 0.5,
  stagger: 0.2
});



// nav links toggle

const navLink = document.getElementById("navLink");
const menuToggle = document.getElementById("menu-toggle");

if (menuToggle && navLink) {
    menuToggle.addEventListener("click", () => {
        navLink.classList.toggle("active")
    });
}

//  DROPDOWN TOGGLE 
const cartBody = document.getElementById("cart-dropdown");
const wishlistBody = document.getElementById("heart-dropdown");
const cartToggle = document.getElementById("cart-toggle");
const wishToggle = document.getElementById("heart-toggle");

if (cartToggle) {
    cartToggle.addEventListener("click", () => {
        wishlistBody.classList.remove("active");
        cartBody.classList.toggle("active");
        updateCart();
    });
}

if (wishToggle) {
    wishToggle.addEventListener("click", () => {
        cartBody.classList.remove("active");
        wishlistBody.classList.toggle("active");
        updateWishlist();
    });
}


// CART SYSTEM

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Update badge
    updateCart();      // Update dropdown UI if open
}

function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById("cart-count");

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countElement) countElement.textContent = totalQty;
}

// Add to cart by Product ID
function handleAddToCart(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === productId);

    if (!product) return;

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}

// Global cart for UI rendering
function getCartItemsForUI() {
    return getCart();
}

// Remove cart item
function removeCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function increaseQty(index) {
    let cart = getCart();
    cart[index].quantity += 1;
    saveCart(cart);
}

function decreaseQty(index) {
    let cart = getCart();

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart(cart);
}


// WISHLIST SYSTEM (ID BASED)
function getWishlistKey() {
    const user = localStorage.getItem("currentUser");
    return user ? `wishlist_${user}` : null;
}

function getWishlist() {

    const key = getWishlistKey();
    if (!key) return [];

    return JSON.parse(localStorage.getItem(key)) || [];
}

function updateWishlistCount() {
    const wishlist = getWishlist();
    const countElement = document.getElementById("heart-count");
    if (countElement) countElement.textContent = wishlist.length;
}

function updateWishlist() {
    const wishlist = getWishlist();
    if (!wishlistBody) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    wishlistBody.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistBody.innerHTML = "<p>Wishlist is Empty</p>";
        return;
    }

    wishlist.forEach(id => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        wishlistBody.innerHTML += `
            <div class="wishlist-item">
                <img src="${product.url}" class="wishlist-img">
                <div>
                    <p>${product.name}</p>
                    <p>₹${product.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
}

// Update cart UI (Dropdown)
function updateCart() {

    const cart = getCart();
    const cartBody = document.getElementById("cart-dropdown");
    const cartCount = document.getElementById("cart-count");

    
    if (!cartBody) return;

    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = "<p class='cart-empty'>Cart is Empty</p>";
        return;
    }

    let total = 0;
    

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-left">
                <img src="${item.url || item.image}" class="cart-img">

                <div class="cart-details">
                    <p class="cart-title">${item.name}</p>
                    <p class="cart-price">₹ ${item.price.toLocaleString()}</p>

                    <div class="qty-box">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>

                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            </div>

            
        `;

        cartBody.appendChild(cartItem);
    });

    //  TOTAL + BUY NOW SECTION
    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-total-section";
    totalDiv.innerHTML = `
        <h3>Total: ₹ ${total.toLocaleString()}</h3>
        <button id="buyNowBtn" class="buy-now-btn">Buy Now</button>
    `;

    cartBody.appendChild(totalDiv);
}





document.addEventListener("click", function (e) {

    if (e.target.classList.contains("increase-btn")) {
        increaseQty(Number(e.target.dataset.index));
    }

    if (e.target.classList.contains("decrease-btn")) {
        decreaseQty(Number(e.target.dataset.index));
    }

    if (e.target.classList.contains("remove-btn")) {
        removeCart(Number(e.target.dataset.index));
    }

    if (e.target.id === "buyNowBtn") {
        window.location.href = "checkout.html";
    }
});

const swiper = new Swiper('.swiper', {

  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",

  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: false
  },

  loop: true,
  loopedSlides: 4,

  autoplay: {
    delay: 4000,
    disableOnInteraction: true
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }

});


document.addEventListener("DOMContentLoaded", () => {
    updateWishlistCount();
    updateCartCount();
});
