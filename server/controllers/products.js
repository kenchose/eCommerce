const Product = require('./../models/Product');

module.exports = {
  create: async (req, res, next) => {
    const {
      imagePath,
      name,
      price,
      description,
      category
    } = req.body;

    //check if product already exist (by name)
    const productExist = await Product.findOne({
      "name": name
    });
    if (productExist) return res.status(400).send("Product already in your inventory");

    try {
      //if new product
      const newProduct = new Product({
        imagePath,
        name,
        price,
        description,
        category
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
  },

  onlyOne: async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById({
      _id: id
    });
    try {
      if (!product) return res.status(400).json({
        success: false,
        message: "No product found"
      });
      if (product) return res.status(200).json({
        product
      });
    } catch (error) {
      res.status(400).send(error);
    };
  },

  editProduct: async (req, res, next) => {
    const id = req.params._id
    const {
      category,
      name,
      pricce
    } = Product.findById({
      _id: id
    });
  },

  addToCart: async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById({
      _id: productId
    });
    if (!product) return res.status(400).send("No product found");
    try {
      let cart = new Cart(req.session.cart ? req.session.cart : {});
      cart.add(product, product.id)
      req.session.cart = cart;
      res.json({
        cart
      })
    } catch (error) {
      res.status(400).send(error);
    };
  }

}
