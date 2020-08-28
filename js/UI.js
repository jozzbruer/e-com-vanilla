// Display products
import Storage from './Storage.js'
// const productsDOM = document.querySelector('.products-center')
class UI {
    displayProduct(products, productsDOM) {
        let result = products.map(item => {
            return `
                    <!-- single product -->
                    <article class="product">
                        <div class = "img-container" >
                        <img class="product-img" src = ${item.image} alt = ${item.id} />
                        <button class="bag-btn" data-id=${item.id}>
                        <i class = "fa fa-shopping-cart"></i>
                            add to bag
                        </button>
                        </div>
                        <h3>${item.title}</h3>
                        <h4>${item.price}</h4>
                        </article> 
                        <!--end of single product -->
            `;
        }).join('')


        productsDOM.innerHTML = result

    }

    getBagButtons(buttons, cart, buttonDOM, cartTotal, cartItems, cd, cartOverlay, cartDOM) {
        buttonDOM = buttons
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if (inCart) {
                button.innerText = 'In Cart'
                button.disabled = true
            }
            button.addEventListener('click', (e) => {
                e.target.innerText = 'In Cart';
                e.target.disabled = true
                // Get product from products
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount: 1
                }

                // add product to cart
                cart = [...cart, cartItem]

                // save cart in local storage
                Storage.saveCart(cart)
                // Set cart value
                this.setCartValue(cart, cartTotal, cartItems)
                // display cart item
                this.addCartItem(cartItem, cd)
                // show cart
                this.showCart(cartOverlay, cartDOM)
            })

        });

    }
    setCartValue(cart, cartTotal, cartItems) {
        let tempTotal = 0
        let itemTotal = 0
        cart.map(item => {
            tempTotal += item.price * item.amount
            itemTotal += item.amount
        })

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemTotal
    }


    addCartItem(item, cd) {
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `<img src=${item.image} alt="product-1" />
          <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
          </div>
          <div>
            <i class="fa fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fa fa-chevron-down" data-id=${item.id}></i>
          </div>`

        cd.appendChild(div)
        console.log(cd);
    }

    showCart(cartOverlay, cartDOM) {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }
}
const ui = new UI()

export {
    ui
}