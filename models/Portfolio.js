const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  trades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade'
  }]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);


// 65e8ab8090041be4307bf84c  reliance


// 65e8abb090041be4307bf84d  hdfc