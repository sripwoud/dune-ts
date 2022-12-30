import { Dune } from '../Dune'

export const maybeGetCsrfToken = (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value

  descriptor.value = async function () {
    if ((this as Dune).cookies.csrf === undefined)
      await (this as Dune)['getCsrfToken']()
    return originalMethod.apply(this)
  }

  return descriptor
}
