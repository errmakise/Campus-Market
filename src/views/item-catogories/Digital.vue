<template>
  <div class="back"></div>

  <div class="container">
    <TopBar title="数码产品" />

    <SearchBar />
    <CategoryGrid :categories="categories" style="margin-top: 3vh;"/>
  </div>
</template>

<script setup>
import ItemsCategories from '@/components/ItemsCategories.vue';
import SearchBar from '@/components/SearchBar.vue';
import TopBar from '@/components/TopBar.vue'


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
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}
.back {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 42vh;
  opacity: 1;
  background: linear-gradient(
    180deg,
    rgba(46, 126, 255, 0.46) 0%,
    rgba(141, 184, 252, 0.29) 25.68%,
    rgba(38, 120, 252, 0.01) 100%
  );
  z-index: 1;
}
</style>
