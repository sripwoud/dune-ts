import { extractCookie } from '../../src/utils'

describe('extractCookie', () => {
  const COOKIES = {
    'auth-id': 'some auth id',
    'auth-id-token': 'some auth id token',
    'auth-refresh': 'some auth refresh',
    'auth-user': 'r1oga',
  }

  const COOKIES_STR = `auth-id=${COOKIES['auth-id']}; Max-Age=-1; Path=/, auth-id-token=${COOKIES['auth-id-token']}; Max-Age=360; Path=/; HttpOnly; Secure; SameSite=Lax, auth-refresh=${COOKIES['auth-refresh']}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax, auth-user=${COOKIES['auth-user']}; Max-Age=2592000; Path=/; Secure; SameSite=Lax`

  it.each(Object.entries(COOKIES))(
    'should extract cookie %s',
    (cookieName, cookieValue) => {
      expect(extractCookie({ cookiesStr: COOKIES_STR, name: cookieName })).toBe(
        cookieValue,
      )
    },
  )
})
