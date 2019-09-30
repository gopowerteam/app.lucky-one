import AV from 'leancloud-storage'
import { Realtime } from 'leancloud-realtime'

const appId = 'PsheKGj7iDalocuWVreooVFw-gzGzoHsz'
const appKey = 'NR9giTdN1QNRw8Wp2L7Ffeq7'

export default async function() {
  // leancloud-storage
  AV.init({
    appId,
    appKey
  })
  // leancloud-realtime
  globalThis['$realtime'] = new Realtime({
    appId,
    appKey
  })
}
