import store from '~/store'
import { IMClient, Event, ConversationBase } from 'leancloud-realtime'
import { Observable, Subscriber } from 'rxjs'

export class RealtimeUtil {
  private static _client: IMClient
  private static _listeners: any[] = []

  public async getClient() {
    if (!RealtimeUtil._client) {
      await this.createClient()
    }

    return RealtimeUtil._client
  }

  /**
   * 创建客户端
   */
  private createClient() {
    return globalThis.$realtime
      .createIMClient(store.state.name)
      .then(client => {
        RealtimeUtil._client = client
        RealtimeUtil._client.on(Event.MEMBERS_JOINED, this.onMembersEvent)
        RealtimeUtil._client.on(Event.MEMBERS_LEFT, this.onMembersEvent)
        RealtimeUtil._client.on(Event.MESSAGE, this.onMessageEvent)
      })
      .catch(console.error)
  }

  /**
   * 创建会话
   * @param name
   */
  public async createConversation(name) {
    const client = await this.getClient()

    return client.createConversation({
      members: [],
      name,
      unique: true
    })
  }

  public async getConversation(id) {
    const client = await this.getClient()
    return client.getConversation(id).catch(console.error.bind(console))
  }

  public addUserListener(conversation: ConversationBase) {
    return new Observable(observer => {
      const target = RealtimeUtil._listeners.find(x => x.conversation.id === conversation.id)

      if (target) {
        target.user = observer
      } else {
        RealtimeUtil._listeners.push({
          conversation,
          user: observer
        })
      }
    })
  }

  public addUMessageListener(conversation: ConversationBase) {
    return new Observable(observer => {
      const target = RealtimeUtil._listeners.find(x => x.conversation.id === conversation.id)

      if (target) {
        target.message = observer
      } else {
        RealtimeUtil._listeners.push({
          conversation,
          message: observer
        })
      }
    })
  }

  private onMembersEvent(payload, conversation) {
    RealtimeUtil._listeners.forEach(({ user }) => {
      if (user) {
        conversation.fetch().then(({ members }) => {
          user.next(members)
        })
      }
    })
  }

  private onMessageEvent(payload, conversation) {
    RealtimeUtil._listeners.forEach(({ message }) => {
      if (message) {
        message.next(payload.text)
      }
    })
  }
}
