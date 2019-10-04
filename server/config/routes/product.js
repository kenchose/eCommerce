const router = require('express').Router();
const product = require('../../controllers/products');
const {
  validateBody,
  schemas
} = require('../../models/validation');


router.post('/create', validateBody(schemas.productSchema), (req, res, next) => {
  product.create(req, res, next);
});

router.get('/products', (req, res, next) => {
  product.getAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  product.getOnew(req, res, next);
});

router.post('/add-to-cart/:id', (req, res, next) => {
  product.addToCart(req, res, next);
});

router.put('/product/edit/:id', (req, res, next) => {
  product.editProduct(req, res, next);
});

module.exports = router;
