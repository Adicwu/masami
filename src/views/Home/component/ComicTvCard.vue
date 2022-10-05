<template>
  <div class="comic-tv-card" :data-comicid="detail.id">
    <BaseImg :src="detail.cover" />
    <div class="info">
      <div class="info-play" @click="toComicMain(detail.id)">
        <Icon name="play" />
      </div>
      <p>{{ detail.title }}</p>
      <span>{{ detail.season }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toComicMain } from '@/router/jump'
import * as SectionType from '../types/homeSection.type'

defineProps<{
  detail: SectionType.Comic['tv'][0]
}>()
</script>
<style lang="less" scoped>
.comic-tv-card {
  position: relative;
  flex: 1;
  aspect-ratio: 2/3;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  user-select: none;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .info {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: all 0.25s;
    &-play {
      position: relative;
      display: flex;
      width: 42px;
      height: 42px;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 50%;
      margin-bottom: 24px;
      cursor: pointer;
      i {
        position: relative;
        color: #333;
        font-size: 24px;
        z-index: 2;
      }
      &::before {
        .mask(1,rgb(255 255 255 / 0.3));
        border-radius: 50%;
        transition: all 0.25s;
        transform: scale(0.4);
      }
      &:hover::before {
        transform: scale(1.4);
      }
    }
    p {
      max-width: 80%;
      font-size: 14px;
      color: rgb(255 255 255 / 0.95);
      font-weight: 600;
      text-align: center;
    }
    span {
      margin-top: 10px;
      color: rgb(255 255 255 / 0.6);
      font-size: 12px;
    }
  }
  &:hover {
    .info {
      opacity: 1;
    }
  }
}
</style>
