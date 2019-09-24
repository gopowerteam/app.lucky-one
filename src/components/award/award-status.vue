<template>
  <div class="shadow-1 q-ma-sm text-white" :class="[status === '已开奖' ? 'gary-bg':'cbg-to-right']">
    <div class="row justify-between q-px-sm">
      <div class="text-h6">{{name}}</div>
      <div>{{count}}</div>
    </div>
    <div class="text-right q-pr-sm status">{{status}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'AwardStatus'
})
export default class AwardStatus extends Vue {
  @Prop()
  private name!: string

  @Prop()
  private count!: number

  @Prop()
  private status!: string
}
</script>

<style lang="less" scoped>
.gary-bg {
  background: linear-gradient(to left, grey, #bdbdbd);
}
</style>