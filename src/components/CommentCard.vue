<template>
  <div class="card-container">
    <div class="line">
      <avatar :src="avatarUrl" size="5vh" class="avatar" />
      <span class="name">{{ userName }}</span>
    </div>

    <span class="comment">{{ commentText }}</span>

    <span class="time">{{ commentTime }}</span>

  </div>
</template>

<script setup>
const props=defineProps({
  avatarUrl:{
    type:String,
    required:true,
    default:'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  userName:{
    type:String,
    required:true,
    default:'用户'
  },
  commentText:{
    type:String,
    required:true,
    default:'评论内容'
  },
  commentTime:{
    type:String,
    required:true,
    default:'2024.1.1'
  }
})
</script>

<style scoped>
.time{
  color: #6c6c6c;
}
.name{
color: #6c6c6c;
margin-left: 2vw;
}
.line{
  display: flex;
  align-items: center;
}
.card-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding:0vh 7.5vw;
  font-family: "ali", sans-serif;
  font-size: 14px;
  height: 11vh;
  justify-content: space-between;
  margin-bottom: 2vh;
}
</style>
