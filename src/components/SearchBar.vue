<script setup>
const searchQuery = ref("");
</script>

<template>
  <div class="flex-row justify-between items-center section">
    <img class="image" src="@/assets/images/search.png" />
    <input type="text" class="search-input" placeholder="请输入搜索内容" v-model="searchQuery" />
    <div class="flex-row items-center">
      <div class="divider"></div>
      <span class="ml-8 text">搜索</span>
    </div>
  </div>
</template>

<style>
.search-input {
  flex-grow: 1;
  border: none;
  padding: 4px 8px;
  margin-left: 6px;
  margin-right: 8px;
  font-family: ali;
  font-size: medium;
  outline: none;
}

.section {
  margin-left: 1.066vh;
  margin-right: 2.133vh;
  padding: 0.8vh 1.4vh 0.8vh 1.8vh;
  background-color: #ffffff;
  border-radius: 5.924vh;
}

.image {
  height: 2.2vh;
}

.divider {
  background-color: #999393;
  width: 0.355vh;
  height: 2.335vh;
  flex-shrink: 0;
}

.text {
  color: #6e6a6a;
  font-family: ali;
  line-height: 1.523vh;
  font-size: medium;
}
</style>
