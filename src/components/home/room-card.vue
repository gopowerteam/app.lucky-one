<template>
  <section class="room-card flex column">
    <div class="room-header">
      <q-icon name="img:/icons/home.svg" /> {{roomName}}
    </div>
    <div class="room-comment">
      这是一个没有用的房间描述，我也不知道该写一些什么，反正写着总比没有写来的好看一些，好吧就写这么多吧。
    </div>
    <div class="room-footer row justify-between">
      <div class="current-user">👨‍👨‍👦‍👦 {{cNum}}/{{sNum}}</div>
      <a class="inroom-btn">⚙进入</a>
    </div>
  </section>
</template>

<style>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'RoomCard',
})
export default class RoomCard extends Vue {

  @Prop({ default: '房间名称' })
  private roomName!: string

  private cNum = 15
  private sNum = 20

}
</script>

<style lang="less" scoped>
.room-card {
  width: 200px;
  height: 280px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px 5px #dfdcdc;
  padding: 10px;
  .room-header {
    flex-basis: 70px;
    line-height: 70px;
    color: rgba(50, 60, 90, 1);
    font-size: 2em;
    text-align: left;
  }
  .room-comment {
    line-height: 18px;
    color: rgba(133, 145, 176, 1);
    font-size: 0.9em;
    overflow: hidden;
    flex: 1;
  }
  .room-footer {
    flex-basis: 40px;
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