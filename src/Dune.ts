import cookie from 'cookie'
import wretch from 'wretch'
import FormDataAddon from 'wretch/addons/formData'

import { config } from './config'
import { HEADERS, URLS } from './constants'
import { maybeGetCsrfToken } from './decorators/maybe-get-csrf-token'

export class Dune {
  private readonly password: string
  private readonly username: string
  cookies: Record<string, string> = {}

  constructor({ password, username } = config) {
    if (password === undefined) throw new Error('Dune password is not defined')
    if (username === undefined) throw new Error('Dune username is not defined')

    this.password = password
    this.username = username
  }

  get http() {
    return wretch()
      .addon(FormDataAddon)
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
    this.cookies = { ...this.cookies, ...cookie.parse(cookies) }
  }

  @maybeGetCsrfToken
  private async getAuthToken() {
    const response = await this.http.url(URLS.SESSION).get().res()
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('Could not fetch auth token')
    this.cookies = { ...this.cookies, ...cookie.parse(cookies) }
  }

  @maybeGetCsrfToken
  async login() {
    if (this.cookies.csrf === undefined) await this.getCsrfToken()
    console.log(this.http)
    const response = await this.http
      .url(URLS.AUTH)
      .formData({
        action: 'login',
        csrf: this.cookies.csrf,
        next: URLS.BASE,
        password: this.password,
        username: this.username,
      })
      .post()
      .badRequest((err) => {
        throw new Error(err.text)
      })
      .res()

    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('Could not fetch csrf token')

    this.cookies = { ...this.cookies, ...cookie.parse(cookies) }
  }
}

export const dune = new Dune()
