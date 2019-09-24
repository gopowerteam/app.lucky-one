<template>
  <q-page class="flex flex-center home-page bg-img">
    <div class="home-container shadow-24 bg-img column">
      <div class="q-mt-xl q-pr-lg text-right">
        <q-btn outline class="confirm-button" @click="dialog.modify = true">创建房间</q-btn>
      </div>
      <q-scroll-area class="rooms" horizontal ref="scrollArea" :thumb-style="{display:'none'}">
        <div class="row no-wrap full-height items-center">
          <room-card class="q-ma-md q-mr-xl" v-for="item of roomSet" :key="item.token" :data="item"></room-card>
        </div>
      </q-scroll-area>
      <div class="q-mb-xl q-pr-lg text-right" v-if="roomSet.length">
        <q-btn round class="cbg-to-right flip-horizontal" @click="toLeft" icon="arrow_right_alt"></q-btn>
        <q-btn round class="cbg-to-right q-ml-sm" @click="toRight" icon="arrow_right_alt"></q-btn>
      </div>
    </div>

    <q-dialog v-model="dialog.modify" persistent>
      <room-modify
        style="width:70%;max-width:700px"
        @cancel="dialog.modify = false"
        @success="queryRooms"
      ></room-modify>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
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
  private scrollArea!: QScrollArea

  public mounted() {
    this.scrollArea = this.$refs.scrollArea as QScrollArea
    this.queryRooms()
  }

  /**
   * 查询房间
   */
  private queryRooms() {
    this.scrollArea.setScrollPosition(0, 500)
    this.roomService.query().then(rooms => (this.roomSet = rooms))
  }

  private toLeft() {
    const offset = this.scrollArea.getScrollPosition()
    if (offset < 0) return
    this.scrollArea.setScrollPosition(offset - 600, 500)
  }

  private toRight() {
    const offset = this.scrollArea.getScrollPosition()
    this.scrollArea.setScrollPosition(offset + 600, 500)
  }
}
</script>

<style lang="less" scoped>
.home-page {
  .home-container {
    width: 70%;
    height: 600px;
    border-radius: 10px;
  }
  .rooms {
    flex: 1;
    .room-card:first-child {
      margin-left: 100px;
    }
    .room-card:last-child {
      margin-right: 100px;
    }
  }
}
</style>