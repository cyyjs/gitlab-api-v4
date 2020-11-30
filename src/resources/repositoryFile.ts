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
    if (!res.content) {
      throw Error(res.message)
    }
    let content = Buffer.from(res.content, 'base64').toString()
    if (file_path.endsWith('.json')) {
      try {
        content = JSON.parse(content)
      } catch (e) {
        throw Error(`${file_path}: 解析失败`)
      }
    }
    return content
  }

  // 创建文件
  async create (option: createData) {
    const res:fileResponse = await this.fetch.post(`/projects/${option.id}/repository/files/${option.file_path}`, option)
    if (res.message) {
      throw Error(res.message)
    }
    return res
  }

  // 修改文件
  async update (option: createData) {
    const res:fileResponse = await this.fetch.put(`/projects/${option.id}/repository/files/${option.file_path}`, option)
    if (res.message) {
      throw Error(res.message)
    }
    return res
  }

  // 删除文件
  async remove (option: createData) {
    const res:fileResponse = await this.fetch.delete(`/projects/${option.id}/repository/files/${option.file_path}`, option)
    if (res.message) {
      throw Error(res.message)
    }
    return res
  }
}

export default RepositoryFile
