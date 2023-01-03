import {
  DatetimeParameter,
  ListParameter,
  NumberParameter,
  ParameterData,
  ParameterType,
  TextParameter,
} from './Parameter'

export class Parameters {
  static create(
    parameters: Array<
      | ParameterData<ParameterType.Number, number>
      | ParameterData<ParameterType.List, string>
      | ParameterData<ParameterType.Text, string>
      | ParameterData<ParameterType.Datetime, Date>
    >,
  ) {
    return parameters.map((parameterData) => {
      let parameter
      switch (parameterData.type) {
        case ParameterType.Datetime:
          parameter = new DatetimeParameter(parameterData)
          break
        case ParameterType.List:
          parameter = new ListParameter(parameterData)
          break
        case ParameterType.Number:
          parameter = new NumberParameter(parameterData)
          break
        case ParameterType.Text:
          parameter = new TextParameter(parameterData)
      }

      return parameter.toObject()
    })
  }
}
