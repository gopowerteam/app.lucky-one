<template>
  <q-page class="room-page">
    <q-btn label="分享房间" @click="onShare"></q-btn>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomInfoModel } from '~/models/room-info.model'
import { RoomEntity } from '~/entity/room.entity'
import { Message, TextMessage, ConversationBase } from 'leancloud-realtime'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token

  private room?: RoomEntity

  private roomService = new RoomService()

  private conversation

  public async mounted() {
    if (!this.token) {
      throw Error('无法找到房间')
    }

    this.room = await this.roomService.getRoom(this.token)

    if (!this.room.getEnable()) {
      await this.room.setEnable()
    }

    this.conversation = await this.room.getConversation()

    setTimeout(() => {
      this.conversation.send(new TextMessage('asdasd'))
    }, 3000)
  }

  private onShare() {
    open(`/#/visitor/room/${this.token}`)
  }

  private beforeDestroy() {
    if (this.room && this.room.value.enable) {
      this.conversation.quit()
    }
  }
}
</script>

<style lang="less" scoped>
</style>