<template>
  <transition
    enter-active-class="animate__fadeInUp"
    leave-active-class="animate__fadeOutDown"
  >
    <div v-show="visible" class="comiclist-content">
      <el-tabs v-model="tabs.active">
        <el-tab-pane
          v-for="item in tabs.list"
          :key="item.value"
          :label="item.name"
          :name="item.value"
        >
          <template v-if="item.value === 'history'">
            <div
              v-for="k in historyComics.slice(0, maxListShow)"
              :key="k.id"
              class="card"
              :data-comicid="k.id"
              @click="toMain(k.id)"
            >
              <BaseImg :src="k.cover" />
              <div class="card-info">
                <p>{{ k.name }}</p>
                <span v-if="k.playEpisode">{{
                  `观看至 ${k.playEpisode} ${k.playProgress}`
                }}</span>
                <span v-else class="bad">播放失败</span>
              </div>
            </div>
            <div
              v-if="historyComics.length >= maxListShow"
              class="more"
              @click="$router.push({ name: 'PlayHistory' })"
            >
              查看全部记录
            </div>
          </template>
          <template v-if="item.value === 'fav'">
            <div
              v-for="k in favComics.slice(0, maxListShow)"
              :key="k.comicId"
              class="card"
              :data-comicid="k.comicId"
              @click="toMain(k.comicId)"
            >
              <BaseImg :src="k.comicCover" />
              <div class="card-info">
                <p>{{ k.comicName }}</p>
                <span>{{ k.desc }}</span>
              </div>
            </div>
            <div
              v-if="favComics.length >= maxListShow"
              class="more"
              @click="$router.push({ name: 'ComicFavlist' })"
            >
              查看全部记录
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { toComicMain } from '@/router/jump'
import { usePlayCacheStore } from '@/stores/playCache.store'
import { useFavStore } from '@/stores/fav.store'
import { useComicUpdate } from '@/stores/comicUpdate.store'

export default defineComponent({
  name: 'AppTabBarComiclist',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:visible': null
  },
  setup(_, { emit }) {
    const playCacheStore = usePlayCacheStore()
    const favStore = useFavStore()
    const comicUpdate = useComicUpdate()
    const maxListShow = 4

    const tabs = reactive({
      active: 'history',
      list: [
        {
          name: '历史',
          value: 'history'
        },
        {
          name: '追番',
          value: 'fav'
        }
      ]
    })

    const favComics = computed(() =>
      favStore.comicFavs.map((item) => {
        const updateInfo = comicUpdate.getComicUpdateInfo(item.comicId)
        return {
          ...item,
          desc: !updateInfo
            ? ''
            : `${updateInfo.updateTime}更新 - 已${updateInfo.status}`
        }
      })
    )
    const historyComics = computed(() => playCacheStore.playHistory)

    const toMain = (id: ComicId) => {
      toComicMain(id, 'replace')
      emit('update:visible', false)
    }

    return {
      toMain,
      favComics,
      historyComics,
      tabs,
      maxListShow
    }
  }
})
</script>
<style lang="less" scoped>
.comiclist {
  &-content {
    position: absolute;
    right: -100%;
    top: 100%;
    width: 340px;
    margin-top: 10px;
    background: var(--aside-bg-color);
    box-shadow: 0 0 10px rgb(0 0 0 / 0.2);
    border-radius: 4px;
    overflow: hidden;
    animation-duration: 0.625s;
    ::v-deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        padding: 0 16px;
        .el-tabs__active-bar {
          background-color: var(--warning-color);
        }
        .el-tabs__item {
          color: var(--font-unactive-color);
          padding: 0 12px;
        }
        .el-tabs__item.is-active,
        .el-tabs__item:hover {
          color: var(--font-color);
        }
      }
      .el-tabs__content {
        margin-bottom: 10px;
        .el-tab-pane {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
      }
    }
    .card {
      display: flex;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.25s;
      img {
        width: 100px;
        aspect-ratio: 2/1.2;
        border-radius: 4px;
      }
      &-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 12px;
        p {
          .p-truncate(2);
        }
        span {
          color: var(--font-unactive-color);
          padding-bottom: 4px;
        }
        .bad {
          color: var(--warning-color);
          font-weight: 600;
        }
      }
      &:hover {
        filter: brightness(0.5);
      }
    }
    .more {
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
      &:hover {
        text-decoration: underline;
        opacity: 0.6;
      }
    }
  }
}
</style>
