<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9894" route>
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>

        <!-- <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(index, item)">
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template> -->
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const currentIndex = ref(0)

// 根据路由的索引来改变相应样式
const route = useRoute()
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => {
        return item.path === newRoute.path
    })
    if(index === -1) return
    currentIndex.value = index
})


</script>

<style lang="less" scoped>
.tab-bar {
    :deep(.van-tabbar-item) {
        font-size: 14px;
    }
    img {
        height: 26px;
    }
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // height: 50px;
    // display: flex;

    // border-top: 1px solid #f3f3f3;

    // .tab-bar-item {
    //     flex: 1;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;

    //     &.active {
    //         color: var(--primary-color);
    //     }

    //     img {
    //         width: 36px;
    //     }

    //     .text {
    //         font-size: 12px;
    //         margin-top: 2px;
    //     }
    // }
}
</style>