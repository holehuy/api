const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MasterDataEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  MasterDataEmployee.init({
    value: DataTypes.STRING,
    translationId: DataTypes.INTEGER,
    languageCode: DataTypes.ENUM('en', 'ja')
  }, {
    sequelize,
    modelName: 'MasterDataEmployee'
  })
  return MasterDataEmployee
}
