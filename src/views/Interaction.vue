<template>
  <div class="container">
    <TopBar :isEllipsis="false" title="互动记录" :isRound="true" style="background-color: white" />

    <div class="bars">
      <div v-for="(item, index) in categories" :key="index" class="bar-item" @click="activeIndex = index">
        <span :class="{ active: activeIndex === index }">{{ item }}</span>
        <div class="emphasis" v-if="activeIndex === index"></div>
      </div>
    </div>

    <InteractionCard class="card" />
    <InteractionCard class="card" />
  </div>
</template>

<script setup>
import InteractionCard from '@/components/InteractionCard.vue';
import TopBar from '@/components/TopBar.vue'

const activeIndex = ref(0)
const categories = ['我评论的', '我点赞的', '我回复的']
</script>

<style scoped>
.card {
  margin-top: 0.6vh;
}

.bar-item {
  position: relative;
  text-align: center;
  font-size: 16px;
  width: 20vw;
}

.bar-item span {
  display: inline-block;
  line-height: 1.2;
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
  height: 8vh;
  background-color: white;
  display: flex;
  width: 100%;
  gap: 3vw;
  align-items: center;
  padding-left: 5vw;
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
