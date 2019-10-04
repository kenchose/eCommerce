const mongoose = require('mongoose');

const CategorySchcema = new mongoose.Schem({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', CategorySchcema)
