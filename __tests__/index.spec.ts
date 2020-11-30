import Gitlab from '../src/index'

const gitlab = new Gitlab({
  api: '',
  privateToken: ''
})

const projectID = 4595
describe('Gitlab is ok', () => {
  test.skip('Gitlab get project list', () => {
    return gitlab.projects.list().then((res:any) => {
      expect(res).toBeInstanceOf(Array)
    })
  })

  test.skip('Gitlab get repositoryFile', () => {
    return gitlab.repositoryFile.get({
      id: projectID,
      file_path: 'package.json',
      ref: 'master'
    }).then((res:any) => {
      expect(res.version).toBeDefined()
    })
  })

  test('Gitlab create repositoryFile', () => {
    return gitlab.repositoryFile.create({
      id: projectID,
      file_path: '1.json',
      branch: 'master',
      content: '{"a":1, "b":1}',
      commit_message: 'api提交'
    }).then((res:any) => {
      expect(res.file_path).toBeDefined()
    })
  })

  test.skip('Gitlab update repositoryFile', () => {
    return gitlab.repositoryFile.update({
      id: projectID,
      file_path: '1.json',
      branch: 'master',
      content: '{"a":1, "b":1}',
      commit_message: 'api提交'
    }).then((res:any) => {
      expect(res.file_path).toBeDefined()
    })
  })

  test('Gitlab delete repositoryFile', () => {
    return gitlab.repositoryFile.remove({
      id: projectID,
      file_path: '1.json',
      branch: 'master',
      commit_message: 'api提交'
    }).then((res:any) => {
      expect(res.file_path).toBeUndefined()
    })
  })
})