import { Dune } from 'src'
import { COOKIES } from './fixtures'
import { voidFn } from './utils'

describe('Dune', () => {
  describe('constructor', () => {
    it('sets password and username', () => {
      const dune = new Dune({ password: 'foo', username: 'bar' })

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
      const CSRF_TOKEN = '1234'
      fetchMock.once('', { headers: { 'set-cookie': `csrf=${CSRF_TOKEN}` } })
      const dune = new Dune()

      // using array notation to access private methods
      await dune['getCsrfToken']()

      expect(dune.cookies.csrf).toEqual(CSRF_TOKEN)
    })

    it('throws error if csrf token is not found', async () => {
      fetchMock.once('', { headers: {} })
      const dune = new Dune()

      await expect(dune['getCsrfToken']()).rejects.toMatchInlineSnapshot(
        `[Error: Could not fetch csrf token]`,
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

      jest
        .spyOn(Dune.prototype as any, 'getCsrfToken')
        .mockImplementationOnce(voidFn)
      const dune = new Dune()

      await dune['auth']()

      expect(Dune.prototype['getCsrfToken']).toHaveBeenCalledOnce()
      Object.entries(COOKIES).forEach(([cookieName, cookieValue]) => {
        expect(dune.cookies[cookieName]).toEqual(cookieValue)
      })
    })

    it('throws error if cookies are not found', async () => {
      fetchMock.once('', { headers: {} })
      jest
        .spyOn(Dune.prototype as any, 'getCsrfToken')
        .mockImplementationOnce(voidFn)
      const dune = new Dune()

      await expect(dune['auth']()).rejects.toMatchInlineSnapshot(
        `[Error: Could not fetch auth cookies]`,
      )
    })
  })

  it.todo('maybeGetCsrfToken')
})
