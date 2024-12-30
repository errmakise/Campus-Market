<script setup>
const searchQuery = ref("");

const props = defineProps({
  placeholder: {
    type: String,
    default: "请输入搜索内容",
  },
  barType: {
    type: String,
    default: "home",
  },
})


const clickBack = () => {
  // router.go(-1);
  window.history.back()
}
</script>

<template>
  <div v-if="props.barType === 'home'" class="home">
    <img class="image" src="@/assets/images/search.png" />
    <input type="text" class="search-input" v-model="searchQuery" />
    <div class="flex-row items-center">
      <div class="divider"></div>
      <span class="ml-8 text">搜索</span>
    </div>
  </div>

  <div v-else class="top">
    <img class="left-round" src="@/assets/images/left-round.png" alt="left-round" @click="clickBack" />
    <dix class="search-bar2">
      <input class="search-input" type="text" placeholder="搜索" />
      <img src="@/assets/images/search2.png" style="height: 20px;" />
    </dix>
  </div>

</template>

<style>
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 93vw;
  padding: 0.8vh 1.4vh 0.8vh 1.8vh;
  background-color: #ffffff;
  border-radius: 5.924vh;
}

.top {
  display: flex;
  width: 100%;
  padding: 2vh 2vw;
  position: fixed;

}

.left-round {
  height: 42px;
  border-radius: 50%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

.search-bar2 {

  display: flex;
  width: 80vw;
  justify-content: space-between;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding-right: 8px;
  margin-left: 5px;
  align-items: center;
  height: 40px;
}



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
  width: 93vw;
  padding: 0.8vh 1.4vh 0.8vh 1.8vh;
  background-color: #ffffff;
  border-radius: 5.924vh;
}

.image {
  height: 2vh;
  margin-left: 5px;
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
