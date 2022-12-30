import wretch from 'wretch'
import FormDataAddon from 'wretch/addons/formData'

import { HEADERS } from './constants'

export const http = wretch().addon(FormDataAddon).headers(HEADERS)
