// Side bar toogle

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("aside");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});


// sidebar navigation

const navItems = document.querySelectorAll(".nav-item");

const dashboardSection = document.getElementById("section-dashboard");
const customerSection = document.getElementById("section-customer");
const productSection = document.getElementById("admin-section");


dashboardSection.style.display = "block";
customerSection.style.display = "none";
productSection.style.display = "none";


navItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");


        dashboardSection.style.display = "none";
        customerSection.style.display = "none";
        productSection.style.display = "none";

        // show selected 

        if (index === 0) {
            dashboardSection.style.display = "block";
            sidebar.classList.remove("active");
        }

        if (index === 1) {
            customerSection.style.display = "block";
            sidebar.classList.remove("active");
        }

        if (index === 2) {
            productSection.style.display = "block";
            sidebar.classList.remove("active");
        }

    });

});


//  add product modal buttons

const modal = document.getElementById("admin-modal");
const addBtn = document.getElementById("add-product-btn");
const closeBtn = document.getElementById("close-modal");

addBtn.addEventListener("click", () => {

    modal.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    modal.classList.remove("active");

});


// product storage

let products = JSON.parse(localStorage.getItem("products")) || [];

const productList = document.getElementById("admin-product-list");


function renderProducts() {

    productList.innerHTML = "";

    products.forEach((product, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="p-4">
            <img src="${product.url}" class="admin-product-img">
            </td>
            <td class="p-4">${product.name}</td>
            <td class="p-4">${product.category}</td>
            <td class="p-4">₹${product.price.toLocaleString()}</td>
            <td class="p-4">
            <span class="status-badge ${product.sold ? 'status-sold' : 'status-stock'}">
                    ${product.sold ? 'Sold Out' : 'In Stock'}
                    </span></td>

            <td class="p-4">
            <button class="sold-btn" data-id="${product.id}">
            ${product.sold ? "Unsell" : `<i class="fa-solid fa-check"></i>`}
            </button>

            <button class="delete-btn" data-id="${product.id}">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>

        `;

        productList.appendChild(row);

    });

}

renderProducts();
document.getElementById("product-count").innerText = products.length;

// --------------Sold and delete actions

productList.addEventListener("click", (e) => {

    const id = Number(e.target.closest("button")?.dataset.id);

    if (!id) return;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) return;

    //    delete button

    if (e.target.closest(".delete-btn")) {

        products.splice(productIndex, 1);

    }

    //    MARK SOLD / UNSELL 

    if (e.target.closest(".sold-btn")) {

        products[productIndex].sold = !products[productIndex].sold;

    }

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();

});

// Add product button

const saveBtn = document.getElementById("save-product");

saveBtn.addEventListener("click", () => {

    const name = document.getElementById("new-name").value;
    const price = Number(document.getElementById("new-price").value);
    const category = document.getElementById("new-category").value;
    const image = document.getElementById("new-image").value;
    const desc = document.getElementById("new-desc").value;
    const offer = document.getElementById("new-offer").value || 0;

    if (!name || !price) {
        alert("Please fill all fields");
        return;
    }

    const newProduct = {

        id: Date.now(),
        name,
        price,
        category,
        url: image,
        desc,
        offer: Number(offer),
        sold: false

    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();

    modal.classList.remove("active");

});





// -------------add customers---------



let customers = JSON.parse(localStorage.getItem("users")) || [];

let customerlist = document.getElementById("admin-customer-list");

function renderCustomer() {

    customerlist.innerHTML = "";

    customers.forEach((user, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

<td class="p-4">${user.id}</td>
<td class="p-4">${user.username}</td>
<td class="p-4">${user.email}</td>
<td class="p-4">${user.date}</td>

`;

        customerlist.appendChild(row);

    });

}

renderCustomer();
document.getElementById("coustomer-count").innerText = customers.length;

// add orders

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let orderlist = document.getElementById("admin-sales-list");

function renderOrders(){
    orderlist.innerHTML = "";
    orders.forEach((order, index)=>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td class="p-4">${order.id}</td>
        <td class="p-4">${order.customer}</td>
        <td class="p-4">${order.date}</td>
        <td class="p-4">${order.total}</td>
        <td class="p-4">${order.address}</td>

        `;
        orderlist.appendChild(row);
    });
}
renderOrders();
document.getElementById("sale-count").innerText = orders.length;
