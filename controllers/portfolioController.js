const Portfolio = require('../models/Portfolio');
const Trade = require('../models/Trade');

// Get the portfolio with populated trades
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().populate('trades');
    res.json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Calculate holdings for each stock
exports.getHoldings = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().populate('trades');
    // Calculate holdings
    const holdings = portfolio.trades.reduce((acc, trade) => {
      if (trade.type === 'buy') {
        const existingHoldings = acc.find(holding => holding.stockId === trade.stockId);
        if (existingHoldings) {
          existingHoldings.quantity += 1;
          existingHoldings.averagePrice = (existingHoldings.averagePrice + trade.price) / 2;
          //existingHoldings.averagePrice = (existingHoldings.averagePrice * (existingHoldings.quantity - 1) + trade.price) / existingHoldings.quantity;
        } else {
          acc.push({ stockId: trade.stockId, quantity: 1, averagePrice: trade.price });
        }
      }
      return acc;
    }, []);
    res.json({ success: true, data: holdings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Calculate cumulative returns
exports.getCumulativeReturns = async (req, res) => {
  try {
    const trades = await Trade.find();
    let cumulativeReturn = 0;
    trades.forEach(trade => {
      if (trade.type === 'buy') {
        cumulativeReturn += 1000 - trade.price; // Assuming final price is 1000
      }
    });
    res.json({ success: true, data: { cumulativeReturn } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add a new trade to the portfolio
exports.addTrade = async (req, res) => {
  try {
    const { stockId, date, price, type } = req.body;
    const trade = new Trade({ stockId, date, price, type });
    await trade.save();
    const portfolio = await Portfolio.findOne();
    portfolio.trades.push(trade);
    await portfolio.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an existing trade
exports.updateTrade = async (req, res) => {
  try {
    const { tradeId, date, price, type } = req.body;
    await Trade.findByIdAndUpdate(tradeId, { date, price, type });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Remove a trade from the portfolio
exports.removeTrade = async (req, res) => {
  try {
    const { tradeId } = req.body;
    await Trade.findByIdAndDelete(tradeId);
    const portfolio = await Portfolio.findOne();
    portfolio.trades = portfolio.trades.filter(trade => trade.toString() !== tradeId);
    await portfolio.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
