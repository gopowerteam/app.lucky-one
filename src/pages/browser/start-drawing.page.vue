<template>
  <q-page class="flex flex-center start-drawing">
    <div class="draw-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5">{{awardData.name}}</div>
        <q-btn class="q-ml-xl confirm-button" @click="luckDrawClick">开始摇奖</q-btn>
      </div>
      <div class="q-pl-xl">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{cNum}}/{{roomData.limit || "无限制"}}
      </div>
      <q-scroll-area class="q-mt-md q-mx-xl user-icons overflow-scroll q-card" style="height:300px">
        <q-avatar v-for="i in cNum" :key="i" class="q-ma-sm" color="deep-purple">{{i}}</q-avatar>
      </q-scroll-area>

      <q-scroll-area
        v-if="luckUsers.lenth"
        class="q-mt-md q-mx-xl user-icons overflow-scroll q-card"
        style="height:150px"
      >
        <q-avatar
          v-for="item in luckUsers"
          :key="item.id"
          class="q-ma-sm"
          color="deep-purple"
        >{{item}}</q-avatar>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { QAvatar } from 'quasar'
import { AwardService } from '~/services/award.service'
import { AwardEntity } from '~/entity/award.entity'

@Component({
  components: {
    QAvatar
  }
})
export default class RoomPage extends Vue {
  @Prop()
  private objectId!: string

  private awardService = new AwardService()
  private awardData: any = {}
  private roomData: any = {}
  private awardEntity!: AwardEntity

  private luckUsers: any = []

  private cNum = 20
  private drawFlag = false

  private back() {
    this.$router.go(-1)
  }

  private mounted() {
    console.log(this.objectId)
    this.awardService.getAward(this.objectId).then(entity => {
      this.awardData = entity.attributes
      this.roomData = entity.get('room').attributes
    })
  }

  private luckDrawClick() {
    this.awardEntity
      .setResult(this.roomData.limit)
      .then(data => console.log(data))
      .catch(msg =>
        this.$q.notify({
          position: 'top',
          message: msg
        })
      )
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