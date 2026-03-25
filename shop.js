gsap.registerPlugin(ScrollTrigger);

gsap.from(".sidebar", {
  x: -100,
  opacity: 0,
  duration: 0.8
});

gsap.from("#shopproducts .product-card", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.1
});

const container = document.getElementById("shopproducts");

const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");

const catagory = document.querySelectorAll("#category-filters input");
const material = document.querySelectorAll("#material-filters input");

const sortBy = document.getElementById("sort-by");

let products = [];
let filteredProducts = [];

// load products
function loadShopproducts() {

    products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => !p.sold);

    filteredProducts = [...products];

    displayProducts(filteredProducts);
}

// display products
function displayProducts(list) {

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No Products found</p>";
        return;
    }

    const key = getWishlistKey();
    const wishlist = JSON.parse(localStorage.getItem(key)) || [];

    list.forEach(product => {

        const description = product.description || "Premium Watch";

        const isWishlisted = wishlist.includes(product.id);
        const heartIcon = isWishlisted ? "fa-solid" : "fa-regular";

        const finalPrice = product.offer > 0
            ? product.price - (product.price * product.offer / 100)
            : product.price;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <div class="product-card-body">

        <div class="product-img-container">
            <img src="${product.url}" class="product-img" loading="lazy">

            <button class="wishlist-icon-btn" onclick="toggleWishlist(${product.id})">
                <i class="${heartIcon} fa-heart"></i>
            </button>
        </div>

        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>

            <p class="product-description">${description}</p>

            <div class="product-price-wrapper">

                ${product.offer > 0 ?

                `<span class="new-price">₹${finalPrice.toLocaleString()}</span>
                <span class="old-price">₹${product.price.toLocaleString()}</span>
                <span class="offer-badge">${product.offer}% OFF</span>`

                :

                `<span class="new-price">₹${product.price.toLocaleString()}</span>`
                }

            </div>

            <div class="product-actions">

                <a href="./viewdetails.html?id=${product.id}" class="view-details-link">
                View Details
                </a>

                <button class="add-to-cart-btn"
                onclick="handleAddToCart(${product.id})">
                Add to cart
                </button>

            </div>

        </div>

        </div>
        `;

        container.appendChild(card);

    });
}

function applyFilters(){

    let maxPrice = priceRange.value;

    let selectedcategory = [...catagory]
    .filter(check => check.checked)
    .map(check => check.value);

    let selectmaterial = [...material]
    .filter(check => check.checked)
    .map(check => check.value);

    filteredProducts = products.filter(product => {

        let finalprice = product.offer > 0
        ? product.price - (product.price * product.offer / 100)
        : product.price;

        let priceMatch = finalprice <= maxPrice;

        let categoryMatch =
        selectedcategory.length === 0 ||
        selectedcategory.includes("all") ||
        selectedcategory.includes(product.category.toLowerCase());

        let materialMatch =
        selectmaterial.length === 0 ||
        selectmaterial.includes(product.material);

        return priceMatch && categoryMatch && materialMatch;

    });
    displayProducts(filteredProducts);
}

priceRange.addEventListener("input",()=>{

priceValue.innerText =
"₹" + Number(priceRange.value).toLocaleString();

applyFilters();

});

catagory.forEach(cb=>{
cb.addEventListener("change",applyFilters);
});

material.forEach(cb=>{
cb.addEventListener("change",applyFilters);
});

sortBy.addEventListener("change",()=>{

if(sortBy.value === "price-low"){
filteredProducts.sort((a,b)=>a.price-b.price);
}

if(sortBy.value === "price-high"){
filteredProducts.sort((a,b)=>b.price-a.price);
}

displayProducts(filteredProducts);

});

document.addEventListener("DOMContentLoaded",()=>{
loadShopproducts();
});