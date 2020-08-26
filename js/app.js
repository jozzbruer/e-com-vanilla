import {
    products
} from './Products.js'
import Storage from './Storage.js'
import {
    ui
} from './UI.js'
// Variables
const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverley = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')

// Cart
let cart = []



document.addEventListener('DOMContentLoaded', () => {
    products.getProducts().then(products => {
        ui.displayProduct(products, productsDOM)
        Storage.saveProducts(products)
    })
    // .then(() => {


    //     // console.log(buttons)
    //     ui.getBagButtons()
    // })
})