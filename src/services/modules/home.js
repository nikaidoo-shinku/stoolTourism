import hyRequest from "../request/index"

export function getHomeSuggests() {
    return hyRequest.get({
        url: "/home/hotSuggests"
    })
}

export function getHomeCategories() {
    return hyRequest.get({
        url: "/home/categories"
    })
}

export function getHomeHouseList(currentPage) {
    return hyRequest.get({
        url: "home/houselist",
        params: {
            page: currentPage
        }
    })
}