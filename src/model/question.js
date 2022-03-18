const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Examination, { foreignKey: 'examinationId' })
      this.hasMany(models.Choice, { as: 'choices' })
      this.belongsTo(models.QuestionType, { foreignKey: 'questionTypeId', as: 'questionType' })
      this.hasMany(models.ResultDetail, { as: 'resultDetail' })
    }
  };
  Question.init({
    title: DataTypes.STRING,
    examinationId: DataTypes.INTEGER,
    questionTypeId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Question'
  })
  return Question
}
