import { getPlayProgressInstance } from '@/class/playProgress.class'
import { getPlayHistoryInstance } from '@/class/playHistory.class'

export function usePlayCache() {
  return {
    playProgressCache: getPlayProgressInstance(),
    playHistoryCache: getPlayHistoryInstance()
  }
}
