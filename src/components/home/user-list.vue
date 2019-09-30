<template>
  <q-card>
    <q-avatar v-for="user in data" :key="user.objectId" class="q-ma-sm">
      <img :src="user.avatar" />
    </q-avatar>
  </q-card>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class UserList extends Vue {
  @Prop({ default: () => [] })
  private data!: any[]
}
</script>