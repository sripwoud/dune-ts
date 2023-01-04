import { Parameters } from 'src/Parameters'
import { ParameterType } from 'src/Parameters/Parameter'

describe('Parameters', () => {
  it('create list of object parameters with right types', () => {
    const PARAMETERS_DATA = [
      {
        key: 'amount',
        type: ParameterType.Number,
        value: '100000000000000000000',
      },
      {
        key: 'tokenAddress',
        type: ParameterType.Text,
        value: '"0xc18360217d8f7ab5e7c516566761ea12ce7f9d72"',
      },
      {
        key: 'createdAt',
        type: ParameterType.Datetime,
        value: new Date('3/1/23'),
      },
    ]

    const parameters = Parameters.create(PARAMETERS_DATA)

    PARAMETERS_DATA.slice(0, 2).forEach(({ key, type, value }, index) => {
      expect(parameters[index].key).toEqual(key)
      expect(parameters[index].type).toEqual(type)
    })
    expect(parameters[2].key).toEqual(PARAMETERS_DATA[2].key)
    expect(parameters[2].type).toEqual(PARAMETERS_DATA[2].type)
    // @ts-expect-error
    expect(parameters[2].value).toEqual(PARAMETERS_DATA[2].value.toISOString())
  })

  it('throws if constructor with wrong "type" prop value', () => {
    ;['foo', 1, null, undefined].forEach((type) => {
      expect(() =>
        Parameters.create([
          {
            key: 'amount',
            type,
            value: '100000000000000000000',
          },
        ]),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Expecting 'type' to be 'datetime', 'number' or 'text (parameter at index 0)"`,
      )
    })
  })
})
