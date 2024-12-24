// src/utils/usePagination.js

import { ref } from 'vue'

export const usePagination = (apiFunction, pageSize = 10) => {
  const items = ref([]) // 数据列表
  const currentPage = ref(1) // 当前页码
  const loading = ref(false) // 加载状态
  const hasMore = ref(true) // 是否有更多数据
  const loadedPages = new Set() // 已加载的页码

  // 请求数据
  const fetchData = async (...args) => {
    if (loading.value || !hasMore.value || loadedPages.has(currentPage.value)) return
    loading.value = true
    loadedPages.add(currentPage.value)

    try {
      // 调用API函数，传入当前时间戳、页码、每页大小及其他参数
      const response = await apiFunction(currentPage.value, pageSize, ...args)
      console.log(response.list)
      if (response.list && response.list.length) {
        items.value = [...items.value, ...response.list]
      } else {
        hasMore.value = false // 没有更多数据
      }
      console.log(items.value)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      loading.value = false
    }
  }

  // 刷新数据（重置分页并重新加载第一页）
  const refreshItems = async (...args) => {
    items.value = []
    currentPage.value = 1
    loadedPages.clear()
    hasMore.value = true
    await fetchData(...args) // 重新加载第一页
  }

  // 重置分页（与刷新数据功能相同）
  const resetPagination = async (...args) => {
    await refreshItems(...args)
  }

  return {
    items,
    currentPage,
    loading,
    hasMore,
    fetchData,
    refreshItems,
    resetPagination,
  }
}
