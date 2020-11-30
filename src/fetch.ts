import { GitlabOption } from './index'
import querystring, { ParsedUrlQueryInput } from 'querystring'
const nodeFetch = require('node-fetch')

class Fetch {
  baseUrl: string
  headers: object
  constructor (options: GitlabOption) {
    this.baseUrl = options.api
    this.headers = {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': options.privateToken
    }
  }

  fetch(path: string, options: object) {
    console.log(this.baseUrl + path)
    return nodeFetch(this.baseUrl + path, {
      headers: this.headers,
      ...options
    }).then((res:any) => {
      if (res.status !== 204) {
        return res.json()
      }
      return Promise.resolve({})
    })
  }

  get(path:string, query: ParsedUrlQueryInput) {
    const url = path + '?' + querystring.stringify(query)
    return this.fetch(url, {
      method: 'GET',
    })
  }

  post(path:string, body: object) {
    return this.fetch(path, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  put(path:string, body: object) {
    return this.fetch(path, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  delete(path:string, body: object) {
    return this.fetch(path, {
      method: 'DELETE',
      body: JSON.stringify(body)
    })
  }
}

export default Fetch
