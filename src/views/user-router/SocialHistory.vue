<template>
  <div class="container">
    <TopBar :isEllipsis="false" title="互动记录" :isRound="true" style="background-color: white" />

    <EmphasizeBar :categories="categories" :defaultIndex="activeIndex" @change="handleCategoryChange" />

    <InteractionCard class="card" />
    <InteractionCard class="card" />
  </div>
</template>

<script setup>
import InteractionCard from '@/components/InteractionCard.vue';
import TopBar from '@/components/TopBar.vue'

const activeIndex = ref(0)
const categories = [{
  index: 0,
  name: '我评论的'
}, {
  index: 1,
  name: '我点赞的'
}, {
  index: 2,
  name: '我回复的'
}]
</script>

<style scoped>
.card {
  margin-top: 0.6vh;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-family: 'ali', sans-serif;
  font-size: 14px;
}
</style>
