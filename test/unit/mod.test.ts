import { TEST } from '@mod'

describe('Test', () => {
  it('some test', () => {
    // can chain matchers with 'jest-chain'
    expect(TEST).toBeDefined().toEqual('abc')
  })
})
