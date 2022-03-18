module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MasterDataEmployees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      translationId: { allowNull: false, type: Sequelize.INTEGER },
      languageCode: { allowNull: false, type: Sequelize.ENUM('en', 'ja') },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MasterDataEmployees')
  }
}
