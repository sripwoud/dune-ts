import { isCookiesPresent, isCsrfPresent, isTokenPresent } from 'src/decorators'
import { config } from './config'
import { GET_EXECUTION_ID_DATA, HEADERS, QUERY_DATA, URLS } from './constants'
import { Cookies } from './Cookies'

export class Dune {
  private readonly password: string
  private readonly username: string
  private readonly cookies: Cookies
  private csrf: string | undefined
  private token: string | undefined
  public executionId: string | undefined

  constructor({ password, username } = config) {
    if (password === undefined) throw new Error('Dune password is not defined')
    if (username === undefined) throw new Error('Dune username is not defined')

    this.password = password
    this.username = username
    this.cookies = new Cookies()
  }

  private async getCsrfToken() {
    const response = await fetch(URLS.CSRF, { method: 'POST' })

    this.csrf = (await response.json()).csrf
    this.cookies.set(response)
  }

  @isCsrfPresent
  private async getAuthCookies() {
    await fetch(URLS.AUTH, {
      // @ts-expect-error  - decorator already checks if csrf is defined
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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        cookie: `csrf=${this.csrf}`,
      },
      method: 'POST',
      redirect: 'manual',
    }).then((res) => {
      this.cookies.set(res)
    })
  }

  @isCookiesPresent
  private async getAuthToken() {
    const response = await fetch(URLS.SESSION, {
      body: 'false',
      headers: {
        ...HEADERS,
        cookie: this.cookies.toString(),
      },
      method: 'POST',
    })

    this.token = (await response.json()).token
  }

  public async login() {
    await this.getCsrfToken()
    await this.getAuthCookies()
    await this.getAuthToken()
  }

  @isTokenPresent
  private async getExecutionId(queryId: number) {
    const res = await fetch(URLS.GRAPH_EXEC_ID, {
      body: JSON.stringify({
        ...GET_EXECUTION_ID_DATA,
        variables: { parameters: [], query_id: queryId },
      }),
      headers: {
        ...HEADERS,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    this.executionId = (await res.json()).data.get_result_v3.result_id
  }

  public async query(queryId: number) {
    await this.getExecutionId(queryId)
    const res = await fetch(URLS.GRAPH_QUERY, {
      body: JSON.stringify({
        ...QUERY_DATA,
        variables: {
          execution_id: this.executionId,
          parameters: [],
          query_id: queryId,
        },
      }),
      headers: {
        ...HEADERS,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { columns, data } = (await res.json()).data.get_execution
      .execution_succeeded
    return { columns, data }
  }
}

export const dune = new Dune()
