import AV from 'leancloud-storage'
import md5 from 'crypto-js/md5'
import store from '~/store'
import { RoomInfo } from '~/models/room/room-info.model'
const Room = AV.Object.extend('room')

export class RoomService {
  /**
   * 创建房间
   * @param data
   */
  public async create(data: RoomInfo) {
    const room = new Room()
    const query = new AV.Query('room')

    const code = await query
      .select(['code'])
      .descending('code')
      .first()
      .then(x => (x ? parseInt(x.get('code'), 10) + 1 : 1))
    // .then(x => x.toString())

    const token = md5(code + data.password).toString()

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
   * 启用房间
   */
  public async enable(token) {
    const room = new Room()
    const query = new AV.Query('room')

    const target = await query
      .equalTo('token', token)
      .first()



    if (target) {
      room.set('enable', true)
      room.save()
    }
  }

  /**
   * 获取房间列表
   */
  public async query() {
    const query = new AV.Query('room')
    const tokens = store.state.rooms

    return query
      .containedIn('token', tokens)
      .addDescending('updatedAt')
      .find()
      .then(list => list.map(item => item.toJSON()))
  }

  /**
   * 找回房间
   * @param param
   */
  public async restore({ code, password }) {
    const token = md5(code + password).toString()
    store.commit('addRoom', token)
  }
}
