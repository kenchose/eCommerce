const Product = require('./../models/Product');

module.exports = {
  create: async (req, res, next) => {
    const {
      name,
      price
    } = req.body;

    //check if product already exist (by name)
    const productExist = await Product.findOne({
      "name": name
    });
    if (productExist) return res.status(400).send("Product already in your inventory");

    try {
      //if new product
      const newProduct = new Product({
        name,
        price
      });
      const product = await newProduct.save();
      res.status(200).json({
        product
      })
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getAll: async (req, res, next) => {
    const products = await Product.find({});
    try {
      if (!products) return res.status(400).json({
        success: false,
        message: "Cannot find products"
      });
      if (products) return res.status(200).json({
        products: products
      });
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
