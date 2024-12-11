<template>



  <div class="container">
    <SearchBar barType="tasks" style="height:9.5vh ;background-color: white;" />

    <div class="post">
      <div class="part">
        <div class="publisher">
          <div class="left-part">
            <div class="image-container">
              <img :src="publisherAvator" class="publisher-avator" />
            </div>

            <div class="publisher-info">
              <div class="publisher-name">
                张三
              </div>
              <div class="publisher-time">
                {{ formattedTime }}
              </div>
            </div>

          </div>

          <button class="follow-button" :style="buttonStyle" @click="handleClick">
            <img src="@/assets/images/follow.png" alt="icon" class="button-icon" />
            <span>关注</span>
          </button>

        </div>

        <div class="divider"></div>

        <div class="post-text">
          <span style="color:#707070">截止时间：</span>
          <span>{{ deadline }}</span>
        </div>

        <div class="post-text">
          <span style="color:#707070">酬金：</span>
          <span>￥{{ reward }}</span>
        </div>

        <div class="post-text">
          <span style="color:#707070">任务地点：</span>
          <span>{{ address }}</span>
        </div>

        <div class="post-text">
          <span style="color:#707070">委托详情：</span>
          <span>{{ content }}</span>
        </div>

        <div class="image-gallery">
          <img v-for="(image, index) in images" :key="index" :src="image" />
        </div>

        <div class="part1-bottom">
          <div class="tags">
            <span v-for="tag in tags" :key="tag" class="tag">
              #{{ tag }}
            </span>
          </div>

          <div class="report-button">
            <span>举报</span>
          </div>
        </div>


      </div>

      <div class="part">
        <span style="font-size: 16px;font-weight: 600;">评论</span>
        <div class="publish-comment">
          <div class="image-container">
            <img :src="userAvator" class="publisher-avator" />
          </div>
          <input class="input-frame" type="text" placeholder="点击发布评论" v-model="comment" />
        </div>

        <div class="comment-list">

        </div>

        <div class="show-comment">
          <span>查看全部评论</span>
          <img src="@/assets/images/right.png">
        </div>

      </div>

      <div class="part" style="margin-bottom: 10vh;">
        <div style="font-size: 16px;display: flex;justify-content: center;">
          为你推荐</div>


      </div>
    </div>


    <div class="bottom-bar">

      <div class="bottom-icon-button">
        <img src="@/assets/images/comment.png" alt="icon" class="buttom-icon" />
        {{ commentCount }}
      </div>
      <div class="bottom-icon-button">
        <img src="@/assets/images/favourite.png" alt="icon" class="buttom-icon" />
        {{ favouriteCount }}
      </div>

      <div class="bottom-icon-button">
        <img src="@/assets/images/like.png" alt="icon" class="buttom-icon" />
        {{ likeCount }}
      </div>

      <button class="chat-button" @click="handleClick">
        <span>私聊</span>
      </button>

      <button class="accept-button" @click="handleClick">
        <img src="@/assets/images/accept-icon.png" class="accept-icon">
        <span>接单</span>
      </button>

    </div>




  </div>

</template>

<script setup>

import SearchBar from '@/components/SearchBar.vue';
import { formatTime } from '@/utils/timeFormatter';
const comment = ref('');

const tags = ref(['任务', '求助']);
const publisherAvator = ref('https://img.yzcdn.cn/vant/cat.jpeg')
const userAvator = ref('https://img.yzcdn.cn/vant/cat.jpeg')

const createdAt = ref('2023-07-11T11:50:00.000Z');
const formattedTime = computed(() => formatTime(createdAt.value));
const deadline = ref('2023-07-11T11:50:00.000Z');
const reward = ref('1000');
const address = ref('上海市');
const content = ref('我是任务详情')
const images = ref(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',])

const commentCount = ref('100');
const favouriteCount = ref('100');
const likeCount = ref('100');

</script>

<style scoped>
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
  background-color: #F7F7F7;
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
  color: #FFFFFF;
  background-color: #613EEA;
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
  background-color: #F2F2F2;
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
  color: #0077FF;
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

.image-container {
  height: 5vh;
  width: 5vh;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.publisher-avator {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.part {
  background-color: white;
  padding: 1.5vh 5vw;
  display: flex;
  flex-direction: column;
  gap: 1.8vh;
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
