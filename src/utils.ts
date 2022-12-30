const Rgx = (name: string) => new RegExp(`(?<=${name}=)(.*?)(?=;|$)`, 'g')

export const extractCookie = ({
  cookies,
  name,
}: {
  name: string
  cookies: string
}) => {
  const match = cookies.match(Rgx(name))
  if (match === null) throw new Error(`Could not find cookie ${name}`)
  return { [name]: match[0] }
}

export const extractCookies = ({
  cookies,
  names,
}: {
  names: string[]
  cookies: string
}) =>
  names.reduce<Record<string, string>>(
    (_cookies, name) => ({ ..._cookies, ...extractCookie({ cookies, name }) }),
    {},
  )
