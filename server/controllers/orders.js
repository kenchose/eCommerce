const mongoose = require('mongoose');
const Order = require('./../models/Order');
const Cart = require('./../models/Cart');
const Product = require('./../models/Product');

module.exports = {

  allOrders: async (req, res, next) => {
    const order = await Order.find({})
    try {
      res.status(200).json({
        allOrders: order,
        count: order.length
      })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  getCart: (req, res, next) => {
    const cart = new Cart(req.session.cart);
    const currCart = cart.generateArray()
    const fullCart = req.session.cart;
    res.status(200).json({
      cart: currCart,
      fullCart: fullCart
    })
  },

  addToCart: async (req, res, next) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {
      items: {},
      totalQty: 0,
      totalPrice: 0
    });

    const product = await Product.findById({
      _id: req.params.productId
    });
    try {
      let qty = req.params.qty;
      cart.add(product, product._id, qty);
      req.session.cart = cart;
      res.status(200).json({
        cart: cart
      })
    } catch (err) {
      res.status(400).json({
        errorMessage: err
      })
    }
  },

  removeItem: async (req, res, next) => {
    if (!req.session.cart) return res.status(400).send("No cart found")
    try {
      const cart = new Cart(req.session.cart);
      cart.remove(req.params.productId);
      req.session.cart = cart;
      res.status(200).json({
        message: 'Successfully removed item',
        cart: cart
      })
    } catch (err) {
      res.status(400).json({
        errorMessage: err
      })
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const order = await Order.deleteOne({
        _id: req.params.orderId
      });
      res.status(200).json({
        message: "Successfully removed order",
        order
      })
    } catch (err) {
      res.status(400).json({
        message: error
      })
    }
  },
}


// singleOrder: async (req, res, next) => {
//   // const orderId = req.params.orderId;
//   const order = await Order.findById({
//     _id: orderId
//   });
//   if (!order || null) return res.status(400).send("No order found");
//   try {
//     res.status(200).json({
//       message: "Order Found",
//       order: order,
//       request: {
//         type: 'GET',
//         url: `http://localhost:8000/api/order/${orderId}`
//       }
//     })
//   } catch (err) {
//     res.status(400).json({
//       error: err
//     })
//   }
// },
