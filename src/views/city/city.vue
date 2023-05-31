<template>
    <div class="city top-page">
        <div class="top">
            <van-search shape="round" show-action v-model="searchValue" placeholder="城市/区域/位置" @cancel="canceClick" />
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <template v-for="(value, key, index) in allCities" :key="key">
                <city-group v-show="tabActive === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';

import cityGroup from './cpns/city-group.vue'

import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useCityStore } from '@/stores/modules/city'

const router = useRouter()

const searchValue = ref("")
const canceClick = () => {
    // 返回上一级路由
    router.back()
}

const tabActive = ref()

// 发送city的网络请求
// const allCity = ref()
// getCityAll().then((res) => {
//     allCity.value = res.data
// })

// 发送city的网络请求并从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

//根据allCities的key获取相应数据
const currentGroup = computed(() => {
    return allCities.value[tabActive.value]
})

</script>
  
<style lang="less" scoped>
.city {
    --van-tabs-line-height: 30px;

    .top {
        position: relative;
        z-index: 9;
    }

    .content {
        height: calc(100vh - 84px);
        overflow-y: auto;
    }
}
</style>