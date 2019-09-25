import AV from 'leancloud-storage'
import md5 from 'crypto-js/md5'
import store from '~/store'
import { RoomInfo } from '~/models/room/room-info.model'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { Conversation, Event } from 'leancloud-realtime'
import { Entity } from '~/entity'
import { RoomEntity } from '~/entity/room.entity'
const Room = AV.Object.extend('room')

export class RoomService {
  /**
   * 创建房间
   * @param data
   */
  public async create(data: RoomInfo) {
    const room = new Room()
    const query = new AV.Query('room')

    // 生成房间号
    const code = await query
      .select(['code'])
      .descending('code')
      .first()
      .then(x => (x ? x.get('code') + 1 : 1))

    // 生成房间token
    const token = md5(code + data.password).toString()

    // 设置房间信息
    Object.entries(data).forEach(([key, value]) => {
      room.set(key, value)
    })

    room.set('code', code)
    room.set('token', token)
    room.set('enable', false)

    return room
      .save()
      .then(() => {
        store.commit('addRoom', token)
      })
      .then(() => code)
  }

  /**
   * 找回房间
   * @param param
   */
  public async restore({ code, password }) {
    const token = md5(code + password).toString()
    store.commit('addRoom', token)
  }

  /**
   * 获取房间
   * @param token
   */
  public async getRoom(token) {
    const query = new AV.Query('room')

    // 获取房间信息
    const room = (await query.equalTo('token', token).first()) as AV.Object

    return Entity.from(room, RoomEntity)
  }

  /**
   * 获取房间列表
   */
  public async getRoomList() {
    const query = new AV.Query('room')
    const tokens = store.state.rooms

    return query
      .containedIn('token', tokens)
      .addDescending('updatedAt')
      .find()
      .then(list => list.map(room => Entity.from(room, RoomEntity)))
  }
}
