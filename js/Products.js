// getting the products

class Products {
    async getProducts() {
        try {
            let result = await fetch('../products.json')
            let data = await result.json()
            let products = data.items
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
const products = new Products()

export {
    products
}