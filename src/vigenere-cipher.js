const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  constructor(direct  = true) {
    this.direct = direct
    this.alphabet = this._generateAlphabet()
  }
  _generateAlphabet () {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let result = {}
    alphabet.forEach((item, index)=>{
      result[item] = Object
          .fromEntries((alphabet.slice(index) + ',' + alphabet.slice(0,index))
              .split(',')
              .map((item, index) =>
                  [alphabet[index], item, ]
              ))
    })
    return result
  }

  _normalizeKey (string, key) {
    string = string
        .split('')
        .filter((item) => this._charIsLetter(item))
        .join('')
    const repeat = Math.trunc(string.length / key.length)
    return (key.repeat(repeat) + key.slice(0, string.length - repeat*key.length)).toUpperCase()
  }
  encrypt(message, key) {
    if (!message || !key) throw Error('Incorrect arguments!')
    const normalizeKey = this._normalizeKey(message, key).split('')
    const reverseResult = message
        .toUpperCase()
        .split('')
        .reverse()
        .map((item) =>
            this._charIsLetter(item)
                ?this.alphabet[item][normalizeKey.pop()]
                :item)
    return this.direct?reverseResult.reverse().join(''):reverseResult.join('')
  }
  decrypt(message, key) {
    if (!message || !key) throw Error('Incorrect arguments!')
    const normalizeKey = this._normalizeKey(message, key).split('')
    const reverseResult = message
        .toUpperCase()
        .split('')
        .reverse()
        .map((item) => {
          if (this._charIsLetter(item)){
            const column = normalizeKey.pop()
            let result = ''
            Object.keys(this.alphabet).forEach(key => {
              if (this.alphabet[key][column] === item){
                result = key
              }
            })
            return  result
          }
          else return item
        })
    return this.direct?reverseResult.reverse().join(''):reverseResult.join('')
  }
  _charIsLetter (str) {
    return str.toLowerCase() !== str.toUpperCase()
  }
}
// const vb = new VigenereCipheringMachine()
// console.log(vb.encrypt('attack at dawn!', 'alphonse'))
// console.log(vb.decrypt('AEIHQX SX DLLU!', 'alphonse'))



module.exports = {
  VigenereCipheringMachine
};
