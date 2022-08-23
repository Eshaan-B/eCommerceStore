const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Home Page",
      prods: products,
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Shop",
      prods: products,
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (prod) => {
    res.render("shop/product-detail", {
      path: "/product-details",
      pageTitle: "Product Details",
      product: prod,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  console.log(req.body.productId);
  Cart.addProduct(req.body.productId);
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("sh  op/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, enxt) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
