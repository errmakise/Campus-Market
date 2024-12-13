<template>
  <div class="list-container" :style="{ height: viewHeight + 'vh' }">
    <!-- 排序按钮 -->
    <div style="display: flex; gap: 4vw; padding-left: 2vw;">
      <button class="button" @click="() => handleSortChange(0)" :class="{ active: activeIndex === 0 }">
        <span>价格</span>
        <img :src="getIconUrl(0)" alt="icon" class="buttom-icon" />
      </button>

      <button class="button" @click="() => handleSortChange(1)" :class="{ active: activeIndex === 1 }">
        <span>时间</span>
        <img :src="getIconUrl(1)" alt="icon" class="buttom-icon" />
      </button>
    </div>

    <!-- 瀑布流组件 -->
    <div class="waterfall-wrapper" :style="{ maxHeight: `calc(${viewHeight}vh - 10vh)` }" @scroll="handleScroll"
      ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <WaterfallGrid :items="items" :number-of-columns="2" :loading="loading">
          <template #card="{ item }">
            <ItemCard :itemId="item.itemId" :title="item.title" :price="item.price" :imageUrl="item.imageUrl" />
          </template>
        </WaterfallGrid>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePagination } from "@/utils/usePagination";
import WaterfallGrid from "@/components/WaterfallGrid.vue";
import ItemCard from "@/components/ItemCard.vue";
import { getItems } from "@/api/api.js";



// 定义 props
const props = defineProps({
  viewHeight: {
    type: Number,
    required: true,
  },
});

// 定义状态

const activeIndex = ref(0); // 排序索引，0 为价格，1 为时间
const isRefreshing = ref(false);
const masonryContainer = ref(null); // 滑动容器引用

// 使用封装的分页逻辑
const { items, loading, hasMore, fetchItems, refreshItems, currentPage } = usePagination(getItems, { sort: "price" });

// 获取排序图标
const getIconUrl = (nowIndex) => {
  return activeIndex.value !== nowIndex
    ? "/src/assets/images/down.png"
    : "/src/assets/images/down-selected.png";
};

// 排序按钮点击
const handleSortChange = (index) => {
  if (activeIndex.value === index) return; // 如果点击的是同一个排序，忽略
  activeIndex.value = index;
  const sortType = index === 0 ? "price" : "time";
  refreshItems({ sort: sortType }); // 切换排序后重新刷新数据
};

// 滚动事件处理
let debounceTimeout;
const handleScroll = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const target = masonryContainer.value;
    if (!target) return;

    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    if (isBottom && !loading.value) {
      currentPage.value += 1;
      fetchItems({ sort: activeIndex.value === 0 ? "price" : "time" });
    }
  }, 200);
};

// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true;
  const sortType = activeIndex.value === 0 ? "price" : "time";
  await refreshItems({ sort: sortType });
  isRefreshing.value = false;
};

// 页面加载时初始化数据
onMounted(() => {
  fetchItems({ sort: "price" });
});
</script>

<style scoped>
.buttom-icon {
  height: 20px;
}

.button {
  display: flex;
  border-radius: 30px;
  border: none;
  align-items: center;
  height: 3.5vh;
  padding: 0vh 1vw 0vh 3vw;
  background-color: #f2f2f2;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

.button.active {
  background-color: #613eea;
  color: white;
}

.list-container {
  margin-top: 4vh;
  font-size: 14px;
  font-family: "ali", sans-serif;
  background-color: white;
  width: 100vw;
  border-radius: 20px 20px 0px 0px;
  padding: 2vh 1.5vw 2vh 2.5vw;
  position: relative;
  overflow: hidden;
}

.waterfall-wrapper {
  overflow-y: auto;
  margin-top: 2vh;
  /* 默认高度会由 props 传入动态设置 */
}

.status-indicator {
  text-align: center;
  padding: 10px;
  color: #888;
}
</style>
