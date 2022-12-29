import { TEST } from '@mod/file'

const A = [1, 2, 3]

interface B {
  foo: string
}

const c: B = { foo: 'bar' }

console.log(A, c, TEST, 1)
console.log(process.env.SECRET)
console.log(process.env.FOO)
