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
  GRAPH: 'https://core-hsr.dune.com/v1/graphql',
  LOGIN: `${BASE_URL}/auth/login`,
  SESSION: `${BASE_URL}/api/auth/session`,
}

export const COOKIES_RGX = /(csrf|auth(-\w+)+)=([\w-.]+)/g

const GETRESULT_GQL = `query GetResult($query_id: Int!, $parameters: [Parameter!]!) {
    get_result_v3(query_id: $query_id, parameters: $parameters) {
        job_id
        result_id
        error_id
        __typename
    }
}`

export const QUERY_DATA = {
  operationName: 'GetResult',
  query: GETRESULT_GQL,
}
