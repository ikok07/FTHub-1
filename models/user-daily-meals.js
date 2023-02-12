const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserDailyMeals = sequelize.define('user-daily-meals', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mealsToday: Sequelize.STRING,
  mealsYesterday: Sequelize.STRING,
});

module.exports = UserDailyMeals;
