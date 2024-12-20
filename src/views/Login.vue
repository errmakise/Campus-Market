<template>
  <div class="container">
    <div class="login-form">
      <span class="text">用户名</span>
      <div class="input-container">
        <input class="input" v-model="username">
      </div>

      <span class="text">密码</span>
      <div class="input-container">
        <input class="input" v-model="password">
      </div>


      <button class="login-button" @click="handleLogin">登录</button>

      <div class="buttom">
        <span @click="handleForget">忘记密码</span>
        <span @click="handleSignUp">注册</span>
      </div>
    </div>
    <img src="/src/assets/images/login-back-bam.png" class="back-img">

  </div>
</template>

<script setup>
const username = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("登录");
}
const handleForget = () => {
  console.log("忘记密码");
}

const handleSignUp = () => {
  console.log("注册");
}
</script>

<style scoped>
.back-img {
  position: fixed;
  height: 60%;
  right: -10vw;
  bottom: 12vh;
}

.buttom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 3vh;
  color: #ADADAD;
  font-size: 16px;
  font-weight: 600;
}

.login-button {
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 1vh 0;
  font-size: 16px;
}

.login-input {
  display: flex;
  flex-direction: column;
  gap: 2.1vh;
}

.text {
  color: #ADADAD;
  font-size: 16px;
  font-weight: 600;
  margin-right: auto;
}

.input {
  border: none;
  font-size: 14px;
  width: 100%;
  background-color: #F0F0F0;
  outline: none;
}

.input-container {
  background-color: #F0F0F0;
  height: 5vh;
  border-radius: 20px;
  width: 100%;
  margin-top: 1.5vh;
  margin-bottom: 3.5vh;
  display: flex;
  align-items: center;
  padding: 0% 4vw;


}

.login-form {
  width: 83.6%;
  background-color: rgb(255, 255, 255);
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 4vh 6vw 2.5vh 6vw;
  border-radius: 30px;

}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-image: url("/src/assets/images/login-back.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "ali", sans-serif;

}
</style>
