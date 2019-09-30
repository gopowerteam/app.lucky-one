<template>
  <q-page class="room-page flex column">
    <div class="room-header q-pa-md column justify-between">
      <div class="row justify-between">
        <div class="room-logo">
          <div class="q-ml-xs">Lucky</div>
          <div class="q-ml-lg">Draw</div>
        </div>
      </div>
      <div class="row justify-between room-info">
        <div>
          <div class="room-name">{{ roomAttr.name }}</div>
          <div>
            <q-icon size="20px" class="q-ma-xs" name="account_circle" />
            <span class="q-ma-xs">{{ userList.length }}</span>
            <span class="q-ma-xs">/</span>
            <span class="q-ma-xs">{{ roomAttr.limit }}</span>
          </div>
        </div>
      </div>
    </div>
    <q-splitter :value="6" class="panel-container" horizontal>
      <template v-slot:before>
        <q-tabs v-model="tab" narrow-indicator dense align="justify">
          <q-tab name="room" label="房间用户" />
          <q-tab name="award" label="奖项列表" />
          <q-tab name="mine" label="我的奖项" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          class="panel-list"
          v-model="tab"
          animated
          keep-alive
          transition-prev="fade"
          transition-next="fade"
        >
          <q-tab-panel name="room">
            <div class="flex row">
              <q-avatar class="q-ma-md" size="48px" v-for="user of userList" :key="user.username">
                <img :src="user.avatar" />
              </q-avatar>
            </div>
          </q-tab-panel>

          <q-tab-panel name="award">
            <q-card class="award-card" v-for="award of awardList" :key="award.id">
              <q-card-section class="flex row justify-between award-title">
                <div>
                  <span class="q-mr-sm">{{ award.name }}</span>
                  <q-badge text-color="black" color="yellow-6" :label="award.count"></q-badge>
                </div>
                <div>{{ award.finish ? '已开奖' : '待开奖' }}</div>
              </q-card-section>
              <q-card-section v-if="award.finish">
                <q-avatar class="q-ma-md" size="42px" v-for="user of getAwardResult(award.result)" :key="user.username">
                  <img :src="user.avatar" />
                </q-avatar>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="mine">
            <q-card v-for="award of awardList" :key="award.objectId" class="award-card">
              <q-card-section class="flex row justify-between award-title">
                <div>
                  <span class="q-mr-sm">{{ award.name }}</span>
                  <q-badge text-color="black" color="yellow-6" :label="award.count"></q-badge>
                </div>
                <div
                  class="absolute-right q-mr-md q-mt-md"
                  :class="[luckerIsMe(award) ? 'text-deep-orange-13' : 'text-grey-13']"
                >
                  {{ award.finish ? (luckerIsMe(award) ? '已中奖' : '未中奖') : '待开奖' }}
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="less">
.q-tab--inactive {
  color: #7e7e7e;
}
</style>

<style lang="less" scoped>
.room-header {
  flex-basis: 180px;
  font-size: 16px;
  font-weight: 400;
  .room-logo {
    font-size: 18px;
    color: #5a5a5a;
  }
  .room-info {
    font-size: 18px;
  }
  .room-name {
    font-size: 24px;
  }
}

.panel-container {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f5f5f5;
  flex: 1;
}
.panel-list {
  background-color: transparent;
}

.award-card {
  .award-title {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
  background: linear-gradient(135deg, #9820e0, #dc43f2);
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '~/entity/room.entity'
import { ConversationBase } from 'leancloud-realtime'

@Component({
  components: {}
})
export default class RoomPage extends Vue {
  @Prop()
  private token
  private room: RoomEntity | null = null
  private tab = 'room'
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
      .catch(msg => {
        this.$q.notify({
          message: msg,
          position: 'top'
        })
        return null
      })

    if (!this.room) return
    // 获取会话信息
    this.conversation = await this.room.getConversation()
    // 添加用户列表更新通知
    this.room.addUserListener().subscribe(members => this.getUserList())
    // 添加之间更新通知
    this.room.addMessageListener().subscribe(this.onLuckMessage)
    // 更新用户列表
    this.getUserList()
    this.getAwardList()
  }

  public get roomAttr() {
    if (this.room) {
      return this.room.attributes
    }

    return {}
  }

  private onLuckMessage(message) {
    if (!this.room) return
    const { type } = JSON.parse(message)
    if (type !== 'AWARD_RESULT') return
    this.room.getAwards().then(awardEntitys => {
      this.awardList = awardEntitys.map(v => v.object.toJSON())
    })
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

  /**
   * 获取用户列表
   */
  public async getAwardList() {
    if (this.room) {
      const list = await this.room.getAwards()
      this.awardList = list.map((x: any) => x.attributes)
    }
  }

  private getAwardResult(result: any[]) {
    if (!result) return []
    const userNames = result.map(v => v.id)
    return this.userList.filter(u => userNames.includes(u.username))
  }

  private luckerIsMe(award: any) {
    if (!award.result) return
    const userName = sessionStorage.getItem('username')
    return award.result.map(v => v.id).includes(userName)
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