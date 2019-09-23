<template>
  <q-page class="flex flex-center home-page">
    <div class="home-container shadow-15" v-show="!dialog.modify">
      <div class="create-room">
        <q-btn outline color="white" @click="dialog.modify = true">创建房间</q-btn>
      </div>
      <q-scroll-area class="rooms" horizontal ref="scrollArea">
        <div class="row no-wrap">
          <room-card v-for="item of roomSet" :key="item.token" :data="item"></room-card>
        </div>
      </q-scroll-area>
      <div class="nav-buttoms">
        <q-btn @click="toLeft">←</q-btn>
        <q-btn @click="toRight">→</q-btn>
      </div>
    </div>

    <room-modify v-show="dialog.modify" @cancel="dialog.modify = false" @success="queryRooms"></room-modify>

    <!-- <q-dialog v-model="dialog.modify" persistent>
      <room-modify @close="dialog.modify = false"></room-modify>
    </q-dialog> -->
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '../../services/room.service'
import RoomCard from '~/components/home/room-card.vue'
import RoomModify from '~/components/home/room-modify.vue'
import { QScrollArea } from 'quasar'

@Component({
  components: {
    RoomCard,
    RoomModify,
    QScrollArea
  }
})
export default class HomePage extends Vue {
  public roomService = new RoomService()
  private roomSet: any[] = []
  private dialog = {
    modify: false
  }
  private scrollArea !: QScrollArea

  public mounted() {
    this.scrollArea = this.$refs.scrollArea as QScrollArea
    this.queryRooms()
  }

  /**
   * 查询房间
   */
  private queryRooms() {
    this.roomService.query().then(rooms => this.roomSet = rooms)
  }

  private toLeft() {
    const offset = this.scrollArea.getScrollPosition()
    this.scrollArea.setScrollPosition(offset - 230, 500)
  }

  private toRight() {
    const offset = this.scrollArea.getScrollPosition()
    this.scrollArea.setScrollPosition(offset + 230, 500)
  }
}
</script>

<style lang="less" scoped>
.home-page {
  background: url('/img/home-bg.png') no-repeat;
  background-size: cover;
  .home-container {
    background: url('/img/home-bg.png') no-repeat;
    background-size: cover;
    width: 70%;
    height: 500px;
    border-radius: 10px;
  }
  .create-room,
  .nav-buttoms {
    text-align: right;
    margin: 30px;
  }
  .rooms {
    padding-left: 100px;
    height: 310px;
    width: 100%;
    .room-card {
      margin: 10px;
    }
    .room-card + .room-card {
      margin-left: 30px;
    }
  }
  .room-modify {
    width: 70%;
  }
}
</style>