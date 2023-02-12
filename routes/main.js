const mainController = require('../controllers/main');
const express = require('express');
const router = express.Router();

router.get('/', mainController.getIndex);

// Other routes
const accountRoutes = require('../routes/account');
const dashboardRoutes = require('../routes/dashboard');
const purchaseRoutes = require('../routes/purchase');
router.use(accountRoutes);
router.use(dashboardRoutes);
router.use(purchaseRoutes);

module.exports = router;
