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

    await dune['auth']()
    ;['csrf', 'auth-id-token', 'auth-refresh', 'auth-user'].forEach(
      (cookie) => {
        expect(dune.cookies[cookie]).toBeDefined().toBeString().not.toBeEmpty()
      },
    )
  })

  it.todo('maybeGetCsrfToken')
})
