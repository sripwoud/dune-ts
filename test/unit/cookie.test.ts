import { extractCookie, extractCookies } from 'src/utils'
import { COOKIES, COOKIES_STR } from './fixtures'

describe('extractCookie', () => {
  it.each(Object.entries(COOKIES))(
    'should extract cookie %s',
    (cookieName, cookieValue) => {
      expect(extractCookie({ cookies: COOKIES_STR, name: cookieName })).toEqual(
        { [cookieName]: cookieValue },
      )
    },
  )

  it('should extract several cookies', () => {
    expect(
      extractCookies({
        cookies: COOKIES_STR,
        names: Object.keys(COOKIES),
      }),
    ).toEqual(COOKIES)
  })
})
