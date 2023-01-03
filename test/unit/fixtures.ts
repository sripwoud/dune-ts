export const COOKIES = {
  'auth-id': 'some-auth-id',
  'auth-id-token': 'some-auth-id-token',
  'auth-refresh': 'some-auth-refresh',
  'auth-user': 'r1oga',
  csrf: '1234',
  'Max-Age': '2592000',
  SameSite: 'Lax',
}

export const COOKIES_STR = `csrf=${COOKIES.csrf}; auth-id=${COOKIES['auth-id']}; Max-Age=-1; Path=/, auth-id-token=${COOKIES['auth-id-token']}; Max-Age=360; Path=/; HttpOnly; Secure; SameSite=Lax, auth-refresh=${COOKIES['auth-refresh']}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax, auth-user=${COOKIES['auth-user']}; Max-Age=2592000; Path=/; Secure; SameSite=Lax`
export const CSRF_TOKEN = '1234'
export const CSRF_COOKIE = `csrf=${CSRF_TOKEN}; Max-Age=360; Path=/; HttpOnly; Secure; SameSite=Lax`
export const TOKEN = 'foo auth token'

export const PARAMETERS = [
  {
    key: 'at',
    type: 'datetime',
    value: '2023-01-01 00:00:00',
  },
  {
    enumOptions: ['1', 'test'],
    key: 'list',
    type: 'enum',
    value: '1',
  },
  {
    key: 'min',
    type: 'number',
    value: '0',
  },
  {
    key: 'tokenAddress',
    type: 'text',
    value: '"0xc18360217d8f7ab5e7c516566761ea12ce7f9d72"',
  },
]
