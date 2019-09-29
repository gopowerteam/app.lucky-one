<template>
  <div
    class="shadow-1 q-ma-sm text-white"
    :class="[model.finish ? 'gary-bg':'cbg-to-right cursor-pointer']"
    @click="startDrawClick"
  >
    <div class="row justify-between q-px-sm">
      <div class="text-h6">{{model.name}}</div>
      <div>{{model.count}}</div>
    </div>
    <div class="text-right q-pr-sm status">{{model.finish ? '已开奖' :'待开奖'}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'AwardStatus'
})
export default class AwardStatus extends Vue {
  @Prop()
  private model!: any

  private startDrawClick() {
    if (this.model.finish) return
    this.$router.push({ name: 'draw', params: { awardId: this.model.objectId } })
  }
}
</script>

<style lang="less" scoped>
.gary-bg {
  background: linear-gradient(to left, grey, #bdbdbd);
}
</style>