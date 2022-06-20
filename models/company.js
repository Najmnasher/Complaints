'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Company.hasMany(models.Comment, {
        foreignKey: 'CompanyId'
      })
    }
  }
  Company.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    about: DataTypes.TEXT,
    opening: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};