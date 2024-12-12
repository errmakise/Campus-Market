<template>
  <div class="waterfall-grid">
    <div class="masonry">
      <div class="masonry-column" v-for="(column, index) in columnItems" :key="index">
        <div class="masonry-item" v-for="item in column" :key="item.itemId">
          <slot name="card" :item="item"></slot>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-indicator">正在加载...</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  numberOfColumns: {
    type: Number,
    default: 2,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// 瀑布流分列数据
const columnItems = ref(Array.from({ length: props.numberOfColumns }, () => []));

// 根据 items 动态分配到列中
const updateColumnItems = () => {
  const columns = Array.from({ length: props.numberOfColumns }, () => []);
  props.items.forEach((item, index) => {
    columns[index % props.numberOfColumns].push(item);
  });
  columnItems.value = columns; // 一次性更新，减少多次赋值
};


// 监听 items 的变化，更新列
watch(
  () => props.items,
  (newItems, oldItems) => {
    if (newItems !== oldItems) updateColumnItems(); // 检查是否有变化再更新
  },
  { immediate: true }
);

</script>

<style scoped>
.waterfall-grid {
  width: 100%;
  overflow-x: hidden;
  justify-content: flex-first;

}

.masonry {
  display: flex;
  gap: 8px;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.masonry-item {
  margin-bottom: 8px;
}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
