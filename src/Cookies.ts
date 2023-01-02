export class Cookies {
  private readonly _cookies: string = ''

  constructor(response: Response) {
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('No cookies found on response')
    this._cookies = cookies
  }

  toString() {
    return this._cookies
  }
}
