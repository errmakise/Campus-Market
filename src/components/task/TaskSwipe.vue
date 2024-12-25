<template>
  <div>
    <div class="container">
      <van-swipe class="content" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="item" v-for="(task, index) in props.tasks" :key="index" @click="clickTask(task.postId)">
          <div class="line1">
            <span class="deadLine">截止时间：{{ task.deadLine }} </span>
            <span class="createdAt"> {{ formatDate(task.createdAt) }}</span>
          </div>

          <div class="title">{{ task.title }}</div>

          <div class="bottom">
            <div class="part1">
              <span class="location">{{ task.location }}</span>
              <span class="distance">{{ task.distance }}</span>
            </div>


            <div class="part2">
              <span class="reward">酬金: ￥{{ task.money ? task.money : 0 }}</span>
              <button class="round-button" @click="handleClick">
                <img v-if="iconPath" :src="iconPath" alt="icon" class="button-icon"
                  :style="{ height: buttonData.iconSize }" />
                <span>接单</span>
              </button>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>


</template>

<script setup>

const router = useRouter();
const clickTask = (id) => {
  router.push({ name: 'post', params: { postId: id, postType: 0 } })
}

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => [{
      postId: 1,
      deadLine: '2023-07-11T11:50:00.000Z',
      createdAt: '2023-07-11T11:50:00.000Z',
      location: '无',
      distance: '无',
      reward: 333,
      title: '无标题11111111111111无标无标题11111111111无标无标题111111无标无标题111111111111'
    }, {
      postId: 1,
      deadLine: '2023-07-11T11:50:00.000Z',
      createdAt: '2023-07-11T11:50:00.000Z',
      location: '无',
      distance: '无',
      reward: 333,
      title: '无标题11111111111111无标无标题11111111111无标无标题111111无标无标题111111111111'
    }],
  }
});



// 格式化时间的函数
const formatDate = (timestamp) => {
  if (!timestamp) return '未知时间';

  const createdAtTime = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - createdAtTime;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes > 0 ? `${diffInMinutes}分钟前发布` : '刚刚发布';
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前发布`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}天前发布`;
  }
};
</script>

<style scoped>
.part2 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.round-button {
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  color: #ffffff;
  background-color: #613EEA;
  font-size: 12px;
  margin-left: 5vw;
}



.bottom {
  font-size: 12px;
  font-family: 'ali', sans-serif;
  height: 3.1vh;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.part1 {
  gap: 4vw;
}

.location {}

.title {
  font-size: 16px;
  font-family: 'ali', sans-serif;
  font-weight: 600;
  height: 6vh;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  word-break: break-all;


}

.container {}

.content {
  background-color: #ffffff;
  height: 14.5vh;
  border-radius: 15px;
  width: 90vw;
}

.item {
  display: flex;
  flex-direction: column;
  padding: 1vh 1.5vh;
  height: 100%;
  justify-content: space-between;
}

.deadLine {
  padding-right: 4vw;
}

.createdAt {}

.line1 {
  font-size: 12px;
  font-family: 'ali', sans-serif;
  font-weight: 300;
  color: rgba(26, 26, 26, 1);
  height: 2.2vh;
  overflow: hidden;
  /* 超出部分隐藏 */
  white-space: nowrap;
  /* 防止文本换行 */
  text-overflow: ellipsis;
}
</style>
