import store from '~/store'
import { IMClient } from 'leancloud-realtime'

export class RealtimeUtil {
  private static _client:IMClient

  private async getClient() {
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
}
