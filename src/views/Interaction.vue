<template>
  <div class="container">
    <TopBar :isEllipsis="false" title="互动记录" :isRound="true" style="background-color: white" />
    <EmphasizeBar />

    <div class="bars">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="bar-item"
        @click="activeIndex = index"
      >
        <span  :class="{ active: activeIndex === index }">{{ item }}</span>
        <div class="emphasis" v-if="activeIndex === index"></div>
    </div>


    </div>
  </div>
</template>

<script setup>
import EmphasizeBar from '@/components/emphasizeBar.vue'
import TopBar from '@/components/TopBar.vue'

const activeIndex = ref(0)
const categories = ['我评论的', '我点赞的', '我回复的']
</script>

<style scoped>
.bar-item {
  position: relative;
  text-align: center;
  font-size: 16px;
  width: 20vw;
}

.bar-item span {
  display: inline-block;
  line-height: 1.2; /* 调整行高 */
  position: relative;
  z-index: 2; /* 确保文字在下划线上面 */
  padding: 5px 0; /* 增加一些内边距 */
}

/* 激活状态下的文字样式 */
.bar-item .active {
  font-weight: bold;
}

/* 下划线样式 */
.bar-item .emphasis {
  position: absolute;
  bottom: 0; /* 下划线紧贴底部 */
  left: 50%; /* 居中对齐 */
  width: 100%; /* 宽度与父容器相同 */
  height: 8px; /* 下划线高度（粗线） */
  background-color: #B8A6FF; /* 下划线颜色 */
  transform: translateY(-50%) translateX(-50%); /* 让下划线穿过文字一半 */
  z-index: 1; /* 确保下划线在文字下方 */
  border-radius: 4px; /* 圆角效果 */
}
.bars {
  height: 5vh;
  background-color: white;
  display: flex;
  width: 100%;
  gap: 8vw;
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
  gap: 1.777vh;
  overflow-x: hidden;
  font-family: 'ali', sans-serif;
  font-size: 14px;
}
</style>
