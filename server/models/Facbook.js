const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FBSchema = new Schema({
  name: {
    type: String
  },
  facebookId: {
    type: String
  },
  accessToken: {
    type: String
  }
})
