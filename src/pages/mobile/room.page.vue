<template>
  <q-page class="room-page">
    <div class="q-pa-md">
      <q-btn class="absolute-top-right q-ma-md" icon="share" @click="shareClick"></q-btn>
      <div class="text-h4 q-pt-md">
        Lucky
        <span class="q-ml-xl block">Draw</span>
      </div>
      <div class="text-h4 q-pt-xl">{{ roomData.name }}</div>
      <div class="text-blue-gary-10 q-mt-md">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{ userList.length }}/{{ roomData.limit || '无限制' }}
      </div>
    </div>
    <q-tabs v-model="currentTab" dense class="bg-grey-3" align="justify" narrow-indicator>
      <q-tab name="user-list" label="房间用户"></q-tab>
      <q-tab name="award-list" label="奖项列表"></q-tab>
      <q-tab name="my-award" label="我的奖项"></q-tab>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="currentTab" animated class="bg-grey-3">
      <q-tab-panel name="user-list">
        <q-avatar v-for="user of userList" :key="user.objectId" class="q-ma-sm">
          <img :src="user.avatar" />
        </q-avatar>
      </q-tab-panel>
      <q-tab-panel name="award-list">
        <q-card v-for="award of awardList" :key="award.objectId" class="bg-purple-5 q-my-md">
          <div class="q-px-md">
            <span class="text-h5">{{ award.name }}</span>
            <q-avatar size="xs" color="orange" class="q-ml-xs">{{ award.count }}</q-avatar>
            <span class="absolute-right q-mr-md q-mt-md">{{ award.finish ? '已开将' : '待开奖' }}</span>
          </div>
          <q-avatar v-for="user of getAwardResult(award.result)" :key="user.objectId" class="q-ma-sm">
            <img :src="user.avatar" />
          </q-avatar>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="my-award">
        <q-card v-for="award of awardList" :key="award.objectId" class="bg-purple q-my-md">
          <div class="q-px-md">
            <span>{{ award.name }}</span>
            <q-avatar>{{ award.count }}</q-avatar>
            <span
              class="absolute-right q-mr-md q-mt-md"
              :class="[luckerIsMe(award) ? 'text-deep-orange-13' : 'text-grey-13']"
              >{{ award.finish ? (luckerIsMe(award) ? '已中奖' : '未中奖') : '待开奖' }}</span
            >
          </div>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '~/entity/room.entity'
import { ConversationBase } from 'leancloud-realtime'
import { QTabPanels, QTabPanel, QTabs, QTab, QSeparator } from 'quasar'
import UserList from '~/components/home/user-list.vue'

@Component({
  components: {
    QTabPanels,
    QTabPanel,
    QTabs,
    QTab,
    QSeparator,
    UserList
  }
})
export default class RoomPage extends Vue {
  @Prop()
  private token
  private room?: RoomEntity
  private conversation?: ConversationBase
  private roomService = new RoomService()
  private roomData: any = {}
  private currentTab = 'user-list'
  private userList: any[] = []
  private awardList: any[] = []

  public async mounted() {
    // 获取房间信息
    this.room = await this.roomService
      .getRoom(this.token)
      .then(d => d)
      .catch(r => {
        this.$q.notify({
          message: r,
          position: 'top'
        })
        return undefined
      })
    if (!this.room) return
    this.roomData = this.room.attributes
    this.awardList = await this.room.getAwards().then(awardEntitys => awardEntitys.map(v => v.object.toJSON()))

    // 获取会话信息
    this.conversation = await this.room.getConversation()
    // 添加用户列表更新通知
    this.room.addUserListener().subscribe(members => {
      this.getUserList()
    })
    // 添加之间更新通知
    this.room.addMessageListener().subscribe(this.onLuckMessage)
    // 更新用户列表
    this.getUserList()
  }

  private async onLuckMessage(message) {
    if (!this.room) return
    this.awardList = await this.room.getAwards().then(awardEntitys => awardEntitys.map(v => v.object.toJSON()))
  }

  /**
   * 获取用户列表
   */
  public async getUserList() {
    if (this.room) {
      const list = await this.room.getUserList()
      this.userList = list
    }
  }

  private shareClick() {
    // this.$router.push({ name: 'visitor-room', params: { token: this.token } })
    open(`/#/visitor/room/${this.token}`)
  }

  private getAwardResult(result: any[]) {
    if (!result) return []
    const ids = result.map(v => v.id)
    return this.userList.filter(u => ids.includes(u.username))
  }

  private luckerIsMe(award: any) {
    if (!award.result) return
    return award.result.includes(sessionStorage.getItem('username'))
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 100%;
}
</style>