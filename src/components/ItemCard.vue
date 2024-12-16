<template>
  <div class="card-container">
    <div class="card-tags">
      <div class="card-tag" v-for="tag in props.tags" :key="tag">
        #{{ tag }}
      </div>
    </div>

    <img :src="props.imageUrl" alt="Item Image" class="card-image">
    <div class="card-title">{{ props.title }}</div>

    <div class="card-price">
      <span class="card-price-signal">￥</span>
      <span class="card-price-value">{{ props.price }}</span>
      <span class="card-favor">{{ props.favoriteCount }}人想要</span>
    </div>
    <div class="card-time">{{ formattedTime }}</div>

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
  price: { type: Number, default: 333 },
  imageUrl: { type: String, default: 'https://loremflickr.com/400/400?lock=8619595519661968' },
  createdAt: { type: String, default: '2023-07-11T11:50:00.000Z' },
  // 默认值为数组时，应该使用函数返回一个新数组，否则多个实例会共享同一个数组。
  tags: { type: Array, default: () => ['无', '无', '无'] },
  favoriteCount: { type: Number, default: 0 },
});
</script>

<style scoped>
.card-favor {
  font-size: 10px;
  font-family: ali;
  font-weight: 400;
  color: rgba(163, 162, 162, 1);
  margin-left: 5px;
}

.card-time {
  font-size: 10px;
  font-weight: 300;
  color: rgba(26, 26, 26, 1);
  font-family: ali;
  margin-top: 5px;

}

.card-title {
  font-family: ali;
  font-size: 12px;
  font-weight: 400;
  color: rgba(26, 26, 26, 1);
  margin-bottom: 1.5vh;

  word-break: break-all;
  white-space: normal;
}

.card-image {
  width: 100%;
  margin-bottom: 0.5vh;
  border-radius: 16px;
}

.card-price {
  margin-top: auto;
}

.card-price-signal {
  color: #ff0000;
  font-size: 10px;
  font-family: ali;
  line-height: 10px;
  font-weight: 700;
}

.card-price-value {
  color: #ff0000;
  font-size: 18px;
  font-family: ali;
  font-weight: 700;
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
  font-family: ali;
  font-weight: 300;
  color: #000000;
  margin-right: 5px;
}

.card-container {
  padding: 1.185vh 1.422vh 1.185vh;
  background-color: #ffffff;
  border-radius: 16px;
  width: 44vw;
  min-height: 22.9vh;
  height: auto;
  display: flex;
  flex-direction: column;


  margin-bottom: 8px;
  box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
</style>
