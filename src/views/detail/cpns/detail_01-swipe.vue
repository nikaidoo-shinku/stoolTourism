<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <!-- <template #indicator="props">
                <div class="indicator">{{ props.active + 1 }}/{{ swipeData.length }}-{{ props.total }}</div>
            </template> -->
            <template #indicator="{ active, total }">
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">{{ getCategoryIndex(swipeData[active])}}/{{ value.length }}</span>
                        </span>
                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>
  
<script setup>

const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})

// 将获取到的数据根据接口中的enumPictureCategory进行分组
const swipeGroup = {}
for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory]
    if (!valueArray) {
        valueArray = []
        swipeGroup[item.enumPictureCategory] = valueArray
    }
    valueArray.push(item)
}

// 定义转换数据的方法（获取数据中【】中的字符串）
const nameReg = /【(.*?)】/i
const getName = (name) => {
    const results = nameReg.exec(name)
    return results[1]
}

const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data => data === item) + 1
}
</script>
  
<style lang="less" scoped>
.swipe {
    .swipe-list {
        .item {

            img {
                width: 100%;
            }
        }

        .indicator {
            position: absolute;
            color: #fff;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            background: rgba(0, 0, 0, .3);
            display: flex;
            align-items: center;
            .item {
                margin: 3px 3px 0;

                &.active {
                    background-color: #fff;
                    color: #333;
                    padding: 3px 3px 1px;
                    border-radius: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>