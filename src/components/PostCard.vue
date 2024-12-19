<template>
  <div class="card-container">
    <div class="post">
      <div class="image-container">
        <img :src="props.imageUrl" alt="Post Image" class="post-image" />
      </div>
      <span class="post-title">{{ props.postTitle }}</span>
      <span class="post-money">￥{{ props.money }}</span>
    </div>

    <div class="button-bar">
      <button class="common">
        <span>删除</span>
      </button>

      <button class="common">
        <span>编辑</span>
      </button>
      <button class="common" style="color: white;background-color:#613EEA ;">
        <span>修改价格</span>
      </button>
    </div>


  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'

const activeIndex = ref(0)
const categories = ['我评论的', '我点赞的', '我回复的']

const props = defineProps({
  postTitle: {
    type: String,
    default: '标题',
  },
  imageUrl: {
    type: String,
    default: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
  title: {
    type: String,
    default: '标题',
  },
  money: {
    type: Number,
    default: 100,
  }
})
</script>

<style scoped>
.button-bar {
  display: flex;
  gap: 3vw;
  width: 100%;
  justify-content: end;
}

.common {
  border: none;
  border-radius: 20px;
  height: 30px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-money {
  margin-left: auto;
}


.post-title {}

.post {
  display: flex;
  justify-content: left;
  width: 100%;
  margin-bottom: 2vh;
  align-items: center;
}

.image-container {
  width: 7vh;
  height: 7vh;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 4vw;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-container {
  background-color: white;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'ali', sans-serif;
  font-size: 14px;
  padding: 1.5vh 5vw;
  margin-bottom: 2vh;

}
</style>
