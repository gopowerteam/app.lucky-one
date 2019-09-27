import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { RoomService } from '@/services/room.service'
import { AwardService } from '@/services/award.service'
import { Observable } from 'rxjs'
import { UserService } from '@/services/user.service'

export class RoomEntity extends Entity {
  private userService = new UserService()
  private realtimeUtil = new RealtimeUtil()
  /**
   * 会话实例
   */
  private _conversation?: ConversationBase

  public getEnable() {
    return this.get('enable')
  }

  /**
   * 启用房间
   */
  public async setEnable() {
    const realtimeUtil = new RealtimeUtil()

    if (this.valid) {
      this._conversation = await realtimeUtil.createConversation(this.attributes.code.toString())
      const conversation = AV.Object.createWithoutData('_Conversation', this._conversation.id)
      this.set('conversation', conversation)
      this.set('enable', true)
      await this.save()
    }
  }

  public getUserList() {
    if (!this._conversation) {
      throw Error('房间未启用')
    }

    return this.userService.getUserList(this._conversation)
  }

  /**
   * 获取并加入会话
   */
  public async getConversation(): Promise<ConversationBase> {
    if (this._conversation) {
      return this._conversation
    }

    if (this.attributes.enable && this.valid) {
      const conversation = this.attributes.conversation
      this._conversation = (await this.realtimeUtil.getConversation(conversation.id)) as ConversationBase
      return this._conversation
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
  public createAward(params) {
    const awardService = new AwardService()
    return awardService.create(this.object, params)
  }

  /**
   * 添加消息监听
   */
  public addMessageListener(): Observable<any> {
    if (!this._conversation) {
      return Observable.throw(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUMessageListener(this._conversation)
  }

  /**
   * 添加用户监听
   */
  public addUserListener(): Observable<any> {
    if (!this._conversation) {
      return Observable.throw(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUserListener(this._conversation)
  }
}
