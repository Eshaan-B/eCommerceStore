const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(prodId, productPrice) {
    //fetch the previous cart items
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
        //analyze the cart => find existing product
        const existingProductIndex = cart.products.findIndex(
          (prod) => prod.id === prodId
        );
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          //updating that particular product
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          //adding the product
          updatedProduct = {
            id: id,
            qty: 1,
          };
          cart.products = [...cart.products, updatedProduct];
        }

        //update totalPrice
        cart.totalPrice = cart.totalPrice + productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err) => {});
      }
    });
    //add new product / increase quantity
  }
};