import { Cookies } from 'src/Cookies'
import { COOKIES, COOKIES_STR } from './fixtures'

describe('Cookies', () => {
  it('set/get cookies', () => {
    const cookies = new Cookies()
    cookies.cookies = COOKIES
    expect(cookies.cookies).toEqual(COOKIES)
  })

  it('gets one cookie', () => {
    const cookies = new Cookies()
    cookies.cookies = { foo: 'bar' }
    expect(cookies.getCookie('foo')).toEqual('bar')
  })

  describe('extract', () => {
    it('extract many cookies as key:value pairs from a cookies header string', () => {
      const cookies = new Cookies()
      cookies['extract'](COOKIES_STR)
      expect(cookies.cookies).toEqual(COOKIES)
    })

    it('throws error if no cookies are found', () => {
      const cookies = new Cookies()
      expect(() => cookies['extract']('')).toThrowErrorMatchingInlineSnapshot(
        `"No cookies found to extract"`,
      )
    })
  })

  describe('parse', () => {
    it('parse cookies from a response', () => {
      const cookies = new Cookies()
      const response = new Response('', {
        headers: {
          'set-cookie': COOKIES_STR,
        },
      })
      cookies.parse(response)
      expect(cookies.cookies).toEqual(COOKIES)
    })

    it('throws error if no cookies are found', () => {
      const cookies = new Cookies()
      const response = new Response('', {
        headers: {},
      })
      expect(() => cookies.parse(response)).toThrowErrorMatchingInlineSnapshot(
        `"No cookies found on response"`,
      )
    })
  })

  it('serialize cookies', () => {
    const cookies = new Cookies()
    cookies.cookies = COOKIES
    expect(cookies.serialize()).toMatchInlineSnapshot(
      `"auth-id=some-auth-id;auth-id-token=some-auth-id-token;auth-refresh=some-auth-refresh;auth-user=r1oga;Max-Age=2592000;SameSite=Lax"`,
    )
  })
})
