<template>
  <Teleport :to="state.to">
    <transition
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
    >
      <div v-show="state.visible" class="aw-dailog__mask"></div>
    </transition>
    <transition
      enter-active-class="animate__fadeInUp"
      leave-active-class="animate__fadeOutDown"
    >
      <div v-show="state.visible" class="aw-dailog">
        <Icon
          class="aw-dailog__close"
          name="delete2"
          @click="onConfirm('close')"
        />
        <div class="aw-dailog__title">
          <slot name="title">{{ state.title }}</slot>
        </div>
        <div class="aw-dailog__content">
          <slot name="content">{{ state.content }}</slot>
        </div>
        <div class="aw-dailog__control">
          <button @click="onConfirm('ok')">确定</button>
          <button @click="onConfirm('close')">取消</button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import * as Type from './type'
import Icon from '@/components/Global/Icon.vue'

const state = reactive({
  // status: 'pending' as 'pending' | 'filfulled' | 'rejected',
  visible: false,
  title: '',
  content: '',
  to: 'body',
  beforeClose: (() => true) as Required<Type.Props>['beforeClose'],
  promise: null as null | {
    resolve: (v: boolean) => void
    reject: () => void
  }
})

const onConfirm = async (type: 'close' | 'ok') => {
  const needClose = await state.beforeClose()
  if (needClose) {
    state.visible = false
    switch (type) {
      case 'ok': {
        state.promise!.resolve(true)
        break
      }
      case 'close': {
        state.promise!.reject()
        break
      }
    }
  }
}

const init = (props?: Type.Props) => {
  if (props) {
    const { title = '', content, beforeClose, to = 'body' } = props
    state.title = title
    state.content = content
    state.to = to
    beforeClose && (state.beforeClose = beforeClose)
    state.visible = true
  }
  return new Promise<boolean>((resolve, reject) => {
    state.promise = { resolve, reject }
  })
}

defineExpose({
  init
})
</script>
<style lang="less" scoped>
.aw-dailog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: max-content;
  @radius: 30px;
  color: #333;
  padding: 40px 30px;
  box-sizing: border-box;
  text-align: center;
  z-index: 3333;
  animation-duration: 0.5s;

  .fake {
    border-radius: @radius;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.157);
    transition: all 0.25s;
  }

  &::before {
    .mask(1, transparent);
    .fake;
    border-radius: @radius;
    border: 2px solid #fff;
    opacity: 0.9;
  }

  &::after {
    .mask(1, #fff);
    .fake;
    transform: rotate(-4deg);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.157);
  }

  &:hover {
    &::before {
      transform: rotate(-8deg);
    }
    &::after {
      transform: rotate(0);
    }
  }

  & > div {
    position: relative;
    z-index: 3;
  }

  &__close {
    position: absolute;
    top: 0px;
    right: 30px;
    font-size: 30px;
    z-index: 3;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      transform: rotate(180deg);
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 800;
  }

  &__content {
    margin-top: 16px;
    line-height: 20px;
  }

  &__control {
    margin-top: 26px;
    button {
      background: unset;
      height: 40px;
      padding: 0 30px;
      font-size: 14px;
      border-radius: 14px;
      cursor: pointer;
      border: 1px solid transparent;
      box-sizing: border-box;
      transition: all 0.25s;
      &:first-child {
        background: #000;
        margin-right: 20px;
        color: #fff;
      }
      &:last-child {
        color: crimson;
        &:hover {
          border-color: crimson;
        }
      }
      &:hover {
        opacity: 0.9;
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
}
.aw-dailog__mask {
  position: fixed;
  z-index: 3332;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation-duration: 0.25s;
}
</style>
