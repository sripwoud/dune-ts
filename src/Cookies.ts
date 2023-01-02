import { COOKIES_RGX } from 'src/constants'

export class Cookies {
  private cookies = ''

  set(response: Response) {
    const cookies = response.headers.get('set-cookie')
    if (cookies === null) throw new Error('No cookies found in response')

    const matches = cookies.match(COOKIES_RGX)
    if (matches === null)
      throw new Error('No matching cookies found in response')

    this.cookies = matches.join('; ')
  }

  toString() {
    return this.cookies
  }
}
