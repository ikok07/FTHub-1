const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserDetails = sequelize.define('user-details', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  born: Sequelize.INTEGER,
  sex: Sequelize.STRING,
  height: Sequelize.INTEGER,
  kg: Sequelize.INTEGER,
  sports: Sequelize.STRING,
  preferDiet: Sequelize.STRING,
  allergies: Sequelize.STRING,
  energyHit: Sequelize.STRING,
  carbohydrateHit: Sequelize.STRING,
  proteinHit: Sequelize.STRING,
  fatHit: Sequelize.STRING,
});

module.exports = UserDetails;
