import axios from 'axios'

export function request(config) {

  const req = axios.create({
    baseURL: 'http://localhost:9999',
    timeout: 5000
  })

  return req(config)
}
