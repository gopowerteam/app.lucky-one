<template>
  <q-page class="flex flex-center start-drawing">
    <div class="draw-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5">{{awardDetailModel.name}}</div>
        <q-btn class="q-ml-xl confirm-button" @click="luckDrawClick">开始摇奖</q-btn>
      </div>
      <div class="q-pl-xl">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{cNum}}/{{roomLimt || "无限制"}}
      </div>
      <q-scroll-area class="q-mt-md q-mx-xl user-icons overflow-scroll q-card" style="height:300px">
        <q-avatar v-for="i in cNum" :key="i" class="q-ma-sm" color="deep-purple">{{i}}</q-avatar>
      </q-scroll-area>

      <q-scroll-area class="q-mt-md q-mx-xl user-icons overflow-scroll q-card" style="height:150px">
        <q-avatar
          v-for="i in awardDetailModel.count"
          :key="i"
          class="q-ma-sm"
          color="deep-purple"
        >{{awardDetailModel.userIds[i-1]}}</q-avatar>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import AwardStatus from '~/components/award/award-status.vue'
import { QAvatar, colors } from 'quasar'
import { RealtimeUtil } from '~/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { AwardInfoModel } from '~/models/award/award-info.model'
import { RoomDetailModel } from '~/models/room/room-detail.model'
import { timer, range, Observable, generate, observable, Subscription, from, interval, bindCallback } from 'rxjs'
import { filter, count, last, delay, scan, take } from 'rxjs/operators'
import { AwardService } from '~/services/award.service'

@Component({
  components: {
    AwardStatus,
    QAvatar
  }
})
export default class RoomPage extends Vue {
  @Prop()
  private awardId!: string

  @Prop()
  private limit!: string

  private awardService = new AwardService()
  private awardDetailModel = new AwardInfoModel()
  private realtimeUtil = new RealtimeUtil()
  private cNum = 20
  private drawFlag = false

  private get roomLimt() {
    return Number.parseInt(this.limit, 0)
  }

  private back() {
    this.$router.go(-1)
  }

  private async mounted() {
    // this.awardDetailModel = await this.awardService.getAwardDetail(this.awardId)
  }

  private luckDrawClick() {
    // this.awardDetailModel.userIds = []
    // const subscription = timer(0, 1000).subscribe(index => {
    //   this.awardDetailModel.userIds.push(this.getRndInteger().toString())
    //   if (this.awardDetailModel.userIds.length === this.awardDetailModel.count) subscription.unsubscribe()
    // })
  }

  private getRndInteger() {
    // let numberIndex = 0
    // do {
    //   numberIndex = Math.floor(Math.random() * (this.cNum - 1)) + 1
    // } while (this.awardDetailModel.userIds.includes(numberIndex.toString()))
    // return numberIndex
  }
}
</script>

<style lang="less" scoped>
.start-drawing {
  .draw-container {
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