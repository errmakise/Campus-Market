<template>
  <div class="container">
    <!-- 搜索框组件 -->
    <SearchBar />
    <!-- 分类组件 -->
    <CategoryGrid :categories="categories" />

    <!-- 商品瀑布流列表 -->
    <div class="items" @scroll="handleScroll" ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <div class="masonry">
          <div class="masonry-column" v-for="(column, index) in columnItems" :key="index">
            <div class="masonry-item" v-for="item in column" :key="item.itemId">
              <ItemCard :itemId="item.itemId" :title="item.title" :price="item.price" :imageUrl="item.imageUrl" />
            </div>
          </div>
        </div>
        <div v-if="loading" class="loading-indicator">正在加载...</div>
      </van-pull-refresh>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>

const categories = [
  { icon: 'digital', label: '数码产品' },
  { icon: 'study', label: '学习资料' },
  { icon: 'games', label: '游戏' },

  { icon: 'fashion', label: '服饰美妆' },
  { icon: 'tickets', label: '门票' },

  { icon: 'accounts', label: "账号会员" },
  { icon: 'instruments', label: "乐器" },
  { icon: 'food', label: "餐饮代购" },
  { icon: 'sports', label: "运动用品" },
  { icon: 'others', label: "其他" },
]
import { ref, onMounted } from 'vue';
import ItemsCategories from '@/components/ItemsCategories.vue';
import SearchBar from '@/components/SearchBar.vue';
import { getItems } from '@/api/api.js';
import ItemCard from '@/components/ItemCard.vue';
import { PullRefresh } from 'vant';
import BottomNav from '@/components/BottomNav.vue';

// 引入 Vant 组件
PullRefresh;

// 当前页和时间戳
const currentPage = ref(1); // 默认页码为 1
const timestamp = ref(Date.now()); // 获取当前时间戳作为初始请求时间

// 存储获取的数据
const items = ref([]);

// 控制加载状态，防止重复加载
const loading = ref(false);
const isRefreshing = ref(false);
const numberOfColumns = 2;

// 计算每列的 items
const columnItems = ref(Array.from({ length: numberOfColumns }, () => []));
const updateColumnItems = () => {
  columnItems.value = Array.from({ length: numberOfColumns }, () => []);
  items.value.forEach((item, index) => {
    columnItems.value[index % numberOfColumns].push(item);
  });
};

// 获取数据的函数
const fetchItems = async () => {
  if (loading.value) return; // 防止重复请求
  loading.value = true;

  try {
    const response = await getItems(timestamp.value, currentPage.value, 10); // 每次请求10个商品
    if (response && response.length) {
      items.value = [...items.value, ...response]; // 拼接新数据到现有数据
      updateColumnItems(); // 更新列数据
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  } finally {
    loading.value = false; // 数据请求完毕，重置加载状态
  }
};

// 下拉刷新处理
const onRefresh = async () => {
  items.value = []; // 清空现有数据
  currentPage.value = 1;
  timestamp.value = Date.now(); // 刷新时重新生成时间戳

  await fetchItems(); // 获取第一页数据
  isRefreshing.value = false; // 结束刷新状态
};

// 监听页面滚动事件
const masonryContainer = ref(null);
const handleScroll = () => {
  const target = masonryContainer.value;
  if (!target) return;

  const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

  // 如果滚动到页面底部且没有在加载，加载下一页
  if (isBottom && !loading.value) {
    currentPage.value += 1;
    fetchItems(); // 加载下一页数据
  }
};

// 组件挂载时获取第一页数据
onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.items {
  width: 100%;
  overflow-y: auto;
  max-height: 68vh;
  overflow-x: hidden;
  justify-content: flex-first;
  padding-right: 8px;
  padding-left: 8px;
}

.masonry {
  display: flex;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 4px;
  margin-right: 4px;
}



.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 4.5vh;
  align-items: center;
  gap: 1.777vh;
  overflow-x: hidden;
  font-family: 'ali',sans-serif;
}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
