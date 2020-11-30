import base from './base';

class projects extends base{
  list () {
    return this.fetch.get('/projects', {})
  }
}

export default projects
