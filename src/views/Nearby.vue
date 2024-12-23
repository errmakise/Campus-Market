<template>
  <div class="container">
    <!-- 搜索框组件 -->
    <SearchBar />

    <TaskMapComponent />


    <!-- 商品瀑布流列表 -->
    <div class="items" @scroll="handleScroll" ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <WaterfallGrid :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <TaskCard :taskId="element.id" :title="element.title" :reward="element.price"
              :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>

    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePagination } from "@/utils/usePagination";
import { getItems } from "@/api/api.js";


const masonryContainer = ref(null);

// 使用封装的分页逻辑
const { items, loading, hasMore, fetchItems, refreshItems, currentPage } = usePagination(getItems);

// 滚动加载防抖
let debounceTimeout;
const handleScroll = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const target = masonryContainer.value;
    if (!target) return;

    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    if (isBottom && !loading.value) {
      currentPage.value += 1;
      fetchItems();
    }
  }, 200);
};

// 下拉刷新逻辑
const isRefreshing = ref(false);
const onRefresh = async () => {
  isRefreshing.value = true;
  await refreshItems();
  isRefreshing.value = false;
};

// 页面加载时初始数据
onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.status-indicator {
  text-align: center;
  padding: 10px;
  color: #888;
}

.items {
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
  margin-top: 1vh;
}

.loading-indicator {
  text-align: center;
  padding: 10px;
}

.no-more-data {
  text-align: center;
  padding: 10px;
  color: #888;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3vh;
  align-items: center;
  gap: 1.777vh;
  overflow-x: hidden;
  font-family: "ali", sans-serif;
}
</style>
