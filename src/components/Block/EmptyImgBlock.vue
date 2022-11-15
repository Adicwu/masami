<template>
  <div class="empty-img-block">
    <div class="empty-img-block__inner">
      <slot />
    </div>
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyImgBlock',
  props: {
    content: {
      type: String,
      default: '什么都没有'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  }
})
</script>
<style lang="less" scoped>
.empty-img-block {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(width);
  height: v-bind(height);
  text-align: center;
  &::after {
    .mask;
  }
  &__inner {
    width: 300px;
    overflow: hidden;
    display: inline-block;
  }

  p {
    color: var(--font-color);
    padding-top: 24px;
    font-size: 16px;
    letter-spacing: 14px;
  }
}
</style>
