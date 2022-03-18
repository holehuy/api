const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ResultDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Choice, { foreignKey: 'choiceId' })
      this.belongsTo(models.Question, { foreignKey: 'questionId' })
      this.belongsTo(models.ExaminationResult, { foreignKey: 'examinationResultId' })
    }
  };
  ResultDetail.init({
    examinationResultId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    choiceId: DataTypes.INTEGER,
    isRight: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ResultDetail'
  })
  return ResultDetail
}
