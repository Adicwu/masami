<template>
  <div class="app-main">
    <input type="text" v-model="user.name" />
    <input type="password" v-model="user.password" />
    <button @click="onLogin">登录</button>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import * as Api from '@/api'
import { reactive } from 'vue'
import { setToken, getToken } from '@/stores/user.store'

const user = reactive({
  name: '',
  password: ''
})

const goSite = () => {
  location.replace(`${location.origin}/site.html#/`)
}
const onLogin = async () => {
  const token = await Api.login(user)
  if (token) {
    setToken(token)
    location.href = '/site.html#/'
  } else {
    alert('登录失败')
  }
}
getToken() && goSite()
</script>
<style lang="less">
@import '~styles/common';
@import '~styles/app';
</style>
<style lang="less" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: crimson;
  input {
    width: 300px;
    height: 40px;
  }
  button {
    width: 120px;
    height: 38px;
  }
}
</style>
