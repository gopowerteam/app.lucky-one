import AV from 'leancloud-storage'
import { Entity } from '@/entity'
import { AwardEntity } from '@/entity/award.entity'
import { RoomEntity } from '@/entity/room.entity'

const Award = AV.Object.extend('award')

export class AwardService {
  private query = new AV.Query('award')
  /**
   * 获取奖项
   * @param id
   */
  public async getAward(id) {
    const award = AV.Object.createWithoutData('award', id)
    return award.fetch({ include: ['room'] }).then(data => Entity.from(data, AwardEntity))
  }

  /**
   * 设置奖项结果
   * @param award
   * @param count
   * @param exclude
   */
  public async setResult(award: AV.Object, count = 1, exclude) {
    const roomEntity = Entity.from(award.get('room'), RoomEntity)
    const conversation = await roomEntity.getConversation()

    if (!conversation) {
      return Promise.reject('房间未启用')
    }

    if (conversation.members.length < count) {
      return Promise.reject('开奖用户不足')
    }

    // 抽取中奖用户
    const result = conversation.members
      .filter(x => !x.includes('host'))
      .map(x => ({ id: x, seed: Math.random() }))
      .sort((x, y) => x.seed - y.seed)
      .slice(0, count)
    award.set('result', result)
    award.set('finish', true)
    return award.save()
  }

  /**
   * 创建奖项
   * @param room
   * @param param1
   */
  public create(roomObj, param) {
    const award = new Award()
    param.id = Math.random()
      .toString(36)
      .substr(2)
    // 创建奖项
    Object.keys(param).forEach(k => {
      award.set(k, param[k])
    })
    award.set('room', roomObj)

    return award.save()
  }

  /**
   * 查询奖项
   * @param room
   */
  public async queryAwards(data: string | AV.Object) {
    const query = new AV.Query('award')
    if (typeof data === 'string') {
      const roomObj = AV.Object.createWithoutData('room', data)
      query.equalTo('room', roomObj)
    } else {
      query.equalTo('room', data)
    }
    return query.find().then(results => results.map(v => Entity.from(v, AwardEntity)))
  }
}
