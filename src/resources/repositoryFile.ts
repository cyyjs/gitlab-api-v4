import base from './base'

export interface createData {
  id: string |number
  file_path: string
  branch: string
  commit_message: string
  content?: string
  start_branch?: string
  encoding?: string
  author_email?: string
  author_name?: string
}
export interface getData {
  id: string |number
  file_path: string
  ref: string
}

export interface fileResponse {
  file_path: string
  branch: string
  content: string,
  message: string
}

const getPath = (option: createData | getData) => `/projects/${option.id}/repository/files/${option.file_path}`
class RepositoryFile extends base {
  // 获取文件
  async get (option: getData) {
    return this.fetch.get(getPath(option), {
      ref: option.ref
    })
  }

  // 创建文件
  async create (option: createData) {
    return this.fetch.post(getPath(option), option)
  }

  // 修改文件
  async update (option: createData) {
    return this.fetch.put(getPath(option), option)
  }

  // 删除文件
  async remove (option: createData) {
    return this.fetch.delete(getPath(option), option)
  }
}

export default RepositoryFile
