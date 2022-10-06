<template>
  <ul class="context-menu" :style="selfStyle">
    <li
      v-for="op in options"
      :key="op.text"
      @click="
        (e) => {
          op.event?.(e)
          close()
        }
      "
    >
      <Icon v-if="op.icon" :name="op.icon" />
      {{ op.text }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useEventListener } from '@sorarain/use'
import { computed, CSSProperties, reactive, ref } from 'vue'
import * as Type from './type'
import Icon from '@/components/Global/Icon.vue'

const options = ref<Type.Option[]>([])
const rect = reactive({
  x: 0,
  y: 0,
  opacity: 0
})
const selfStyle = computed<CSSProperties>(() => ({
  transform: `translate(${rect.x}px,${rect.y}px)`,
  opacity: rect.opacity,
  zIndex: rect.opacity ? 9999 : -1
}))

const init = (pay: Type.InitPay) => {
  options.value = pay.options
  open(pay)
}
const open = (pay: Type.Rect) => {
  rect.x = pay.x
  rect.y = pay.y
  rect.opacity = 1
}
const close = () => {
  rect.opacity = 0
  // rect.x = 0
  // rect.y = 0
}

useEventListener('mousewheel', close)
useEventListener('mouseup', (e) => {
  if ((e as MouseEvent).button === 2) {
    close()
  }
})
useEventListener('click', close, {
  target: document.getElementById('app')!
})

defineExpose({
  init
})
</script>
<style lang="less" scoped>
.context-menu {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  li {
    @gap: 8px;
    .font-format(28px);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    margin: 4px;
    border-radius: 2px;
    transition: all 0.25s;
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      padding-right: @gap;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
