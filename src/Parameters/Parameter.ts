export enum ParameterType {
  Datetime = 'datetime',
  Number = 'number',
  Text = 'text',
}

export interface ParameterData<T> {
  key: string
  value: T
}

export abstract class Parameter<T> {
  protected readonly key: string
  abstract readonly type: string
  protected readonly value: T

  constructor(parameterData: ParameterData<T>) {
    this.validate(parameterData)
    this.key = parameterData.key
    this.value = parameterData.value
  }

  protected validateKeys(parameterData: ParameterData<T>): void {
    ;['key', 'value'].forEach((key) => {
      if (parameterData[key as keyof ParameterData<T>] === undefined)
        throw new Error(`Missing parameter prop '${key}'`)
    })
  }

  protected isString(
    parameterData: ParameterData<T>,
    propName: keyof ParameterData<T>,
  ) {
    if (typeof parameterData[propName] !== 'string')
      throw new Error(`Expecting '${propName}' prop to be of type 'string'`)
  }

  protected validate(parameterData: ParameterData<T>): void {
    this.validateKeys(parameterData)
    this.isString(parameterData, 'key')
  }

  abstract toObject(): Record<string, string>
}

export class NumberParameter extends Parameter<string> {
  type = ParameterType.Number

  declare value: string

  validate(parameterData: ParameterData<string>): void {
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

export class DatetimeParameter extends Parameter<Date> {
  type = ParameterType.Datetime

  declare value: Date

  validate(parameterData: ParameterData<Date>): void {
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

export class TextParameter extends Parameter<string> {
  type = ParameterType.Text

  declare value: string

  validate(parameterData: ParameterData<string>): void {
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
