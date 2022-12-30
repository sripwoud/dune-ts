import wretch from 'wretch'
import FormUrlAddon from 'wretch/addons/formUrl'

import { config } from './config'
import { HEADERS, URLS } from './constants'
import { maybeGetCsrfToken } from './decorators'
import { extractCookie, extractCookies } from './utils'

export class Dune {
  private readonly password: string
  private readonly username: string
  _cookies: Record<string, string> = {}

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

  get http() {
    return wretch()
      .addon(FormUrlAddon)
      .headers({
        ...HEADERS,
        cookie: Object.entries(this.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join(';'),
      })
  }

  private async getCsrfToken() {
    const response = await this.http.url(URLS.CSRF).post().res()
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('Could not fetch csrf token')
    this.cookies = extractCookie({ cookies, name: 'csrf' })
  }

  @maybeGetCsrfToken
  private async auth() {
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
    })
      .then((r) => {
        const cookies = r.headers.get('set-cookie')
        console.log(cookies)
        //
        if (cookies !== null) {
          this.cookies = extractCookies({
            cookies,
            names: ['auth-id', 'auth-id-token', 'auth-refresh', 'auth-user'],
          })
        }
      })
      .catch((e) => console.error(e))
  }

  // @maybeGetCsrfToken
  // async login() {
  //   if (this.cookies.csrf === undefined) await this.getCsrfToken()
  //   console.log(this.http)
  //   const req = this.http
  //     .url(URLS.AUTH)
  //     .formData({
  //       action: 'login',
  //       csrf: this.cookies.csrf,
  //       next: URLS.BASE,
  //       password: this.password,
  //       username: this.username,
  //     })
  //     .post()
  //     .badRequest((err) => {
  //       throw new Error(err.text)
  //     })
  //   console.log({ req })
  //
  //   const response = await req.res()
  //
  //   const cookies = response.headers.get('set-cookie')
  //   if (cookies === null) throw new Error('Could not fetch csrf token')
  //
  //   this.cookies = { ...this.cookies, ...cookie.parse(cookies) }
  // }
}

export const dune = new Dune()
