<template>
  <div>
    <div class="container">
      <scrollBar direction="x" :activeIndex="activeIndex">
        <div class="scrollBarItem" v-for="(item, index) in options" :key="index" @click="changeNav(item, index)"
          :class="index === activeIndex ? 'active' : null">
          <div>#{{ item.name }}</div>
        </div>
      </scrollBar>
      <img src="@/assets/images/extendTags.png" class="image">
    </div>
  </div>


</template>
<script setup>
// 先导入再注册下
import { ref } from 'vue';

// 使用 ref 记录当前的激活索引
const activeIndex = ref(0);

// 定义选项列表
const options = ref([
  { id: 1, name: '关注' },
  { id: 2, name: '推荐' },
  { id: 3, name: '本地' },
  { id: 4, name: '新闻' },
  { id: 5, name: '汽车' },
  { id: 6, name: '直播' },
  { id: 7, name: '游戏' },
  { id: 8, name: '小说' },
  { id: 9, name: '美女' }
]);

// 定义切换导航的方法
const changeNav = (item, index) => {
  activeIndex.value = index; // 更新 activeIndex
};
</script>
<style scoped>
.image {
  height: 80%;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 93vw;
  height: 3.5vh;
  background-color: white;
  padding: 0px 6px;
  border-radius: 20px;
}

.scrollBarItem {
  padding: 4px 10px;
  color: #4F4D4D;
  font-family: 'ali', sans-serif;
  font-size: 14px;
  display: flex;

  border-right: 1px solid #ccc;
}

.active {
  color: rgb(0, 0, 0);
  font-weight: 600;
}
</style>
