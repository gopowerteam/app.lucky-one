<template>
  <q-page class="flex flex-center room-page">
    <div class="room-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5">{{roomDetail.name}}</div>
        <q-btn icon="share"></q-btn>
      </div>
      <div class="row justify-between q-ma-md">
        <div class="current-user text-blue-gary-10 q-ml-md">
          <q-icon name="emoji_people" size="1.5em" color="purple" />
          {{cNum}}/{{roomDetail.limit || "无限制"}}
        </div>
        <a class="cursor-pointer" @click="dialog.awardModify = true">创建奖项</a>
      </div>

      <div class="content q-mx-lg row">
        <q-scroll-area class="award-list overflow-scroll q-card" style="height:460px">
          <div v-if="!awardList.length">暂无奖项</div>
          <award-status v-else v-for="(item,index) of awardList" :key="index" :data="item"></award-status>
        </q-scroll-area>
        <q-scroll-area class="q-ml-md user-icons overflow-scroll q-card" style="height:460px">
          <q-avatar v-for="i in 100" :key="i" class="q-ma-sm" color="deep-purple">{{i}}</q-avatar>
        </q-scroll-area>
      </div>
    </div>

    <q-dialog v-model="dialog.awardModify">
      <award-modify style="width:600px;max-width:600px" @cancel="dialog.awardModify = false"></award-modify>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomDetailModel } from '~/models/room/room-detail.model'
import AwardStatus from '~/components/award/award-status.vue'
import { QAvatar, colors } from 'quasar'
import { RealtimeUtil } from '~/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import AwardModify from '~/components/award/award-modify.vue'
import { AwardDetailModel } from '~/models/award/award-detail.model'

@Component({
  components: {
    AwardStatus,
    QAvatar,
    AwardModify
  }
})
export default class RoomPage extends Vue {
  @Prop()
  private token

  private roomDetail = new RoomDetailModel()
  private roomService = new RoomService()
  private realtime = new RealtimeUtil()
  private cNum = 0
  private dialog = {
    awardModify: false
  }

  private awardList: Array<AwardDetailModel> = [
    { name: '二等奖', count: 3, userIds: [], awardId: 'test', roomId: '123312', description: '' }
  ]

  public async mounted() {
    const roomEntity = await this.roomService.getRoom(this.token)
    if (roomEntity.getEnable()) {
      await roomEntity.setEnable()
    }
    // this.roomDetail =  romEntity.get as RoomDetailModel
    console.log(roomEntity)
    const conversation = await roomEntity.getConversation()
    if (!conversation) return
    this.realtime.addUserListener(conversation).subscribe(data => {})
  }

  private back() {
    this.$router.go(-1)
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