<template>
  <q-page class="login-page">
    <q-btn class="full-width q-ma-md" @click="onLogin" label="登录"></q-btn>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '../../entity/room.entity'

@Component({
  components: {}
})
export default class LoginPage extends Vue {
  private onLogin() {
    this.$store.commit(
      'setVisitorName',
      'test:' +
        Math.random()
          .toString(36)
          .substr(2)
    )
    this.$router.push({ path: '/visitor/room/ea4452cf225d49b61660634470e4b9ce' })
  }
}
</script>

<style lang="less" scoped>
</style>