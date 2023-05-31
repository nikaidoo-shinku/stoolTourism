<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue'
import loading from './components/loading/loading.vue';

import { useRoute } from 'vue-router';

// useRoute()总是能获取到当前跳转路由的对象
const route = useRoute()

</script>

<style lang="less" scoped></style>
