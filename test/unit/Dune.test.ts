import { Dune } from 'src'
import { URLS } from 'src/constants'
import { COOKIES_STR, CSRF_COOKIE, CSRF_TOKEN, TOKEN } from './fixtures'

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
      fetchMock.once(JSON.stringify({ csrf: CSRF_TOKEN }), {
        headers: { 'set-cookie': CSRF_COOKIE },
      })

      // using array notation to access private methods
      await dune['getCsrfToken']()

      expect(dune['cookies'].toString()).toMatchInlineSnapshot(`"csrf=1234"`)
      expect(dune).toHaveProperty('csrf', CSRF_TOKEN)
      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.CSRF)
    })
  })

  describe('getAuthCookies', () => {
    it('sets cookies', async () => {
      fetchMock.once('', {
        headers: {
          'set-cookie': COOKIES_STR,
        },
      })
      dune['csrf'] = CSRF_TOKEN

      await dune['getAuthCookies']()

      expect(dune['cookies'].toString()).toMatchInlineSnapshot(
        `"csrf=1234; auth-id=some-auth-id; auth-id-token=some-auth-id-token; auth-refresh=some-auth-refresh; auth-user=r1oga"`,
      )
      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.AUTH)
    })

    it('throws error if csrf prop not set', async () => {
      await expect(dune['getAuthCookies']()).rejects.toMatchInlineSnapshot(
        `[Error: CSRF token is not defined]`,
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it('throws error if auth cookies are not found', async () => {
      dune['csrf'] = CSRF_TOKEN

      fetchMock.once('', { headers: {} })

      await expect(dune['getAuthCookies']()).rejects.toMatchInlineSnapshot(
        `[Error: No cookies found in response]`,
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
        .once(JSON.stringify({ csrf: CSRF_TOKEN }), {
          headers: { 'set-cookie': CSRF_COOKIE },
        })
        .once('', {
          headers: { 'set-cookie': COOKIES_STR },
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

  describe('getQueryResultId', () => {
    it('gets query result id', async () => {
      fetchMock.once(
        JSON.stringify({ data: { get_result_v3: { result_id: 1234 } } }),
      )

      dune['token'] = TOKEN
      await dune.getQueryResultId(987)

      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.GRAPH)
      expect(dune.queryResultId).toEqual(1234)
    })

    it('throws error if token is not set', async () => {
      await expect(dune.getQueryResultId(987)).rejects.toMatchInlineSnapshot(
        `[Error: Dune token is not defined]`,
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })
})
