const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenStore = new Schema({
  username: String,
  accessToken: String,
});

const TokenStore = mongoose.model('TokenStore', tokenStore);

module.exports = TokenStore;
