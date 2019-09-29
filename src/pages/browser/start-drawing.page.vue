<template>
  <q-page class="flex flex-center start-drawing">
    <div class="draw-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5 q-pl-xl">{{ awardData.name }}</div>
        <q-btn class="q-ml-xl confirm-button" @click="luckDrawClick" :disable="awardData.finish">开始摇奖</q-btn>
      </div>
      <div class="q-pl-xl">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{ userList.length }}/{{ roomData.limit || '无限制' }}
      </div>
      <q-scroll-area class="q-mt-md q-mx-xl user-icons overflow-scroll q-card" style="height:300px">
        <q-avatar v-for="user in userList" :key="user.objectId" class="q-ma-sm">
          <img :src="user.avatar" />
        </q-avatar>
      </q-scroll-area>

      <q-scroll-area
        v-if="luckUsers.length"
        class="q-mt-md q-mx-xl user-icons overflow-scroll q-card"
        style="height:150px"
      >
        <q-avatar v-for="user in luckUsers" :key="user.id" class="q-ma-sm">
          <img :src="user.avatar" />
        </q-avatar>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { QAvatar } from 'quasar'
import { AwardService } from '~/services/award.service'
import { AwardEntity } from '~/entity/award.entity'
import { RoomEntity } from '../../entity/room.entity'
import { Entity } from '../../entity'
import { ConversationBase } from 'leancloud-realtime'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'

@Component({
  components: {
    QAvatar
  }
})
export default class RoomPage extends Vue {
  @Prop()
  private awardId!: string

  private awardService = new AwardService()
  private awardData: any = {}
  private roomData: any = {}
  private awardEntity!: AwardEntity
  private roomEntity!: RoomEntity
  private conversation!: ConversationBase

  private userList: any[] = []
  private luckUsers: any[] = []

  private cNum = 20
  private drawFlag = false

  private back() {
    this.$router.go(-1)
  }

  private mounted() {
    this.awardService.getAward(this.awardId).then(entity => {
      this.awardData = entity.attributes
      this.roomData = entity.get('room').attributes
      this.awardEntity = entity
      this.roomEntity = Entity.from(entity.get('room'), RoomEntity)
      this.roomEntity.getConversation().then(data => {
        this.conversation = data
        this.getUserList()
      })
    })
  }

  private luckDrawClick() {
    this.awardEntity
      .setResult(this.awardData.count)
      .then(data => this.setLuckUser(data.get('result')))
      .catch(msg =>
        this.$q.notify({
          position: 'top',
          message: msg
        })
      )
  }

  private getUserList() {
    this.roomEntity.getUserList().then(data => (this.userList = data))
  }

  private setLuckUser(userList: any[]) {
    interval(1000)
      .pipe(take(userList.length))
      .subscribe(index => {
        const id = userList[index].id
        this.luckUsers.push(this.userList.find(x => x.username === id))
      })
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