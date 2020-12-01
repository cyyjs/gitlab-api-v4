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

export interface fileResponse {
  file_path: string
  branch: string
  content: string,
  message: string
}

class RepositoryFile extends base {
  // 获取文件
  async get ({ id, file_path, ref }: {
    id: string|number,
    file_path: string,
    ref: string
  }) {
    const res:fileResponse = await this.fetch.get(`/projects/${id}/repository/files/${file_path}`, {
      ref
    })
    console.log(res)
    if (res.content) {
      let content = Buffer.from(res.content, 'base64').toString()
      if (file_path.endsWith('.json')) {
        try {
          content = JSON.parse(content)
        } catch (e) {
          return Promise.reject(Error(`${file_path}: 解析失败`))
        }
      }
      return content
    } else if (res.message) {
      return Promise.reject(res.message)
    }
  }

  // 创建文件
  async create (option: createData) {
    return this.fetch.post(`/projects/${option.id}/repository/files/${option.file_path}`, option)
  }

  // 修改文件
  async update (option: createData) {
    return this.fetch.put(`/projects/${option.id}/repository/files/${option.file_path}`, option)
  }

  // 删除文件
  async remove (option: createData) {
    return this.fetch.delete(`/projects/${option.id}/repository/files/${option.file_path}`, option)
  }
}

export default RepositoryFile
