import Fetch from '../fetch'

class BaseResource {
  fetch: Fetch
  constructor (fetch: Fetch) {
    this.fetch = fetch
  }
}

export default BaseResource