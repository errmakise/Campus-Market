<template>
  <div class="comment-item">
    <Avatar :src="props.comment.userAvatarUrl" :size="avatarSize" />
    <div class="comment-content">
      <div class="comment-header">
        <span class="comment-username">{{ props.comment.username }}</span>
        <span class="comment-time">{{ formatTime(props.comment.createTime) }}</span>
      </div>
      <span class="comment-text">{{ props.comment.content }}11111111111111111111</span>
    </div>
    <div class="report-button" @click="clickReport">举报</div>
    <div @click="toggleLike" class="like">
      <img :src="isLiked ? '/src/assets/images/post-comment-unlike.png' : '/src/assets/images/post-comment-like.png'"
        alt="Like" class="like-icon" />
      <span>{{ likeCount }}</span>
    </div>

  </div>
  <!-- 显示子评论 -->
  <div class="reply-list" v-if="props.comment.commentList && props.comment.commentList.length">
    <PostCommentCard v-for="reply in props.comment.commentList" :key="reply.id" :comment="reply" />
  </div>
</template>

<script setup>
import { formatTime } from '@/utils/timeFormatter'
import { useReportStore } from '@/stores/report'
const emit = defineEmits(['clickReport']);

const reportStore = useReportStore()
const router = useRouter()
const clickReport = () => {
  emit('clickReport');
  console.log('点击举报按钮');
  reportStore.setReportData({
    type: 2,
    object: {
      id: props.comment.id,
      userAvatarUrl: props.comment.userAvatarUrl,
      username: props.comment.username,
      content: props.comment.content,
      createTime: props.comment.createTime,
    }
  })
  console.log('reportStore:', reportStore.reportData);

  // 跳转到 ReportPage
  router.push({ name: 'report' })
};

const avatarSize = computed(() => {
  return props.comment.replyId ? '3.5vh' : '5vh'
})
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const isLiked = ref(props.comment.isLiked)
// const likeCount = ref(props.comment.likeCount)
const likeCount = ref(111)


// 方法：切换点赞状态
const toggleLike = async () => {
  try {
    showSuccessToast({
      message: isLiked.value ? '已取消赞' : '已点赞',
      duration: 500
    })
    isLiked.value = !isLiked.value;
    likeCount.value += isLiked.value ? 1 : -1;

  } catch (error) {
    showFailToast({
      message: '点赞失败',
      duration: 500
    })
    console.error('点赞失败:', error)
  }
}



onMounted(() => {
})
</script>

<style scoped>
.reply-list {
  width: calc(100% - 8vw);
  margin-left: auto;
}

.like {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  margin-left: 2vw;
}

.like-icon {
  height: 3.5vh;
  margin-bottom: 0.2vh;
}

.report-button {
  font-size: 12px;
  color: #707070;
  cursor: pointer;
  margin-left: auto;

}

.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5vh;
  width: 100%;

}

.comment-content {
  display: flex;
  flex-direction: column;
  margin-left: 3vw;
  gap: 0.5vh;
  max-width: 60%;
}

.comment-header {
  color: #838383;
  font-size: 12px;
}

.comment-username {
  font-size: 14px;
  margin-right: 2.6vw;
}

.comment-text {


  word-break: break-all;
}



.replies {
  margin-top: 1vh;
  margin-left: 2vh;
  border-left: 2px solid #ddd;
  padding-left: 1vh;
}
</style>
