<template>
  <q-page class="room-page">room page</q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomInfo } from '../../models/room/room-info.model'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token

  private room

  private roomService = new RoomService()

  public async mounted() {
    this.room = await this.roomService.get(this.token)

    if (!this.room.enable) {
      await this.roomService.enable(this.token)
      this.room = await this.roomService.get(this.token)
    }
  }
}
</script>

<style lang="less" scoped>
</style>