<template>
  <div class="container">
    <SearchBar barType="tasks" style="height: 9.5vh; background-color: white" />

    <div class="post">
      <div class="part">
        <div class="publisher">
          <div class="left-part" @click="handleClickPublisher">
            <Avatar :src="postDetail.avatarUrl" size="5vh" />

            <div class="publisher-info">
              <div class="publisher-name">{{ postDetail.username }}</div>
              <div class="publisher-time">
                {{ formattedTime }}
              </div>
            </div>
          </div>

          <button class="follow-button" :style="buttonStyle" @click="handleFollowClick">
            <img src="@/assets/images/follow.png" alt="icon" class="button-icon" />
            <span>关注</span>
          </button>
        </div>

        <div class="divider"></div>
        <PostContent :deadline="postDetail.deadline" :reward="postDetail.money" :address="postDetail.address"
          :content="postDetail.content" :images="postDetail.picUrl" :tags="postDetail.tags"
          @click-report="clickPostReport" />
      </div>

      <div class="part">
        <span style="font-size: 16px; font-weight: 600">评论</span>
        <div class="publish-comment">
          <Avatar :src="userAvator" size="5vh" />
          <input class="input-frame" type="text" placeholder="点击发布评论" @click="clickPublishTopComment" v-model="comment"
            readonly />
        </div>


        <!-- 评论列表 -->
        <div class="comment-list">
          <PostCommentCard v-for="cmt in paginatedComments.items.value" :key="cmt.id" :comment="cmt" />
        </div>

        <div class="show-comment">
          <span>查看全部评论</span>
          <img src="@/assets/images/right.png" />
        </div>
      </div>

      <div class="part" style="margin-bottom: 10vh">
        <div style="font-size: 16px; display: flex; justify-content: center">为你推荐</div>
      </div>
    </div>

    <PostBottomBar :commentCount="postDetail.commentCount" :favouriteCount="postDetail.favoriteCount"
      :likeCount="postDetail.likeCount" barType="post" />


    <!-- 评论弹出层 -->
    <van-popup v-model:show="showPublishComment" position="bottom" :style="{ height: '20%' }">
      <div class="popup-content">
        <input ref="commentTextarea" v-model="commentInput" placeholder="输入评论" class="comment-input" maxlength="200" />
        <button class="comment-button" @click="submitComment">提交</button>
      </div>
    </van-popup>

  </div>

</template>

<script setup>

import { formatTime } from '@/utils/timeFormatter'
import { usePagination } from '@/utils/usePagination.js'
import { getPostDetail, postComment, getCommentList } from '@/api/api.js'
import { useReportStore } from '@/stores/report'

const reportStore = useReportStore()

const userAvator = ref('https://img.yzcdn.cn/vant/cat.jpeg');
const formattedTime = computed(() =>
  formatTime(postDetail.value.createTime));

const router = useRouter()
const route = useRoute()
const postId = route.params.postId;
const postType = ref(route.params.postType);
const postDetail = ref({})


const paginatedComments = usePagination(getCommentList, 10) // 每页加载10条评论


const commentInput = ref('') // 用于弹出层的评论输入
const comment = ref('') // 用于发布评论输入框，readonly
const showPublishComment = ref(false)
const commentRoot = ref(0) // 0表示一级评论，1表示二级评论
const commentParentId = ref() // 上级评论的id
const commentReplyId = ref() // 上级评论发布者的id
const commentTextarea = ref(null) // 引用 textarea 元素

// 点击发布一级评论
const clickPublishTopComment = () => {
  console.log('点击发布一级评论');
  showPublishComment.value = true;
  commentRoot.value = 0;
  commentParentId.value = null;
  commentReplyId.value = null;
}

// 打开弹出层时自动聚焦 textarea
watch(showPublishComment, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if (commentTextarea.value) {
        commentTextarea.value.focus()
      }
    })
  }
})


// 提交评论
const submitComment = () => {

  if (commentInput.value.trim().length === 0) {
    showFailToast('请输入评论内容!')
    console.log('评论内容为空');
    showPublishComment.value = false;
    commentInput.value = '';
    return
  }
  try {
    postComment(postId, commentInput.value, commentRoot.value,
      commentParentId.value, commentReplyId).then(() => {
        showSuccessToast('评论提交成功');
        showPublishComment.value = false
        commentInput.value = '';
      });
  } catch (error) {
    showFailToast('评论提交失败');
  }
}


// 点击举报按钮
const clickPostReport = () => {
  console.log('点击举报按钮');

  reportStore.setReportData({
    type: 1,
    object: {
      id: postId,
      title: postDetail.value.title,
      imageUrl: postDetail.value.picUrl ? postDetail.value.picUrl[0] : '',
    }
  })
  console.log('reportStore:', reportStore.reportData);

  // 跳转到 ReportPage
  router.push({ name: 'report' })
}

// 点击发布者
const handleClickPublisher = () => {

  console.log('点击发布者');
  router.push({
    name: 'userDetail',
    params: { userId: postDetail.value.userId },
  });
}

const c = ref({})
onMounted(() => {
  console.log('postId:', route.params.postId);

  try {
    getPostDetail(postId).then((response) => {
      postDetail.value = response;
    })
    paginatedComments.fetchData(postId).then((response) => {
      c.value = paginatedComments.items.value[0]
      console.log('评论列表:', c.value);
    })
  } catch (error) {
    console.log('加载信息失败', error);
  }
})

const handleFollowClick = () => {
  console.log('点击关注按钮');
}
</script>

<style scoped>
.comment-list {
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.comment-button {
  color: white;
  background-color: #613eea;
  width: 15vw;
  margin: 0.2vh 0vw;
  border: none;
  border-radius: 20px;
}

.comment-input {
  width: 74vw;
  border: none;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0vh 3vw;
  height: 5vh;
}

.popup-content {
  width: 100%;
  padding: 1.5vh 3vw;
  display: flex;
  justify-content: space-between;
}

.show-comment {
  display: flex;
  color: #414141;
  justify-content: center;
  font-size: 16px;
}

.show-comment img {
  height: 22px;
}

.input-frame {
  height: 5vh;
  width: 70vw;
  margin-left: 4vw;
  border-radius: 10px;
  border: none;
  background-color: #f7f7f7;
  padding: 0vh 3vw;
}

.publish-comment {
  display: flex;
  align-items: center;
}

.post {
  height: 81.5;
  width: 100%;
  margin-top: 9.5vh;
  margin-bottom: 9vh;
  display: flex;
  flex-direction: column;

  gap: 1vh;
}

.accept-icon {
  height: 3vh;
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
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 9vh;
  background-color: white;
  padding-left: 8vw;
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

.part1-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
}

.report-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 100;
  color: #707070;
}

.tags {
  display: flex;
  gap: 1.5vw;
}

.tag {
  color: #0077ff;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.image-gallery img {
  flex: 1 1 calc(33.333% - 10px);
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.post-text {
  display: flex;
  font-size: 14px;
  font-family: 'ali', sans-serif;
}

.divider {
  width: 90vw;
  height: 0px;
  border: 1px solid rgb(253, 253, 253);
}

.left-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

.follow-button {
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
}

.button-icon {
  height: 14px;
  margin-right: 5px;
}

.publisher-time {
  font-size: 12px;
  color: rgba(110, 109, 109, 1);
  margin-top: 3px;
}

.publisher-info {
  margin-left: 3vw;
  font-size: 14px;
  font-family: 'ali', sans-serif;
}

.publisher {
  display: flex;
  align-items: center;
  justify-content: space-between;
}



.part {
  background-color: white;
  padding: 1.5vh 5vw;
  display: flex;
  flex-direction: column;
  gap: 1.8vh;
  width: 100%;
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
