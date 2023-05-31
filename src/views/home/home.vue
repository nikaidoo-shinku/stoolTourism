<template>
  <div class="home" ref="homeRef">
    <homeNavBar></homeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.25'" :end-date="'09.26'"></search-bar>
    </div>
    <home-content></home-content>
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script>
  export default { name: "home" };
</script>
<script setup>
  import { watch, computed, ref, onActivated } from "vue";

  import { useHomeStore } from "@/stores/modules/home";
  import useScroll from "@/hooks/useScroll";

  import homeNavBar from "./cpns/home-nav-bar.vue";
  import homeSearchBox from "./cpns/home-search-box.vue";
  import homeCategories from "./cpns/home-categories.vue";
  import homeContent from "./cpns/home-content.vue";
  import searchBar from "@/components/search-bar/search-bar.vue";

  // 发送网络请求
  const homeStore = useHomeStore();
  homeStore.fetchHotSuggestData();
  homeStore.fetchCategoriesData();
  homeStore.fetchHouselistData();

  // const moreBtnClick = () => {
  //   console.log("加载更多");
  //   homeStore.fetchHouselistData()
  // }

  // 调用useScroll的hooks，监听滚动事件并在滚动到底部时加载更多
  const homeRef = ref();
  const { isReachBottom, scollTop } = useScroll(homeRef);

  // 监听isReachBottom变化，为true时就发送网络请求
  watch(isReachBottom, (newValue) => {
    if (newValue) {
      homeStore.fetchHouselistData().then(() => {
        isReachBottom.value = false;
      });
    }
  });

  // 搜索框显示的控制
  // const isShowSearchBar = ref(false)
  // watch(scollTop, (newTop) => {
  //   isShowSearchBar.value = newTop > 100
  // })
  // 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性
  const isShowSearchBar = computed(() => {
    return scollTop.value >= 350;
  });

  // 跳转回home时，保留原来滚动的位置，需要先使用keep-alive
  onActivated(() => {
    homeRef.value?.scrollTo({
      top: scollTop.value,
    });
  });
</script>

<style lang="less" scoped>
  .home {
    height: 100vh;
    overflow-y: auto;
  }

  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #ffffff;
    z-index: 9;
  }
</style>
