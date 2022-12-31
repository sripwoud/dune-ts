const RGX = /([\w-]+)=([\w-]+)/g

export class Cookies {
  private _cookies: Record<string, string> = {}

  get cookies() {
    return this._cookies
  }

  set cookies(cookies) {
    this._cookies = { ...this._cookies, ...cookies }
  }

  getCookie(name: string) {
    return this.cookies[name]
  }

  serialize() {
    return Object.entries(this.cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join(';')
  }

  private extract(cookies: string) {
    const matches = cookies.match(RGX)
    if (matches === null) throw new Error('No cookies found to extract')
    this.cookies = Object.fromEntries(matches.map((c) => c.split('=')))
  }

  parse(response: Response) {
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('No cookies found on response')
    this.extract(cookies)
  }
}
