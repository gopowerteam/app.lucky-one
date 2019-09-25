<template>
  <div
    class="shadow-1 q-ma-sm text-white"
    :class="[status ? 'gary-bg':'cbg-to-right cursor-pointer']"
    @click="startDrawClick"
  >
    <div class="row justify-between q-px-sm">
      <div class="text-h6">{{data.name}}</div>
      <div>{{data.count}}</div>
    </div>
    <div class="text-right q-pr-sm status">{{status ? '已开奖' :'待开奖'}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { AwardDetailModel } from '../../models/award/award-detail.model'
@Component({
  name: 'AwardStatus'
})
export default class AwardStatus extends Vue {
  @Prop()
  private data!: AwardDetailModel

  @Prop()
  private limit!: number

  private get status() {
    return this.data.count === this.data.userIds.length
  }

  private startDrawClick() {
    if (this.status) return
    this.$router.push({ name: 'draw', params: { awardId: this.data.awardId, limit: this.limit.toString() } })
  }
}
</script>

<style lang="less" scoped>
.gary-bg {
  background: linear-gradient(to left, grey, #bdbdbd);
}
</style>