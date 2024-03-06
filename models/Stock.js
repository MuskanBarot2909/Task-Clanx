const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Stock', StockSchema);
