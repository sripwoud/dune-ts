export enum ParameterType {
  Datetime = 'datetime',
  List = 'list',
  Number = 'number',
  Text = 'text',
}

export interface ParameterData<T, U> {
  key: string
  type: T
  value: U
  enumOptions?: string[]
}

export abstract class Parameter<T, U> {
  protected readonly key: string
  protected readonly type: T
  protected readonly value: U
  protected readonly enumOptions: string[] = []

  constructor({ enumOptions, key, type, value }: ParameterData<T, U>) {
    this.key = key
    this.type = type
    this.value = value
    if (enumOptions !== undefined) this.enumOptions = enumOptions
  }

  abstract toObject(): Record<string, string> | { enumOptions: string[] }
}

export class NumberParameter extends Parameter<ParameterType.Number, number> {
  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value.toString(),
    }
  }
}

export class DatetimeParameter extends Parameter<ParameterType.Datetime, Date> {
  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value.toISOString(),
    }
  }
}

export class TextParameter extends Parameter<ParameterType.Text, string> {
  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value,
    }
  }
}

export class ListParameter extends Parameter<ParameterType.List, string> {
  toObject() {
    return {
      enumOptions: this.enumOptions,
      key: this.key,
      type: this.type,
      value: this.value,
    }
  }
}
