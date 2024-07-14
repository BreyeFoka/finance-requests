const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  worker_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  names: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filepath:{
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'denied'),
    defaultValue: 'pending'
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true
  },
  approval:{
    type: DataTypes.STRING,
    allowNull: true
  },
  approvalcomment:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

User.hasMany(Request, { foreignKey: 'worker_id' });
Request.belongsTo(User, { foreignKey: 'worker_id' });

module.exports = Request;
