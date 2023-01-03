export enum ParameterType {
  Datetime = 'datetime',
  Number = 'number',
  Text = 'text',
}

export interface ParameterData {
  key: unknown
  value: unknown
}

export abstract class Parameter {
  protected readonly key: string
  abstract readonly type: string
  protected readonly value: unknown

  constructor(parameterData: ParameterData) {
    this.validate(parameterData)
    this.key = parameterData.key as string
    this.value = parameterData.value
  }

  protected validateKeys(parameterData: ParameterData): void {
    ;['key', 'value'].forEach((key) => {
      if (parameterData[key as keyof ParameterData] === undefined)
        throw new Error(`Missing parameter prop ${key}`)
    })
  }

  protected isString(
    parameterData: ParameterData,
    propName: keyof ParameterData,
  ) {
    if (typeof parameterData[propName] !== 'string')
      throw new Error(`Expecting '${propName}' prop to be of type 'string'`)
  }

  protected validate(parameterData: ParameterData): void {
    this.validateKeys(parameterData)
    this.isString(parameterData, 'key')
  }

  abstract toObject(): Record<string, string>
}

export class NumberParameter extends Parameter {
  type = ParameterType.Number

  declare value: string

  validate(parameterData: ParameterData): void {
    super.validate(parameterData)
    this.isString(parameterData, 'value')
  }

  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value,
    }
  }
}

export class DatetimeParameter extends Parameter {
  type = ParameterType.Datetime

  declare value: Date

  validate(parameterData: ParameterData): void {
    super.validate(parameterData)
    if (!(parameterData.value instanceof Date))
      throw new Error(
        `Expecting 'value' prop to be Date instance for Datetime parameters`,
      )
  }

  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value.toISOString(),
    }
  }
}

export class TextParameter extends Parameter {
  type = ParameterType.Text

  declare value: string

  validate(parameterData: ParameterData): void {
    super.validate(parameterData)
    this.isString(parameterData, 'value')
  }

  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value.startsWith('0x') ? `'"${this.value}"'` : this.value,
    }
  }
}
