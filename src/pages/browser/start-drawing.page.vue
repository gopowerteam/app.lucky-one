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
        <q-avatar v-for="user in luckUsers" :key="user.objectId" class="q-ma-sm">
          <img :src="user.avatar" />
        </q-avatar>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AwardService } from '~/services/award.service'
import { AwardEntity } from '~/entity/award.entity'
import { RoomEntity } from '../../entity/room.entity'
import { Entity } from '../../entity'
import { ConversationBase, TextMessage } from 'leancloud-realtime'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'

@Component({
  components: {}
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

  private async mounted() {
    const entity = await this.awardService.getAward(this.awardId)
    this.awardData = entity.attributes
    this.roomData = entity.get('room').attributes
    this.awardEntity = entity
    this.roomEntity = Entity.from(entity.get('room'), RoomEntity)
    this.conversation = await this.roomEntity.getConversation()
    this.getUserList()
    this.roomEntity.addUserListener().subscribe(this.getUserList)
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
    const ids = userList.map(v => v.id)
    const msgData = {
      awardId: this.awardId,
      ids
    }
    this.conversation.send(new TextMessage(JSON.stringify(msgData)))
    interval(1000)
      .pipe(take(ids.length))
      .subscribe(index => {
        const lucker = this.userList.find(x => x.username === ids[index])
        if (lucker) this.luckUsers.push(lucker)
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