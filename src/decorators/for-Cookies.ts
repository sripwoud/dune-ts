import { Dune } from '../Dune'

const isPropPresent =
  (prop: 'token' | 'cookies' | 'csrf') =>
  (target: object, key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value

    descriptor.value = function (...args: never[]) {
      // console.log(this)
      if ((this as Dune)[prop] === undefined)
        throw new Error(`\`${prop}\` class property is undefined`)

      return original.apply(this, args)
    }

    return descriptor
  }

export const isCookiesPresent = isPropPresent('cookies')
export const isCsrfPresent = isPropPresent('csrf')
export const isTokenPresent = isPropPresent('token')
