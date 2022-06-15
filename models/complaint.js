'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Complaint.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      models.Complaint.belongsTo(models.Company, {
        foreignKey: 'userId'
      })
      models.Complaint.hasMany(models.Comment, {
        foreignKey: 'companyId'
      })
    }
  }
  Complaint.init({
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    companyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Complaint',
  });
  return Complaint;
};