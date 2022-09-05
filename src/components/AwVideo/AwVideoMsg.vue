<template>
  <div class="aw-video__msg">
    <div class="notifys">
      <transition-group
        enter-active-class="fade-in"
        leave-active-class="fade-out"
      >
        <div
          v-for="(item, index) in notifys"
          :key="item.key"
          class="notifys-item"
          :style="{ bottom: `${(notifys.length - index) * 44}px` }"
        >
          {{ item.content }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export interface NotifyItem {
  content: string
  duration: number
}
export interface NotifyReturns {
  remove: () => void
}
export type Notify = (item: NotifyItem) => NotifyReturns

export default defineComponent({
  name: 'AwVideoMsg',
  setup() {
    const notifys = ref<(NotifyItem & { key: number })[]>([])

    /**
     * 移除信息
     * @param key
     */
    const removeNotify = (key: number) => {
      const index = notifys.value.findIndex((item) => item.key === key)
      !!~index && notifys.value.splice(index, 1)
    }
    const clearNotify = () => {
      notifys.value.splice(0)
    }
    /**
     * 发送信息
     * @param notifyItem
     */
    const notify: Notify = (notifyItem: NotifyItem) => {
      const key = Math.random()
      notifys.value.unshift({
        ...notifyItem,
        key
      })
      if (notifyItem.duration !== 0) {
        setTimeout(() => {
          removeNotify(key)
        }, notifyItem.duration)
      }
      return {
        remove() {
          removeNotify(key)
        }
      }
    }
    return {
      notify,
      removeNotify,
      clearNotify,
      notifys
    }
  }
})
</script>
<style lang="less" scoped>
.aw-video__msg {
  position: absolute;
  left: 40px;
  bottom: 60px;
  z-index: 36;
  .notifys {
    position: absolute;
    left: 0;
    bottom: 0;
    &-item {
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      display: flex;
      align-items: center;
      width: max-content;
      height: 34px;
      padding: 0 8px;
      border-radius: 8px;
      background: rgb(0 0 0 / 80%);
      font-size: 14px;
      line-height: 14px;
      transition: all 0.25s;
    }
  }
  .fade-in {
    animation: fade 0.25s forwards reverse;
  }
  .fade-out {
    animation: fade 0.25s forwards;
  }
  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
