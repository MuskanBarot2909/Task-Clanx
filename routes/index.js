const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Portfolio routes

// GET route to retrieve the entire portfolio with trades
router.get('/portfolio', portfolioController.getPortfolio);

// GET route to retrieve holdings 
router.get('/holdings', portfolioController.getHoldings);

// GET route to retrieve cumulative returns
router.get('/returns', portfolioController.getCumulativeReturns);

// POST route to add a new trade to the portfolio
router.post('/addTrade', portfolioController.addTrade);

// POST route to update an existing trade
router.post('/updateTrade', portfolioController.updateTrade);

// POST route to remove a trade from the portfolio
router.post('/removeTrade', portfolioController.removeTrade);

module.exports = router;
