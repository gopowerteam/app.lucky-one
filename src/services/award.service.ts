import AV from 'leancloud-storage'
import md5 from 'crypto-js/md5'
import store from '~/store'
import { AwardInfoModel } from '~/models/award/award-info.model'
import { AwardDetailModel } from '~/models/award/award-detail.model'
const Arard = AV.Object.extend('award')

/**
 * 奖项数据存储服务
 */
export class AwardService {
  /**
   * 创建房间
   * @param data
   */
  public async create(data: AwardInfoModel) {
    const award = new Arard()
    const query = new AV.Query('award')

    const count = await query
      .equalTo('token', data.token)
      .equalTo('name', data.name)
      .count()
    if (count) return Promise.reject('已经存在该奖项')

    Object.entries(data).forEach(([key, value]) => {
      award.set(key, value)
    })

    return award.save()
  }

  public queryAwards(roomToken: string) {
    const query = new AV.Query('award')
    return query
      .equalTo('token', roomToken)
      .find()
      .then(q => q.map(v => v.toJSON() as AwardDetailModel))
  }
}
