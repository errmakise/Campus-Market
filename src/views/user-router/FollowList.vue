<template>
  <div class="container">
    <TopBar title="关注列表" :isEllipsis="false" />
    <div class="list">
      <UserCard v-for="(followUser, index) in followList" :key="index" :avatarUrl="followUser.avatarUrl"
        :username="followUser.username" :userId="followUser.userId" type="list" />
    </div>
  </div>
</template>

<script setup>
import { getFollowList } from '@/api/api.js';

const userStore = useUserStore();
import { useUserStore } from '@/stores/userStore';
// 初始化关注者列表。登录页完善后，转移至登录页
const fetchFollowers = async () => {
  try {
    userStore.clearFollowStatus();
    const response = await getFollowList();
    userStore.setBatchFollowStatus(response.list.map(user => ({
      userId: user.userId,
      avatarUrl: user.avatarUrl,
      username: user.username,
      isFollowing: true // 全部关注列表中的用户都是已关注
    })));
  } catch (error) {
    console.error('获取关注者列表失败:', error);
  }
};

const followList = computed(() => userStore.getFollowList());

onMounted(() => {
  try {
    fetchFollowers();// 初始化关注者列表。登录页完善后，转移至登录页
  } catch (error) {
    console.log('加载信息失败', error);
  }
})
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5vh 5vw;
  gap: 1.8vh;
}

.container {
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
