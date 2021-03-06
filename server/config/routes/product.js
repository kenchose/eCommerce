const router = require('express').Router();
const product = require('../../controllers/products');
const {
  validateBody,
  schemas
} = require('../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', {
  session: false
})

// router.post('/create', validateBody(schemas.productSchema), passportJwt, (req, res, next) => {
//   product.create(req, res, next);
// });

router.get('/products', (req, res, next) => {
  product.getAll(req, res, next);
});

router.get('/category/:category', (req, res, next) => {
  product.getCategory(req, res, next);
});

router.get('/:id', (req, res, next) => {
  product.onlyOne(req, res, next);
});

router.patch('/edit/:id', passportJwt, (req, res, next) => {
  product.editProduct(req, res, next);
});

router.get('/', (req, res, next) => {
  product.popularChoices(req, res, next);
});
module.exports = router;
