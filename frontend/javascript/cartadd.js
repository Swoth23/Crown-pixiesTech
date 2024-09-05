        // JavaScript to handle adding items to the cart
        document.addEventListener('DOMContentLoaded', function() {
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            addToCartButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const productName = this.getAttribute('data-name');
                    const productPrice = parseFloat(this.getAttribute('data-price'));
                    const productImage = this.getAttribute('data-image');

                    const product = {
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    };

                    const productInCart = cart.find(item => item.name === product.name);
                    if (productInCart) {
                        productInCart.quantity += 1;
                    } else {
                        cart.push(product);
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${productName} has been added to your cart.`);
                });
            });
        });