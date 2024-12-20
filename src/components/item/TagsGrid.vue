<template>
  <div class="grid-container">
    <div class="category-item" v-for="(category, index) in categories" :key="index" @click="setActiveIndex(index)">
      <img :src="getIcon(index, category.icon, category.activeIcon)" alt="icon" class="category-icon" />
      <div class="category-name" :class="{ active: activeIndex === index }">
        {{ category.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 当前激活的分类索引
const activeIndex = ref(0);

// 设置激活的索引
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

// 获取图标路径
const getIcon = (index, defaultIcon, activeIcon) => {
  const iconKey = activeIndex.value === index ? activeIcon : defaultIcon;
  return `/src/assets/images/categories/${iconKey}.png`;
};


// 接收父组件传递的属性
defineProps({
  type: {
    type: String,
    required: true,
    default: "itemHome",
  },
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 95vw;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0.474vh 0.6vh 1.185vh;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.9vh 0;
  cursor: pointer;
}

.category-icon {
  height: 3.5vh;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  color: #2b2b2b;
  font-family: ali;
}

.category-name.active {
  color: #000000;
  /* 选中分类时，文字变黑色 */
}
</style>
