const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Question, { foreignKey: 'questionId' })
      this.hasMany(models.ResultDetail, { as: 'resultDetail' })
    }
  };
  Choice.init({
    questionId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    isRight: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Choice'
  })
  return Choice
}
