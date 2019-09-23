<template>
  <div class="room-card shadow-5">
    <div class="room-header">
      <q-icon name="img:/icons/home.svg" /> {{data.name}}
    </div>
    <div class="room-comment">
      {{data.description}}
    </div>
    <div class="room-footer row justify-between">
      <div class="current-user">👨‍👨‍👦‍👦 {{cNum}}/{{sNum}}</div>
      <a class="inroom-btn">⚙进入</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'RoomCard',
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
  background-color: white;
  padding: 10px;
  .room-header {
    height: 70px;
    line-height: 70px;
    color: rgba(50, 60, 90, 1);
    font-size: 2em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .room-comment {
    line-height: 18px;
    color: rgba(133, 145, 176, 1);
    font-size: 0.9em;
    overflow: hidden;
    height: 140px;
    white-space: pre-wrap;
  }
  .room-footer {
    height: 40px;
    line-height: 40px;
    .current-user {
      color: rgba(133, 145, 176, 1);
      font-size: 0.9em;
    }
    .inroom-btn {
      color: rgba(63, 71, 81, 1);
      cursor: pointer;
    }
  }
}
</style>