const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Otp = sequelize.define("Otp", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  otpCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Otp;