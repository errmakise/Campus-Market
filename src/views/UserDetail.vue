<template>
  <div class="container">
    <div class="gray-part">
      <TopBar type="user" :user="userInfo" />
    </div>

    <div class="user">
      <avatar :src="userInfo.avatarUrl" size="10vh" class="avatar" />
      <span class="user-name">{{ userInfo.username }}</span>
      <div class="follow-and-star">
        <span> {{ userInfo.followingNumber }}</span>
        <span style="font-size: 14px;">粉丝</span>
      </div>
    </div>

    <div class="divider"></div>

    <CategoryContent :showComments="true" maxHeight="58vh" />


    <FollowButton :userId="userInfo.userId" buttonType="large" />
  </div>
</template>

<script setup>
const isOwn = ref(false);

const userInfo = ref({
  userId: 1,
  username: '用户名',
  avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
  followingNumber: 100,
})




import { getFollowList } from "@/api/api.js";
const userStore = useUserStore();
import { useUserStore } from '@/stores/userStore';

// 初始化关注者列表。登录页完善后，转移至登录页
const fetchFollowers = async () => {
  try {
    const response = await getFollowList();
    userStore.setBatchFollowStatus(response.list.map(user => ({
      userId: user.userId,
      isFollowing: true // 全部关注列表中的用户都是已关注
    })));
  } catch (error) {
    console.error('获取关注者列表失败:', error);
  }
};


// 页面加载时初始数据
onMounted(() => {
  fetchFollowers();
});
</script>


<style scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}


.content {
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
}

.categories {
  margin: 2.5vh auto 3vh 6vw;
}

.category {
  background-color: rgb(216, 215, 215);
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 20px;
  margin-right: 3.5vw;
}

.category.active {
  background-color: #613eea;
  color: white;
}

.divider {
  width: 90vw;
  height: 0px;
  border: 1px solid rgb(216, 215, 215);
  margin-top: 24vh;
}

.user-name {
  margin-left: 4vw;
  font-size: 16px;
  font-weight: 600;
  padding-top: 3vh;
}

.avatar {}

.user {
  position: absolute;
  top: calc(15% - 3vh);
  width: 100%;
  z-index: 2;
  padding-left: 6vw;
  padding-right: 8vw;
  display: flex;
  align-items: center;
}

.content {
  z-index: 2;
}

.container {
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-family: "ali", sans-serif;
  font-size: 14px;

}

.gray-part {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 15%;
  background-color: #fafafa;
}

.follow-and-star {
  display: flex;

  align-items: end;
  justify-content: center;
  margin-top: auto;
  margin-left: auto;
  gap: 1vw;
  font-size: 18px;


}
</style>
