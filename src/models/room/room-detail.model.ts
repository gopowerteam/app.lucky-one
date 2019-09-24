import { RoomInfoModel } from './room-info.model'

/**
 * 房间详情
 */
export class RoomDetailModel extends RoomInfoModel {
  /**
   * 房间是否启用
   */
  public enable = false

  /**
   * 房间会话ID
   */
  public conversation = ''

  /**
   * 房间唯一编号
   */
  public token = ''
}
