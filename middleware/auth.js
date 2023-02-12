const UserDetails = require('../models/user-details');

exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(200).render('account/account', {
      pageTitle: 'Акаунт',
      index: false,
      accountLogin: true,
      accountDetails: false,
      accountPage: false,
      errMessage: 'Трябва да имате акаунт!',
      successMessage: null,
      user: req.user,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });
  } else {
    next();
  }
};

exports.hasDetails = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    if (
      userDetails.born === null ||
      userDetails.sex === null ||
      userDetails.height === null ||
      userDetails.kg === null ||
      userDetails.sports === null
    ) {
      res.status(200).render('account/account-details', {
        pageTitle: 'Детайли за акаунта',
        index: false,
        user: req.user,
        index: false,
        accountLogin: false,
        accountDetails: true,
        accountPage: false,
        dashboard: false,
        calculator: false,
        food: false,
        foodDetails: false,
        foodPersonal: false,
      });
    } else {
      next();
    }
  });
};

exports.hasFoodSetup = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    if (
      userDetails.preferDiet === null ||
      userDetails.energyHit === null ||
      userDetails.carbohydrateHit === null ||
      userDetails.proteinHit === null ||
      userDetails.fatHit === null
    ) {
      res.status(200).render('dashboard/food-setup', {
        pageTitle: 'Настройки за диети',
        index: false,
        user: req.user,
        index: false,
        accountLogin: false,
        accountDetails: false,
        accountPage: false,
        dashboard: false,
        calculator: false,
        food: false,
        foodDetails: true,
        foodPersonal: false,

        caloriesWanted: 100,
        carbohydratesWanted: 100,
        proteinWanted: 100,
        fatWanted: 100,
      });
    } else {
      next();
    }
  });
};
