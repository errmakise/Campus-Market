<template>
  <div class="container">
    <div style="background-color: white">
      <TopBar :isEllipsis="false" title="我发布的" :isRound="true" />
    </div>

    <div class="list">
      <div class="catagory">
        <span :class="{ active: activeCatagory === 0 }" @click="clickOnShowed">
          在展
        </span>
        <span :class="{ active: activeCatagory === 1 }" @click="clickAccepted">
          已被接取
        </span>
      </div>

      <EmphasizeBar v-if="activeCatagory === 1" :categories="statuCatagories" :defaultIndex="activeIndex"
        @change="handleCategoryChange" />

      <div class="card-list">
        <PostCard class="card" />
        <PostCard class="card" />
      </div>

    </div>

  </div>




</template>

<script setup>
const activeIndex = ref(0)
const statuCatagories = [{
  index: -1,
  name: '全部'
}, {
  index: 0,
  name: '待付款'
}, {
  index: 1,
  name: '待发货'
},
{
  index: 2,
  name: '待收货'
},
{
  index: 3,
  name: '待评价'
}, {
  index: 4,
  name: '已完结'
},
{
  index: 5,
  name: '申诉中'
}
]


const activeCatagory = ref(0)
const clickOnShowed = () => {
  console.log('点击了在展')
  activeCatagory.value = 0
  console.log('activeCatagory:', activeCatagory.value)
}
const clickAccepted = () => {
  activeCatagory.value = 1
}




</script>

<style scoped>
.card-list {
  margin-top: 1vh;
}

.list {
  width: 100vw;

  background-color: white;
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

.catagory {
  width: 100vw;
  padding: 0vh 4vw 3vh 4vw;
  display: flex;
  gap: 5vw;
  font-size: 16px;
  align-items: end;
}

.catagory .active {
  font-weight: bold;
  font-size: 20px;
}
</style>
