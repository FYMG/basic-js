const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!(arr instanceof Array)) throw Error("'arr' parameter must be an instance of the Array!")
  return arr.reduce((acc, item, i)=>{
    if (acc.skipNext) {
      acc.skipNext = false
      return acc
    }
    switch (item){
      case '--discard-next': {
        acc.lastOperation = '--discard-next'
        acc.skipNext = true
        return acc
      }
      case '--discard-prev': {
        acc.lastOperation = '--discard-prev'
        if (acc.value[acc.value.length-1] === arr[i-1] && i-1 > 0) {
          acc.value.pop()
        }
        return acc
      }
      case '--double-next': {
        if (i < arr.length - 1) {
          acc.lastOperation = '--double-next'
          acc.value.push(arr[i + 1])
        }
        return acc
      }
      case '--double-prev': {
        acc.lastOperation = '--double-prev'
        if (acc.value[acc.value.length-1] === arr[i-1] && acc.lastOperation !== '--discard-next' && i-1 > 0) {
          acc.value.push(arr[i-1])
        }
        return acc
      }
      default: {
        acc.value.push(item)
        return acc
      }
    }
  }, {'value': [], 'skipNext': false, 'lastOperation': ''}).value
}


module.exports = {
  transform
};
