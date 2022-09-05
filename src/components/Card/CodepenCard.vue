<template>
  <article v-if="detail" class="codePen-card">
    <div class="codePen-card__content">
      <div class="cover">
        <BaseImg :src="detail.cover" />
        <slot name="cover" />
      </div>
      <div class="info">
        <BaseImg class="info-avatar" :src="detail.avatar" />
        <div class="info-names">
          <p class="info-names__title" :title="detail.title">
            {{ detail.title }}
          </p>
          <p class="info-names__desc">
            <slot name="desc">
              {{ detail.desc }}
            </slot>
          </p>
        </div>
      </div>
      <ul class="tags">
        <li v-for="(tag, index) in detail.tags" :key="index">
          <Icon v-if="tag.icon" :name="tag.icon" />
          <span>{{ tag.content }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface Detail {
  cover: string
  title: string
  desc: string
  tags: {
    content: string
    icon?: string
  }[]
  avatar?: string
  [prop: string]: unknown
}
export default defineComponent({
  name: 'CodepenCard',
  props: {
    detail: {
      type: Object as PropType<Detail | null>,
      default: null
    }
  }
})
</script>
<style lang="less" scoped>
.codePen-card {
  position: relative;
  width: 100%;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    background: #def;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: -2rem;
    left: 0;
    margin: -1rem;
    border-radius: 10px;
    overflow: hidden;
    z-index: -1;
    background: var(--bg-color);
    clip-path: inset(2rem 0 2rem 2rem round 10px);
    contain: strict;
    transition: -webkit-clip-path 0.3s ease 0.1s;
    transition: clip-path 0.3s ease 0.1s;
  }
  &__content {
    position: relative;
    width: 100%;
    .cover {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
    .info {
      display: grid;
      // grid-template-columns: 40px 1fr 40px;
      grid-template-columns: 40px 1fr;
      margin-top: 14px;
      &-avatar {
        border-radius: 4px;
        aspect-ratio: 1/1;
      }
      &-names {
        padding: 2px 10px;
        box-sizing: border-box;
        &__title {
          .p-truncate;
          .font-format(19px);
          font-size: 14px;
          color: var(--font-color);
          font-weight: 600;
        }
        &__desc {
          .p-truncate;
          .font-format(16px);
          font-size: 12px;
          color: var(--font-unactive-color);
        }
      }
    }
    .tags {
      position: absolute;
      bottom: -48px;
      display: flex;
      gap: 6px;
      width: 100%;
      margin-bottom: 10px;
      .loop(@i) when (@i > 0) {
        li:nth-child(@{i}) {
          transition-delay: 0.4 - 0.1s * @i;
          transform: translateY(-(40% - 10% * @i));
        }
        .loop((@i - 1));
      }
      li {
        display: flex;
        align-items: center;
        background: var(--box-bg-color);
        color: var(--font-color);
        font-size: 12px;
        height: 26px;
        border-radius: 6px;
        padding: 0 6px;
        opacity: 0;
        transition: all 0.25s;
        i {
          margin-right: 4px;
          font-size: 14px;
        }
      }
      .loop(3);
    }
  }
  &:hover {
    &::after {
      transition-delay: 0s;
      clip-path: inset(0 0 0 0 round 10px);
    }
    .tags {
      li {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
