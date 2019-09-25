import { AwardInfoModel } from './award-info.model'

/**
 * 奖项详情
 */
export class AwardDetailModel extends AwardInfoModel {
  /**
   * 奖项id
   */
  public awardId = ''

  /**
   * 获奖名单
   */
  public userIds: Array<string> = []
}
