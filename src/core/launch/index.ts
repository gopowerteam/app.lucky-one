import LeanCloudInit from './leancloud'
import { ApplicationRouter } from '../application/application_router'
import { authGuard } from '@/shared/guards/auth.guard'

export function launch(): Promise<any> {
  return new Promise(async resolve => {
    ApplicationRouter.registerGuard([authGuard])
    await LeanCloudInit()
    resolve()
  })
}
