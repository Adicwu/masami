<template>
  <div class="home-section__card" :class="{ active }" :data-comicid="detail.id">
    <div class="cover">
      <BaseImg :src="detail.cover" />
      <div class="cover-info">
        <b>{{ detail.title }}</b>
        <p>{{ detail.desc }}</p>
      </div>
      <div class="cover-play" @click="toComicMain(detail.id)">
        <Icon name="play" />
      </div>
    </div>
    <div class="progress">
      <div v-if="active" class="progress-inner"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toComicMain } from '@/router/jump'

defineProps<{
  detail: {
    cover: string
    id: string
    title: string
    desc: string
  }
  active: boolean
}>()
</script>
<style lang="less" scoped>
.home-section__card {
  position: relative;
  width: 340px;
  padding-right: 20px;
  box-sizing: border-box;
  background-clip: content-box;
  filter: brightness(0.5);
  transition: all 0.25s;
  &.active {
    filter: brightness(1);
    .cover-play {
      opacity: 1;
    }
  }
  &:hover {
    .active;
    .cover-play {
      opacity: 1;
    }
  }
  .cover {
    position: relative;
    width: 100%;
    aspect-ratio: 1.6/1;
    overflow: hidden;
    border-radius: 8px;
    &::before {
      .mask(1);
    }
    img {
      width: 100%;
      height: 100%;
    }

    &-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 6px 14px;
      box-sizing: border-box;
      &::before {
        .mask(1, linear-gradient(to top, #000, rgba(0, 0, 0, 0.521)));
        filter: blur(4px);
        transform: scale(1.2);
      }
      p,
      b {
        position: relative;
        z-index: 3;
      }
      b {
        color: rgba(255, 255, 255, 0.9);
      }
      p {
        color: rgba(255, 255, 255, 0.4);
        font-size: 14px;
        margin-top: 4px;
      }
    }

    &-play {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.25s;
      z-index: 3;
      opacity: 0;
      &:hover {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.432);
        transform: scale(1.2);
      }
    }
  }
  .progress {
    margin-top: 12px;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    overflow: hidden;
    background: rgba(220, 20, 60, 0.301);
    &-inner {
      width: 40%;
      height: 100%;
      background: var(--primary-color);
      border-radius: 4px;
    }
  }
}
</style>
