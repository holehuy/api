const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.ExaminationResult, { as: 'examinationResults' })
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    googleId: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    position: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive'),
    phoneNumber: { type: DataTypes.STRING },
    role: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
