// ================= LOAD PRODUCT DETAILS =================

function loadProductDetails() {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    if (!id) {
        console.error("Product ID missing in URL");
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const product = products.find(p => p.id === id);

    if (!product) {
        console.error("Product not found");
        return;
    }

    const container = document.getElementById("product-details-container");

    container.innerHTML = `
    
    <div class="details-section">

        <div class="details-img-box">
            <img src="${product.url}" alt="${product.name}">
        </div>

        <div class="details-info">

            <h1>${product.name}</h1>

            <p class="details-price">₹${product.price.toLocaleString()}</p>

            <p class="details-desc">
                ${product.desc || product.description || "Premium luxury watch crafted with precision."}
            </p>

            <div class="feature-list">

                <div class="feature-item">
                    <i class="fa-solid fa-shield"></i>
                    <span>2 Year International Warranty</span>
                </div>

                <div class="feature-item">
                    <i class="fa-solid fa-truck"></i>
                    <span>Complimentary Insured Shipping</span>
                </div>

                <div class="feature-item">
                    <i class="fa-solid fa-rotate"></i>
                    <span>30-Day Returns & Exchanges</span>
                </div>

            </div>

            

            <div class="watch-care-accordion">

                <h2 class="accordion-title">Watch Care Guide</h2>

                
                <div class="accordion-item">
                    <button class="accordion-header">Magnetic-Resistant</button>
                    <div class="accordion-content">
                        <p>
                            Your watch is safe around common household electronics like TVs or stereos. However, avoid strong
                            magnetic sources such as transformers, welding equipment, or medical imaging devices.
                        </p>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-header">Temperature Care</button>
                    <div class="accordion-content">
                        <p>
                            Avoid exposing your watch to extreme heat or cold. High temperatures can damage internal components,
                            while extreme cold may cause inaccurate timekeeping or temporary stoppage.
                        </p>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-header">Knock and Scratches</button>
                    <div class="accordion-content">
                        <p>
                            Although durable, watches are delicate instruments. Dropping or rubbing against rough surfaces like
                            stone or concrete may scratch the glass, case, or bracelet.
                        </p>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-header">Watch Cleaning</button>
                    <div class="accordion-content">
                        <p>
                            Clean your watch regularly with a soft brush to remove dust and sweat. Use mild soapy water for the
                            bracelet if water resistance is confirmed, and avoid strong chemicals or pressure cleaning.
                        </p>
                    </div>
                </div>

            </div>

            <div class="details-actions">

                ${
                    !product.sold
                    ? `<button class="details-btn add-cart"
                       onclick="handleAddToCart(${product.id})">
                       Add To Cart
                       </button>`
                    : `<span class="sold-label">SOLD OUT</span>`
                }

                <button class="details-btn buy-now"
                onclick="window.location.href='checkout.html'">
                Buy Now
                </button>

            </div>

            

        </div>

        <!-- RELATED PRODUCTS -->

        <div class="related-section">

            <h2>You May Also Like</h2>

            <div id="related-products-grid" class="related-grid"></div>

        </div>

    </div>
    `;
    relatedProducts(id);
};

const relatedProducts = (currentId) => {

    const container = document.getElementById("related-products-grid");

    if (!container) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const related = products.filter(p => p.id !== currentId).slice(0,3);

    container.innerHTML = "";

    related.forEach(product => {

        container.innerHTML += `

        <div class="related-card">

            <img src="${product.url}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price.toLocaleString()}</p>

            <a href="viewdetails.html?id=${product.id}" class="view-btn">
                View Details
            </a>

        </div>

        `;
    });

};

document.addEventListener("click", function(e){

if(e.target.classList.contains("accordion-header")){

const content = e.target.nextElementSibling;

if(content.style.maxHeight){
content.style.maxHeight = null;
}else{
content.style.maxHeight = content.scrollHeight + "px";
}

}

});

// ================= PAGE LOAD =================

document.addEventListener("DOMContentLoaded", () => {

    loadProductDetails();

});










