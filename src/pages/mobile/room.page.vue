<template>
  <q-page class="room-page">room page</q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '../../entity/room.entity'
import { ConversationBase } from 'leancloud-realtime'

// let randomName = require('chinese-random-name')

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token
  private room?: RoomEntity
  private conversation?: ConversationBase
  private roomService = new RoomService()

  public async mounted() {
    // 获取房间信息
    this.room = await this.roomService.getRoom(this.token)
    // 获取会话信息
    this.conversation = await this.room.getConversation()
    this.room.addUserListener().subscribe(members => {
    })
    this.room.addMessageListener().subscribe((...members) => {
    })
  }
}
</script>

<style lang="less" scoped>
</style>