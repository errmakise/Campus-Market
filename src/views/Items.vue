<template>
  <div class="container">
    <!-- 搜索框组件 -->
    <SearchBar />
    <!-- 分类组件 -->
    <ItemsCategories :categories="categories" />

    <!-- 瀑布流组件 -->
    <div class="items" @scroll="handleScroll" ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <WaterfallGrid :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <ItemCard :itemId="element.id" :title="element.title" :price="element.price"
              :imageUrl="element.picUrl[0]" />
          </template>
        </WaterfallGrid>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>

    </div>

    <BottomNav nowView="二手" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePagination } from "@/utils/usePagination";
import { getLatestItems } from "@/api/api.js";

const masonryContainer = ref(null);
// 分类数据
const categories = [
  { icon: "digital", label: "数码产品" },
  { icon: "study", label: "学习资料" },
  { icon: "game", label: "游戏" },
  { icon: "fashion", label: "服饰美妆" },
  { icon: "ticket", label: "门票" },
  { icon: "account", label: "账号会员" },
  { icon: "instrument", label: "乐器" },
  { icon: "food", label: "餐饮代购" },
  { icon: "sport", label: "运动用品" },
  { icon: "others", label: "其他" },
];

// 使用封装的分页逻辑，传入当前类别和选中的标签
const {
  items,
  loading,
  hasMore,
  fetchData,
  refreshItems,
} = usePagination(getLatestItems, 10); // 每页 10 条


// 滚动加载防抖
let debounceTimeout;
const handleScroll = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const target = masonryContainer.value;
    if (!target) return;

    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    if (isBottom && !loading.value) {
      fetchData();
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
  fetchData();
});
</script>

<style scoped>
.status-indicator {
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

.items {
  width: 100%;
  overflow-y: auto;
  max-height: 68vh;
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
</style>
