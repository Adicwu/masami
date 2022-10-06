<template>
  <img v-if="!loaded" ref="fakeImgEl" :src="BASE_IMG" alt="" />
  <img v-else :src="src" alt="" />
</template>

<script lang="ts">
import { BASE_IMG } from '@/common/static'
import { useDomObserver } from '@/hooks/utils'
import { loadImg } from '@/utils/media'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BaseImg',
  props: {
    src: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const fakeImgEl = ref<HTMLImageElement>()
    const loaded = ref(false)

    const load = async () => {
      if (!props.src) return
      await loadImg(props.src)
      loaded.value = true
    }

    if (props.lazy) {
      useDomObserver(fakeImgEl, load)
    } else {
      load()
    }

    return {
      loaded,
      BASE_IMG,
      fakeImgEl
    }
  }
})
</script>
<style lang="less" scoped>
img {
  object-fit: cover;
}
</style>
