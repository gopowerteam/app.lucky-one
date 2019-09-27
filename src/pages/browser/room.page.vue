<template>
  <q-page class="room-page">
    <q-btn label="分享房间" @click="onShare"></q-btn>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '../../entity/room.entity'
import { Message, TextMessage } from 'leancloud-realtime'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token

  private roomService = new RoomService()
  private room!: RoomEntity
  private cNum = 0
  private dialog = {
    awardModify: false
  }

  public async mounted() {
    if (!this.token) {
      throw Error('无法找到房间')
    }

    this.room = await this.roomService.getRoom(this.token)

    if (!this.room.getEnable()) {
      await this.room.setEnable()
    }

    const conversation = await this.room.getConversation()

    setTimeout(() => {
      conversation.send(new TextMessage('asdasd'))
    }, 3000)
  }

  private onShare() {
    open(`/#/visitor/room/${this.token}`)
  }
  private awardSetting() {}
}
</script>

<style lang="less" scoped>
.room-page {
  .room-container {
    width: 70%;
    height: 600px;
    border-radius: 10px;
  }
  .content {
    .award-list {
      flex-basis: 180px;
    }
    .user-icons {
      flex: 1;
    }
  }
}
</style>