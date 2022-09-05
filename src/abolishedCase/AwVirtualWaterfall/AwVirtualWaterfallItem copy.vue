<!-- <template>
  <div ref="selfEl" class="aw-virtual-waterfall__item">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useResizeListener } from '@/hooks/utils'
import { ref } from 'vue'
import * as Type from '../../components/AwVirtualWaterfall/type'

const emit = defineEmits<{
  (e: 'resize', item: Type.AwItemRect): void
}>()

const selfEl = ref<HTMLElement>()

useResizeListener(selfEl, () => {
  const rect = selfEl.value?.getBoundingClientRect()
  if (!rect) return
  emit('resize', {
    width: rect.width,
    height: rect.height
  })
})
</script>
<style lang="less" scoped>
.aw-virtual-waterfall__item {
  position: absolute;
  left: 0;
  top: 0;
}
</style> -->
