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
import { UserService } from '../../services/user.service'

@Component({
  components: {}
})
export default class LoginPage extends Vue {
  private userService = new UserService()
  private redirect
  private mounted() {
    this.redirect = this.$route.params.redirect
  }
  private onLogin() {
    const userName = `test:${Math.random()
      .toString(36)
      .substr(2)}`
    this.userService
      .login({
        username: userName
      })
      .then(() => {
        this.$router.push(this.redirect)
        sessionStorage.setItem('username', userName)
      })
      .catch(() => {
        this.$q.notify('用户名已存在')
      })
  }
}
</script>

<style lang="less" scoped>
</style>