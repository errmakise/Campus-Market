<template>
  <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
    <div class="masonry">
      <!-- 确保有两列 -->
      <div class="masonry-column" v-for="(column, index) in columnItems" :key="index">
        <div class="masonry-item" v-for="item in column" :key="item.itemId">
          <ItemCard :itemId="item.itemId" :title="item.title" :price="item.price" :imageUrl="item.imageUrl"
            :createdAt="item.createdAt" :tags="item.tags" :favoriteCount="item.favoriteCount" />
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { ref } from 'vue';
import { PullRefresh } from 'vant';
import ItemCard from '../components/ItemCard.vue';

PullRefresh;

const items = ref([
  { itemId: 1, title: '商品 11111111111111111111111111111111111111111111111111111111111', price: 123, imageUrl: 'https://loremflickr.com/400/400?lock=1', createdAt: '2023-07-11T11:50:00.000Z', tags: ['tag1', 'tag2'], favoriteCount: 10 },
  { itemId: 2, title: '商品 2', price: 456, imageUrl: 'https://loremflickr.com/400/400?lock=2', createdAt: '2023-07-12T12:30:00.000Z', tags: ['tag3', 'tag4'], favoriteCount: 20 },
  { itemId: 3, title: '商品 3', price: 789, imageUrl: 'https://loremflickr.com/400/400?lock=3', createdAt: '2023-07-13T13:50:00.000Z', tags: ['tag5', 'tag6'], favoriteCount: 30 },
  { itemId: 4, title: '商品 4', price: 111, imageUrl: 'https://loremflickr.com/400/400?lock=4', createdAt: '2023-07-14T14:50:00.000Z', tags: ['tag7', 'tag8'], favoriteCount: 40 },
  // 更多商品
]);

const isRefreshing = ref(false);
const numberOfColumns = 2;

// 计算每列的 items
const columnItems = ref(Array.from({ length: numberOfColumns }, () => []));
items.value.forEach((item, index) => {
  columnItems.value[index % numberOfColumns].push(item);
});

// 下拉刷新处理
const onRefresh = () => {
  setTimeout(() => {
    // 模拟刷新操作，重新设置数据
    items.value = [
      { itemId: 1, title: '商品 1', price: 123, imageUrl: 'https://loremflickr.com/400/400?lock=1', createdAt: '2023-07-11T11:50:00.000Z', tags: ['tag1', 'tag2'], favoriteCount: 10 },
      { itemId: 2, title: '商品 2', price: 456, imageUrl: 'https://loremflickr.com/400/400?lock=2', createdAt: '2023-07-12T12:30:00.000Z', tags: ['tag3', 'tag4'], favoriteCount: 20 },
      { itemId: 3, title: '商品 3', price: 789, imageUrl: 'https://loremflickr.com/400/400?lock=3', createdAt: '2023-07-13T13:50:00.000Z', tags: ['tag5', 'tag6'], favoriteCount: 30 },
      { itemId: 4, title: '商品 4', price: 111, imageUrl: 'https://loremflickr.com/400/400?lock=4', createdAt: '2023-07-14T14:50:00.000Z', tags: ['tag7', 'tag8'], favoriteCount: 40 },
    ];

    columnItems.value = Array.from({ length: numberOfColumns }, () => []);
    items.value.forEach((item, index) => {
      columnItems.value[index % numberOfColumns].push(item);
    });

    isRefreshing.value = false;
  }, 1500);
};
</script>

<style scoped>
.masonry {
  display: flex;
  gap: 16px;
  /* 列之间的间距 */
  padding: 16px;
}

.masonry-column {
  flex: 1;
  /* 确保每列均分宽度 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 列内卡片的间距 */
}

.masonry-item {
  margin-bottom: 16px;
  /* 控制卡片之间的垂直间距 */
}
</style>
