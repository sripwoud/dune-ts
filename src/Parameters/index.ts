import {
  DatetimeParameter,
  NumberParameter,
  ParameterData,
  ParameterType,
  TextParameter,
} from './Parameter'

export type ParameterDatas = Array<
  ParameterData<string | Date> & { type: unknown }
>

const validate = (parameterDatas: ParameterDatas) => {
  parameterDatas.forEach((parameterData, index) => {
    if (
      !(
        parameterData.type === ParameterType.Datetime ||
        parameterData.type === ParameterType.Number ||
        parameterData.type === ParameterType.Text
      )
    )
      throw new Error(
        `Expecting 'type' to be 'datetime', 'number' or 'text (parameter at index ${index})`,
      )
  })
}

const PARAMS = {
  [ParameterType.Datetime]: DatetimeParameter,
  [ParameterType.Number]: NumberParameter,
  [ParameterType.Text]: TextParameter,
}

export class Parameters {
  static create(parameterDatas?: ParameterDatas) {
    if (parameterDatas === undefined) return []

    validate(parameterDatas)

    return parameterDatas.map(({ key, type, value }) => {
      // @ts-expect-error
      return new PARAMS[type as ParameterType]({ key, value }).toObject()
    })
  }
}

export { ParameterType }
