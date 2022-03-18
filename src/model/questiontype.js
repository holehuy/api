const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class QuestionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.Question, { as: 'questions' })
    }
  };
  QuestionType.init({
    enValue: DataTypes.STRING,
    jaValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuestionType'
  })
  return QuestionType
}
