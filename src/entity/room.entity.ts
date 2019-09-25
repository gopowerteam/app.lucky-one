import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { RoomService } from '@/services/room.service'
import { AwardService } from '@/services/award.service'

export class RoomEntity extends Entity {
  /**
   * 会话实例
   */
  private conversation?:ConversationBase

  public getEnable() {
    return this.get('enable')
  }

  /**
   * 启用房间
   */
  public async setEnable() {
    const realtimeUtil = new RealtimeUtil()

    if (this.valid) {
      this.conversation = await realtimeUtil.createConversation(this.attributes.code.toString())
      this.set('conversation', this.conversation.id)
      this.set('enable', true)
      await this.save()
    }
  }

  /**
   * 
   */
  public async getConversation(): Promise<void | ConversationBase> {
    const realtimeUtil = new RealtimeUtil()

    if (this.conversation) {
      return this.conversation
    }

    if (this.attributes.enable && this.valid) {
      const conversation = await realtimeUtil.getConversation(this.attributes.conversation)
      this.conversation = conversation as ConversationBase
    } else {
      throw new Error('当前会话未启用')
    }
  }

  /**
   * 创建奖
   *  
   *         
   * @param params 
   */
  public createAward(params){
    const awardService = new AwardService()
    return awardService.create(this.object,params)
  }
}
