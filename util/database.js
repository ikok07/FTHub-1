const Sequelize = require('sequelize');

const sequelize = new Sequelize('fthub', 'root', '1357900', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

module.exports = sequelize;
