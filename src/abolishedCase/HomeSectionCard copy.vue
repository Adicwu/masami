<!-- <template>
  <div
    v-if="detail"
    class="home-section__card"
    @click="toComicMain(detail!.id)"
  >
    <BaseImg :src="detail.cover" />
    <div class="info">
      <p>{{ detail.title }}</p>
      <span>{{ detail.desc }}</span>
    </div>
    <div class="else"></div>
  </div>
</template>

<script lang="ts">
import { toComicMain } from '@/router/jump'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'HomeSectionCard',
  props: {
    detail: {
      type: Object as PropType<{
        cover: string
        id: string
        title: string
        desc: string
      } | null>,
      default: null
    }
  },
  setup() {
    return {
      toComicMain
    }
  }
})
</script>
<style lang="less" scoped>
.home-section__card {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-color);
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: all 0.25s;
  padding: 10px 12px;
  box-sizing: border-box;
  &:hover {
    border-color: var(--primary-color);
  }
  img {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    box-sizing: border-box;
    overflow: hidden;
    p {
      color: var(--font-color);
      margin-bottom: 4px;
      .p-truncate;
    }
    span {
      font-size: 14px;
      color: var(--font-unactive-color);
    }
  }
}
</style> -->
