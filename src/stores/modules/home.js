import { defineStore } from "pinia";
import hyRequest from "@/services/request/index"
import { getHomeSuggests, getHomeCategories,getHomeHouseList } from "@/services/index"

export const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: [],
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouselistData() {
            const res = await getHomeHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})
