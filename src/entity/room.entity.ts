import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { AwardService } from '@/services/award.service'
import { throwError, Observable } from 'rxjs'
import { UserService } from '@/services/user.service'

export class RoomEntity extends Entity {
  private userService = new UserService()
  private realtimeUtil = new RealtimeUtil()
  /**
   * 会话实例
   */
  private _conversation?: ConversationBase

  public getEnable() {
    return this.get('enable') as boolean
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

    return this.userService.getUserList(this._conversation).then(list => list.map(v => v.toJSON()))
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
      return Promise.reject('当前会话未启用')
    }
  }

  /**
   * 获取房间下的所有奖项
   */
  public getAwards() {
    const awardService = new AwardService()
    return awardService.queryAwards(this.object)
  }

  /**
   * 添加消息监听
   */
  public addMessageListener(): Observable<any> {
    if (!this._conversation) {
      return throwError(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUMessageListener(this._conversation)
  }

  /**
   * 添加用户监听
   */
  public addUserListener(): Observable<any> {
    if (!this._conversation) {
      return throwError(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUserListener(this._conversation)
  }

  public createAward(param: any) {
    const service = new AwardService()
    return service.create(this.object, param)
  }
}
