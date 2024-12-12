import { ref } from 'vue'

export const usePagination = (apiFunction, pageSize = 10) => {
  const items = ref([]) // 数据列表
  const currentPage = ref(1) // 当前页码
  const loading = ref(false) // 加载状态
  const hasMore = ref(true) // 是否有更多数据
  const loadedPages = new Set() // 已加载的页码
  const timestamp = ref(Date.now()) // 用于记录分页的时间点

  // 请求数据
  const fetchItems = async () => {
    if (loading.value || !hasMore.value || loadedPages.has(currentPage.value)) return
    loading.value = true
    loadedPages.add(currentPage.value)

    try {
      const response = await apiFunction(timestamp.value, currentPage.value, pageSize)
      if (response && response.length) {
        items.value = [...items.value, ...response]
      } else {
        hasMore.value = false // 没有更多数据
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      loading.value = false
    }
  }

  // 刷新数据
  const refreshItems = async () => {
    items.value = []
    currentPage.value = 1
    loadedPages.clear()
    hasMore.value = true
    timestamp.value = Date.now() // 重新记录时间戳
    await fetchItems()
  }

  return {
    items,
    currentPage,
    loading,
    hasMore,
    timestamp,
    fetchItems,
    refreshItems,
  }
}
