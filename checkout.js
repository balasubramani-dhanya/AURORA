const productCheckout = () => {
  const container = document.getElementById('checkout-container');
  if (!container) return;

  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if(cart.length === 0)
    {

        container.innerHTML = `
        <div class="empty-cart">

            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any watches yet.</p>

            <a href="index.html#shop" class="gold-button">Start Shopping</a>

        </div>
        `;

        return;
    }

container.innerHTML = `

<div class="checkout-layout">

        <!-- SHIPPING -->

        <div class="checkout-left">

            <div class="card">

                <h3>Shipping Information</h3>

                <div class="form-grid">

                    <input type="text" placeholder="First Name" required>
                    <input type="text" placeholder="Last Name" required>

                    <input type="email" placeholder="Email Address" class="full">

                    <input type="text" placeholder="Address" class="full">

                    <input type="text" placeholder="City">
                    <input type="text" placeholder="Postal Code">

                </div>

            </div>

            <div class="card">

                <h3>Payment Method</h3>

                <label class="payment-option">
                    <input type="radio" name="payment" value="credit" checked>
                    <span>Credit / Debit Card</span>
                </label>

                <label class="payment-option">
                    <input type="radio" name="payment" value="COD">
                    <span>Cash On Delivery</span>
                </label>

            </div>

        </div>

        <!-- ORDER SUMMARY -->

        <div class="checkout-right">

            <div class="card sticky">

                <h3>Order Summary</h3>

                <div class="summary-items">

                    ${cart.map(item => `

                    <div class="summary-row">

                        <span>${item.name} x ${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toLocaleString()}</span>

                    </div>

                    `).join("")}

                </div>

                <div class="summary-total">

                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>₹${total.toLocaleString()}</span>
                    </div>

                    <div class="summary-row">
                        <span>Shipping</span>
                        <span class="free">Free</span>
                    </div>

                    <div class="summary-row total">
                        <span>Total</span>
                        <span>₹${total.toLocaleString()}</span>
                    </div>

                </div>

                <button onclick="processOrder()" class="gold-button full-btn">
                    Complete Purchase
                </button>

            </div>

        </div>

    </div>
`;
};

function saveOrder(order){

const orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push({
id: Date.now(),
...order
});

localStorage.setItem("orders", JSON.stringify(orders));

}

function saveCart(cart){
localStorage.setItem("cart", JSON.stringify(cart));
}

window.processOrder = () => {
  const firstName = document.querySelector('input[placeholder="First Name"]').value;
  const lastName = document.querySelector('input[placeholder="Last Name"]').value;
  const email = document.querySelector('input[placeholder="Email Address"]').value;
  const address = document.querySelector('input[placeholder="Address"]').value;
  const city = document.querySelector('input[placeholder="City"]').value;
  const zip = document.querySelector('input[placeholder="Postal Code"]').value;

  const payMethod = document.querySelector('input[name="payment"]:checked').value;

  if (!firstName || !lastName || !email || !address || !city || !zip) {
    alert('Please fill in all shipping information');
    return;
  }

  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Save Order

  saveOrder({
    customer: `${firstName} ${lastName}`,
    email: email,
    items: cart,
    total: total,
    address: `${address}, ${city}, ${zip}`,
    date: new Date().toLocaleDateString()
});

    if (payMethod === "credit") {
    window.location.href = "card.html";
    } else {
        alert('Thank you for your purchase! Your order has been placed successfully.');
        saveCart([]);
        window.location.href = 'user.html';
    }

};

document.addEventListener('DOMContentLoaded', () => {
  productCheckout();
});