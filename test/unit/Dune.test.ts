import { Dune } from '../../src/Dune'

describe('Dune', () => {
  it('get csrf token', async () => {
    const dune = new Dune()
    // using array notation to access private methods
    await dune['getCsrfToken']()
    console.log(dune.cookies)
    expect(dune.cookies).toBeDefined()
  })

  it('getAuthToken', async () => {
    jest.setTimeout(10000)
    const dune = new Dune()
    try {
      await dune['getAuthToken']()
    } catch (e) {
      console.error(e)
    }
    console.log(dune.cookies)
    expect(dune.cookies).toBeDefined()
  })

  it.todo('maybeGetCsrfToken')
})
