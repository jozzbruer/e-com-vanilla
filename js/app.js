const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "id7nyae4pkgh",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "iMNA-v-NYsuqiD15BFC1I7g0nOnxe-kGmS0nsTg49AU"
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.



// Variables
const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')

// Cart
let cart = []
// Buttons

let buttonsDOM = []

class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products))
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find(product => product.id === id)
    }

    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

class UI {
    displayProduct(products) {
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
                        <h4>$${item.price}</h4>
                        </article> 
                        <!--end of single product -->
            `;
        }).join('')


        productsDOM.innerHTML = result

    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttonsDOM = buttons
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
                this.setCartValue(cart)
                // display cart item
                this.addCartItem(cartItem)
                // show cart
                this.showCart()

                // remove the cart
                this.hideCart()

                // this.populate(cart)
            })

        });

    }
    setCartValue(cart) {
        let tempTotal = 0
        let itemTotal = 0
        cart.map(item => {
            tempTotal += item.price * item.amount
            itemTotal += item.amount
        })

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemTotal
    }


    addCartItem(item) {
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

        cartContent.appendChild(div)
        // console.log(cd);
    }

    showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }
    hideCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }
    setupAPP() {
        cart = Storage.getCart()
        this.setCartValue(cart)
        this.populate()

        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
    }


    populate() {
        cart.forEach(item => {
            this.addCartItem(item)
        });
    }

    cartLogic() {
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        })
        // cart functionality
        cartContent.addEventListener('click', e => {
            if (e.target.classList.contains('remove-item')) {
                let removeItem = e.target
                let id = removeItem.dataset.id
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id)
            } else if (e.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target
                let id = addAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount++
                Storage.saveCart(cart)
                this.setCartValue(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount
            } else if (e.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount--
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart)
                    this.setCartValue(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }

    clearCart() {
        let cartItems = cart.map(item => item.id)
        cartItems.forEach(id => this.removeItem(id))
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id)
        this.setCartValue(cart)
        Storage.saveCart(cart)
        let button = this.getSingleButton(id)
        button.disabled = false
        button.innerHTML = `<i class = "fa fa-shopping-cart"></i> Add to bag`
    }

    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id)
    }
}

class Products {
    async getProducts() {
        try {
            let contentful = await client.getEntries()
            // console.log(contentful)
            // let result = await fetch('../products.json')
            // let data = await result.json()
            let products = contentful.items
            products = products.map(item => {
                const {
                    title,
                    price
                } = item.fields
                const {
                    id
                } = item.sys
                const image = item.fields.image.fields.file.url
                return {
                    id,
                    title,
                    price,
                    image
                }
            })
            return products
        } catch (err) {
            console.log(err)
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products()
    const ui = new UI()
    // Setup app
    ui.setupAPP()
    products.getProducts().then(products => {
            ui.displayProduct(products)
            Storage.saveProducts(products)
        })
        .then(() => {

            ui.getBagButtons()
            ui.cartLogic()
        })
})