<template>
  <div class="room-detail shadow-5 bg-img">
    <div class="flex justify-between items-center q-ma-md">
      <q-btn @click="cancel" icon="reply" />
      <div class="text-h5">{{roomInfo.name}}</div>
      <q-btn icon="share"></q-btn>
    </div>
    <div class="row justify-between q-ma-md">
      <div class="current-user text-blue-gary-10 q-ml-md">
        <q-icon name="emoji_people" size="1.5em" color="purple" />
        {{cNum}}/{{roomInfo.limit || "无限制"}}
      </div>
      <a class="cursor-pointer" @click="awardSetting">创建奖项</a>
    </div>

    <div class="detail-content q-ma-lg row">
      <q-card class="award-list">
        <award-status v-for="(item,index) of awardList" :key="index" v-bind="item"></award-status>
      </q-card>
      <q-card class="q-ml-md row user-icons">
        <q-avatar v-for="i in 30" :key="i" class="q-ma-sm">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { RoomInfo } from '~/models/room/room-info.model'
import { RoomService } from '~/services/room.service'
import { QAvatar } from 'quasar'
import AwardStatus from '~/components/award/award-status.vue'

@Component({
  name: 'RoomDetail',
  components: {
    QAvatar,
    AwardStatus
  }
})
export default class RoomDetail extends Vue {
  public roomService = new RoomService()
  private cNum = 0

  private awardList = [
    { name: '三等奖', count: 40, status: '已开奖' },
    { name: '二等奖', count: 10, status: '已开奖' },
    { name: '一等奖', count: 3, status: '已开奖' },
    { name: '特等奖', count: 1, status: '待开奖' }
  ]

  @Prop()
  private roomInfo: any

  @Emit()
  private cancel() {}
  private awardSetting() {}
}
</script>

<style lang="less" scoped>
.current-user {
  font-size: 0.9em;
}
.award-list {
  flex-basis: 180px;
}
.user-icons {
  flex: 1;
}
</style>"