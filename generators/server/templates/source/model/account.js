const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const jwtConfig = require('../config').get('jwt');

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'accounts',
    underscored: true,
  });

  Account.associate = (db) => {
    // associations can be defined here
  };

  Account.scopes = (db) => {
    // scopes can be defined here
  };

  Account.prototype.generateToken = function() {
    return jwt.sign({id: this.id}, jwtConfig.secret);
  };

  return Account;
};