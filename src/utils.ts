// https://github.com/validatorjs/validator.js/blob/master/src/lib/util/assertString.js
const assertString = (input: any) => {
  const isString = typeof input === 'string' || input instanceof String

  if (!isString) {
    let invalidType: string = typeof input
    if (input === null) invalidType = 'null'
    else if (invalidType === 'object') invalidType = input.constructor.name

    throw new TypeError(`Expected a string but received a ${invalidType}`)
  }
}

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isEthereumAddress.js
const eth = /^(0x)[0-9a-f]{40}$/i
export const isEthereumAddress = (str: string) => {
  assertString(str)
  return eth.test(str)
}

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
