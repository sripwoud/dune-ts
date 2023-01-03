const isTest = process.env.NODE_ENV === 'test'

export interface Config {
  password?: string
  username?: string
}

let config: Config = {}

const loadConfig = () => {
  try {
    if (isTest) config = require('../.config.json')
  } catch (err) {
    console.error(err)
  }

  config.password ??= process.env.DUNE_PWD ?? 'password'
  config.username ??= process.env.DUNE_USER ?? 'username'
}

loadConfig()

export { config }
