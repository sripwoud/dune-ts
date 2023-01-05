import { Dune } from 'src'
import { isEthereumAddress } from 'src/utils'

jest.setTimeout(30_000)

let dune: Dune

beforeEach(async () => {
  dune = new Dune()
  await dune.login()
})

describe('Dune', () => {
  it('login: should get a token', async () => {
    expect(dune).toHaveProperty('password', process.env.DUNE_PASSWORD)
    expect(dune).toHaveProperty('username', process.env.DUNE_USERNAME)
    expect(dune['token']).toBeString().not.toBeEmpty()
  })

  it('getQueryResultId', async () => {
    await dune['executeQuery'](1517285)
    expect(dune.executionId).toBeString().not.toBeEmpty()
  })

  it('can execute a query without parameters', async () => {
    const { columns, data } = await dune.query(1843270)

    expect(columns).toEqual(['address'])
    expect(data).toBeArrayOfSize(1)
    expect(data[0].address).toStartWith('0x')
  })

  it('can execute a query with parameters', async () => {
    const PARAMETER_DATAS = [
      { key: 'min', type: 'number', value: '0' },
      {
        key: 'tokenAddress',
        type: 'text',
        value: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      },
    ]
    const { columns, data } = await dune.query(1843233, PARAMETER_DATAS)

    expect(columns).toEqual(['address', 'token_address'])
    expect(data).toBeArrayOfSize(1)
    expect(isEthereumAddress(data[0].address)).toBeTrue()
    expect(data[0].token_address).toEqual(PARAMETER_DATAS[1].value)
  })
})
