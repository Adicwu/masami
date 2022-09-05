<template>
  <div class="loading-code-run">
    <div v-for="(item, index) in textList" :key="index">{{ item }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoadingCodeRun',
  props: {
    text: {
      type: String,
      default: 'LOADING'
    }
  },
  setup(props) {
    const textList = props.text.split('').reverse()
    return {
      textList
    }
  }
})
</script>
<style lang="less" scoped>
.rendeChild(@loop) when(@loop > 0) {
  &:nth-child(@{loop}) {
    animation-delay: (0.2s * @loop);
  }
  .rendeChild(@loop - 1);
}
.loading-code-run {
  position: absolute;
  width: 600px;
  height: 36px;
  left: 50%;
  top: 40%;
  margin-left: -300px;
  overflow: visible;
  user-select: none;
  cursor: default;
  & div {
    position: absolute;
    width: 20px;
    height: 36px;
    opacity: 0;
    animation: move 2s linear infinite;
    transform: rotate(180deg);
    color: #fff;
    font-size: 20px;
    .rendeChild(20);
  }
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>
