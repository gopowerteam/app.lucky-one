<template>
  <q-card class="award-modify shadow-5 bg-img">
    <div class="flex justify-between items-center q-ma-md">
      <q-btn @click="cancel" icon="reply" />
      <div class="text-h5">创建奖项</div>
      <q-btn outline class="confirm-button" type="submit" @click="submit">确定</q-btn>
    </div>
    <q-form class="q-ma-md" ref="form">
      <q-input filled label="奖项名称" v-model="model.name" :rules="rules.name"></q-input>
      <q-input
        filled
        label="奖项数量"
        v-model.number="model.count"
        :rules="rules.count"
        :min="0"
        type="number"
      ></q-input>
      <q-input filled label="奖项说明" v-model="model.description" type="textarea"></q-input>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { RoomService } from '~/services/room.service'
import { QForm, colors } from 'quasar'
import { AwardInfoModel } from '~/models/award/award-info.model'
import { AwardService } from '~/services/award.service'

@Component({
  name: 'AwardModify',
  components: {
    QForm
  }
})
export default class AwardModify extends Vue {
  private awardService = new AwardService()

  @Prop()
  private token!: string

  private rules = {
    name: [value => !!value || '请输入奖项名称'],
    count: [value => !!value || '请输入奖项数量']
  }

  private model = new AwardInfoModel()

  @Emit()
  private cancel() {
    const form = this.$refs.form as QForm
    this.model = new AwardInfoModel()
    form.reset()
  }
  @Emit()
  private success() {
    this.$q.notify({ color: 'teal', message: '奖项创建成功', icon: 'tag_faces', position: 'top' })
    this.cancel()
  }
  private async submit() {
    const form = this.$refs.form as QForm
    const result = await form.validate()
    if (!result) return
    this.model.token = this.token
    // this.awardService
    //   .create(this.model)
    //   .then(this.success)
    //   .catch(r => this.$q.notify({ message: r }))
  }
}
</script>