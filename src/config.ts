import { readFileSync } from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'

const isTest = process.env.NODE_ENV === 'test'

export interface Config {
  password?: string
  username?: string
}

let config: Config = {}

const loadConfig = () => {
  if (!isTest)
    config = yaml.load(
      readFileSync(join(__dirname, '..', '.config.yaml'), 'utf8'),
    ) as Config

  config.password ??= process.env.DUNE_PWD ?? 'password'
  config.username ??= process.env.DUNE_USER ?? 'username'
}

loadConfig()

export { config }
