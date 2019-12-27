const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: {
    type: Object,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Order', OrderSchema)
