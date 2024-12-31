<template>

  <div class="top-container">
    <img v-if="!isRound" src="@/assets/images/left.png" class="left" @click="clickBack" />
    <img v-else class="left-round" src="@/assets/images/left-round.png" alt="left-round" @click="clickBack" />

    <span class="title">{{ title }}</span>
    <img v-if="props.isEllipsis" src="@/assets/images/Ellipsis.png" class="ellipsis" @click="clickEllipsis" />
  </div>

  <van-popup v-model:show="showBottom" round position="bottom" class="popup">
    <div class="buttons">
      <div class="popup-button" @click="reportUser">
        <img src="@/assets/images/user-report-round.png" class="popup-img">
        <span>举报用户</span>
      </div>

    </div>


    <div class="cancle" @click="cancle">
      <span>取消</span>
    </div>
  </van-popup>

</template>

<script setup>


const showBottom = ref(false);
const clickEllipsis = () => {
  console.log('点击了省略号');
  showBottom.value = true;
}
const clickBack = () => {
  window.history.back()
}

import { useReportStore } from '@/stores/report'

const reportStore = useReportStore()
const router = useRouter();
const reportUser = () => {
  console.log('点击了举报用户');
  console.log('props:', props.user);
  if (props.user) {
    reportStore.setReportData({
      type: 0,
      object: {
        id: props.user.userId,
        username: props.user.username,
        avatarUrl: props.user.avatarUrl ? props.user.avatarUrl : '',
      }
    })
    console.log('reportStore:', reportStore.reportData);

    showBottom.value = false;
    // 跳转到 ReportPage
    router.push({ name: 'report' })
  } else {
    showBottom.value = false;
    showFailToast('举报失败，用户信息为空')

  }


}

const cancle = () => {
  showBottom.value = false;
}

const props = defineProps({
  title: String,
  isEllipsis: {
    type: Boolean,
    default: true
  },
  isRound: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  user: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 3vw;
}

.cancle {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-top: auto;
}

.popup {
  display: flex;
  height: 26vh;
  padding: 5vh 6vw;
  flex-direction: column;
}

.popup-img {
  height: 6vh;
  width: 6vh;
}

.popup-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8vh;
  gap: 5px;
}

.left-round {
  height: 5vh;
  margin-right: 3vw;
  box-shadow: 0 6px 6px rgba(138, 136, 136, 0.589);
  border-radius: 50%;
}

.title {
  font-family: 'ali', sans-serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
}

.top-container {
  display: flex;
  flex-direction: row;
  height: 12vh;
  align-items: center;

  padding: 0vh 4vw;
  width: 100vw;
}

.left {
  height: 25%;
  margin-right: 5vw;
}

.ellipsis {
  height: 45%;
  margin-left: auto;
}
</style>
