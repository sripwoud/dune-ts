import { isAfter } from 'src/utils'

describe('isAfter', () => {
  it('returns true if date is after a past amount of ms', () => {
    const date = new Date('1/1/2023')
    const pastMs = 1000
    expect(isAfter(date, pastMs)).toBe(true)
  })

  it('returns false if date is before a past amount of ms', () => {
    const date = new Date()
    const pastMs = 1000
    expect(isAfter(date, pastMs)).toBe(false)
  })
})
