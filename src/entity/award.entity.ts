import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { RoomService } from '@/services/room.service'
import { AwardService } from '@/services/award.service'

export class AwardEntity extends Entity {
  public setResult(count, exclude?) {
    const awardService = new AwardService()
    return awardService.setResult(this.object, count, exclude)
  }
}
