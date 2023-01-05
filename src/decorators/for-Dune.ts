import { MAX_AGE } from 'src/constants'
import { Dune } from 'src/Dune'
import { isAfter } from 'src/utils'

export const maybeLogin = () => {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: never[]) {
      const loggedAt = (this as Dune)['loggedAt']

      if (loggedAt === undefined || isAfter(loggedAt, MAX_AGE))
        await (this as Dune).login()

      return originalMethod.apply(this, args)
    }
  }
}
