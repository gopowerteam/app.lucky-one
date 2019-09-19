<template>
  <q-page class="flex flex-center home-page">
    <div class="home-container">
      <div class="create-room">
        <q-btn>创建房间</q-btn>
      </div>
      <div class="rooms">
        <room-card></room-card>
        <room-card roomName="房间2"></room-card>
        <room-card roomName="房间3"></room-card>
        <room-card roomName="房间4"></room-card>
        <room-card roomName="房间5"></room-card>
      </div>
      <div class="nav-buttoms">
        <q-btn>←</q-btn>
        <q-btn>→</q-btn>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import RoomCard from '@/components/home/room-card.vue';

@Component({
  name: 'PageHome',
  components: {
    RoomCard,
  },
})
export default class HomePage extends Vue {

}
</script>

<style lang="less" scoped>
.home-page {
  .home-container {
    width: 70%;
    height: 500px;
    box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .create-room,
  .nav-buttoms {
    text-align: right;
    margin: 30px;
  }
  .rooms {
    padding-left: 100px;
    white-space: nowrap;
    overflow: hidden;
    .room-card {
      margin: 15px 50px 15px 0;
      display: inline-block;
    }
  }
}
</style>