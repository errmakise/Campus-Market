<template>
  <div class="container">
    <div class="login-form">
      <span class="text">手机号</span>
      <div class="input-container">
        <input class="input" v-model="phone">
      </div>

      <span class="text">用户名</span>
      <div class="input-container">
        <input class="input" v-model="username">
      </div>

      <span class="text">密码</span>
      <div class="input-container">
        <input class="input" v-model="password">
      </div>
      <van-radio-group v-model="gender" class="gender-list">
        <van-radio name="1" checked-color="#c2bdd4">男</van-radio>
        <van-radio name="2" checked-color="#c2bdd4">女</van-radio>
      </van-radio-group>

      <div class="button-list">
        <button class="cancle button" @click="handleCancle">返回</button>
        <button class="signup button" @click="handleSignup">注册</button>
      </div>
    </div>
    <img src="/src/assets/images/login-back-bam.png" class="back-img">

  </div>
</template>

<script setup>
import { postSignUp } from "@/api/api";
const gender = ref("");
const phone = ref("");
const username = ref("");
const password = ref("");
const router = useRouter();
const handleCancle = () => {
  console.log("取消注册");
  router.push("/login");
}
// 检查手机号是否正确
const isValidPhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/; // 检查手机号是否是以 13-19 开头的11位数字
  return phoneRegex.test(phone);
};

const handleSignup = () => {
  console.log("注册");
  // 检查手机号
  if (!isValidPhone(phone.value)) {
    showFailToast({
      message: "请输入正确的手机号",
      duration: 1000,
    });
    return; // 中断注册流程
  }
  if (!username.value) {
    showFailToast({
      message: "请输入用户名",
      duration: 1000,
    });
    return; // 中断注册流程
  }
  if (!password.value) {
    showFailToast({
      message: "请输入密码",
      duration: 1000,
    });
    return; // 中断注册流程
  }
  if (!gender.value) {
    showFailToast({
      message: "请选择性别",
      duration: 1000,
    });
    return; // 中断注册流程
  }

  postSignUp(
    phone.value,
    username.value,
    password.value,
    gender.value
  ).then((res) => {
    showSuccessToast({
      message: "注册成功",
      duration: 1000,
      onClose: () => {
        router.push("/login");
      }
    });
  }).catch((err) => {
    showFailToast({
      message: err,
      duration: 1000,
    });
  });

}

</script>

<style scoped>
.button-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.gender-list {
  display: flex;
  gap: 2vw;
  width: 100%;
  justify-content: end;
  margin-bottom: 3vh;
}

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

.button {
  width: 32%;
  border-radius: 10px;
  padding: 1vh 0;
  font-size: 16px;
  border: none;
}

.cancle {
  background-color: #F0F0F0;
}

.signup {
  background-color: black;
  color: white;

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
