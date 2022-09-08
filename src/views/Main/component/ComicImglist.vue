<template>
  <div class="comic-imglist">
    <div class="arrow arrow-left" @click="prev">
      <Icon name="arrow" />
    </div>
    <div class="arrow arrow-right" @click="next">
      <Icon name="arrow" />
    </div>
    <div ref="$innerEl" class="comic-imglist__content">
      <div class="comic-imglist__content-inner">
        <BaseImg
          v-for="img in imgs"
          :key="img.id"
          :src="img.preurl"
          @click="imgPreview(img)"
        />
      </div>
    </div>
    <ImagePreview
      v-if="imgs.length > 0"
      v-model:visible="preview.visible"
      :list="imgUrls"
      :current="preview.current"
      @artwork="artwork"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUpdate, nextTick, ref, reactive, computed } from 'vue'
import * as Api from '@apis/index'
import { useResizeListener } from '@/hooks/utils'
import { debounce } from '@sorarain/utils'
import ImagePreview from '@/components/AwImagePreview/ImagePreview.vue'

const props = withDefaults(
  defineProps<{
    imgs: Api.ComicSearchItem[]
  }>(),
  {
    imgs: () => []
  }
)
const imgUrls = computed(() => props.imgs.map((item) => item.orgurl))

const imgElInfolist = ref<
  {
    el: HTMLImageElement
    width: number
  }[]
>([])
const $innerEl = ref<HTMLElement>()
const activeIndex = ref(0)
const preview = reactive({
  visible: false,
  current: imgUrls.value[0]
})

const styleInit = debounce(async () => {
  if (!$innerEl.value) return
  await nextTick()
  const innerHeight = $innerEl.value!.clientHeight
  imgElInfolist.value = [...$innerEl.value!.querySelectorAll('img')].map(
    (item, index) => ({
      el: item,
      width: +(
        (props.imgs[index].w / props.imgs[index].h) *
        innerHeight
      ).toFixed()
    })
  )
}, 300)
const prev = () => {
  if (activeIndex.value === 0) return
  activeIndex.value--
  scroll()
}
const next = () => {
  const { scrollWidth, scrollLeft, offsetWidth } = $innerEl.value!
  if (
    activeIndex.value === props.imgs.length - 2 ||
    scrollWidth <= scrollLeft + offsetWidth
  )
    return
  activeIndex.value++
  scroll()
}
const scroll = () => {
  $innerEl.value!.scrollLeft = imgElInfolist.value
    .slice(0, activeIndex.value)
    .reduce((totol, item) => totol + item.width + 20, 0)
}
const imgPreview = (e: Api.ComicSearchItem) => {
  preview.visible = true
  preview.current = e.orgurl
}
const artwork = async (img: string) => {
  // const imgOrg = props.imgs.find((item) => item.url === img)
  // if (!imgOrg) return
  // getComicImgmain({ id: imgOrg.id })
  // console.log(imgOrg)
}

onBeforeUpdate(styleInit)
useResizeListener($innerEl, styleInit)
</script>
<style lang="less" scoped>
// column-count: 4;
.comic-imglist {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-inner {
      display: flex;
      width: max-content;
      height: 100%;
      gap: 20px;
      img {
        height: 100%;
        cursor: pointer;
        transition: all 0.25s;
        &:hover {
          transform: scale(0.98);
        }
      }
    }
  }

  .arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: var(--font-color);
    border-radius: 50%;
    cursor: pointer;
    z-index: 6;
    color: var(--bg-color);
    opacity: 0.4;
    transition: all 0.25s;
    i {
      font-size: 22px;
    }
    &:hover {
      transform: translateY(-15%);
      opacity: 1;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.164);
    }
    &:active {
      opacity: 0.5;
    }
    &-left {
      left: 0;
      i {
        transform: rotate(180deg);
      }
    }
    &-right {
      right: 0;
    }
  }
}
</style>
