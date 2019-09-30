import AV, { Query } from 'leancloud-storage'
import md5 from 'crypto-js/md5'
import store from '~/store'
import { Entity } from '~/entity'
import { RoomEntity } from '~/entity/room.entity'
import { RoomInfoModel } from '~/models/room-info.model'
const Room = AV.Object.extend('room')

export class RoomService {
  private query = new AV.Query('room')

  /**
   * 创建房间
   * @param data
   */
  public async create(data: RoomInfoModel) {
    const room = new Room()

    // 生成房间号
    const code = await this.query
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
    // 获取房间信息
    const room = await this.query
      .equalTo('token', token)
      .include('awards')
      .first()
      
    if (room) {
      return Entity.from(room, RoomEntity)
    } else {
      throw new Error('token 异常')
    }
  }

  /**
   * 获取房间列表
   */
  public async getRoomList() {
    const tokens = store.state.rooms

    return this.query
      .containedIn('token', tokens)
      .addDescending('updatedAt')
      .find()
      .then(list => list.map(room => Entity.from(room, RoomEntity)))
  }
}
