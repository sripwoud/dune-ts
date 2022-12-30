import { rest } from 'msw'
import { URLS } from '../../src/constants'

export const handlers = [
  rest.post(URLS.CSRF, (req, res, ctx) => {
    return res(ctx.status(200), ctx.cookie('csrf', '1234'), ctx.json({}))
  }),
]
