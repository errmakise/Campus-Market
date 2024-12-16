<template>
  <div class="container">
    <TopBar title="订单申诉" :isEllipsis="false" />
    <div class="content">
      <div class="content-card">
        <div class="post">
          <img v-if="imageUrl" :src="props.imageUrl" alt="Item Image" class="post-image" />
          <span class="post-title">
            {{ props.title }}
          </span>
        </div>

        <div class="divider"></div>


        <div class="appeal-content">
          <div class="appeal-title">
            申诉原因
          </div>


          <div class="appeal-input">
            <textarea v-model="appealContent" placeholder="输入帖子内容" class="post-textarea" maxlength="200"></textarea>
            <div class="content-line2">
              <van-uploader preview-size="18.5vw" class="uploader" v-model="fileList" multiple :max-count="3" />
              <p class="textPrompt">{{ appealContent.length }}/200</p>
            </div>
          </div>
        </div>

      </div>


    </div>

    <div class="bottom">
      <van-button type="primary" class="bottom-button" @click="submitAppeal">提交</van-button>
    </div>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue';

const appealContent = ref('')
// 响应式的文件列表
const fileList = ref([
  { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  { url: 'https://cloud-image', isImage: true },
])

const props = defineProps({
  title: {
    type: String,
    default: '无标题1111111111111111111111111111111'
  },
  imageUrl: {
    type: String,
    default: 'https://loremflickr.com/400/400?lock=8619595519661968'
  },
})

</script>

<style scoped>
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
  height: 8vh;
  background-color: white;
}

.content-line2 {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.textPrompt {
  margin: 5px 0;
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
  padding: 1vh 5vw;
}

.appeal-title {
  font-size: 18px;
  font-weight: 600;
}

.divider {
  width: 94%;
  height: 1px;
  border: 1px solid rgb(223, 223, 223);
  margin: 2vh 0vw;
}

.post-title {
  margin-left: 4vw;
  white-space: normal;

  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  flex: 1;
}

.post {
  padding: 2vh 4vw;
  width: 100%;
  display: flex;
  align-items: flex-start;
}

/* 长图？ */
.post-image {
  height: 12vh;
  border-radius: 15px;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  font-family: "ali", sans-serif;
  font-size: 14px;
}

.content {
  width: 100%;
  overflow-y: auto;
  max-height: 68vh;
  padding: 1vh 5vw;
}

.content-card {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  background-color: white;
  align-items: center;
}
</style>
