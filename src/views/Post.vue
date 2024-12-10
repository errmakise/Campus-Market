<template>
  <div class="container">
    <div class="top">
      <img src="@/assets/images/x.png" alt="x" class="x" />
      <button class="post-button" @click="handlePost">
        <span>发布</span>
      </button>
    </div>

    <div class="post-content">
      <textarea
        v-model="postContent"
        placeholder="具体悬赏内容"
        class="post-textarea"
        maxlength="200"
      ></textarea>
      <div class="content-line2">
        <van-uploader
          preview-size="18.5vw"
          class="uploader"
          v-model="fileList"
          multiple
          :max-count="3"
        />
        <p class="textPrompt">{{ postContent.length }}/200</p>
      </div>
    </div>


  </div>
</template>

<script setup>
const postContent = ref('')

// 响应式的文件列表
const fileList = ref([
  { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  { url: 'https://cloud-image', isImage: true },
])

// 处理图片上传成功后的回调
const handleAfterRead = (file) => {
  fileList.value.push(file)
}

// 删除图片
const removeImage = (file) => {
  fileList.value = fileList.value.filter((item) => item !== file)
}
</script>

<style scoped>
.content-line2 {
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.uploader {
}
.post-content {
  margin-top: 1.5vh;
  width: 90vw;
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 1.5vh 5vw;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'ali', sans-serif;
  font-size: 14px;
}
.post-textarea {
  width: 100%;
  height: 20vh;
  border: none;
  margin-bottom: 2vh;
  resize: none;
}

.post-button {
  border-radius: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 18px;
  color: #ffffff;
  background-color: #0c6cf2;
  font-size: 14px;
}

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5vh;
  padding-left: 3vw;
  padding-right: 3vw;
  align-items: center;
}
.x {
  height: 24px;
}
.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 1vh;
  align-items: center;
  overflow-x: hidden;
}
</style>
