const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Examination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.ExaminationType, { foreignKey: 'examinationTypeId', as: 'examinationType' })
      this.hasMany(models.Question, { as: 'questions' })
      this.hasMany(models.ExaminationResult, { as: 'examinationResults' })
    }
  };
  Examination.init({
    examName: DataTypes.STRING,
    examinationTypeId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    passed: DataTypes.INTEGER,
    randomize: DataTypes.BOOLEAN,
    numberOfQuestion: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    enrolled: DataTypes.INTEGER,
    status: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const now = new Date()
        const start = new Date(this.startDate)
        const end = new Date(this.endDate)
        if (now.getTime() < start.getTime()) return 'Edit'
        if (now.getTime() > end.getTime()) return 'View Result'
        return 'On-going'
      }
    },
    image: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Examination'
  })
  return Examination
}
