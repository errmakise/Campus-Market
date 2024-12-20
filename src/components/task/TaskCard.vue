<template>
  <div class="card-container">
    <div class="card-tags">
      <div class="card-tag" v-for="tag in props.tags" :key="tag">
        #{{ tag }}
      </div>
    </div>

    <img :src="props.imageUrl" alt="Item Image" class="card-image">

    <div class="card-title">{{ props.title }}</div>
    <div class="card-letter" v-if="props.location != ''">
      {{ props.location }}
      {{ distance }}
    </div>
    <span class="card-letter">截止时间：{{ props.deadLine }}</span>
    <div class="card-letter">{{ formattedTime }}</div>
    <div class="card-bottom">
      <span class="card-price">酬金:￥{{ props.reward }}</span>
      <button :class="'round-button'" @click="handleClick">
        <span>接单</span>
      </button>
    </div>


  </div>
</template>

<script setup>
import { formatTime } from '@/utils/timeFormatter';

const formattedTime = computed(() => formatTime(props.createdAt));

const props = defineProps({
  taskId: {
    type: Number,
    required: true,
  },
  title: { type: String, default: '无标题' },
  imageUrl: { type: String, default: 'https://loremflickr.com/400/400?lock=8619595519661968' },
  createdAt: { type: String, default: '2023-07-11T11:50:00.000Z' },
  // 默认值为数组时，应该使用函数返回一个新数组，否则多个实例会共享同一个数组。
  tags: { type: Array, default: () => ['无', '无', '无'] },
  reward: { type: Number, default: 333 },
  deadLine: { type: String, default: '2023-07-11T11:50:00.000Z' },
  location: { type: String, default: '' },
  distance: { type: Number, default: 0 },
});
</script>

<style scoped>
.card-bottom {
  margin-top: auto;
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 2px;
  height: 3.1vh;
}

.round-button {
  border-radius: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  color: #ffffff;
  background-color: #613EEA;
  font-size: 12px;
}


.card-letter {
  font-size: 10px;
  font-family: 'ali', sans-serif;
  font-weight: 300;
  color: rgba(26, 26, 26, 1);
  margin-top: 5px;
  word-break: break-all;
}


.card-title {
  font-family: 'ali', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(26, 26, 26, 1);
  margin-bottom: 0.8vh;

  word-break: break-all;
  white-space: normal;
}

.card-image {
  width: 100%;
  margin-bottom: 0.5vh;
  border-radius: 16px;
}

.card-price {
  font-size: 10px;
  font-family: 'ali', sans-serif;
}


.card-tags {
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
  border-bottom: solid 2px #e0dada;
  margin-bottom: 0.6vh;
}

.card-tag {
  font-size: 12px;
  font-family: 'ali', sans-serif;
  font-weight: 300;
  color: #000000;
  margin-right: 5px;
}

.card-container {
  padding: 1.185vh 1.422vh 1.185vh;
  background-color: #ffffff;
  border-radius: 16px;
  width: 46.4vw;
  min-height: 22.9vh;
  height: auto;
  display: flex;
  flex-direction: column;

  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
</style>
