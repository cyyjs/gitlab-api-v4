import Fetch from './fetch'
import Projects from './resources/projects'
import RepositoryFile from './resources/repositoryFile'

export interface GitlabOption {
  api: string,
  privateToken: string
}

class Gitlab {
  projects: Projects
  repositoryFile: RepositoryFile
  constructor (options: GitlabOption) {
    if (!options.api || !options.privateToken) {
      throw Error('must be set api address and privateToken!')
    }
    const fetch = new Fetch(options)
    this.projects = new Projects(fetch)
    this.repositoryFile = new RepositoryFile(fetch)
  }
}

export default Gitlab
