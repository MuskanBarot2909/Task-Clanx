const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock'
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  }
});

module.exports = mongoose.model('Trade', TradeSchema);
