import 'jest-extended'
import _fetch from 'node-fetch'
import type { Response as _Response } from 'node-fetch'

// fetch types aren't in node 18 yet
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924#issuecomment-1236920407
declare global {
  declare var fetch: typeof _fetch
  declare type Response = _Response
}
