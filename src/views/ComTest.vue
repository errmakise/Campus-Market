<template>
  <div class="container">
    <TaskMapComponent />
  </div>
</template>

<script setup>
import ItemList from '@/components/itemList.vue';
import CategoryGrid from '@/components/ItemsCategories.vue'

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
  background-color: antiquewhite;
  height: 100%;
  align-items: center;
  width: 100vw;
}
</style>
