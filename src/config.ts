import { readFileSync } from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'

const isTest = process.env.NODE_ENV === 'test'
const configFile = isTest ? 'config.sample.yaml' : '.config.yaml'

export interface Config {
  password?: string
  username?: string
}

const config = yaml.load(
  readFileSync(join(__dirname, '..', configFile), 'utf8'),
) as Config

config.password ??= process.env.DUNE_PWD
config.username ??= process.env.DUNE_USER

export { config }
