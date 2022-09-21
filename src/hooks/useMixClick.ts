import { useEventListener } from '@sorarain/use'
import { reactive, Ref } from 'vue'

export default function (
  target: HTMLElement | Ref<HTMLElement | undefined>,
  op: {
    click?: () => void
    dblclick?: () => void
    delay?: number
  } = {}
) {
  const clickState = reactive({
    now: 0,
    timer: null as NodeJS.Timeout | null,
    delay: op.delay || 300
  })

  const onClick = () => {
    const now = Date.now()
    if (clickState.timer) {
      clearTimeout(clickState.timer)
      clickState.timer = null
    }
    if (!clickState.now) {
      clickState.now = now
    } else if (now - clickState.now < clickState.delay) {
      op.dblclick && op.dblclick()
      clickState.now = 0
      return
    }
    clickState.timer = setTimeout(() => {
      op.click && op.click()
      clickState.now = 0
      clickState.timer = null
    }, clickState.delay)
  }

  useEventListener('click', onClick, {
    target
  })
}
