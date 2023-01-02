import { COOKIES_RGX } from 'src/constants'
import { COOKIES, COOKIES_STR } from 'test/unit/fixtures'

describe('cookies regex', () => {
  it('matches cookies', () => {
    const matches = COOKIES_STR.match(COOKIES_RGX)

    expect(matches).toHaveLength(5)
    ;(matches as RegExpMatchArray).forEach((match) => {
      const [cookieName, cookieValue] = match.split('=')
      expect(COOKIES).toHaveProperty(cookieName, cookieValue)
    })
  })
})
