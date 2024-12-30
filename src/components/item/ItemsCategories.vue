<template>
  <div class="grid-container">
    <div class="category-item" v-for="(category, index) in categories" :key="index" @click="handleClick(category.icon)">
      <img :src="getIconPath(category.icon)" alt="icon" class="category-icon" />
      <div class="category-name">{{ category.label }}</div>
    </div>
  </div>
</template>

<script setup>

// 根据图标名称获取路径
const getIconPath = (iconName) => {
  console.log(`/src/assets/images/categories/${iconName}.png`)
  return `/src/assets/images/categories/${iconName}.png`;
};

// 接收传递的分类列表
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const handleClick = (iconName) => {
  console.log("click", iconName)
  router.push({ path: `/items/${iconName}` });
};
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
</style>
