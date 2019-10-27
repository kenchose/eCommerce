const router = require('express').Router();
const faker = require('faker');
const Product = require('./../../models/Product');

router.get('/', function (req, res, next) {
  const categories = ["Outdoor Gear", "Men", "Womaen", "Shoes", "Kids", "Sportswear", "Tops", "Bottoms", "Accessories"];
  const brands = ["Nike", "Adidas", "H&M", "Patagonia", "LA Sportiva", "Gucci"];
  for (let i = 0; i < 100; i++) {
    let product = new Product({
      imagePath: faker.image.image(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.words(),
      category: categories[Math.floor(Math.random() * categories.length)]
    });

    product.save();
  }
  res.redirect('/cartify')
});

module.exports = router;
