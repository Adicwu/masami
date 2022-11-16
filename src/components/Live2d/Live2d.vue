<template>
  <div v-moveable class="live2d" :style="selfStyle">
    <canvas ref="cvs" />
  </div>
</template>

<script lang="ts">
import { moveable } from '@sorarain/use'
import { computed, CSSProperties, defineComponent, reactive, ref } from 'vue'
import { LIVE2D_CDNS } from './static'

/** 初始化参数 */
export interface InitOption {
  /** 模型model.json路径，此文件建议放到public文件夹下 */
  model: string
  /** 缩放比例 */
  scale?: number
  /** 生成模型空间大小 */
  size?: {
    width: number
    height: number
  }
  /** 版本 2版本model文件一般为xx.model.json 其他的视为4版本文件 */
  version?: 2 | 4
}

export default defineComponent({
  name: 'Live2d',
  directives: {
    moveable
  },
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const cvs = ref<HTMLCanvasElement>()
    const live2d = reactive<{
      instance: any
      version: InitOption['version']
    }>({
      instance: null,
      version: 2
    })
    const selfStyle = computed<CSSProperties>(() => ({
      zIndex: !props.visible ? -1 : 4444
    }))

    const creatCDN = (link: string) =>
      new Promise((resolve, reject) => {
        const el = document.createElement('script')
        el.src = link
        el.type = 'text/javascript'
        document.body.appendChild(el)
        el.onload = resolve
        el.onerror = reject
      })

    /** 依赖加载 */
    const loadCDN = async () => {
      await Promise.all(
        LIVE2D_CDNS.slice(0, 3).map(({ link }) => creatCDN(link))
      )
      await Promise.all(
        LIVE2D_CDNS.slice(3, 4).map(({ link }) => creatCDN(link))
      )
    }
    const getModelPath = (model: string) => {
      // return new URL(`./live2dModels/${model}`, import.meta.url).href
      return `https://api.adicw.cn/static/live2dModels/${model}`
    }
    /** live2d初始化 */
    const initLive2d = async ({
      model = '',
      scale = 0.13,
      size = {
        width: 220,
        height: 280
      },
      version = 2
    }: InitOption) => {
      try {
        await loadCDN()

        const PIXI = (window as any).PIXI
        if (!model || !PIXI) return console.log('依赖错误')

        const modelPath = getModelPath(model)
        const app = new PIXI.Application({
          ...size,
          view: cvs.value,
          autoStart: true,
          transparent: true
        })

        const live2DModel = await PIXI.live2d.Live2DModel.from(modelPath)
        app.stage.addChild(live2DModel)
        live2DModel.scale.set(scale)

        live2d.instance = live2DModel
        live2d.version = version
      } catch (e) {
        console.log('PIXI加载失败：', e)
      }
    }
    /**
     * 动作
     * @param name 动作名称，不传则随机
     */
    const motion = (name?: string) => {
      if (!live2d.instance) return
      switch (live2d.version) {
        case 2: {
          typeof name === 'undefined'
            ? live2d.instance.motion()
            : live2d.instance.motion(name)
          break
        }
        case 4: {
          typeof name === 'undefined'
            ? live2d.instance.expression()
            : live2d.instance.expression(name)
          break
        }
      }
    }

    return {
      initLive2d,
      motion,
      cvs,
      selfStyle
    }
  }
})
</script>
<style lang="less" scoped>
.live2d {
  position: fixed;
  left: 0;
  bottom: 0;
  user-select: none;
}
</style>
