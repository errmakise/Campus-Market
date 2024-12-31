<template>
  <div class="bars" :class="{ 'few-categories': isFewCategories }">
    <div class="bar-item" v-for="item in categories" :key="item.index" @click="handleClick(item.index)">
      <span :class="{ active: activeIndex === item.index }">{{ item.name }}</span>
      <div class="emphasis" v-if="activeIndex === item.index"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
const fewCategoriesThreshold = 5
// 接收父组件传递的 props
const props = defineProps({
  categories: {
    type: Array,
    required: true, // 分类数据，例如 [{ index: 0, name: '全部' }, ...]
  },
  defaultIndex: {
    type: Number,
    default: 0, // 默认激活的索引
  }
});

// 触发事件
const emit = defineEmits(['change']);

// 当前激活的索引
const activeIndex = ref(props.defaultIndex);

// 计算分类数量是否较少
const isFewCategories = computed(() => props.categories.length <= fewCategoriesThreshold);

// 点击标签时触发事件
const handleClick = (index) => {
  activeIndex.value = index;
  emit('change', index); // 将当前索引传递给父组件
};
</script>


<style scoped>
.bar-item {
  position: relative;
  text-align: center;
  font-size: 16px;
  padding: 0 3px;
}

.bar-item span {
  display: inline-block;
  position: relative;
  z-index: 2;
  padding: 5px 0;
}

.bar-item .active {
  font-weight: bold;
}

.bar-item .emphasis {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 8px;
  background-color: #B8A6FF;
  transform: translateY(-50%) translateX(-50%);
  z-index: 1;
  border-radius: 4px;
}

.bars {

  background-color: white;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 3vw;
  padding-right: 3vw;
}

/* 分类较少时靠左 */
.few-categories {
  justify-content: flex-start;
  gap: 3vw;
  /* 固定间距 */
}

/* 分类较多时在一行内均匀分布 */
.bars:not(.few-categories) {
  justify-content: space-between;

}
</style>
