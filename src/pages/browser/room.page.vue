<template>
  <q-page class="flex flex-center room-page">
    <div class="room-container shadow-5 bg-img">
      <div class="flex justify-between items-center q-ma-md">
        <q-btn @click="back" icon="reply" />
        <div class="text-h5">{{ roomData.name }}</div>
        <q-btn icon="share" @click="shareClick"></q-btn>
      </div>
      <div class="row justify-between q-ma-md">
        <div class="current-user text-blue-gary-10 q-ml-md">
          <q-icon name="emoji_people" size="1.5em" color="purple" />
          {{ cNum }}/{{ roomData.limit || '无限制' }}
        </div>
        <a class="cursor-pointer" @click="dialog.awardModify = true">创建奖项</a>
      </div>

      <div class="content q-mx-lg row">
        <q-scroll-area class="award-list overflow-scroll q-card" style="height:460px">
          <div v-if="!awardList.length">暂无奖项</div>
          <award-status v-else v-for="(award, index) of awardList" :key="index" :model="award"></award-status>
        </q-scroll-area>
        <q-scroll-area class="q-ml-md user-icons overflow-scroll q-card" style="height:460px">
          <q-avatar v-for="user in userList" :key="user.objectId" class="q-ma-sm">
            <img :src="user.avatar" />
          </q-avatar>
        </q-scroll-area>
      </div>
    </div>

    <q-dialog v-model="dialog.awardModify">
      <award-modify
        style="width:600px;max-width:600px"
        :entity="roomEntity"
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
import AwardModify from '~/components/award/award-modify.vue'
import { AwardService } from '~/services/award.service'
import { RoomEntity } from '~/entity/room.entity'
import { AwardEntity } from '~/entity/award.entity'
import { ConversationBase } from 'leancloud-realtime'

@Component({
  components: {
    AwardStatus,
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

  private roomData: any = {}
  private userList: any[] = []
  private roomEntity: RoomEntity | null = null

  private awardList: Array<any> = []
  private conversation!: ConversationBase

  public async mounted() {
    if (!this.token) {
      throw Error('无法找到房间')
    }
    this.roomEntity = await this.roomService.getRoom(this.token)
    this.roomData = this.roomEntity.object.toJSON()
    if (!this.roomEntity.getEnable()) {
      await this.roomEntity.setEnable()
    }

    this.conversation = await this.roomEntity.getConversation()
    this.roomEntity.addUserListener().subscribe({
      next: users => {
        this.cNum = users.length
        this.getUserList()
      },
      error: console.log
    })

    this.refreshData()
  }

  public activated() {
    this.refreshData()
  }

  public refreshData() {
    if (!this.roomEntity) return
    this.roomEntity.getAwards().then(data => {
      this.awardList = data.map(v => v.object.toJSON())
    })
  }

  private back() {
    this.$router.go(-1)
  }

  private shareClick() {
    // this.$router.push({ name: 'visitor-room', params: { token: this.token } })
    open(`/#/visitor/room/${this.token}`)
  }

  /**
   * 获取用户列表
   */
  public async getUserList() {
    if (this.roomEntity) {
      const list = await this.roomEntity.getUserList()
      this.userList = list
    }
  }
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