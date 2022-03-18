const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ExaminationResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Examination, { foreignKey: 'examinationId' })
      this.belongsTo(models.User, { foreignKey: 'employeeId' })
      this.hasMany(models.ResultDetail, { as: 'resultDetail' })
    }
  };
  ExaminationResult.init({
    employeeId: DataTypes.INTEGER,
    examinationId: DataTypes.INTEGER,
    attempted: DataTypes.INTEGER,
    correct: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    isPass: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ExaminationResult'
  })
  return ExaminationResult
}
