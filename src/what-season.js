const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) return 'Unable to determine the time of year!'
  if (!Date.parse(date) || Object.getOwnPropertyNames(date).length !==0) throw Error('Invalid date!')
  return date.getMonth() > 10 || date.getMonth() < 2
      ?'winter'
      :date.getMonth() < 5
          ?'spring'
          :date.getMonth() < 8
              ?'summer'
              :'autumn'
}

module.exports = {
  getSeason
};


// If the date argument was not passed, the function must return the string 'Unable to determine the time of year!'. If the date argument is invalid, the function must throw an Error with message Invalid date!.
//
// Shh! An enemy scout has lurked among the arguments that come into this function.
//
// Disguised
// He is guided by the famous proverb: “If it looks like a duck, swims like a duck and quacks like a duck, then it probably is a duck (who cares what it really is)”. He is expertly disguised as a real date, but a clever javascript developer can catch him and throw an Error with message Invalid date! just in time!
//
//     For example:
//
//     const springDate = new Date(2020, 02, 31)
//
// getSeason(springDate) => 'spring'
//
// Write your code in src/what-season.js.