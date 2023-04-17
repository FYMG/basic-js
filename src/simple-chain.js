const { NotImplementedError } = require('../extensions/index.js');


class PositionNotFoundError extends Error {
  constructor(message) {
    super(message);
    this._specialProp = {
      CORRECT_RESULT_MSG: 'CORRECT',
      INCORRECT_RESULT_MSG: 'INCORRECT',
      SPECIAL_PROP_VALUE: 'SP_NI'
    };
  }
}

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length
  },
  addLink(value = '  ') {
    this.chain.push(value)
    return this
  },
  removeLink(position) {
    if (
        this.chain.length < position ||
        !Number.isInteger(position) ||
        typeof position !== 'number' ||
        isNaN(position) ||
        position <= 0
    ) {
      this.chain = []
      throw new Error('You can\'t remove incorrect link!')
    }
    else {
      this.chain.splice(position-1, 1)
    }
    return this
  },
  reverseChain() {
    this.chain.reverse()
    return this
  },
  finishChain() {
    const str = this.chain.map((item) => `( ${item} )`).join('~~')
    this.chain = []
    return str
  }
};

console.log(chainMaker.reverseChain().reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(null).addLink(1.233).addLink(true).addLink(false).removeLink(3).addLink(1.233).finishChain(),)

module.exports = {
  chainMaker
};
