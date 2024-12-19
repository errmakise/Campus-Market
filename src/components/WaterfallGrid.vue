<template>
  <div class="waterfall-grid">
    <div class="masonry">
      <div class="masonry-column" v-for="(column, index) in columnElements" :key="index">
        <div class="masonry-item" v-for="element in column" :key="element.id">
          <slot name="card" :element="element"></slot>
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
  elements: {
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
const columnElements = ref(Array.from({ length: props.numberOfColumns }, () => []));

// 根据 elements 动态分配到列中
const updateColumnElements = () => {
  const columns = Array.from({ length: props.numberOfColumns }, () => []);
  props.elements.forEach((item, index) => {
    columns[index % props.numberOfColumns].push(item);
  });
  columnElements.value = columns; // 一次性更新，减少多次赋值
};


// 监听 elements 的变化，更新列
watch(
  () => props.elements,
  (newElements, oldElements) => {
    if (newElements !== oldElements) updateColumnElements(); // 检查是否有变化再更新
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
  padding: 0vh 1vw;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.masonry-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
