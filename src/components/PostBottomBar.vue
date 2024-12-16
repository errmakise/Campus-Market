<template>
  <div class="bottom-bar">
    <div v-if="props.barType == 'post'" class="part-left">
      <div class="bottom-icon-button" @click="handleCommentClick">
        <img src="@/assets/images/comment.png" alt="icon" class="buttom-icon" />
        {{ commentCount }}
      </div>
      <div class="bottom-icon-button" @click="handleFavouriteClick">
        <img src="@/assets/images/favourite.png" alt="icon" class="buttom-icon" />
        {{ favouriteCount }}
      </div>
      <div class="bottom-icon-button" @click="handleLikeClick">
        <img src="@/assets/images/like.png" alt="icon" class="buttom-icon" />
        {{ likeCount }}
      </div>
    </div>

    <div v-else>
      <div class="bottom-icon-button" @click="handleCommentClick">
        <img src="@/assets/images/comment.png" alt="icon" class="buttom-icon" />
        查看评论
      </div>
    </div>

    <button class="chat-button" @click="handleChatClick">
      <span>私聊</span>
    </button>

    <button class="accept-button" @click="handleMainClick">
      <img v-if="props.barType == 'post'" src="@/assets/images/accept-icon.png" class="accept-icon" />
      <span>{{ label }}</span>
    </button>
  </div>
</template>

<script setup>
const label = computed(() => {
  switch (props.barType) {
    case 'post':
      return '接单'
    case 'toFinish':
      return '已完成'
    case 'toComfirm':
      return '确认完成'
    case 'toComment':
      return '去评价'
    case 'viewComment':
      return '查看评论'
    default:
      return '查看评论'
  }
})
const props = defineProps({
  barType: {
    type: String,
    default: 'post',
  },
  commentCount: {
    type: String,
    default: '100',
  },
  favouriteCount: {
    type: String,
    default: '100',
  },
  likeCount: {
    type: String,
    default: '100',
  },
})

const emit = defineEmits(['comment', 'favourite', 'like', 'chat', 'main'])

const handleCommentClick = () => {
  emit('comment')
  console.log('Comment clicked')
}

const handleFavouriteClick = () => {
  emit('favourite')
  console.log('Favourite clicked')
}

const handleLikeClick = () => {
  emit('like')
  console.log('Like clicked')
}

const handleChatClick = () => {
  emit('chat')
  console.log('Chat clicked')
}

const handleMainClick = () => {

  emit('main')
  console.log('main clicked')
}
</script>

<style scoped>
.part-left {
  display: flex;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 9vh;
  background-color: white;
  padding-left: 6vw;
  align-items: center;
}

.bottom-icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'ali', sans-serif;
  margin-right: 5vw;
}

.buttom-icon {
  height: 3.2vh;
}

.chat-button,
.accept-button {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}

.chat-button {
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  height: 5vh;
  padding: 0vh 5vw;
  background-color: #f2f2f2;
  margin-left: auto;
  color: #000000;
}

.accept-button {
  border-radius: 20px;
  border: none;
  display: flex;
  align-items: center;
  height: 5vh;
  padding: 0vh 3vw;
  color: #ffffff;
  background-color: #613eea;
  margin-left: 2vw;
  margin-right: 2vw;
}

.accept-icon {
  height: 3vh;
}
</style>
