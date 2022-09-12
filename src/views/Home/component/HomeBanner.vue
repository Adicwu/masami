<template>
  <div v-show="isInit" class="home-banner">
    <div class="home-banner__bg">
      <el-carousel
        height="100%"
        indicator-position="none"
        arrow="never"
        :interval="6000"
        :pause-on-hover="false"
        @change="onCarouselChange"
      >
        <el-carousel-item v-for="(item, index) in realBanner" :key="index">
          <BaseImg :src="item.cover" :lazy="false" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div v-if="isReady" class="home-banner__info">
        <div class="home-banner__info-msg">
          <template v-if="carousel.current">
            <transition
              enter-active-class="carousel-info-in"
              leave-active-class="carousel-info-out"
            >
              <div v-show="carousel.infoVisible" class="inner">
                <span>{{ carousel.current.season || '-' }}</span>
                <h1>{{ carousel.current.title }}</h1>
                <p>
                  越是漂亮华丽 令人振奋的烟花，在消逝之后就让人越感觉到寂寞。
                  但即便烟花消逝了 回忆却还留着
                </p>
                <div class="inner-rate">
                  <el-rate
                    :model-value="Number(carousel.current.rank || 0) / 2"
                  />
                  <span>{{ carousel.current.rank || 0 }} <i>评分</i></span>
                </div>
                <div class="inner-control">
                  <el-button
                    type="warning"
                    round
                    @click="toComicMain(carousel.current.id)"
                    >前往播放<Icon name="play"
                  /></el-button>
                  <el-button round plain>详情</el-button>
                </div>
              </div>
            </transition>
          </template>
        </div>
        <div class="home-banner__info-section">
          <AwTabs v-model:active="tabs.active" class="tabs">
            <AwTab
              v-for="tab in tabs.list"
              :key="tab.key"
              :name="tab.key"
              :title="tab.name"
            >
              <AwSlideX @on-change="(index) => (tab.index = index)">
                <AwSlideItem
                  v-for="(item, index) in comicTabs[tab.key]"
                  :key="index"
                >
                  <HomeSectionCard
                    :detail="item"
                    :active="index === tab.index"
                  />
                </AwSlideItem>
              </AwSlideX>
            </AwTab>
          </AwTabs>
        </div>
      </div>
    </transition>
  </div>

  <div v-if="!isInit" class="home-banner fake">
    <LoadingBlockRun />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  shallowReactive,
  watch
} from 'vue'
import { wait } from '@sorarain/utils'

import AwSlideX from '@comps/AwSlide/AwSlideX.vue'
import AwSlideItem from '@comps/AwSlide/AwSlideItem.vue'
import HomeSectionCard from './HomeSectionCard.vue'
import LoadingBlockRun from '@comps/Loading/LoadingBlockRun.vue'
import AwTabs from '@/components/AwTabs/AwTabs.vue'
import AwTab from '@/components/AwTabs/AwTab.vue'

import * as Type from '../types/homeSection.type'
import { toComicMain } from '@/router/jump'
import { getComicMain, GetComicMainReturn } from '@/api'

export default defineComponent({
  name: 'HomeBanner',
  components: {
    AwSlideX,
    AwSlideItem,
    HomeSectionCard,
    LoadingBlockRun,
    AwTabs,
    AwTab
  },
  props: {
    banner: {
      type: Array as PropType<Type.Comic['banner']>,
      default: () => []
    },
    hots: {
      type: Array as PropType<Type.Comic['hots']>,
      default: () => []
    },
    latest: {
      type: Array as PropType<Type.Comic['latest']>,
      default: () => []
    },
    isInit: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    type ComicKey = 'hots' | 'latest'

    const isReady = ref(false)
    const awSlideXActive = ref(0)
    const bannerInfoMap = shallowReactive(
      new Map<ComicId, GetComicMainReturn>()
    )
    const carousel = reactive({
      active: 0,
      infoVisible: true,
      get current() {
        return realBanner.value[this.active]
      }
    })
    const tabs = shallowReactive<Type.Tabs<ComicKey>>({
      active: 'hots',
      list: [
        {
          name: '热门',
          key: 'hots',
          index: 0
        },
        {
          name: '最新更新',
          key: 'latest',
          index: 0
        }
      ]
    })

    const comicTabs = computed(() => {
      return {
        latest: props.latest.map((item) => ({
          cover: item.cover,
          title: item.title,
          id: item.id,
          desc: item.season
        })),
        hots: props.hots.map((item) => ({
          cover: item.cover,
          title: item.title,
          id: item.id,
          desc: item.season
        }))
      }
    })
    const realBanner = computed(() =>
      props.banner.map((item) => ({
        ...item,
        ...(bannerInfoMap.get(item.id) || {})
      }))
    )

    const onCarouselChange = async (e: number) => {
      carousel.infoVisible = false
      await wait(500)
      carousel.active = +e
      carousel.infoVisible = true
    }

    watch(
      () => props.isInit,
      async () => {
        // 解决卡顿问题
        await wait(500)
        isReady.value = true
      }
    )
    watch(
      () => props.banner,
      async (banner) => {
        await wait(2000)
        banner.forEach(async ({ id }) => {
          if (bannerInfoMap.get(id)) return
          const data = await getComicMain(id)
          data && bannerInfoMap.set(id, data)
        })
      }
    )

    return {
      tabs,
      awSlideXActive,
      comicTabs,
      onCarouselChange,
      carousel,
      toComicMain,
      isReady,
      realBanner
    }
  }
})
</script>
<style lang="less" scoped>
.home-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  &.fake {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ::v-deep(.el-carousel) {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        filter: blur(3px);
      }
    }
  }
  &__info {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-msg {
      flex: 1;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0)
      );
      display: flex;
      align-items: center;
      padding: 40px;
      box-sizing: border-box;
      span {
        font-size: 12px;
        color: rgb(255 255 255 /0.9);
      }
      h1 {
        padding-top: 6px;
        padding-bottom: 18px;
        color: #fff;
      }
      p {
        font-size: 14px;
        color: rgb(255 255 255 /0.7);
        max-width: 80%;
      }
      .inner-rate {
        display: flex;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 30px;
        font-size: 14px;
        color: rgb(255 255 255 /0.7);
      }
      .inner-control {
        ::v-deep(.el-button) {
          position: relative;
          padding: 6px 22px;
          min-height: 36px;
          margin-right: 10px;
          i {
            width: 8px;
            margin-left: 4px;
          }
          &:first-child {
            background: var(--primary-color);
            border-color: var(--primary-color);
          }
          &:last-child {
            background: unset;
            color: #fff;
          }
        }
      }
      .carousel-info {
        &-in {
          animation: slide 0.25s forwards;
        }
        &-out {
          animation: slide 0.25s forwards reverse;
        }
        @keyframes slide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
    &-section {
      position: relative;
      background: rgba(0, 0, 0, 0.96);
      padding: 40px;
      padding-top: 0;
      box-sizing: border-box;
      &::before {
        .mask(3);
        box-shadow: 0 -38px 32px rgb(0 0 0 / 92%);
        transform: scaleX(1.4);
      }
      .tabs {
        width: 100%;
        height: 100%;
        z-index: 4;
      }
    }
  }
}
</style>
