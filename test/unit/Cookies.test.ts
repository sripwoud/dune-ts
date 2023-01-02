import { Cookies } from 'src/Cookies'
import { COOKIES_STR } from './fixtures'

let cookies: Cookies

beforeEach(() => {
  cookies = new Cookies()
})

describe('Cookies', () => {
  describe('set', () => {
    it('set cookies', () => {
      cookies.set(new Response('', { headers: { 'set-cookie': COOKIES_STR } }))
      expect(cookies['cookies']).toMatchInlineSnapshot(
        `"csrf=1234; auth-id=some-auth-id; auth-id-token=some-auth-id-token; auth-refresh=some-auth-refresh; auth-user=r1oga"`,
      )
    })

    it('throws error if no cookies found', () => {
      expect(() =>
        cookies.set(new Response('', { headers: {} })),
      ).toThrowErrorMatchingInlineSnapshot(`"No cookies found in response"`)
    })

    it('throws error if no cookies match', () => {
      expect(() =>
        cookies.set(new Response('', { headers: { 'set-cookie': 'foo=bar' } })),
      ).toThrowErrorMatchingInlineSnapshot(
        `"No matching cookies found in response"`,
      )
    })
  })

  it('overrides toString', () => {
    cookies.set(new Response('', { headers: { 'set-cookie': COOKIES_STR } }))
    expect(cookies.toString()).toMatchInlineSnapshot(
      `"csrf=1234; auth-id=some-auth-id; auth-id-token=some-auth-id-token; auth-refresh=some-auth-refresh; auth-user=r1oga"`,
    )
  })
})
