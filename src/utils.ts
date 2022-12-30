const Rgx = (name: string) => new RegExp(`(?<=${name}=)(.*?)(?=;|$)`, 'g')

export const extractCookie = ({
  cookiesStr,
  name,
}: {
  name: string
  cookiesStr: string
}) => {
  const match = cookiesStr.match(Rgx(name))
  if (match === null) throw new Error(`Could not find cookie ${name}`)
  return { [name]: match[0] }
}

export const extractCookies = ({
  cookiesStr,
  names,
}: {
  names: string[]
  cookiesStr: string
}) =>
  names.reduce<Record<string, string>>(
    (cookies, name) => ({ ...cookies, ...extractCookie({ cookiesStr, name }) }),
    {},
  )
