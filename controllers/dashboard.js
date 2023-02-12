const UserDetails = require('../models/user-details');
const UserDailyMeals = require('../models/user-daily-meals');

exports.postDetails = (req, res, next) => {
  const { born } = req.body;
  const { sex } = req.body;
  const { height } = req.body;
  const { weight } = req.body;
  const { allSports } = req.body;

  const sportArr = allSports.split(',');
  const sports = sportArr.map(sport => sport.slice(2));

  UserDetails.findOne({ where: { userId: req.user.id } })
    .then(userDetails => {
      return userDetails.update({
        born,
        sex,
        height,
        kg: weight,
        sports: String(sports),
      });
    })
    .then(result => {
      res.redirect('/food');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getDashboard = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    res.status(200).render('dashboard/general', {
      pageTitle: 'Общо',
      user: req.user,
      userDetails,
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      dashboard: true,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });
  });
};

exports.getWorkout = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    res.status(200).render('dashboard/workouts', {
      pageTitle: 'Тренировки',
      user: req.user,
      userDetails,
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });
  });
};

exports.getFood = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    let caloriesWanted;
    let procent = 1;

    const userSports = userDetails.sports.split(',').length;
    if (userSports < 2 && userSports > 0) procent = 0.6;
    if (userSports < 4 && userSports >= 2) procent = 0.8;
    if (userSports < 6 && userSports >= 4) procent = 1;
    if (userSports < 9 && userSports >= 6) procent = 1.2;

    if (userDetails.sex === 'Мъж')
      caloriesWanted =
        10 * userDetails.kg +
        6.25 * userDetails.height -
        5 * (new Date().getFullYear() - userDetails.born) +
        5;

    if (userDetails.sex === 'Жена')
      caloriesWanted =
        10 * userDetails.kg +
        6.25 * userDetails.height -
        5 * (new Date().getFullYear() - userDetails.born) -
        161;

    caloriesWanted = Math.ceil(caloriesWanted * 1.465 * procent);

    UserDailyMeals.findOne({ where: { userId: req.user.id } }).then(
      userDailyMeals => {
        res.status(200).render('dashboard/food', {
          pageTitle: 'Хранене',
          user: req.user,
          userDetails,
          userTodayMeals: JSON.parse(userDailyMeals.mealsToday),
          caloriesWanted,
          index: false,
          accountLogin: false,
          accountDetails: false,
          accountPage: false,
          dashboard: false,
          calculator: false,
          food: true,
          foodDetails: false,
          foodPersonal: false,
        });
      }
    );
  });
};

exports.postFood = (req, res, next) => {
  const { foodPork } = req.body;
  const { foodSheep } = req.body;
  const { foodGoat } = req.body;
  const { foodPig } = req.body;
  const { foodChicken } = req.body;
  const { foodQuantity } = req.body;

  let food;
  if (foodPork !== '0') food = foodPork;
  else if (foodSheep !== '0') food = foodSheep;
  else if (foodGoat !== '0') food = foodGoat;
  else if (foodPig !== '0') food = foodPig;
  else if (foodChicken !== '0') food = foodChicken;
  else return res.redirect('/food');

  let foodArr;
  UserDailyMeals.findOne({ where: { userId: req.user.id } }).then(
    userDailyMeals => {
      if (userDailyMeals.mealsToday)
        foodArr = JSON.parse(userDailyMeals.mealsToday);
      else foodArr = [];

      foodArr.push({ food, qty: foodQuantity });
      userDailyMeals
        .update({ mealsToday: JSON.stringify(foodArr) })
        .then(result => {
          res.redirect('/food');
        })
        .catch(err => console.log(err));
    }
  );
};

exports.postDiet = (req, res, next) => {
  const {
    dietName,
    allergiesSelected,
    caloriesWanted,
    fatWanted,
    proteinWanted,
    carbohydratesWanted,
  } = req.body;

  return UserDetails.findOne({ where: { userId: req.user.id } }).then(
    userDetails =>
      userDetails
        .update({
          preferDiet: dietName,
          allergies: allergiesSelected,
          energyHit: caloriesWanted,
          fatHit: fatWanted,
          proteinHit: proteinWanted,
          carbohydrateHit: carbohydratesWanted,
        })
        .then(result => res.redirect('/food-personal'))
  );
};

exports.getFoodPersonal = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails =>
    res.status(200).render('dashboard/food-personal', {
      pageTitle: 'Хранене',
      user: req.user,
      userDetails,
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: true,
    })
  );
};

exports.getCalculator = (req, res, next) => {
  UserDetails.findOne({ where: { userId: req.user.id } }).then(userDetails => {
    res.status(200).render('dashboard/calculator', {
      pageTitle: 'Калкулатор',
      user: req.user,
      userDetails,
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      dashboard: false,
      calculator: true,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });
  });
};
