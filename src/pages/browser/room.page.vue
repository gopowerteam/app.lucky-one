<template>
  <q-page class="room-page">room page</q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomInfo } from '../../models/room/room-info.model'
import { RoomEntity } from '../../entity/room.entity'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token

  private room?: RoomEntity

  private roomService = new RoomService()

  public async mounted() {
    this.room = await this.roomService.getRoom(this.token)

    if (this.room.getEnable()) {
      await this.room.setEnable()
    }
  }
}
</script>

<style lang="less" scoped>
</style>