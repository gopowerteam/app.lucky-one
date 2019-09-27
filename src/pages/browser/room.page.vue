<template>
  <q-page class="flex flex-center room-page">
    <div class="room-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5">{{data.name}}</div>
        <q-btn icon="share"></q-btn>
      </div>
      <div class="row justify-between q-ma-md">
        <div class="current-user text-blue-gary-10 q-ml-md">
          <q-icon name="emoji_people" size="1.5em" color="purple" />
          {{cNum}}/{{data.limit || "无限制"}}
        </div>
        <a class="cursor-pointer" @click="dialog.awardModify = true">创建奖项</a>
      </div>

      <div class="content q-mx-lg row">
        <q-scroll-area class="award-list overflow-scroll q-card" style="height:460px">
          <div v-if="!awardList.length">暂无奖项</div>
          <award-status
            v-else
            v-for="(award,index) of awardList"
            :key="index"
            :data="award"
            :limit="data.limit"
          ></award-status>
        </q-scroll-area>
        <q-scroll-area class="q-ml-md user-icons overflow-scroll q-card" style="height:460px">
          <q-avatar v-for="i in 100" :key="i" class="q-ma-sm" color="deep-purple">{{i}}</q-avatar>
        </q-scroll-area>
      </div>
    </div>

    <q-dialog v-model="dialog.awardModify">
      <award-modify
        style="width:600px;max-width:600px"
        :token="data.token"
        @cancel="dialog.awardModify = false"
        @success="refreshData"
      ></award-modify>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import AwardStatus from '~/components/award/award-status.vue'
import { QAvatar, colors } from 'quasar'
import AwardModify from '~/components/award/award-modify.vue'
import { AwardInfoModel } from '~/models/award/award-info.model'
import { RoomDetailModel } from '~/models/room/room-detail.model'
import { AwardService } from '~/services/award.service'

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

  private roomService = new RoomService()
  private awardService = new AwardService()
  private cNum = 0
  private dialog = {
    awardModify: false
  }

  private data = new RoomDetailModel()

  private awardList: Array<AwardInfoModel> = []

  public async mounted() {

    if (!this.token) {
      throw Error('无法找到房间')
    }

    this.refreshData()
    const roomEntity = await this.roomService.getRoom(this.token)
    this.data = roomEntity.attributes as RoomDetailModel
    if (roomEntity.getEnable()) {
      await roomEntity.setEnable()
    }



    roomEntity.getConversation().then(conversation => {
      if (!conversation) return
      this.cNum = conversation.members.length
    })
  }

  public activated() {
    this.refreshData()
  }

  public refreshData() {
    // this.awardService.queryAwards(this.token).then(data => (this.awardList = data))
  }

  private back() {
    this.$router.go(-1)
  }
  private awardSetting() { }
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