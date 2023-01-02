import { Dune } from 'src'

let dune: Dune

beforeEach(async () => {
  dune = new Dune()
  await dune.login()
})

describe('Dune', () => {
  it('login: should get a token', async () => {
    expect(dune).toHaveProperty('password', process.env.DUNE_PWD)
    expect(dune).toHaveProperty('username', process.env.DUNE_USER)
    expect(dune['token']).toBeString().not.toBeEmpty()
  })

  it('getQueryResultId', async () => {
    await dune['getExecutionId'](1517285)
    expect(dune.executionId).toBeString().not.toBeEmpty()
  })

  it('query', async () => {
    const { columns, data } = await dune.query(1517285)

    expect(columns).toEqual(['address'])
    expect(data).toBeArray().not.toBeEmpty()
  })
})
