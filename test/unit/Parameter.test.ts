import {
  DatetimeParameter,
  NumberParameter,
  ParameterType,
  TextParameter,
} from 'src/Parameters/Parameter'

describe('Parameter', () => {
  describe('constructor', () => {
    it('should throw and error if key is missing', () => {
      expect(
        // @ts-expect-error - force wrong type in case used in non ts project
        () => new DatetimeParameter({ value: new Date() }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'key'"`)
      expect(
        // @ts-expect-error
        () => new TextParameter({ value: 'value' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'key'"`)
      expect(
        // @ts-expect-error
        () => new NumberParameter({ value: 'value' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'key'"`)
    })

    it('should throw and error if value is missing', () => {
      expect(
        // @ts-expect-error
        () => new DatetimeParameter({ key: 'key' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'value'"`)
      expect(
        // @ts-expect-error
        () => new TextParameter({ key: 'key' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'value'"`)
      expect(
        // @ts-expect-error
        () => new NumberParameter({ key: 'key' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Missing parameter prop 'value'"`)
    })

    it('should throw an error if key is not a string', () => {
      expect(
        // @ts-expect-error
        () => new NumberParameter({ key: 123, value: 'value' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Expecting 'key' prop to be of type 'string'"`,
      )
      expect(
        // @ts-expect-error
        () => new TextParameter({ key: 123, value: 'value' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Expecting 'key' prop to be of type 'string'"`,
      )
      expect(
        // @ts-expect-error
        () => new DatetimeParameter({ key: 123, value: new Date() }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Expecting 'key' prop to be of type 'string'"`,
      )
    })

    it('should throw an error if value is not a string', () => {
      expect(
        // @ts-expect-error
        () => new NumberParameter({ key: 'key', value: 123 }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Expecting 'value' prop to be of type 'string'"`,
      )
    })
  })
})

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

  it('throws if not constructed with "value" prop of type string', () => {
    expect(
      // @ts-expect-error
      () => new NumberParameter({ ...PARAMETER_DATA, value: 1 }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expecting 'value' prop to be of type 'string'"`,
    )
  })
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

  it('throws if not constructed with "value" prop of type string', () => {
    expect(
      // @ts-expect-error
      () => new TextParameter({ ...PARAMETER_DATA, value: 1 }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expecting 'value' prop to be of type 'string'"`,
    )
  })
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

  it('serializes date', () => {
    const date = new Date('2020/01/01')
    expect(parameter.serializeDate(date)).toEqual('2019-12-31 23:00:00')
  })

  it('toObject returns parameters object with right types', () => {
    expect(parameter.toObject()).toEqual({
      ...PARAMETER_DATA,
      value: '2023-02-28 23:00:00',
    })
  })

  it('throws if not constructed with "value" prop that is not a Date instance', () => {
    expect(
      // @ts-expect-error
      () => new DatetimeParameter({ ...PARAMETER_DATA, value: 1 }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expecting 'value' prop to be Date instance for Datetime parameters"`,
    )
  })
})

describe('ListParameter', () => {
  it.todo('has the expected properties')

  it.todo('toObject returns parameters object with right types')

  it.todo('validates constructor arguments types')
})
