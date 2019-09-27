import AV from 'leancloud-storage'
import { Entity } from '@/entity'
import { AwardEntity } from '@/entity/award.entity'
import { RoomEntity } from '@/entity/room.entity'

const Award = AV.Object.extend('award')

export class AwardService {
  /**
   * 获取奖项
   * @param id
   */
  public async getAward(id) {
    const query = new AV.Query('award')
    const award = await query.equalTo('id', id).first()
    return Entity.from(award, AwardEntity)
  }

  /**
   * 设置奖项结果
   * @param award
   * @param count
   * @param exclude
   */
  public async setResult(award, count = 1, exclude) {
    const roomEntity = Entity.from(award.get('room'), RoomEntity)
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
  public async create(room, { name, count }) {
    const award = new Award()
    const id = Math.random()
      .toString(36)
      .substr(2)
    // 创建奖项
    const object = await award.save({
      id,
      name,
      count,
      room,
      finish: false
    })
    // 关联房间
    room.set('awards', [...(room.awards || []), object])
    await room.save()
    return object
  }
}
