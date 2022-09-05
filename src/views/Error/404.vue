<template>
  <div class="page-404">
    <EmptyImgBlock content="404 NOT FOUND">
      <img src="~static/img/404.png" style="width: 100%" alt="" />
    </EmptyImgBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmptyImgBlock from '@comps/Block/EmptyImgBlock.vue'

export default defineComponent({
  name: '404',
  components: {
    EmptyImgBlock
  }
})
</script>
<style lang="less" scoped>
.page-404 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ::v-deep(.empty-img-block) {
    p {
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 4px;
    }
  }
}
</style>
