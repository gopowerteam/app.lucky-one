import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'

export class RoomEntity extends Entity {
  /**
   * 会话实例
   */
  private conversation

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

  public async getConversation(): Promise<void | ConversationBase> {
    const realtimeUtil = new RealtimeUtil()

    if (this.conversation) {
      return this.conversation
    }

    if (this.attributes.enable && this.valid) {
      this.conversation = await realtimeUtil.getConversation(this.attributes.conversation)
    } else {
      throw new Error('当前会话未启用')
    }
  }
}
