<template>
  <div>
    <div class="container">
      <div class="tabs">
        <span v-for="(item, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
          @click="activeTab = index">
          {{ item }}
        </span>
      </div>
      <img src="@/assets/images/categoryBack.png" class="tab-border">

    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
const tabs = ['推荐', '最新', '求助', '跑腿', '寻物', '求购'];

const activeTab = ref(2); // 默认选中“求助”


</script>

<style scoped>
.container {
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
