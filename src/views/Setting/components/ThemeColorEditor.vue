<template>
  <div class="themecolor-editor">
    <div class="themecolor-editor__box">
      <h4>预设选择</h4>
      <div class="themecolor-editor__preset">
        <div
          v-for="item in themePresets"
          :key="item.key"
          class="themecolor-editor__preset-item"
          @click="changePreset(item.value)"
        >
          <div class="pile">
            <div
              v-for="color in getMainThemeColor(item.value)"
              :key="color"
              :style="{ background: color }"
            ></div>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="themecolor-editor__box">
      <h4>颜色选择</h4>
      <div
        v-for="item in themes"
        :key="item.prop"
        class="themecolor-editor__color"
      >
        <el-color-picker
          v-model="colors[item.prop]"
          show-alpha
          @change="onColorChanged"
        />
        <span>{{ item.descr }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import { THEMES } from '@/theme/static'
import { getThemeInstance } from '@/theme/theme.class'

export interface ThemeColorVar {
  /** 形参或key */
  prop: string
  /** 十六进制颜色值 */
  value: string
  /** css变量名称 */
  var: string
  /** 描述 */
  descr: string
}

export default defineComponent({
  name: 'ThemeColorEditor',
  props: {
    themes: {
      type: Array as PropType<ThemeColorVar[]>,
      default: () => []
    }
  },
  emits: {
    onColorChanged: (param: ThemeColorVar[]) => true
  },
  setup(props, { emit }) {
    const colors = reactive(
      props.themes.reduce<{ [prop: string]: string }>(
        (totol, { prop, value }) => {
          totol[prop] = value
          return totol
        },
        {}
      )
    )

    const onColorChanged = () => {
      emit(
        'onColorChanged',
        props.themes.map((param) => ({
          ...param,
          value: colors[param.prop]
        }))
      )
    }
    const changePreset = (preset: string[]) => {
      props.themes.forEach((item, index) => {
        const color = preset[index] || '#000'
        colors[item.prop] = color
      })
      onColorChanged()
    }
    /** 获取当前主题配置信息 */
    const getCurrnetTheme = () => {
      return props.themes.map((param) => ({
        ...param,
        value: colors[param.prop]
      }))
    }
    const reset = () => {
      props.themes.forEach(({ prop }) => {
        if (typeof colors[prop] !== 'undefined') {
          colors[prop] =
            getThemeInstance()!.current.value.find((item) => item.prop === prop)
              ?.value || ''
        }
      })
    }
    const getMainThemeColor = (colors: string[]) =>
      [...new Set(colors)].slice(0, 3)

    return {
      colors,
      reset,
      onColorChanged,
      getMainThemeColor,
      changePreset,
      getCurrnetTheme,
      themePresets: THEMES
    }
  }
})
</script>
<style lang="less" scoped>
.themecolor-editor {
  position: relative;
  user-select: none;
  &__color {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    margin-right: 16px;
    span {
      font-size: 14px;
      margin-top: 10px;
      text-align: center;
    }
  }
  &__preset {
    width: 100%;
    display: flex;
    gap: 16px;
    &-item {
      cursor: pointer;
      transition: all 0.25s;
      &:hover {
        transform: scale(1.1);
      }
      .pile {
        position: relative;
        color: #333;
        height: 60px;
        width: 60px;
        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          &:nth-child(1) {
            position: relative;
            transform: translateX(40%);
            z-index: 3;
          }
          &:nth-child(2) {
            transform: translateY(50%);
            z-index: 2;
          }
          &:nth-child(3) {
            transform: translateY(50%) translateX(80%);
            z-index: 3;
          }
        }
      }
      p {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  &__box {
    width: 100%;
    margin-top: 20px;
    h4 {
      margin-bottom: 16px;
      opacity: 0.8;
    }
  }
}
</style>
