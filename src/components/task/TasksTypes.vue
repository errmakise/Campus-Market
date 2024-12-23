<template>

  <div class="types-container">
    <div class="tabs">
      <span v-for="(item) in tabs" :key="item.typeId" :class="['tab', { active: activeTab === item.typeId }]"
        @click="handleClick(item.typeId)">
        {{ item.typeName }}
      </span>
    </div>
    <img src="@/assets/images/categoryBack.png" class="tab-border" alt="Category Border">
  </div>


</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';

// 定义组件的 props
const props = defineProps({
  selectedTab: {
    type: Number,
    default: 3, // 默认选中 '求助' 对应的 typeId
  },
  tabs: {
    type: Array,
    required: true, // 强制传递 tabs
    default: () => [
      { typeId: 1, typeName: '推荐' },
      { typeId: 2, typeName: '最新' },
      { typeId: 3, typeName: '求助' },
      { typeId: 4, typeName: '跑腿' },
      { typeId: 5, typeName: '寻物' },
      { typeId: 6, typeName: '求购' },
    ],
  },
});

// 定义组件的事件
const emit = defineEmits(['tabClick']);

// 定义 activeTab，基于 typeId
const activeTab = ref(props.selectedTab);

// 监听 props.selectedTab 的变化，更新 activeTab
watch(() => props.selectedTab, (newVal) => {
  activeTab.value = newVal;
});

// 处理标签点击事件
const handleClick = (typeId) => {
  console.log("点击标签", typeId, props.tabs.find(item => item.typeId === typeId));
  activeTab.value = typeId;
  emit('tabClick', typeId);
};

// 初始化 activeTab
onMounted(() => {
  activeTab.value = props.selectedTab;
});
</script>


<style scoped>
.types-container {
  position: relative;
  width: 95vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "ali", sans-serif;
}

.tabs {
  display: flex;
  width: 100%;
  position: relative;
  padding-left: 10vw;
  padding-right: 10vw;
  z-index: 2;
  align-items: flex-end;
  justify-content: space-between;
}

.tab {
  font-size: 16px;
  padding-bottom: 2vh;
  color: #666;
  position: relative;


}

.tab.active {
  font-weight: bold;
  color: black;
  font-size: 18px;


}

.tab-border {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  z-index: 1;
}
</style>
