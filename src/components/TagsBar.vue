<template>
  <div class="tags-container">
    <!-- 水平滚动条 -->
    <scrollBar direction="x">
      <button class="scrollBarItem" v-for="(item) in options" :key="item.tagId" @click="toggleTag(item.tagId)"
        :class="{ active: selectedTags.includes(item.tagId) }">
        <span>{{ item.tagName }}</span>
      </button>
    </scrollBar>

    <!-- 点击图片弹出 Popup -->
    <img src="@/assets/images/extendTags.png" class="image" @click="showPopup = true" />

    <!-- 弹窗 -->
    <van-popup v-model:show="showPopup" position="bottom" round>
      <div class="popup-content">
        <button class="popup-button" v-for="(item) in options" :key="item.tagId" @click="toggleTag(item.tagId)"
          :class="{ active: selectedTags.includes(item.tagId) }">
          <span>{{ item.tagName }}</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// 定义组件的 props
const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { tagId: 1, tagName: '关注' },
      { tagId: 2, tagName: '推荐' },
      { tagId: 3, tagName: '本地' },
      { tagId: 4, tagName: '新闻' },
      { tagId: 5, tagName: '汽车' },
      { tagId: 6, tagName: '直播' },
      { tagId: 7, tagName: '游戏' },
      { tagId: 8, tagName: '小说' },
      { tagId: 9, tagName: '美女' },
    ],
  },
  selectedTags: {
    type: Array,
    default: () => [],
  },
});

// 定义组件的事件
const emit = defineEmits(['update:selectedTags']);

// 控制弹窗显示/隐藏
const showPopup = ref(false);

// 切换标签选中状态
const toggleTag = (tagId) => {
  let updatedTags;
  if (props.selectedTags.includes(tagId)) {
    // 如果已经选中，则移除
    updatedTags = props.selectedTags.filter(id => id !== tagId);
    console.log('移除的标签 ID:', tagId);
  } else {
    // 如果未选中，则添加
    updatedTags = [...props.selectedTags, tagId];

  }
  // 触发事件，更新父组件的 selectedTags
  // 为了复用性，不直接修改pinia中的参数，而是提交给父组件修改
  emit('update:selectedTags', updatedTags);
};
</script>

<style scoped>
.tags-container {
  display: flex;
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
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.scrollBarItem.active {
  color: white;
  background-color: #4794FF;
  font-weight: 600;
}

.image {
  height: 30px;
  cursor: pointer;
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

.popup-button.active {
  color: white;
  background-color: #4794FF;
  font-weight: 600;
}
</style>
