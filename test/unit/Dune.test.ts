import { Dune } from 'src'
import { URLS } from 'src/constants'
import { COOKIES, CSRF_TOKEN, TOKEN } from './fixtures'

let dune: Dune

beforeEach(() => {
  dune = new Dune()
})

describe('Dune', () => {
  describe('constructor', () => {
    it('sets password and username', () => {
      dune = new Dune({ password: 'foo', username: 'bar' })

      expect(dune).toHaveProperty('password', 'foo')
      expect(dune).toHaveProperty('username', 'bar')
    })

    it('throws if password is not defined', () => {
      expect(
        () => new Dune({ username: 'bar' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Dune password is not defined"`)
    })

    it('throws if username is not defined', () => {
      expect(
        () => new Dune({ password: 'foo' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Dune username is not defined"`)
    })
  })

  describe('getCsrfToken', () => {
    it('sets csrf cookie', async () => {
      fetchMock.once('', { headers: { 'set-cookie': `csrf=${CSRF_TOKEN}` } })

      // using array notation to access private methods
      await dune['getCsrfToken']()

      expect(dune.csrf).toEqual(CSRF_TOKEN)
      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.CSRF)
    })

    it('throws error if csrf token is not found', async () => {
      fetchMock.once('', { headers: {} })

      await expect(dune['getCsrfToken']()).rejects.toMatchInlineSnapshot(
        `[Error: No cookies found on response]`,
      )
    })
  })

  describe('auth', () => {
    it('sets cookies', async () => {
      fetchMock.once('', {
        headers: {
          'set-cookie': Object.entries(COOKIES)
            .map(([k, v]) => `${k}=${v}`)
            .join(';'),
        },
      })

      await dune['getAuthCookies']()

      Object.entries(COOKIES).forEach(([cookieName, cookieValue]) => {
        expect(dune['cookies'].getCookie(cookieName)).toEqual(cookieValue)
      })
      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.AUTH)
    })

    it('throws error if cookies are not found', async () => {
      fetchMock.once('', { headers: {} })
      await expect(dune['getAuthCookies']()).rejects.toMatchInlineSnapshot(
        `[Error: No cookies found on response]`,
      )
    })
  })

  describe('getAuthToken', () => {
    it('sets token', async () => {
      fetchMock.once(JSON.stringify({ token: TOKEN }))

      await dune['getAuthToken']()

      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.SESSION)
      expect(dune).toHaveProperty('token', TOKEN)
    })
  })

  describe('login', () => {
    it('logs in', async () => {
      fetchMock
        .once('', { headers: { 'set-cookie': `csrf=1234` } })
        .once('', {
          headers: {
            'set-cookie': Object.entries(COOKIES)
              .map(([k, v]) => `${k}=${v}`)
              .join(';'),
          },
        })
        .once(JSON.stringify({ token: TOKEN }))

      await dune.login()
      ;[URLS.CSRF, URLS.AUTH, URLS.SESSION].forEach((url, index) => {
        expect(fetchMock).toHaveBeenNthCalledWith(
          index + 1,
          url,
          expect.any(Object),
        )
      })
      expect(dune).toHaveProperty('token', TOKEN)
    })
  })
})
