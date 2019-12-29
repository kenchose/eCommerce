const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const stripePubKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const Order = require('./../models/Order');
const Cart = require('./../models/Cart');
const Product = require('./../models/Product');
const stripe = require("stripe")(stripeSecretKey);



module.exports = {

  charge: async (req, res, next) => {
    const {
      stripeToken,
      email,
    } = req.body
    const user = req.user
    const cart = req.session.cart
    let totalAmount = Number(req.body.totalPayment) * 100
    try {
      const customer = await stripe.customers.create({
        email,
        source: stripeToken,
        shipping: {
          name: `${user.first_name} ${user.last_name}`,
          address: {
            line1: user.address['street1'],
            line2: user.address['street2'],
            city: user.address['city'],
            state: user.address['state'],
            country: 'USA',
            postal_code: user.address['zip']
          }
        }
      })
      if (customer) {
        const amount = parseFloat(totalAmount.toFixed(0))
        const charge = await stripe.charges.create({
          amount: amount,
          currency: 'usd',
          description: `Charge for ${customer.email}`,
          customer: customer.id
        })
        if (charge) {
          const order = new Order({
            user: user,
            cart: cart,
            paymentId: charge.id,
            amount: amount / 100
          })
          const newOrder = await order.save();
          if (newOrder) {
            req.session.cart = null;
            res.status(200).json({
              message: 'Successful purchase',
              charge: charge,
            })
          }
        }
      }
    } catch (err) {
      res.status(500).send(err)
    }
  },

  checkout: async (req, res, next) => {
    try {
      res.json({
        stripePubKey: stripePubKey,
        stripeSecretkey: stripeSecretKey
      })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  allOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({
        user: req.user
      })
      if (!orders) return res.json({
        message: "No purchase history"
      });
      var cart;
      orders.forEach(order => {
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
        return cart
      })
      res.status(200).json({
        cart: cart,
        orders: orders
      })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  singleOrder: async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const order = await Order.findById({
        _id: orderId
      });
      if (!order || null) return res.status(400).json({
        errorMessage: "No order found"
      })
      let key = order.cart.items
      let items = Object.values(key)
      res.status(200).json({
        order,
        items
      })
    } catch (error) {
      res.status(400).json({
        errorMessage: error
      })
    }
  },

  getCart: (req, res, next) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {
      items: {},
      totalQty: 0,
      totalPrice: 0
    });
    const items = cart.generateArray();
    req.session.cart = cart;
    res.status(200).json({
      cartItems: items,
      cart: cart
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
      cart.add(product, product._id);
      const items = cart.generateArray();
      req.session.cart = cart;
      res.status(200).json({
        cart: cart,
        cartItems: items,
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
        removedCart: cart
      })
    } catch (err) {
      res.status(400).json({
        errorMessage: err
      })
    }
  }
}
