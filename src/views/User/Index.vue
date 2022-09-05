<template>
  <div id="user">
    <UserFrame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import PlayHistory from './components/PlayHistory.vue'
import UserFrame from './components/UserFrame.vue'
export default defineComponent({
  name: 'User',
  components: {
    UserFrame
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
#user {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px 70px 40px 40px;
  box-sizing: border-box;
}
</style>
