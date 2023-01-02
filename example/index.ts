import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import { Dune } from '../src'

const options = {
  password: { alias: 'p', describe: 'dune account password', type: 'string' },
  query: {
    alias: 'q',
    describe:
      'id of dune query to execute (https://dune.com/queries/<query-id>)',
    type: 'number',
  },
  username: { alias: 'u', describe: 'dune account username', type: 'string' },
}

const argv = yargs(hideBin(process.argv))
  // @ts-expect-error
  .options(options)
  .demandOption(['query', 'username', 'password'])
  .help().argv as { query: number; password: string; username: string }

const main = async () => {
  const { password, query, username } = argv
  const dune = new Dune({ password, username })
  await dune.login()
  return dune.query(query)
}

main()
  .then(({ columns, data }) => {
    console.log({ columns, data })
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
