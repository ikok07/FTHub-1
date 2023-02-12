const purchaseController = require('../controllers/purchase');
const express = require('express');
const router = express.Router();

router.post('/create-checkout-session', purchaseController.postCheckoutSession);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  purchaseController.postWebhook
);

module.exports = router;
