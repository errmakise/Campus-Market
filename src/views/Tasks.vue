<template>
  <div class="container">
    <!-- 搜索框组件 -->
    <SearchBar />

    <!-- 分类组件 -->
    <div class="nearbyTitle">
      <span>附近任务</span>
      <img src="@/assets/images/extendIcon.png" class="image" />
    </div>
    <TaskSwipe class="swipe" />

    <TasksCatogories class="categories" />

    <TasksTagsBar class="tagsBar" />

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

import { ref, onMounted } from 'vue';
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







// // 获取数据的函数
// const fetchItems = async () => {
//   if (loading.value) return; // 防止重复请求
//   loading.value = true;

//   try {
//     const response = await getItems(timestamp.value, currentPage.value, 10); // 每次请求10个商品
//     if (response && response.length) {
//       items.value = [...items.value, ...response]; // 拼接新数据到现有数据
//       updateColumnItems(); // 更新列数据
//     }
//   } catch (error) {
//     console.error("Error fetching items:", error);
//   } finally {
//     loading.value = false; // 数据请求完毕，重置加载状态
//   }
// };

// 下拉刷新处理



// 组件挂载时获取第一页数据
onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.swipe {
  margin-top: 1vh;
}

.categories {
  margin-top: 1.7vh;
}

.tagsBar {
  margin-top: 1vh;
  margin-bottom: 2vh;
}

.nearbyTitle {
  display: flex;
  justify-content: space-between;
  width: 87vw;
  font-weight: 600;
  font-family: 'ali', sans-serif;
  font-size: 16px;
  margin-top: 2.2vh;
}

.nearbyTitle .image {
  height: 24px;
}

.items {
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
  margin-top: 1vh;
}

.masonry {
  display: flex;
}

.masonry-column {
  flex: 1;
  /* 确保每列均分宽度 */
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* 列内卡片的间距 */
  margin-left: 4px;
  margin-right: 4px;
}



.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3vh;
  align-items: center;
  overflow-x: hidden;

}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
