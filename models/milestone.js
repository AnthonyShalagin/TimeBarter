'use strict';
const models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Milestone = sequelize.define('Milestone', {
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    deadline: DataTypes.DATE,
    updateRequests: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    fulfilled: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        // one to many relationship to Transaction
        // Milestone.hasOne(models.Transaction);
      }
    }
  });
  return Milestone;
};