<template>
  <section class="room-card q-pa-md shadow-5" @click="onOpenRoom">
    <div class="room-header text-no-warp ellipsis">
      <q-icon name="img:/icons/home.svg" />
      {{data.name}}
    </div>
    <div class="room-comment ellipsis">{{data.description}}</div>
    <div class="room-footer row justify-between">
      <div class="current-user text-blue-grey">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{cNum}}/{{data.limit || "无限制"}}
      </div>
      <a class="text-blue-grey-10 cursor-pointer" @click="dialog = true">⚙进入</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RoomDetailModel } from '../../models/room/room-detail.model'
import { Entity } from '~/entity'
import { RoomEntity } from '../../entity/room.entity'

@Component({
  name: 'RoomCard',
  components: {}
})
export default class RoomCard extends Vue {
  @Prop({ default: '房间名称' })
  private roomName!: string

  @Prop()
  private data!: RoomDetailModel

  private cNum = 15
  private sNum = 20
  private dialog = false

  private onOpenRoom() {
    this.$router.push({ name: 'room', params: { token: this.data.token } })
  }

  private mounted() {
    const roomEntity = Entity.from(this.data, RoomEntity)
    roomEntity.getConversation().then(value => {
      if (!value) return
      this.cNum = value.members.length
    })
  }
}
</script>

<style lang="less" scoped>
.room-card {
  width: 200px;
  height: 280px;
  border-radius: 10px;
  .room-header {
    height: 70px;
    line-height: 70px;
    font-size: 2em;
  }
  .room-comment {
    line-height: 18px;
    font-size: 0.9em;
    height: 140px;
    white-space: pre-wrap;
  }
  .room-footer {
    height: 40px;
    line-height: 40px;
    .current-user {
      font-size: 0.9em;
    }
  }
}
</style>