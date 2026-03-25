// Sample Products Data
const SAMPLE_PRODUCTS = [{
        id: 1,
        name: "ROLEX DAY-DATE ",
        url: "https://imagefile2.aristohk.com/ROLEX_128239-0025-1.webp",
        price: 668900,
        description: "Classic Watch perfect for all seasons",
        category: "him",
        material: "Gold",
        offer: 0,
        sold: false
    },
    {
        id: 2,
        name: "ROLEX DAYTONA",
        url: "https://imagefile2.aristohk.com/ROLEX-126505-0002-27991-1772590561007-1.webp",
        price: 472900,
        description: "Comfortable and stylish running shoes with cushioned sole",
        category: "him",
        material: "Stainless Steel",
        offer: 5,
        sold: false
    },
    {
        id: 3,
        name: "OMEGA CONSTELLATION",
        url: "https://imagefile2.aristohk.com/OMEGA-131.23.41.21.03.001-19145-1721120439323-1.webp",
        price: 255400,
        description: "Perfect for Daily Wear..",
        category: "her",
        material: "Gold",
        offer: 23,
        sold: false
    },
    {
        id: 4,
        name: "CHANEL J12 Watches",
        url: "https://imagefile2.aristohk.com/CHANEL_H7989-1.webp",
        price: 1000560,
        description: "Best for Party Wears..",
        category: "her",
        material: "Titanium",
        offer: 0,
        sold: false
    }
];

// Initialize Sample Products
function initializeSampleProducts() {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Only initialize if no products exist
    if (existingProducts.length === 0) {
        localStorage.setItem("products", JSON.stringify(SAMPLE_PRODUCTS));
        console.log("✓ Sample products initialized successfully");
    } else {
        console.log("Products already exist:", existingProducts.length);
    }
}


// Load Products
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const key = getWishlistKey();
    const wishlist = JSON.parse(localStorage.getItem(key)) || [];
    const container = document.getElementById("productList");

    if (!container) return;

    container.innerHTML = "";

    
    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product-card";

        const description = product.description || "Premium quality product with excellent features";
        const isWishlisted = wishlist.includes(product.id);
        const heartIcon = isWishlisted ? 'fa-solid' : 'fa-regular';

        div.innerHTML = `
    <div class="product-card-body">

        <div class="product-img-container">
            <img src="${product.url}" class="product-img" loading= "lazy" alt="${product.name}">
            <button class="wishlist-icon-btn" onclick="toggleWishlist(${product.id})">
                <i class="${heartIcon} fa-heart"></i>
            </button>
                    ${product.sold ? '<div class="sold-badge-overlay">SOLD</div>' : ''}
        </div>

        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${description}</p>

            ${product.offer && product.offer > 0 ? `
                <div class="product-price-wrapper">
                    <div class="price-group">
                        <span class="new-price">₹${(product.price - (product.price * product.offer / 100)).toLocaleString()}</span>
                        <span class="old-price">₹${product.price.toLocaleString()}</span>
                        <span class="offer-badge">${product.offer}% OFF</span>
                    </div>
                    
                </div>
                `
                : `
                <div class="product-price-wrapper">
                    <span class="new-price">₹${product.price.toLocaleString()}</span>
                </div>
                `
            }
            <div class="product-actions">
                ${!product.sold && localStorage.getItem("role") === "user" ?
                        `<a href="./viewdetails.html?id=${product.id}" class="view-details-link">
View Details
</a>
                 <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})" ${product.sold ? 'disabled' : ''}>Add to cart</button>`
                        : `<a href="./viewdetails.html?id=${product.id}" class="view-details-link">
View Details
</a> 
                        `}
            </div>
        </div>
    </div>`;


        if (localStorage.getItem("role") === "admin" && !product.sold) {
            const adminActions = document.createElement("div");
            adminActions.className = "admin-actions";

            const markSoldBtn = document.createElement("button");
            markSoldBtn.innerText = "Mark as Sold";
            markSoldBtn.className = "admin-btn mark-sold-btn";
            markSoldBtn.onclick = function () {
                markAsSold(product.id);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.className = "admin-btn delete-btn";
            deleteBtn.onclick = () => deleteProduct(product.id);

            adminActions.appendChild(markSoldBtn);
            adminActions.appendChild(deleteBtn);
            div.appendChild(adminActions);
        }

        container.appendChild(div);
    });
}


// Toggle wishlist

function getWishlistKey() {
    const user = localStorage.getItem("currentUser");
    return user ? `wishlist_${user}` : null;
}

function toggleWishlist(productId) {

    const key = getWishlistKey();

    if (!key) {
        alert("Please login first");
        return;
    }

    productId = Number(productId);

    let wishlist = JSON.parse(localStorage.getItem(key)) || [];

    wishlist = wishlist.map(id => Number(id));

    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }

    localStorage.setItem(key, JSON.stringify(wishlist));

    loadProducts();
    updateWishlistCount();
}

function updateWishlistCount() {
    const key = getWishlistKey();
    const wishlist = JSON.parse(localStorage.getItem(key)) || [];
    const countElement = document.getElementById("heart-count");

    if (countElement) {
        countElement.textContent = wishlist.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeSampleProducts();
    loadProducts();
    updateWishlistCount();
    updateCartCount();
});

