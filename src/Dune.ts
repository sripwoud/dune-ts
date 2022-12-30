import { config } from './config'
import { HEADERS, URLS } from './constants'
import { maybeGetCsrfToken } from './decorators'
import { extractCookie, extractCookies } from './utils'

export class Dune {
  private readonly password: string
  private readonly username: string
  _cookies: Record<string, string> = {}
  private token: string | undefined

  get cookies() {
    return this._cookies
  }

  set cookies(cookies: Record<string, string>) {
    this._cookies = { ...this._cookies, ...cookies }
  }

  get csrf() {
    return this.cookies.csrf
  }

  constructor({ password, username } = config) {
    if (password === undefined) throw new Error('Dune password is not defined')
    if (username === undefined) throw new Error('Dune username is not defined')

    this.password = password
    this.username = username
  }

  private async getCsrfToken() {
    const response = await fetch(URLS.CSRF, { method: 'POST' })
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('Could not fetch csrf token')
    this.cookies = extractCookie({ cookies, name: 'csrf' })
  }

  @maybeGetCsrfToken
  private async getAuthCookies() {
    await fetch(URLS.AUTH, {
      body: new URLSearchParams({
        action: 'login',
        csrf: this.csrf,
        next: URLS.BASE,
        password: this.password,
        username: this.username,
      }),
      headers: {
        ...HEADERS,
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: Object.entries(this.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join(';'),
      },
      method: 'POST',
      redirect: 'manual',
    }).then((r) => {
      const cookies = r.headers.get('set-cookie')
      if (cookies === null) throw new Error('Could not fetch auth cookies')
      this.cookies = extractCookies({
        cookies,
        names: ['auth-id', 'auth-id-token', 'auth-refresh', 'auth-user'],
      })
    })
  }

  private async getAuthToken() {
    const response = await fetch(URLS.SESSION, {
      headers: {
        ...HEADERS,
        cookie: Object.entries(this.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join(';'),
      },
      method: 'POST',
    })

    const { token } = await response.json()
    this.token = token
  }
}

export const dune = new Dune()
