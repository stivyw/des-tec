'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Card.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true,

      }
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true,

      }
    },
    lista: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true,

      }
    }
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};