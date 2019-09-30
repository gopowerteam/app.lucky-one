<template>
  <q-page class="login-page flex row justify-center items-center">
    <q-card class="q-ma-md user-container">
      <q-card-section class="text-center">
        <q-avatar size="5rem">
          <img :src="user.avatar" />
        </q-avatar>
        <q-input
          input-class="text-center"
          class="q-ma-md text-center"
          :dense="true"
          rounded
          outlined
          v-model="user.username"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn ripple flat @click="onLogin">登录</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { RoomEntity } from '../../entity/room.entity'
import { UserService } from '../../services/user.service'
import faker from 'faker'

@Component({
  components: {}
})
export default class LoginPage extends Vue {
  private userService = new UserService()
  private redirect

  private user = {
    avatar: '',
    username: ''
  }

  private mounted() {
    this.redirect = this.$route.params.redirect
    faker.locale = 'zh_CN'
    this.user.avatar = faker.image.avatar()
    this.user.username = faker.name.firstName() + faker.name.lastName()
  }

  private onLogin() {
    this.userService
      .login(this.user)
      .then(() => {
        this.$router.push(this.redirect)
      })
      .catch(() => {
        this.$q.notify('用户名已存在')
      })
  }
}
</script>

<style lang="less" scoped>
.user-container {
  width: 80%;
}
</style>