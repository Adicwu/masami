<template>
  <div class="pixiv-grid-booth">
    <div ref="contentEl" class="content">
      <div v-for="item in page.current" :key="item.id" class="content-item">
        <img :src="item.cover" @click="toMain(item)" />
      </div>
    </div>
    <div v-if="page.total > props.size" class="pager">
      <el-pagination
        v-model:current-page="page.tpage"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="props.size"
        @current-change="fetchData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Pixiv {
  cover: string
  id: string
  w: number
  h: number
}

const props = withDefaults(
  defineProps<{
    request: (
      /** 第几页 */
      tpage: number,
      /** 每页大小 */
      size: number
    ) => Promise<{
      list: Pixiv[]
      total: number
    }>
    size?: number
  }>(),
  {
    size: 6
  }
)
const contentEl = ref<HTMLElement>()
const router = useRouter()

const page = reactive({
  pending: false,
  current: [] as Pixiv[],
  tpage: 1,
  total: 0
})

const fetchData = async () => {
  page.pending = true
  const { list, total } = await props.request(page.tpage, props.size)
  page.total = total
  page.current = list
  page.pending = false
}
const reset = () => {
  page.current = []
  page.total = 0
  page.tpage = 1
}
const toMain = (item: Pixiv) => {
  router.push({
    name: 'PixivMain',
    params: {
      id: item.id
    }
  })
}

onMounted(async () => {
  await fetchData()
})

defineExpose({
  reset
})
</script>
<style lang="less" scoped>
.pixiv-grid-booth {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 20px;

  .content {
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    overflow: hidden;
    gap: 16px;

    &-item {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: var(--df-radius);
        cursor: zoom-in;
      }
    }
  }

  .pager {
    ::v-deep(.el-pagination) {
      --el-pagination-button-width: 40px;
      --el-pagination-button-height: 40px;
      --el-pagination-font-size: 18px;
      @gap: 8px;

      button,
      li {
        background: unset;
        border-radius: 50%;
        color: var(--font-color);
      }

      .is-active {
        color: var(--warning-color);
      }

      .el-pager {
        gap: @gap;

        .active {
          background: var(--font-color);
          color: var(--box-bg-color);
        }
      }

      .btn-prev {
        margin-right: @gap;
      }

      .btn-next {
        margin-left: @gap;
      }
    }
  }
}
</style>
