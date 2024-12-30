<template>
  <div class="container">
    <div class="user">
      <avatar :src="userInfo.avatarUrl" size="10vh" @click="toUserDetail" />

      <div class="user-text">
        <div class="user-name" @click="toUserDetail">
          {{ userInfo.username }}
          <img src="@/assets/images/right.png" class="right" />
        </div>

        <div class="text-line2">
          <button class="edit-info" @click="handleClick">
            <img src="@/assets/images/edit.png" class="edit-icon" />
            <span>修改资料</span>
          </button>

          <div class="follow-and-star" @click="clickFollowList">
            {{ userInfo.followCount }}
            <span style="font-weight: 600;">关注</span>
          </div>

          <div class="follow-and-star" @click="clickStarList">
            {{ userInfo.starCount }}
            <span style="font-weight: 600;">收藏</span>
          </div>

        </div>

      </div>



    </div>


    <div class="card" style="height: 25vh;">
      <div class="card-title">
        <img src="@/assets/images/task-user.png" class="card-icon">
        <span class="title-text">悬赏</span>
      </div>

      <div class="card-line">
        <span>我发布的</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

      <div class="card-line">
        <span>我接取的</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

      <div class="card-line">
        <span>已被接收</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

    </div>

    <div class="card" style="height: 25vh;">
      <div class="card-title">
        <img src="@/assets/images/item-user.png" class="card-icon">
        <span class="title-text">二手</span>
      </div>

      <div class="card-line">
        <span>我发布的</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

      <div class="card-line">
        <span>我卖出的</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

      <div class="card-line">
        <span>我买到的</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

    </div>

    <div class="card" style="height: 20vh;">
      <div class="card-title">
        <img src="@/assets/images/other-user.png" class="card-icon">
        <span class="title-text">其他</span>
      </div>

      <div class="card-line">
        <span>地址管理</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>

      <div class="card-line">
        <span>互动记录</span>
        <img src="@/assets/images/right.png" class="right" />
      </div>


    </div>

  </div>





  <BottomNav nowView="我的" />
</template>


<script setup>
import { useUserStore } from '@/stores/userStore';
const router = useRouter();

const userInfo = useUserStore().userInfo;
onMounted(() => {
  console.log('userInfo:', userInfo);
});

// 点击关注列表
const clickFollowList = () => {
  console.log('点击了关注列表');
  router.push({ name: 'followList' });
}

// 点击收藏列表
const clickStarList = () => {
  console.log('点击了收藏列表');
  router.push({ name: 'starList' });
}



const toUserDetail = () => {
  router.push({ name: 'userDetail', params: { userId: userInfo.userId } });
}
</script>

<style scoped>
.card-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 4vw;
  font-size: 16px;
}

.card-title {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
}

.card-icon {
  height: 5vh;
  margin-right: 2vw;
}

.card {
  background-color: white;
  width: 100%;
  border-radius: 20px;
  margin-top: 1vh;
  padding: 1.5vh 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.follow-and-star {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-line2 {
  display: flex;
  justify-content: space-between;
  width: 60vw;
}

.user-text {
  margin-left: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding: 0.6vh 0vw;
}

.edit-icon {
  height: 14px;
  margin-right: 4px;
}

.edit-info {
  border: none;
  border-radius: 20px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.user-name {
  display: flex;
  font-weight: 600;
  font-size: 16px;
}

.right {
  height: 20px;
}

.user {
  display: flex;
  justify-content: left;
  width: 100%;
  margin-bottom: 1vh;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 4.5vh 5vw 14vh 5vw;
  align-items: center;
  overflow-x: hidden;
  font-family: "ali", sans-serif;
  font-size: 14px;

}
</style>
