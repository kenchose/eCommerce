const router = require('express').Router();
const dotenv = require("dotenv").config();
const orderOrder = process.env.SECRET_SESSION_KEY;
const order = require('./../../controllers/orders');
const verify = require('./verifyToken');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', {
  session: false
});

router.get('/checkout', passportJwt, (req, res, next) => {
  order.checkout(req, res, next)
})

router.post('/charge', passportJwt, (req, res, next) => {
  order.charge(req, res, next);
});

router.get('/add-to-cart/:productId', (req, res, next) => {
  order.addToCart(req, res, next);
});

router.get('/increaseQty/:productId', (req, res, next) => {
  order.increaseByOne(req, res, next);
});

router.get('/decreaseQty/:productId', (req, res, next) => {
  order.decreaseByOne(req, res, next);
});

router.get('/cart', (req, res, next) => {
  order.getCart(req, res, next);
});

router.get('/purchaseHistory', passportJwt, (req, res, next) => {
  order.allOrders(req, res, next)
})

router.get('/:orderId', passportJwt, (req, res, next) => {
  order.singleOrder(req, res, next);
});

router.get('/remove-from-cart/:productId', (req, res, next) => {
  order.removeItem(req, res, next);
});

module.exports = router;
