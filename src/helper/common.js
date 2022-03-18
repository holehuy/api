const stringEscape = (str) => {
  return str.replace(/(_|%|\\)/g, '\\$&')
}

const isNum = (val) => {
  return !isNaN(val)
}
const replaceAt = (str, index, replacement) => {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length)
}
const generateNewEmail = (str, count) => {
  const indexAnotation = str.indexOf('@')
  if (!isNum(str.charAt(indexAnotation - 1))) {
    return str.substring(0, indexAnotation) + count.toString() + str.substring(indexAnotation)
  }
  return replaceAt(str, indexAnotation - 1, count.toString())
}

const getEmailPrefix = (str) => {
  const indexAnotation = str.indexOf('@')
  if (!isNum(str.charAt(indexAnotation - 1))) {
    return str.substring(0, indexAnotation)
  }
  return str.substring(0, indexAnotation - 1)
}

module.exports = {
  stringEscape,
  generateNewEmail,
  getEmailPrefix
}
