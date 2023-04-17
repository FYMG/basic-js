const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str ) {
  let result = []
  let splitedArr = str.split('')
  let curr = {'item': splitedArr[0], 'value': 0}
  splitedArr.forEach((item) => {
    if (item === curr.item) {
      curr.value += 1
    }
    else {
      if (curr.value === 1) {
        result.push(curr.item)
      }
      else {
        result.push(`${curr.value}${curr.item}`)
      }
      curr = {'item': item, 'value': 1}
    }
  })
  if (curr.item === undefined){
    return ''
  }
  if (curr.value === 1) {
    result.push(curr.item)
  }
  else {
    result.push(`${curr.value}${curr.item}`)
  }
  return result.join('')
}

module.exports = {
  encodeLine
};
