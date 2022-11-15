<template>
  <div class="comic-anthology">
    <div class="comic-anthology__section">
      <label>{{ label }}</label>
      <div class="line"></div>
      <el-select
        v-if="realSection.length > 1"
        v-model="activeTab"
        placeholder="Select"
        size="small"
      >
        <el-option
          v-for="item in realSection"
          :key="item.key"
          :label="item.name"
          :value="item.key"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listSort"
        style="width: 60px"
        placeholder="Select"
        size="small"
      >
        <el-option label="顺序" :value="0" />
        <el-option label="倒序" :value="1" />
      </el-select>
    </div>

    <AwListModifyTransition tag="ul" class="comic-anthology__list">
      <li
        v-for="{ name, value } in realList"
        :key="value"
        :class="{ active: active === value, disable: isBad(value) }"
        @click="liClick({ name, value })"
      >
        {{ name }}
      </li>
    </AwListModifyTransition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { AwListModifyTransition } from 'sorarain'
import { arrAvgSplit } from '@sorarain/utils'

import { videoUrlFormat } from '@/api/utils'

export interface Option {
  name: string
  value: string
}
export type ChangeReturns = Option & {
  orgId: string
}

export default defineComponent({
  name: 'ComicAnthology',
  components: {
    AwListModifyTransition
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    list: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    badAnthology: {
      type: Array as PropType<Option['value'][]>,
      default: () => []
    },
    orgId: {
      type: String,
      default: ''
    }
  },
  emits: {
    change: (e: ChangeReturns) => e
  },
  setup(props, { emit }) {
    const activeTab = ref(0)
    /** 当前显示的列表排序 0顺序 1倒序 */
    const listSort = ref(0)

    const isBad = (value: Option['value']) => props.badAnthology.includes(value)
    const liClick = (item: Option) => {
      if (isBad(item.value)) return
      emit('change', {
        ...item,
        orgId: props.orgId
      } as ChangeReturns)
    }
    const splitList = computed(() => arrAvgSplit(props.list, 100) as Option[][])
    const realList = computed(() => {
      const result =
        props.list.length > 100 ? splitList.value[activeTab.value] : props.list
      return (!listSort.value ? result : [...result].reverse()).map((item) => ({
        ...item,
        value: videoUrlFormat(item.value)
      }))
    })
    const realSection = computed(() =>
      splitList.value.map((item, index) => ({
        name: `${item[0].name} - ${item[item.length - 1].name}`,
        key: index
      }))
    )

    return {
      isBad,
      liClick,
      realSection,
      activeTab,
      realList,
      listSort
    }
  }
})
</script>
<style lang="less" scoped>
.comic-anthology {
  position: relative;
  margin-bottom: 16px;

  &__list {
    position: relative;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      padding: 8px 14px;
      transition: all 0.25s;
      border-radius: 8px;
      user-select: none;
      color: var(--font-unactive-color);
      cursor: pointer;
      &:hover {
        opacity: 0.4;
      }
      &.active {
        color: var(--font-color);
        background: var(--primary-color);
      }
      &.disable {
        opacity: 0.8;
        color: var(--warning-color);
        cursor: no-drop;
      }
    }
  }
  &__section {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 8px 0 16px 0;
    & > label {
      font-size: 16px;
    }
    .line {
      flex: 1;
      height: 2px;
      padding: 0 22px;
      background: var(--font-color);
      opacity: 0.1;
      box-sizing: border-box;
      background-clip: content-box;
    }
    ::v-deep(.el-select) {
      margin-left: 12px;
    }
  }
}
</style>
