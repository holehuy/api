module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('QuestionTypes', [{
      enValue: 'Multiple Choices',
      jaValue: '多肢選択法',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      enValue: 'Checkboxes',
      jaValue: 'チェックボックス',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QuestionTypes', null, {})
  }
}
