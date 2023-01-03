import {
  DatetimeParameter,
  NumberParameter,
  ParameterType,
  TextParameter,
} from 'src/Parameters/Parameter'

describe('NumberParameter', () => {
  const PARAMETER_DATA = {
    key: 'amount',
    type: ParameterType.Number,
    value: '100000000000000000000',
  }
  const parameter = new NumberParameter(PARAMETER_DATA)

  it('has the right properties', () => {
    expect(parameter).toHaveProperty('key', PARAMETER_DATA.key)
    expect(parameter).toHaveProperty('type', PARAMETER_DATA.type)
    expect(parameter).toHaveProperty('value', PARAMETER_DATA.value)
  })

  it('toObject returns parameters object with right types', () => {
    expect(parameter.toObject()).toEqual(PARAMETER_DATA)
  })

  it.todo('validates constructor arguments types')
})

describe('TextParameter', () => {
  const PARAMETER_DATA = {
    key: 'tokenAddress',
    type: ParameterType.Text,
    value: '"0xc18360217d8f7ab5e7c516566761ea12ce7f9d72"',
  }
  const parameter = new TextParameter(PARAMETER_DATA)

  it('has the expected properties', () => {
    expect(parameter).toHaveProperty('key', PARAMETER_DATA.key)
    expect(parameter).toHaveProperty('type', PARAMETER_DATA.type)
    expect(parameter).toHaveProperty('value', PARAMETER_DATA.value)
  })

  it('toObject returns parameters object with right types', () => {
    expect(parameter.toObject()).toEqual(PARAMETER_DATA)
  })

  it.todo('validates constructor arguments types')
})

describe('DatetimeParameter', () => {
  const PARAMETER_DATA = {
    key: 'createdAt',
    type: ParameterType.Datetime,
    value: new Date('3/1/23'),
  }
  const parameter = new DatetimeParameter(PARAMETER_DATA)

  it('has the expected properties', () => {
    expect(parameter).toHaveProperty('key', PARAMETER_DATA.key)
    expect(parameter).toHaveProperty('type', PARAMETER_DATA.type)
    expect(parameter).toHaveProperty('value', PARAMETER_DATA.value)
  })

  it('toObject returns parameters object with right types', () => {
    expect(parameter.toObject()).toEqual({
      ...PARAMETER_DATA,
      value: '2023-02-28T23:00:00.000Z',
    })
  })

  it.todo('validates constructor arguments types')
})

describe('ListParameter', () => {
  it.todo('has the expected properties')

  it.todo('toObject returns parameters object with right types')

  it.todo('validates constructor arguments types')
})
