<template>
  <div class="container">
    <topBar :isEllipsis="false" title="修改资料" />
    <div class="content">
      <avatar :src="editUserInfo.avatarUrl" size="10vh" @click="toUserDetail" />
      <div class="box">
        <span class="prompt">
          用户名:
        </span>
        <input id="username" v-model="editUserInfo.username" class="user-name-input" type="text" placeholder="输入新用户名" />
      </div>
      <div class="box">
        <span class="prompt">
          性别:
        </span>

        <input id="gender" v-model="editUserInfo.gender" class="user-name-input" type="text" placeholder="" />
      </div>
    </div>
    <button class="commit">提交</button>

  </div>

</template>


<script setup>
import { useUserStore } from '@/stores/userStore';
const router = useRouter();

const userInfo = useUserStore().userInfo;

const editUserInfo = reactive({
  username: userInfo.username,
  avatarUrl: userInfo.avatarUrl,
  gender: userInfo.gender,
});


onMounted(() => {
  console.log('userInfo:', userInfo);
});




</script>

<style scoped>
.commit {
  margin-top: auto;
  width: 40%;
  height: 5vh;
  font-size: 16px;
  border-radius: 20px;
  background-color: #613eea;
  border: none;
  color: white;
}

.prompt {
  font-weight: 600;
  color: #696868;
}

.user-name-input {
  font-size: 16px;
  border-radius: 10px;
  border: none;
  background-color: #fafafa;
  padding: 10px 10px;
}



.content {
  border-radius: 20px;
  background-color: white;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh 7vw;
  gap: 5vh;
}

.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}


.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
  overflow-x: hidden;
  font-family: "ali", sans-serif;
  font-size: 14px;
  padding-bottom: 5vh;

}
</style>
