import { Dune } from 'src'
import { URLS } from 'src/constants'
import { Parameters, ParameterType } from 'src/Parameters'
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

    it('defaults password and username to env vars', () => {
      dune = new Dune()
      expect(dune).toHaveProperty('password', process.env.DUNE_PASSWORD)
      expect(dune).toHaveProperty('username', process.env.DUNE_USERNAME)
    })

    it('throws if password is not a string', () => {
      expect(
        // @ts-expect-error
        () => new Dune({ password: 1, username: 'bar' }),
      ).toThrowErrorMatchingInlineSnapshot(`"password should be a string"`)
    })

    it('throws if password is empty string', () => {
      expect(
        () => new Dune({ password: '', username: 'bar' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"password should be a non empty string"`,
      )
    })
    it('throws if username is not a string', () => {
      expect(
        // @ts-expect-error
        () => new Dune({ password: '1', username: 1 }),
      ).toThrowErrorMatchingInlineSnapshot(`"username should be a string"`)
    })

    it('throws if username is empty string', () => {
      expect(
        () => new Dune({ password: 'asd', username: '' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"username should be a non empty string"`,
      )
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
      await expect(async () =>
        dune['getAuthCookies'](),
      ).rejects.toMatchInlineSnapshot(
        `[Error: \`csrf\` class property is undefined]`,
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it('throws error if auth cookies are not found', async () => {
      dune['csrf'] = CSRF_TOKEN

      fetchMock.once('', { headers: {} })

      await expect(async () =>
        dune['getAuthCookies'](),
      ).rejects.toMatchInlineSnapshot(`[Error: No cookies found in response]`)
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
      expect(dune).toHaveProperty('loggedAt', expect.any(Date))
    })
  })

  describe('executeQuery', () => {
    it('gets query result id', async () => {
      fetchMock.once(
        JSON.stringify({ data: { execute_query_v2: { job_id: 1234 } } }),
      )

      dune['token'] = TOKEN
      await dune['executeQuery'](987)

      expect(fetchMock).toHaveBeenCalledOnceWith(URLS.GRAPH_EXEC_ID)
      expect(dune.executionId).toEqual(1234)
    })

    it('throws error if token is not set', async () => {
      await expect(async () =>
        dune['executeQuery'](987),
      ).rejects.toMatchInlineSnapshot(
        `[Error: \`token\` class property is undefined]`,
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe('query', () => {
    it('returns query results', async () => {
      const spy = jest.spyOn(dune, 'login').mockImplementationOnce(async () => {
        dune['token'] = TOKEN
      })
      fetchMock
        .once(JSON.stringify({ data: { execute_query_v2: { job_id: 1234 } } }))
        .once(
          JSON.stringify({
            data: {
              get_execution: {
                execution_succeeded: { columns: ['COL'], data: ['DATA'] },
              },
            },
          }),
        )

      await expect(dune.query(1)).resolves.toEqual({
        columns: ['COL'],
        data: ['DATA'],
      })
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        URLS.GRAPH_EXEC_ID,
        expect.any(Object),
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        URLS.GRAPH_QUERY,
        expect.any(Object),
      )
      expect(spy).toHaveBeenCalledOnce()
    })

    it('accepts parameters', async () => {
      const PARAMETERS = [
        {
          key: 'address',
          type: ParameterType.Text,
          value: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        },
      ]

      dune['loggedAt'] = new Date()
      dune['token'] = TOKEN

      const spy = jest.spyOn(Parameters, 'create')

      fetchMock
        .once(JSON.stringify({ data: { execute_query_v2: { job_id: 1234 } } }))
        .once(
          JSON.stringify({
            data: {
              get_execution: {
                execution_succeeded: { columns: ['COL'], data: ['DATA'] },
              },
            },
          }),
        )

      await expect(dune.query(1, PARAMETERS)).resolves.toEqual({
        columns: ['COL'],
        data: ['DATA'],
      })

      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        URLS.GRAPH_EXEC_ID,
        expect.any(Object),
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        URLS.GRAPH_QUERY,
        expect.any(Object),
      )
      expect(spy).toHaveBeenCalledOnceWith(PARAMETERS)
      expect(spy).toHaveReturnedWith([
        { ...PARAMETERS[0], value: `"${PARAMETERS[0].value}"` },
      ])
    })

    it("doesn't login if already logged in", async () => {
      dune['loggedAt'] = new Date()
      dune['token'] = TOKEN
      jest.spyOn(dune, 'query').mockResolvedValueOnce({ columns: [], data: [] })
      const spy = jest.spyOn(dune, 'login')

      await dune.query(1)
      expect(spy).not.toHaveBeenCalled()
    })
  })
})
