<template>
  <div v-if="comic" class="comic-main__info">
    <div class="cover">
      <HoverImgCard :src="comic.cover" />
    </div>
    <div class="message">
      <h1>{{ comic.title }}</h1>
      <ul class="message-tags">
        <li v-for="item in comicTags" :key="item.label">
          <span>{{ item.label }}</span>
          <b>{{ item.value }}</b>
        </li>
      </ul>
      <ul class="message-cates">
        <li v-for="item in comic.cates" :key="item">{{ item }}</li>
      </ul>
      <div class="message-desc">
        <b>声优：</b>
        <p>
          <a
            v-for="item in comic.voiceActors"
            :key="item"
            :href="`https://baike.baidu.com/item/${item}`"
            target="_blank"
            >{{ item }}</a
          >
        </p>
      </div>
      <ComicFav
        :id="id"
        type="button"
        :leave-save="true"
        :info="comicFavInfo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { GetComicMainReturn } from '@apis/index'
import { ComicFavInfo } from '@/stores/fav.store'
import HoverImgCard from '@/components/Transition/HoverImgCard.vue'

export default defineComponent({
  name: 'ComicMainInfo',
  components: {
    HoverImgCard
  },
  props: {
    comic: {
      type: Object as PropType<null | GetComicMainReturn>,
      default: null
    },
    id: {
      type: [Number, String],
      default: -1
    }
  },
  setup(props) {
    /** 动漫tags */
    const comicTags = computed(() => {
      const { comic } = props
      return !comic
        ? []
        : [
            {
              label: '评分',
              value: comic.rank
            },
            {
              label: '首播时间',
              value: comic.firstDate
            },
            {
              label: '状态',
              value: comic.season
            },
            {
              label: '语言',
              value: comic.lang
            },
            {
              label: '地区',
              value: comic.region
            },
            {
              label: '作者',
              value: comic.master
            }
          ]
    })
    const comicFavInfo = computed<ComicFavInfo | null>(() =>
      !props.comic
        ? null
        : {
            comicId: props.id.toString(),
            comicName: props.comic.title,
            comicCover: props.comic.cover
          }
    )
    return {
      comicTags,
      comicFavInfo
    }
  }
})
</script>
<style lang="less" scoped>
.comic-main__info {
  display: flex;
  width: 100%;
  padding-top: 10px;

  .cover {
    width: 200px;
    aspect-ratio: 1.4/2;
    border-radius: 8px;
  }

  .message {
    padding-left: 30px;
    flex: 1;
    box-sizing: border-box;

    &-tags {
      margin-top: 20px;
      height: 46px;

      li {
        display: inline-flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border-right: 1px solid var(--font-color);
        padding-right: 16px;
        font-size: 12px;
        margin-right: 16px;

        &:last-child {
          border: none;
        }

        span {
          opacity: 0.6;
        }

        b {
          margin-top: 6px;
          font-size: 18px;
          opacity: 0.85;
        }
      }
    }

    &-cates {
      margin-top: 16px;
      opacity: 0.9;

      li {
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        padding: 0 4px;
        margin: 4px 0;
        margin-right: 10px;
        line-height: 20px;
        border: 1px solid var(--font-color);
        border-radius: 3px;
      }
    }

    &-desc {
      display: flex;
      align-items: flex-start;
      width: 100%;
      margin: 16px 0;
      font-size: 14px;

      b {
        width: 44px;
      }

      a {
        margin-right: 8px;
        color: var(--primary-color);
      }

      p {
        flex: 1;
      }
    }
  }
}
</style>
