module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MasterDataEmployees', [{
      value: 'Newest Employees',
      translationId: 1,
      languageCode: 'en',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '最新従業員',
      translationId: 1,
      languageCode: 'ja',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: 'Oldest Employees',
      translationId: 2,
      languageCode: 'en',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '最年長の従業員',
      translationId: 2,
      languageCode: 'ja',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MasterDataEmployees', null, {})
  }
}
