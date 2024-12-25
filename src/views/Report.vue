<template>
  <div class="container">
    <TopBar :title="reportType" :isEllipsis="false" />

    <div class="content-card">
      <!-- 举报用户 -->
      <div v-if="reportData.type === 0 && reportData.object" class="user">
        <avatar size="6vh" :src="reportData.object.avatarUrl" />
        <span class="post-title">{{ reportData.object.username }}</span>
      </div>

      <!-- 举报帖子 -->
      <div v-if="reportData.type === 1 && reportData.object" class="post">
        <img v-if="reportData.object.imageUrl" :src="reportData.object.imageUrl" alt="Item Image" class="post-image" />
        <span class="post-title">{{ reportData.object.title }}</span>
      </div>

      <!-- 举报评论 -->
      <div v-if="reportData.type === 2 && reportData.object" class="object">
        <div class="user">
          <avatar size="6vh" :src="reportData.object.userAvatarUrl" />
          <span class="post-title">{{ reportData.object.username }}</span>
        </div>
        <span class="post-title">{{ reportData.object.content }}</span>
        <span class="post-time">{{ reportData.object.createTime
          }}</span>
      </div>

      <div class="divider"></div>

      <div class="appeal-content">
        <div class="appeal-title">举报理由</div>
        <div class="appeal-input">
          <textarea v-model="appealContent" placeholder="输入内容" class="post-textarea" maxlength="200"></textarea>
          <p class="textPrompt">{{ appealContent.length }}/200</p>
        </div>
      </div>
    </div>

    <div class="bottom">
      <van-button type="primary" class="bottom-button" @click="submitAppeal">提交</van-button>
    </div>
  </div>
</template>

<script setup>
import { postReport } from "@/api/api.js"
import { showFailToast, showSuccessToast } from "vant"
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

// 获取举报数据
const reportData = reportStore.reportData

const appealContent = ref('')

// 定义举报类型名称
const reportType = ref('')

// 获取举报类型名称
const getReportType = () => {
  if (reportData.type === 0) {
    return '举报用户'
  } else if (reportData.type === 1) {
    return '举报帖子'
  } else if (reportData.type === 2) {
    return '举报评论'
  } else {
    showFailToast({
      message: '举报未知类型！',
      duration: 2000,
      onClose: () => {
        // 清除举报数据
        reportStore.clearReportData()
        router.back()
      },
    })
    return '未知举报类型'
  }
}

// 提交举报
const submitAppeal = async () => {
  console.log('点击提交举报')
  console.log(appealContent.value)
  if (appealContent.value.trim().length === 0) {
    console.log('举报理由为空！')
    showFailToast({
      message: '请输入举报理由！',
      duration: 1000,
    })
    return
  }
  try {
    await postReport(reportData.object.id, reportData.type, appealContent.value)
    console.log('举报成功')

    showSuccessToast({
      message: '举报成功',
      duration: 2000,
      onClose: () => {
        // 清除举报数据
        reportStore.clearReportData()
        // 返回上一页
        router.back()
      },
    })
  } catch (error) {
    console.log('举报失败', error)
    showFailToast({
      message: '举报失败，请稍后重试',
      duration: 1000,
    })
  }
}

// 初始化
onMounted(() => {
  reportType.value = getReportType()
})
</script>

<style scoped>
.post-time {
  font-size: 12px;
  color: #8d8d8d;
}

.object {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.user {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4vw;
}

.bottom-button {
  width: 70%;
  border-radius: 30px;
  height: 4vh;
  background-color: #613eea;
}

.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 10vh;
  background-color: white;
}

.content-line2 {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.appeal-title {
  font-size: 18px;
  font-weight: 600;
}

.textPrompt {
  margin: 5px 0;
  margin-left: auto;
}

.post-textarea {
  width: 100%;
  height: 20vh;
  border: none;
  margin-bottom: 2vh;
  resize: none;
}

.appeal-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  margin-top: 2vh;

}

.appeal-content {
  display: flex;
  flex-direction: column;
  width: 100%;

}



.divider {
  width: 100%;
  height: 1px;
  border: 1px solid rgb(223, 223, 223);
  margin: 2vh 0vw;
}

.post-title {
  white-space: normal;
  font-size: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  flex: 1;
}

.post {
  width: 100%;
  display: flex;
  align-items: flex-start;
}

/* 长图？ */
.post-image {
  height: 10vh;
  border-radius: 15px;
  margin-right: 4vw;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  font-family: "ali", sans-serif;
  font-size: 14px;
}



.content-card {
  border-radius: 20px;
  background-color: white;
  overflow-y: auto;
  max-height: 68vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2vh 5vw;
  margin: 0vh 4vw;
}
</style>
