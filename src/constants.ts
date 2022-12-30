const BASE_URL = 'https://dune.com'

export const HEADERS = {
  dnt: '1',
  origin: BASE_URL,
  'sec-ch-ua': 'empty',
  'sec-ch-ua-mobile': '?0',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
}

export const URLS = {
  AUTH: `${BASE_URL}/api/auth`,
  BASE: BASE_URL,
  CSRF: `${BASE_URL}/api/auth/csrf`,
  GRAPH: 'https://core-hsr.dune.xyz/v1/graphql',
  LOGIN: `${BASE_URL}/auth/login`,
  SESSION: `${BASE_URL}/api/auth/session`,
}
