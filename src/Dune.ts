import { config } from './config'
import { HEADERS, URLS } from './constants'
import { Cookies } from './Cookies'
import { maybeGetCsrfToken } from './decorators'

export class Dune {
  private readonly password: string
  private readonly username: string
  private readonly cookies: Cookies
  private token: string | undefined

  get csrf() {
    return this.cookies.getCookie('csrf')
  }

  constructor({ password, username } = config) {
    if (password === undefined) throw new Error('Dune password is not defined')
    if (username === undefined) throw new Error('Dune username is not defined')

    this.password = password
    this.username = username
    this.cookies = new Cookies()
  }

  private async getCsrfToken() {
    const response = await fetch(URLS.CSRF, { method: 'POST' })
    this.cookies.parse(response)
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
        cookie: this.cookies.serialize(),
      },
      method: 'POST',
      redirect: 'manual',
    }).then((res) => {
      this.cookies.parse(res)
    })
  }

  private async getAuthToken() {
    const response = await fetch(URLS.SESSION, {
      headers: {
        ...HEADERS,
        cookie: this.cookies.serialize(),
        method: 'POST',
      },
    })

    const { token } = await response.json()
    this.token = token
  }
}

export const dune = new Dune()
