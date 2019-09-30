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
  public async setResult(award, count = 1, exclude) {
    const room = award.get('room') as AV.Object
    const roomEntity = Entity.from(room, RoomEntity)
    const conversation = await roomEntity.getConversation()

    if (!conversation) {
      throw Error('房间未启用')
    }

    if (conversation.members.length < count) {
      throw Error('开奖用户不足')
    }

    // 抽取中奖用户
    const result = conversation.members
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
  public create(room, param) {
    const award = new Award()

    // 保存奖项更新房间奖项
    return award.save(param, { fetchWhenSave: true }).then(async object => {
      room.add('awards', object)
      await room.save()
      return object
    })
  }
}
