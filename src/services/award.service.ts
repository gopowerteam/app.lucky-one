import AV from 'leancloud-storage'
import md5 from 'crypto-js/md5'
import store from '~/store'
import { AwardInfoModel } from '~/models/award/award-info.model'
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

  /**
   * 根据房间token查询奖项列表
   * @param roomToken
   */
  public queryAwards(roomToken: string) {
    const query = new AV.Query('award')
    return query
      .equalTo('token', roomToken)
      .find()
      .then(q => q.map(v => v.toJSON() as AwardInfoModel))
  }

  /**
   * 获取奖项详情
   * @param objectId
   */
  public getAwardDetail(objectId: string) {
    const query = new AV.Query('award')
    return query.get(objectId).then(q => q.toJSON() as AwardInfoModel)
  }
}
