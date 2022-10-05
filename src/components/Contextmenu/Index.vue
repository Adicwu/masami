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
      {{ op.text }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useEventListener } from '@sorarain/use'
import { computed, CSSProperties, reactive, ref } from 'vue'
import * as Type from './type'

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
  background: var(--bg-color);
  color: var(--font-color);
  border-radius: 8px;
  font-size: 14px;
  li {
    cursor: pointer;
    padding: 0 12px;
    .font-format(36px);
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
