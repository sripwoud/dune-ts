import { readFileSync } from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'

export interface Config {
  password?: string
  username?: string
}

const config = yaml.load(
  readFileSync(join(__dirname, '..', '.config.yaml'), 'utf8'),
) as Config

config.password ??= process.env.DUNE_PWD
config.username ??= process.env.DUNE_USER

export { config }
