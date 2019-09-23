<template>
  <q-card class="room-modify shadow-5 bg-img">
    <div class="flex justify-between items-center q-ma-md ">
      <q-btn @click="cancel">
        <q-icon name="img:/icons/back.svg" />
      </q-btn>
      <div class="text-h5">创建房间</div>
      <q-btn outline class="confirm-button" type="submit" @click="submit">确定</q-btn>
    </div>
    <q-form class="q-ma-md" ref="form">
      <q-input filled label="房间名称" v-model="model.name" :rules="rules.name"></q-input>
      <q-input filled label="人数上限" v-model.number="model.limit" :rules="rules.limit" :min="0" type="number"></q-input>
      <q-input filled label="房间密码" v-model="model.password" :type="isPwd ? 'password' : 'text'" :rules="rules.password">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-toggle label="允许重复抽奖" v-model="model.repeat" />
      <q-input filled label="房间说明" v-model="model.description" type="textarea"></q-input>
    </q-form>

  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { RoomInfo } from '~/models/room/room-info.model'
import { RoomService } from '~/services/room.service'
import { QForm, colors } from 'quasar'

@Component({
  name: 'RoomModify',
  components: {
    QForm
  }
})
export default class RoomModify extends Vue {


  public roomService = new RoomService()

  private isPwd = true
  private rules = {
    name: [(value) => !!value || '请输入房间名称'],
    limit: [
      (value) => value !== '' || '请输入房间人数上限,0为无上限',
      (value) => value > -1 || '房间至少需要一个人参与',
    ],
    password: [(value) => !!value || '请输入密码,以防止其他人修改房间属性']
  }

  private model = new RoomInfo()

  @Emit()
  private cancel() {
    const form = this.$refs.form as QForm
    this.model = new RoomInfo()
    form.reset()
  }
  @Emit()
  private success() {
    this.$q.notify({ color: 'teal', message: '创建房间成功', icon: 'tag_faces', position: 'top' })
    this.cancel()
  }
  private async submit() {
    const form = this.$refs.form as QForm
    const result = await form.validate()
    if (!result) return
    this.roomService.create(this.model).then(this.success)
  }

}
</script>

<style lang="less" scoped>
.room-modify {
  .confirm-button {
    &:hover {
      color: purple !important;
      border-color: purple;
      background-color: white !important;
    }
  }
}
</style>