'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ajuan.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Ajuan.init({
    userId: DataTypes.INTEGER,
    jenis_barang: DataTypes.STRING,
    jumlah_permintaan: DataTypes.STRING,
    jumlah_dikeluarkan: DataTypes.STRING,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ajuan',
  });
  return Ajuan;
};