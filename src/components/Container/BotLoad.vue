<template>
  <div class="botload">
    <slot></slot>
    <slot name="contain" :data="currentList"></slot>
    <p v-if="!hasMore" class="botload__over">-- 没有更多了嗷 --</p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref
} from 'vue'
import { throttle } from '@sorarain/utils'
export default defineComponent({
  name: 'BotLoad',
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    target: {
      type: String,
      default: '.botload'
    },
    perpage: {
      type: Number,
      default: 2
    },
    offsetY: {
      type: Number,
      default: 10
    },
    isbind: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const hasMore = ref(true)
    const tpage = ref(1)

    const currentList = computed(() => {
      if (props.data.length <= props.perpage) {
        return props.data
      } else {
        return props.data.slice(0, props.perpage * tpage.value)
      }
    })

    const loadMore = () => {
      if (tpage.value <= props.data.length / props.perpage) {
        tpage.value++
      } else {
        // $toast("已经没有了嗷~");
        hasMore.value = false
      }
    }
    const mainScroll = ({ target }: Event) => {
      if (!hasMore.value || !props.isbind) return
      throttle(() => {
        const { scrollTop, offsetHeight, scrollHeight } = target as HTMLElement
        if (props.offsetY >= scrollHeight - scrollTop - offsetHeight) {
          loadMore()
        }
      }, 100)()
    }
    const addEvent = () => {
      if (!props.target) return
      const dom: HTMLElement | null = document.querySelector(props.target)
      if (dom === null) return
      dom.addEventListener('scroll', mainScroll)
    }
    const removeEvent = () => {
      const dom: HTMLElement | null = document.querySelector(props.target)
      if (dom === null) return
      dom.removeEventListener('scroll', mainScroll)
    }
    const reset = () => {
      tpage.value = 1
    }

    onMounted(addEvent)
    onBeforeUnmount(removeEvent)

    return {
      currentList,
      hasMore,
      reset,
      tpage
    }
  }
})
</script>

<style lang="less" scoped>
.botload {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  & > :last-child {
    margin-bottom: 80px;
  }
  &__load,
  &__over {
    text-align: center;
    margin: 16px 0;
    font-size: 12px;
    color: #999;
  }
}
</style>
