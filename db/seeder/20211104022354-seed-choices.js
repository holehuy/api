const nouns = ['bird', 'clock', 'boy', 'plastic', 'duck', 'teacher', 'old lady', 'professor', 'hamster', 'dog']
const verbs = ['kicked', 'ran', 'flew', 'dodged', 'sliced', 'rolled', 'died', 'breathed', 'slept', 'killed']
const adjectives = ['beautiful', 'lazy', 'professional', 'lovely', 'dumb', 'rough', 'soft', 'hot', 'vibrating', 'slimy']
const adverbs = ['slowly', 'elegantly', 'precisely', 'quickly', 'sadly', 'humbly', 'proudly', 'shockingly', 'calmly', 'passionately']
const preposition = ['down', 'into', 'up', 'on', 'upon', 'below', 'above', 'through', 'across', 'towards']

function sentence () {
  const rand1 = Math.floor(Math.random() * 10)
  const rand2 = Math.floor(Math.random() * 10)
  const rand3 = Math.floor(Math.random() * 10)
  const rand4 = Math.floor(Math.random() * 10)
  const rand5 = Math.floor(Math.random() * 10)
  const rand6 = Math.floor(Math.random() * 10)
  const content = 'The ' + adjectives[rand1] + ' ' + nouns[rand2] + ' ' + adverbs[rand3] + ' ' + verbs[rand4] + ' because some ' + nouns[rand1] + ' ' + adverbs[rand1] + ' ' + verbs[rand1] + ' ' + preposition[rand1] + ' a ' + adjectives[rand2] + ' ' + nouns[rand5] + ' which, became a ' + adjectives[rand3] + ', ' + adjectives[rand4] + ' ' + nouns[rand6] + '?'
  return content
}

const numberOfQuestion = [30, 45, 30, 40, 30, 45, 30, 50, 45, 30, 50, 30, 35, 45, 45, 45, 30, 30, 35, 45, 50, 40, 50, 40, 45, 35, 40, 50, 50, 35, 30, 40, 35, 35, 50, 45, 40, 40, 50, 45, 40, 40, 40, 35, 40, 40, 45, 50, 35, 35, 40, 45, 50, 35, 45, 40, 50, 35, 50, 40, 50, 35, 30, 30, 35, 30, 35, 30, 30, 45, 30, 40, 50, 35, 30, 40, 40, 45, 35, 45, 45, 45, 35, 35, 50, 35, 40, 35, 30, 40, 45, 40, 45, 35, 40, 45, 50, 30, 30, 45]

function questionArray () {
  const array = []
  for (let i = 0; i < numberOfQuestion.length; i++) {
    for (let j = 0; j < numberOfQuestion[i]; j++) {
      let questionId
      if (i === 0) {
        questionId = i + j + 1
      } else {
        questionId = i * numberOfQuestion[i - 1] + j + 1
      }
      array.push({
        text: sentence(),
        questionId: questionId,
        isRight: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        text: sentence(),
        questionId: questionId,
        isRight: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        text: sentence(),
        questionId: questionId,
        isRight: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        text: sentence(),
        questionId: questionId,
        isRight: j === 15,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }
  return array
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Choices', questionArray(), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Choices', null, {})
  }
}
