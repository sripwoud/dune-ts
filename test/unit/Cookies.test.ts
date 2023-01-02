import { Cookies } from 'src/Cookies'
import { COOKIES_STR } from './fixtures'

describe('Cookies', () => {
  describe('set', () => {
    it('set cookies', () => {
      const cookies = new Cookies(
        new Response('', { headers: { 'set-cookie': COOKIES_STR } }),
      )
      expect(cookies['_cookies']).toEqual(COOKIES_STR)
    })

    it('thows error if no cookies found', () => {
      expect(
        () => new Cookies(new Response('', { headers: {} })),
      ).toThrowErrorMatchingInlineSnapshot(`"No cookies found on response"`)
    })
  })

  it('overrides toString', () => {
    const cookies = new Cookies(
      new Response('', { headers: { 'set-cookie': COOKIES_STR } }),
    )
    expect(cookies.toString()).toEqual(COOKIES_STR)
  })
})
