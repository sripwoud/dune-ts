export enum ParameterType {
  Datetime = 'datetime',
  Number = 'number',
  Text = 'text',
}

export interface ParameterData<T, U> {
  key: string
  type: T
  value: U
}

export abstract class Parameter<T, U> {
  protected readonly key: string
  protected readonly type: T
  protected readonly value: U

  constructor({ key, type, value }: ParameterData<T, U>) {
    this.key = key
    this.type = type
    this.value = value
  }

  abstract toObject(): Record<string, string>
}

export class NumberParameter extends Parameter<ParameterType.Number, string> {
  toObject() {
    return {
      key: this.key,
      type: this.type,
      value: this.value,
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

// export class ListParameter extends Parameter<ParameterType.List, string> {
//   toObject() {
//     return {
//       enumOptions: this.enumOptions,
//       key: this.key,
//       type: this.type,
//       value: this.value,
//     }
//   }
// }
