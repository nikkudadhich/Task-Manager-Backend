const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ActivityLog = sequelize.define("ActivityLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  details: {
    type: DataTypes.TEXT,
  },

}, {
  timestamps: true,
});

module.exports = ActivityLog;