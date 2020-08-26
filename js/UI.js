// Display products

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

    getBagButtons(buttons, cart) {
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if (inCart) {
                button.innerText = 'In Cart'
                button.disabled = true
            } else {
                button.addEventListener('click', (e) => {
                    e.target.innerText = 'In Cart';
                    e.target.disabled = true
                })
            }
        });
    }
}
const ui = new UI()

export {
    ui
}