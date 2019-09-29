<template>
  <q-page class="room-page">
    mobile room
    <div class="flex row">
      <div class="q-ma-md text-center" v-for="user of userList" :key="user.username">
        <img class="avatar q-ma-xs" :src="user.avatar" />
        <div>{{user.username}}</div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '~/entity/room.entity'
import { ConversationBase } from 'leancloud-realtime'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token
  private room?: RoomEntity
  private conversation?: ConversationBase
  private roomService = new RoomService()

  private userList: any = []
  public async mounted() {
    console.log(123)
    // 获取房间信息
    this.room = await this.roomService.getRoom(this.token)

    // 获取会话信息
    this.conversation = await this.room.getConversation()
    // 添加用户列表更新通知
    this.room.addUserListener().subscribe(members => {
      this.getUserList()
    })
    // 添加之间更新通知
    this.room.addMessageListener().subscribe(message => {})
    // 更新用户列表
    this.getUserList()
  }

  /**
   * 获取用户列表
   */
  public async getUserList() {
    if (this.room) {
      const list = await this.room.getUserList()
      this.userList = list.map((x: any) => x.attributes)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 100%;
}
</style>