<template>
  <div class="card-container">
    <div class="post">
      <div class="image-container">
        <img :src="props.imageUrl" alt="Post Image" class="post-image" />
      </div>
      <span class="post-title">{{ props.postTitle }}</span>
    </div>
    <div class="comment">
      <span class="comment-text">{{ props.comment }}</span>
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
  comment: {
    type: String,
    default: '评论',
  }
})
</script>

<style scoped>
.comment {
  width: 100%;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.post-title {}

.post {
  display: flex;
  justify-content: left;
  width: 100%;
  border-bottom: 1px solid rgb(236, 236, 236);
  padding-bottom: 2vh;
}

.image-container {
  width: 6vh;
  height: 6vh;
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
}
</style>
