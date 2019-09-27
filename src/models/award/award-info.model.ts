export class AwardInfoModel {
  /**
   * 奖项名称
   */
  public name = ''

  /**
   *
   */
  public count = 0

  /**
   * 说明
   */
  public description = ''

  /**
   * 房间Token
   */
  public token = ''

  /**
   * 中奖者名单
   */
  public userIds: Array<string> = []
}
