module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ExaminationTypes', [{
      enValue: 'Final',
      jaValue: '最後',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      enValue: 'Recruitment',
      jaValue: '採用',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      enValue: 'Training',
      jaValue: 'トレーニング',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ExaminationTypes', null, {})
  }
}
