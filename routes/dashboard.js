const dashboardController = require('../controllers/dashboard');
const authMiddlewares = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.post('/user-details', dashboardController.postDetails);

// prettier-ignore
// router.get('/dashboard', authMiddlewares.isAuth, authMiddlewares.hasDetails, dashboardController.getDashboard);

// prettier-ignore
// router.get('/workout', authMiddlewares.isAuth, authMiddlewares.hasDetails, dashboardController.getWorkout);

// prettier-ignore
router.get('/food', authMiddlewares.isAuth, authMiddlewares.hasDetails, dashboardController.getFood);

// prettier-ignore
router.get('/food-personal', authMiddlewares.isAuth, authMiddlewares.hasFoodSetup, dashboardController.getFoodPersonal);

router.post('/food', dashboardController.postFood);

router.post('/save-diet', dashboardController.postDiet);

// prettier-ignore
router.get('/calculator', authMiddlewares.isAuth, authMiddlewares.hasDetails, dashboardController.getCalculator);

module.exports = router;
