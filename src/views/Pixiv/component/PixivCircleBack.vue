<template>
  <div class="pixiv-circle__close">
    <Icon name="delete2" @click="$router.go(-1)" />
  </div>
</template>

<script lang="ts" setup>
// const emit = defineEmits<{}>()
const props = withDefaults(
  defineProps<{
    right?: string
    top?: string
  }>(),
  {
    right: '140px',
    top: '80px'
  }
)
</script>
<style lang="less" scoped>
.pixiv-circle__close {
  position: fixed;
  top: v-bind(top);
  right: v-bind(right);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: var(--font-color);
  color: var(--box-bg-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s;

  i {
    font-size: 40px;
  }

  &:hover {
    transform: rotate(360deg) scale(1.1);
  }
}
</style>
