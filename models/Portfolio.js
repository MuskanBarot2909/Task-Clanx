const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  trades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade'
  }]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
