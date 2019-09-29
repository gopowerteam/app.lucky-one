import { AwardInfoModel } from './award-info.model'
import { RoomDetailModel } from '../room/room-detail.model'

export class AwardDetailModel extends AwardInfoModel {
  /**
   * 中奖者名单
   */
  public result: Array<string> = []

  /**
   * 奖项房间
   */
  public room = new RoomDetailModel()
}
