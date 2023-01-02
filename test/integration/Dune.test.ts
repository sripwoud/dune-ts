import { Dune } from 'src'

describe('Dune', () => {
  it('login: should get a token', async () => {
    const dune = new Dune()
    expect(dune).toHaveProperty('password', process.env.DUNE_PWD)
    expect(dune).toHaveProperty('username', process.env.DUNE_USER)

    await dune.login()

    expect(dune['token']).toBeString().not.toBeEmpty()
  })
})
