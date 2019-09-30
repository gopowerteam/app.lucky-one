<template>
  <q-card class="room-qrcode q-pa-xl">
    <canvas id="my-room"></canvas>
    <div>打开扫一扫直接登录</div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import QRCode from 'qrcode'
@Component({
  name: 'room-qrcode',
  components: {}
})
export default class RoomQrcode extends Vue {
  @Prop({ required: true })
  private token

  @Watch('token', { immediate: true })
  private onTokenChange(val) {
    if (!val) return
    let url = `/#/visitor/room/${this.token}`
    url = window.location.host + url
    this.$nextTick(() => {
      const el = document.querySelector('#my-room')
      QRCode.toCanvas(el, url)
    })
  }
}
</script>
