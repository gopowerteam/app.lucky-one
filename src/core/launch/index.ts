import LeanCloudInit from './leancloud'

export function launch(): Promise<any> {
  return new Promise(async resolve => {
    await LeanCloudInit()
    resolve()
  })
}
