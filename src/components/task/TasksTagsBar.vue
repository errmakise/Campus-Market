<template>
  <div class="tags-container">
    <scrollBar direction="x" :activeIndex="activeIndex">
      <div class="scrollBarItem" v-for="(item, index) in options" :key="item.tagId" @click="changeNav(index)"
        :class="{ active: index === activeIndex }">
        <div>#{{ item.tagName }}</div>
      </div>
    </scrollBar>
    <img src="@/assets/images/extendTags.png" class="image" @click="handleExtendTags" alt="Extend Tags" />

    <!-- 弹窗 -->
    <van-popup v-model:show="showPopup" position="bottom" round>
      <div class="popup-content">
        <button class="popup-button" v-for="(item, index) in options" :key="item.tagId" @click="changeNav(index)"
          :class="{ active: index === activeIndex }">
          <span>{{ item.tagName }}</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义组件的 props
const props = defineProps({
  activeIndex: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array,
    required: true,
  },
});

// 定义组件的事件
const emit = defineEmits(['tabClick']);

// 切换标签选中状态
const changeNav = (index) => {
  console.log("点击标签", index);
  showPopup.value = false
  emit('tabClick', index);
};
// 控制弹窗显示/隐藏
const showPopup = ref(false);
// 处理点击“扩展标签”图标的逻辑
const handleExtendTags = () => {
  console.log("点击扩展标签");
  showPopup.value = true

};
</script>

<style scoped>
.image {
  height: 80%;
}

.tags-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.8vh;
  background-color: white;
  padding: 0px 6px;
  border-radius: 20px;
}

.scrollBarItem {
  padding: 0px 10px;
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

.popup-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4vh 8vw;
}

.popup-button {
  padding: 5px 15px;
  color: #4F4D4D;
  background-color: #EDEDED;
  display: flex;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
</style>
