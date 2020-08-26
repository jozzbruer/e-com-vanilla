// local storage
export default class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products))
    }
}