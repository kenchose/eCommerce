const Product = require("./../models/Product");

module.exports = {
  // create: async (req, res, next) => {
  //   console.log('product', req.body)
  //   const {
  //     imagePath,
  //     brand,
  //     name,
  //     price,
  //     description,
  //     category
  //   } = req.body;

  //   //check if product already exist (by name)
  //   const productExist = await Product.findOne({
  //     "name": name
  //   });
  //   if (productExist) return res.status(400).send("Product already in your inventory");

  //   try {
  //     //if new product
  //     const newProduct = new Product(req.body);
  //     const product = await newProduct.save();
  //     res.status(200).json({
  //       newProduct: product
  //     })
  //   } catch (error) {
  //     res.status(400).json({
  //       success:false,
  //       errorMessages: error
  //     });
  //   }
  // },

  getAll: async (req, res, next) => {
    const products = await Product.find({});
    try {
      if (!products)
        return res.status(400).json({
          success: false,
          errorMessage: "Cannot find products"
        });
      if (products)
        return res.status(200).json({
          products: products
        });
    } catch (error) {
      res.status(400).json({
        errorMessage: error
      });
    }
  },

  onlyOne: async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById({
      _id: id
    });
    try {
      if (!product)
        return res.status(400).json({
          success: false,
          errorMessage: "No product found"
        });
      if (product) {
        res.status(200).json({
          product
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getCategory: async (req, res, next) => {
    let category = req.params.category;
    const products = await Product.find({
      category: category
    });
    try {
      if (!products)
        return res.status(400).json({
          success: false,
          errorMessage: `No ${category} category found`
        });
      if (products)
        return res.status(200).json({
          success: true,
          message: `Found ${category} category`,
          products: products
        });
    } catch (error) {
      res.status(400).json({
        errorMessage: error
      });
    }
  },

  popularChoices: async (req, res, next) => {
    const last5 = await Product.find().sort({
      $natural: -1
    }).limit(5)
    try {
      if (!last5) return res.status(400).json({
        success: false,
        errorMessage: "Could not find products"
      });
      if (last5) return res.status(200).json({
        products: last5
      })
    } catch (error) {
      res.status(400).json({
        errorMessage: error
      })
    }
  }
};

// editProduct: async (req, res, next) => {
//   const id = req.params._id
//   const updateOps = {};
//   for (const ops of req.body) { //loop through req.body
//     updateOps[ops.propName] = ops.value //therefore we can change one or multiple key value pairs
//   }
//   Product.update({
//     _id: id
//   }, {
//     $set: updateOps
//   }, (err, product) => {
//     if (err) {
//       res.json(err)
//     } else {
//       res.json(product)
//     }
//   })
// },
