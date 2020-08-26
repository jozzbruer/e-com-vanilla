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

    // getBagButtons() {
    //     const buttons = [...document.querySelectorAll('.bag-button')]
    //     console.log(buttons)
    // }
}
const ui = new UI()

export {
    ui
}