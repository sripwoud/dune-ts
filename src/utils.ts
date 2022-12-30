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
  return match[0]
}
