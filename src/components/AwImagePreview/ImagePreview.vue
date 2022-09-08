<template>
  <transition
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  >
    <div v-show="realVisible" class="imgplayer" @mousewheel="onMousewheel">
      <template v-if="imgIndex != null">
        <p class="img-name">
          {{ currentImg.split('/')[1] }}
          <b>{{ imgIndex + 1 }}/{{ imgLength }}</b>
        </p>
        <div
          class="imgplayer-img"
          :style="imgContainerStyle"
          @mousedown.prevent="startMove"
          @mousemove.prevent="inMove"
          @mouseup.prevent="endMove"
          @mouseout="self.isDown = false"
        >
          <img :src="currentImg" />
        </div>
      </template>

      <div v-show="imgStatus === 0" class="imgplayer-loading">
        <LoadingBlockRun />
      </div>

      <Icon
        class="imgplayer-change imgplayer-change-left"
        name="arrow"
        @click="prevImg"
      />
      <Icon
        class="imgplayer-change imgplayer-change-right"
        name="arrow"
        @click="nextImg"
      />
      <Icon class="imgplayer-close" name="delete2" @click="close" />
      <div class="imgplayer-tool">
        <Icon name="narrow" title="缩小" @click="narrow" />
        <Icon name="enlarge" title="放大" @click="enlarge" />
        <Icon name="details" title="详情" />
        <Icon name="screen-restore" title="还原" @click="resetImg" />
        <Icon name="artwork" title="查看原图" @click="artwork" />
        <Icon
          name="rotate_b"
          style="transform: rotateY(180deg)"
          title="逆时针旋转"
          @click="rotateClockwise"
        />

        <Icon name="rotate_b" title="顺时针旋转" @click="rotateAnClockwise" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  CSSProperties,
  defineComponent,
  PropType,
  reactive,
  Ref,
  ref,
  toRefs,
  watch
} from 'vue'

import { throttle } from '@sorarain/utils'
import { getImgStatus } from '@/utils/dom'
import { ImgIndex, Self, ModeArgs, Options, ImagePreviewProps } from './type'

import { ElMessage } from 'element-plus'
import Icon from '@/components/Global/Icon.vue'
import LoadingBlockRun from '@comps/Loading/LoadingBlockRun.vue'
export * from './type'

// 鼠标滚轮事件
function mousewheeModule(enlarge: () => void, narrow: () => void) {
  const onMousewheel = throttle((e: WheelEvent) => {
    const isDown = e.deltaY > 0
    isDown ? narrow() : enlarge()
  }, 100)
  return {
    onMousewheel
  }
}
// 操作
function handleModule(
  props: ImagePreviewProps,
  imgIndex: ImgIndex,
  imgLength: ComputedRef<number>
) {
  const self: Self = reactive({
    scale: 1,
    rotate: 0,
    startX: 0,
    startY: 0,
    finalX: 0,
    finalY: 0,
    oldX: 0,
    oldY: 0,
    isDown: false,
    mode: 'horizontal'
  })
  const imgContainerStyle = computed<CSSProperties>(() => ({
    transform: 'scale(' + self.scale + ') rotate(' + self.rotate + 'deg)',
    left: self.finalX + 'px',
    top: self.finalY + 'px'
  }))
  // const imgStyle = computed<CSSProperties>(() =>
  //   self.mode === 'horizontal'
  //     ? {
  //         width: '100%'
  //       }
  //     : {
  //         height: '100%'
  //       }
  // )

  const enlarge = () => {
    if (self.scale <= 3) {
      self.scale += 0.2
    }
  }
  const narrow = () => {
    if (self.scale <= 0.4) return
    self.scale -= 0.2
  }
  const rotateClockwise = () => {
    self.rotate -= 90
  }
  const rotateAnClockwise = () => {
    self.rotate += 90
  }
  const resetImg = () => {
    self.rotate = 0
    self.scale = 1
    self.finalX = 0
    self.finalY = 0
  }
  const loadImg = (src: string) =>
    new Promise((resolve) => {
      const image = new Image()
      image.src = src
      image.onload = () => {
        self.mode = image.width > image.height ? 'horizontal' : 'portrait'
        resolve(1)
      }
    })
  const nextImg = async () => {
    resetImg()
    let index = -1
    if (imgIndex.value == imgLength.value - 1) {
      index = 0
    } else {
      index = imgIndex.value + 1
    }
    // await loadImg(props.list[index])
    imgIndex.value = index
  }
  const prevImg = () => {
    resetImg()
    if (imgIndex.value == 0) {
      imgIndex.value = imgLength.value - 1
    } else {
      imgIndex.value--
    }
  }
  const startMove = (event: MouseEvent) => {
    self.isDown = true
    self.startX = event.clientX
    self.startY = event.clientY
  }
  const inMove = (event: MouseEvent) => {
    if (self.isDown) {
      const offsetLeft: number = self.oldX + event.clientX - self.startX
      const offsetTop: number = self.oldY + event.clientY - self.startY
      self.finalX = offsetLeft
      self.finalY = offsetTop
    }
  }
  const endMove = () => {
    self.isDown = false
    self.oldX = self.finalX
    self.oldY = self.finalY
    self.startY = 0
    self.startX = 0
  }
  return {
    enlarge,
    narrow,
    rotateClockwise,
    rotateAnClockwise,
    nextImg,
    prevImg,
    resetImg,
    startMove,
    inMove,
    endMove,
    self,
    imgContainerStyle
  }
}
// 图片加载器
function imgLoader(currentImg: ComputedRef<string>) {
  // 0加载中 1加载完成 2加载失败
  const imgStatus = ref(0)
  const onImgChanged = async (img: string) => {
    if (img === '' || typeof img !== 'string') {
      imgStatus.value = 1
      return
    }
    imgStatus.value = 0
    try {
      await getImgStatus(img)
      imgStatus.value = 1
    } catch {
      imgStatus.value = 2
      ElMessage.error('图片加载错误~')
    }
  }
  watch(currentImg, onImgChanged, {
    immediate: true
  })
  return {
    imgStatus
  }
}

// 组件模式：组件 函数式
function compoentMode(
  props: ImagePreviewProps,
  emit: any,
  imgIndex: ImgIndex
): ModeArgs {
  const { current } = toRefs(props)

  const currentImg = computed(() => props.list[imgIndex.value])
  const imgLength = computed(() => props.list.length)

  const open = () => {
    emit('update:visible', true)
  }
  const close = () => {
    emit('close')
    emit('update:visible', false)
  }

  watch(current, (current: string) => {
    const index: number = props.list.findIndex((item) => item == current)
    imgIndex.value = index
    // self.scale = 1;
    // self.rotate = 0;
  })

  return {
    currentImg,
    imgLength,
    open,
    close
  }
}
function functionnalMode(
  emit: any,
  imgIndex: ImgIndex,
  visible: Ref<boolean>
): ModeArgs {
  const list = ref<string[]>([])

  const currentImg = computed(() => {
    const imgPath = list.value[imgIndex.value]
    return typeof imgPath !== 'string' ? '' : list.value[imgIndex.value]
  })
  const imgLength = computed(() => list.value.length)

  const open = () => {
    visible.value = true
  }
  const close = () => {
    emit('close')
    visible.value = false
  }
  const init = ({ images, current }: Options) => {
    list.value = images
    imgIndex.value = images.indexOf(current)
    open()
  }

  return {
    currentImg,
    imgLength,
    open,
    close,
    init
  }
}
function modeModule(
  props: ImagePreviewProps,
  emit: any,
  isCompoentMode: boolean,
  imgIndex: ImgIndex,
  visible: Ref<boolean>
) {
  const { ...modeArgs } = isCompoentMode
    ? compoentMode(props, emit, imgIndex)
    : functionnalMode(emit, imgIndex, visible)
  return {
    ...modeArgs
  }
}
export default defineComponent({
  name: 'ImagePreview',
  components: {
    Icon,
    LoadingBlockRun
  },
  props: {
    current: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array as PropType<Options['images']>,
      default: () => []
    }
  },
  emits: ['close', 'update:visible', 'details', 'artwork'],
  setup(props, { emit }) {
    const isCompoentMode = props.list.length > 0 && props.current !== ''

    const imgIndex = ref(0)
    const visible = ref(false)
    const realVisible = computed(() =>
      isCompoentMode ? props.visible : visible.value
    )

    const { imgLength, currentImg, ...modeModuleArgs } = modeModule(
      props,
      emit,
      isCompoentMode,
      imgIndex,
      visible
    )
    const { enlarge, narrow, self, ...handleModuleArgs } = handleModule(
      props,
      imgIndex,
      imgLength
    )

    const artwork = () => {
      emit('artwork', props.current)
    }
    const details = () => {
      emit('details')
    }

    return {
      self,
      currentImg,
      imgIndex,
      imgLength,
      realVisible,
      enlarge,
      narrow,
      artwork,
      details,
      ...modeModuleArgs,
      ...handleModuleArgs,
      ...imgLoader(currentImg),
      ...mousewheeModule(enlarge, narrow)
    }
  }
})
</script>

<style lang="less" scoped>
.imgplayer {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px 60px;
  width: 100vw;
  height: 100vh;
  z-index: 2022;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  animation-duration: 0.25s;
  user-select: none;
  &-img {
    position: relative;
    transition: transform 0.25s;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1/1;
    img {
      position: relative;
      height: 100%;
      &:active {
        cursor: grab;
      }
    }
  }
  &-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(0 0 0 / 0.4);
    user-select: none;
    i {
      font-size: 40px;
    }
    span {
      color: rgb(255 255 255 / 0.8);
      margin-top: 8px;
    }
  }
  .img-name {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    padding: 4px 12px;
    background: #fff;
    border-left: 4px solid var(--marked-color);
    user-select: none;
    border-radius: 4px;
    b {
      font-size: 16px;
      color: #333;
    }
  }
  .imgplayer-close {
    position: absolute;
    right: 50px;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    font-size: 44px;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 50%;
    background: #fff;
    color: #333;
    overflow: hidden;
    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
      transform: scale(0.9);
    }
  }
  .imgplayer-change {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    font-size: 24px;
    background-color: #fff;
    color: #333;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.25s;
    font-weight: 800;
    transform: translateY(-50%);
    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }
  }
  .imgplayer-change-left {
    left: 50px;
    &::before {
      transform: rotate(180deg);
    }
  }
  .imgplayer-change-right {
    right: 50px;
  }
  .imgplayer-tool {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 280px;
    height: 44px;
    background-color: #fff;
    border-radius: 40px;
    box-shadow: 0 4px 14px #00000059;
    i {
      font-size: 24px;
      cursor: pointer;
      color: #333;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
