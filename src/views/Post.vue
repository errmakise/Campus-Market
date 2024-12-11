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
        placeholder="输入帖子内容"
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

    <div class="post-content">
      <span class="title">标题</span>
      <div class="post-title">
        <div class="title-line1">
          <textarea
            v-model="postTitle"
            placeholder="输入标题"
            class="title-content"
            maxlength="20"
            clearable="true"
          ></textarea>
          <img src="@/assets/images/x.png" alt="x" class="x" />
        </div>
        <p class="textPrompt">{{ postTitle.length }}/20</p>
      </div>

      <div class="title">悬赏类型</div>
      <div class="categories">
        <div
          class="item"
          v-for="(item, index) in categories"
          :key="index"
          @click="changeCate(item, index)"
          :class="index === activeIndex ? 'active' : null"
        >
          <span class="category-name">{{ item.name }}</span>
        </div>
      </div>

      <div class="reward">
        <div class="reward-part1">
          <div class="title">酬金</div>
          <div class="item" @click="toBeDiscussed" :class="isDiscussed ? 'active' : null">
            <span>待议</span>
          </div>
        </div>

        <div class="reward-amount">
          ￥
          <input v-model="reward" type="number"
          class="amount" :disabled="isDiscussed"
           :style="{ width: Math.max(reward.length * 12, 50) + 'px' }"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const postContent = ref('')
const postTitle = ref('')
const activeIndex = ref(0)
const isDiscussed = ref(false)
const reward = ref('0')

const toBeDiscussed = () => {
  isDiscussed.value = !isDiscussed.value
  console.log('待议')
}

const changeCate = (item, index) => {
  activeIndex.value = index // 更新 activeIndex
}
const categories = ref([
  {
    name: '前端',
  },
  {
    name: '前端',
  },
  {
    name: '后端',
  },
  {
    name: '设计',
  },
  {
    name: '产品',
  },
  {
    name: '运营',
  },
])

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
</script>

<style scoped>
.reward {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.amount {
  flex-shrink: 0;
  padding: 0px 2px;
  font-size: 18px;
  border: none;


}
.reward-amount {
  font-size: 12px;
  display: flex;
  align-items: end;


}
.reward-part1 {
  display: flex;
}
.item {
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background-color: #ededed;
}

.active {
  background-color: #4794ff;
  color: #ffffff;
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* 上右下左 */
  padding: 2vh 2vw 4vh 2vw;
}

.title-line1 {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.post-title {
  width: 100%;
  resize: none;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 2vh;
  margin-bottom: 4vh;
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.title-content {

  height: 6vh;
  width: 90%;
  border: none;
  background-color: #f5f5f5;
  resize: none;
}

.textPrompt {
  margin: 5px 0;
}

.title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-right: 4vw;
}

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
