import {
  DatetimeParameter,
  NumberParameter,
  ParameterData,
  ParameterType,
  TextParameter,
} from './Parameter'

export type ParametersData = Array<{
  key: string
  type: ParameterType
  value: string | Date
}>

export class Parameters {
  static create(parameters: ParametersData) {
    return parameters.map((parameterData) => {
      let parameter
      switch (parameterData.type) {
        case ParameterType.Datetime:
          parameter = new DatetimeParameter(
            parameterData as ParameterData<ParameterType.Datetime, Date>,
          )
          break
        case ParameterType.Number:
          parameter = new NumberParameter(
            parameterData as ParameterData<ParameterType.Number, string>,
          )
          break
        case ParameterType.Text:
          parameter = new TextParameter(
            parameterData as ParameterData<ParameterType.Text, string>,
          )
      }

      return parameter.toObject()
    })
  }
}
