document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((product, index) => {
            const productTotal = product.price * product.quantity;
            subtotal += productTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><input type="number" value="${product.quantity}" class="quantity-input" data-index="${index}"></td>
                <td>$${productTotal.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + 20).toFixed(2)}`;
    }

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value);

            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
            } else {
                cart.splice(index, 1);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    });

    updateCart();
});


// Sample mock location data (replace this with a real API or logic)
const shippingFeesByLocation = {
    'USA': 15,
    'Canada': 20,
    'Europe': 25,
    'Australia': 30,
    'Other': 40
};

// Function to get live shipping fee based on the user's location (mocked here)
function getShippingFee(location) {
    return shippingFeesByLocation[location] || shippingFeesByLocation['Other'];
}

// Dummy function to get user location (replace with real implementation)
function getUserLocation() {
    // Replace with a real API call for geolocation
    return 'USA'; // Default location for testing
}

// Function to calculate 20% additional charge per item
function calculateAdditionalFee(price) {
    return price * 0.2;
}

// Function to calculate the subtotal for cart items
function calculateSubtotal(cartItems) {
    let subtotal = 0;
    cartItems.forEach(item => {
        const additionalFee = calculateAdditionalFee(item.price);
        const totalForItem = (item.price + additionalFee) * item.quantity;
        subtotal += totalForItem;
    });
    return subtotal;
}

// Function to update the cart summary dynamically
function updateCartSummary() {
    const cartItems = getCartItems(); // Assumed function that retrieves cart items (replace with actual implementation)
    const location = getUserLocation();
    const shippingFee = getShippingFee(location);

    let subtotal = calculateSubtotal(cartItems);
    let total = subtotal + shippingFee;

    // Update the DOM elements with the calculated values
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Sample cart item structure (mock data for testing, replace with actual cart data)
function getCartItems() {
    return [
        { name: "Product 1", price: 100, quantity: 2 },
        { name: "Product 2", price: 50, quantity: 1 },
        { name: "Product 3", price: 200, quantity: 1 }
    ];
}

// Event listener to update the cart on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartSummary();
});

// Function to handle removing items from the cart
function removeCartItem(itemIndex) {
    const cartItems = getCartItems();
    cartItems.splice(itemIndex, 1); // Remove the item
    updateCartSummary(); // Recalculate the cart
}
