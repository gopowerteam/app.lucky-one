<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="@/assets/images/logo.png" />
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RoomService } from '../../services/room.service'

@Component
export default class HomePage extends Vue {
  public roomService = new RoomService()

  public mounted(){
    // 添加房间
    // this.roomService.create({
    //   name:'test01',
    //   password:'123123',
    //   description:'',
    //   limit:4,
    //   repeat:false
    // }).then(code=>{
    //   //code 房间号已经存入store
    //   console.log(code)
    // })

    // 查询房间
    // this.roomService.query().then(rooms=>console.log(rooms))

  }
}
</script>