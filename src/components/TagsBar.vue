<template>
  <div class="tags-container">
    <scrollBar direction="x">
      <button class="scrollBarItem" v-for="(item, index) in options" :key="index" @click="toggleNav(item, index)"
        :class="activeIndex.includes(index) ? 'active' : null">
        <span>{{ item.name }}</span>
      </button>
    </scrollBar>
    <img src="@/assets/images/extendTags.png" class="image">
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

// 使用数组记录当前激活的索引（支持多选）
const activeIndex = ref([]);

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { id: 1, name: '关注' },
      { id: 2, name: '推荐' },
      { id: 3, name: '本地' },
      { id: 4, name: '新闻' },
      { id: 5, name: '汽车' },
      { id: 6, name: '直播' },
      { id: 7, name: '游戏' },
      { id: 8, name: '小说' },
      { id: 9, name: '美女' },
    ],
  },
});

// 定义组件事件，用于通知父组件选中标签
const emit = defineEmits(['update:selectedTags']);

// 切换选中状态
const toggleNav = (item, index) => {
  const idx = activeIndex.value.indexOf(index);

  if (idx === -1) {
    activeIndex.value.push(index);
  } else {
    activeIndex.value.splice(idx, 1);
  }

  // 通知父组件选中的标签 ID
  const selectedIds = activeIndex.value.map((i) => props.options[i].id);
  emit('update:selectedTags', selectedIds);
};
</script>


<style scoped>
.image {
  height: 30px;
}

.tags-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: 'ali', sans-serif;
  font-size: 14px;
}

.scrollBarItem {
  padding: 5px 15px;
  color: #4F4D4D;
  background-color: #EDEDED;

  display: flex;

  border: none;
  border-radius: 20px;
  margin-right: 2vw;


}

.active {
  color: white;
  background-color: #4794FF;
  font-weight: 600;
}
</style>
