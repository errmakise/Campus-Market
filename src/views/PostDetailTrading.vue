<template>
  <div class="container">
    <TopBar />

    <div class="state">
      <span>待完成</span>
    </div>


    <van-steps :active="active" active-color="#000" class="steps">
      <!-- <van-step>已接单</van-step>
      <van-step>待完成</van-step>
      <van-step>待确认</van-step>
      <van-step>交易完成</van-step>
      <van-step>已评价</van-step> -->


      <van-step>待付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
      <van-step>已完结</van-step>
    </van-steps>

    <div class="content">
      <PostContent :deadline="deadline" :reward="reward" :address="address" :content="content" :images="images"
        :tags="tags" :showFooter="false" />
    </div>

    <PostBottomBar barType="toFinish" />
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue';

const active = ref(1);

const createdAt = ref('2023-07-11T11:50:00.000Z')
const formattedTime = computed(() => formatTime(createdAt.value))
const deadline = ref('2023-07-11T11:50:00.000Z')
const reward = ref('1000')
const address = ref('上海市')
const content = ref('我是任务详情')
const images = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
])
</script>

<style scoped>
.content {
  background-color: white;
  padding: 1.5vh 5vw;
  display: flex;
  flex-direction: column;
  margin: 1vh 3vw;
  border-radius: 10px;
}

.state {
  font-size: 28px;
  font-weight: 600;
  width: 100vw;
  padding: 1vh 6vw;

}

.steps {
  width: 90vw;
  background-color: #fafafa;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-size: 14px;
  font-family: 'ali', sans-serif;
}
</style>
