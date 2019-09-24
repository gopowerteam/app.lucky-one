<template>
  <div class="room-card shadow-10 bg-white q-pa-lg">
    <div class="room-header text-blue-grey-8 text-nowarp ellipsis">
      <q-icon name="img:/icons/home.svg" />
      {{data.name}}
    </div>
    <div class="room-comment ellipsis">{{data.description}}</div>
    <div class="room-footer row justify-between">
      <div class="current-user text-blue-grey">👨‍👨 {{cNum}}/{{sNum}}</div>
      <a class="text-blue-grey-10 cursor-pointer">⚙进入</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'RoomCard'
})
export default class RoomCard extends Vue {
  @Prop({ default: '房间名称' })
  private roomName!: string

  @Prop()
  private data: any

  private cNum = 15
  private sNum = 20
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