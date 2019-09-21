import AV from 'leancloud-storage'
import { Realtime } from 'leancloud-realtime'

export default async function() {
  // leancloud-storage
  AV.init({
    appId: process.env.VUE_APP_LEANCLOUD_APPID as string,
    appKey: process.env.VUE_APP_LEANCLOUD_APPKEY as string
  })
  // leancloud-realtime
  globalThis['$realtime'] = new Realtime({
    appId: process.env.VUE_APP_LEANCLOUD_APPID as string,
    appKey: process.env.VUE_APP_LEANCLOUD_APPKEY as string
  })
}
