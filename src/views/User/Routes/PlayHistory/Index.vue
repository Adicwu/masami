<template>
  <BotLoad class="play-history" :data="timelist" :perpage="3">
    <h2 v-if="timelist.length > 0">
      播放历史
      <el-popconfirm
        title="确定清空播放记录嘛？"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="clearHistory"
      >
        <template #reference>
          <Icon name="delete" />
        </template>
      </el-popconfirm>
    </h2>
    <template #contain="{ data }">
      <el-timeline class="play-history__timeline">
        <el-timeline-item
          v-for="{ time, list } in data"
          :key="time"
          :timestamp="String(time)"
          placement="top"
        >
          <AwListModifyTransition class="play-history__content">
            <CodepenCard
              v-for="item in list"
              :key="item.id"
              :detail="item"
              :data-comicid="item.id"
            >
              <template #cover>
                <div class="cover-info">
                  <Icon
                    class="play"
                    title="继续播放"
                    name="play"
                    @click="toComicMain(item.id)"
                  />
                  <Icon
                    class="delete"
                    title="删除"
                    name="delete"
                    @click="removeComicHistory(item.id)"
                  />
                </div>
              </template>
              <template #desc>
                <span :class="{ 'bad-card': item.status }">{{
                  item.desc
                }}</span>
              </template>
            </CodepenCard>
          </AwListModifyTransition>
        </el-timeline-item>
      </el-timeline>
    </template>

    <EmptyImgBlock
      v-if="!hasList"
      class="play-history__empty"
      content="无聊如你"
      height="60%"
    >
      <img src="~static/img/history-empty.png" style="width: 100%" />
    </EmptyImgBlock>

    <AdBreakTop target=".play-history" />
  </BotLoad>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import moment from 'moment'

import { toComicMain } from '@/router/jump'
import { usePlayCacheStore } from '@/stores/playCache.store'
import { usePageOut } from '@/hooks/utils'

import CodepenCard, {
  Detail as CodepenCardDetail
} from '@comps/Card/CodepenCard.vue'
import EmptyImgBlock from '@comps/Block/EmptyImgBlock.vue'
import { AwListModifyTransition } from 'sorarain'
import BotLoad from '@/components/Container/BotLoad.vue'

export default defineComponent({
  name: 'PlayHistory',
  components: {
    CodepenCard,
    EmptyImgBlock,
    AwListModifyTransition,
    BotLoad
  },
  setup() {
    const playCacheStore = usePlayCacheStore()

    const hasList = computed(() => playCacheStore.playHistory.length !== 0)
    const timemap = computed(() =>
      playCacheStore.playHistory.reduce<{
        [time: string]: CodepenCardDetail[]
      }>((total, item) => {
        const value = {
          cover: item.cover,
          title: item.name,
          avatar: item.cover,
          desc: item.playEpisode
            ? `${item.playEpisode} ${item.playProgress}`
            : '播放失败',
          tags: [
            {
              icon: 'player',
              content: `最后播放时间：${item.date}`
            }
          ],
          id: item.id,
          status: !Boolean(item.playEpisode)
        }
        const date = moment(item.date).format('YYYY/MM/DD')
        if (total[date]) {
          total[date].push(value)
        } else {
          total[date] = [value]
        }
        return total
      }, {})
    )
    const timelist = computed(() =>
      Object.entries(timemap.value)
        .map(([k, v]) => ({ time: k, list: v }))
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    )

    const clearHistory = () => playCacheStore.clearHistory()
    const removeComicHistory = (id: number) =>
      playCacheStore.removeHistoryById(id)

    usePageOut(() => {
      playCacheStore.saveHistory()
    })

    return {
      timelist,
      hasList,
      clearHistory,
      toComicMain,
      removeComicHistory
    }
  }
})
</script>
<style lang="less" scoped>
.play-history {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  box-sizing: border-box;
  border-top-left-radius: var(--df-radius);

  h2 {
    i {
      font-size: 18px;
      cursor: pointer;
    }
  }

  &__content {
    display: grid;
    width: calc(100% - 20px);
    margin-top: 20px;
    grid-template-columns: repeat(var(--playhistory-col-count), 1fr);
    gap: 60px 50px;
    padding: 0 0 40px 20px;

    ::v-deep(.codePen-card) {
      &:hover {
        .cover-info {
          opacity: 1;
        }
      }

      .cover-info {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.25s;

        .play {
          font-size: 40px;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          color: rgba(255, 255, 255, 0.925);
        }

        .delete {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 20px;
          color: var(--warning-color);
          cursor: pointer;
          font-weight: bold;
          padding: 4px;
          transition: all 0.25s;

          &:hover {
            opacity: 0.3;
          }
        }
      }

      .bad-card {
        color: var(--warning-color);
      }
    }
  }

  &__timeline {
    margin-top: 20px;
  }

  &__empty {
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
  }
}
</style>
