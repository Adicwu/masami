<template>
  <div
    class="invert-switch"
    @click="
      () => {
        emit('update:modelValue', !modelValue)
        emit('change', modelValue)
      }
    "
  >
    <span class="invert-switch__check">
      <slot name="icon" :active="modelValue" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'change', v: boolean): void
}>()
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    activeColor?: string
    inactiveColor?: string
    size?: string
  }>(),
  {
    modelValue: false,
    activeColor: '#fff',
    inactiveColor: '#000',
    size: '24px'
  }
)
const styleBind = computed(() => {
  const { modelValue, activeColor, inactiveColor } = props
  return {
    bg: !modelValue ? activeColor : inactiveColor,
    checkBg: modelValue ? activeColor : inactiveColor,
    checkTransform: `translateX(${modelValue ? 100 : 0}%)`
  }
})
</script>
<style lang="less" scoped>
.invert-switch {
  position: relative;
  aspect-ratio: 2/1;
  height: v-bind(size);
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.25s;
  background: v-bind('styleBind.bg');

  &::before {
    .mask;
    top: -1px;
    left: -1px;
    border: 1px solid v-bind('styleBind.checkBg');
    opacity: 0.4;
    transition: all 0.25s;
    border-radius: 15px;
  }

  &__check {
    position: absolute;
    left: 0;
    top: 0;
    width: v-bind(size);
    height: 100%;
    background: v-bind('styleBind.checkBg');
    transform: v-bind('styleBind.checkTransform');
    border-radius: 50%;
    transition: all 0.25s;
    display: flex;
    justify-content: center;
    align-items: center;

    :slotted(i) {
      color: v-bind('styleBind.bg');
      font-size: 14px;
    }
  }
}
</style>
