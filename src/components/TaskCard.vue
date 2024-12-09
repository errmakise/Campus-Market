<template>
  <div class="card-container">
    <div class="card-tags">
      <div class="card-tag" v-for="tag in props.tags" :key="tag">
        #{{ tag }}
      </div>
    </div>

    <img :src="props.imageUrl" alt="Item Image" class="card-image">

    <div class="card-title">{{ props.title }}</div>
    <span class="card-letter" v-if="location != null">{{ props.location }} {{ distance }}</span>
    <span class="card-letter">截止时间：{{ props.deadLine }}</span>
    <div class="card-letter">{{ formattedTime }}</div>
    <div class="card-bottom">
      <span class="card-price">酬金:￥{{ props.reward }}</span>
      <button :class="'round-button'" @click="handleClick">
        <img v-if="iconPath" :src="iconPath" alt="icon" class="button-icon" :style="{ height: buttonData.iconSize }" />
        <span>接单</span>
      </button>
    </div>


  </div>
</template>

<script setup>
const formattedTime = computed(() => {
  if (!props.createdAt) return '未知时间';

  const createdAtTime = new Date(props.createdAt);
  const now = new Date();
  const diffInMs = now - createdAtTime;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes > 0 ? `${diffInMinutes}分钟前发布` : '刚刚发布';
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前发布`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}天前发布`;
  }
});

const props = defineProps({
  itemId: {
    type: Number,
    required: true,
  },
  title: { type: String, default: '无标题' },
  imageUrl: { type: String, default: 'https://loremflickr.com/400/400?lock=8619595519661968' },
  createdAt: { type: String, default: '2023-07-11T11:50:00.000Z' },
  // 默认值为数组时，应该使用函数返回一个新数组，否则多个实例会共享同一个数组。
  tags: { type: Array, default: () => ['无', '无', '无'] },
  reward: { type: Number, default: 333 },
  deadLine: { type: Number, default: 0 },
  location: { type: String, default: '无' },
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
