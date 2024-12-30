<template>
  <div class="card-container">
    <div class="line">
      <avatar :src="comment.userAvatarUrl" size="5vh" class="avatar" />
      <span class="name">{{ comment.username }}</span>
    </div>

    <span class="comment">{{ comment.content }}</span>

    <span class="time">{{ comment.createTime }}</span>

  </div>
</template>

<script setup>
const props = defineProps({
  comment: {
    type: Object,
  }
})
</script>

<style scoped>
.time {
  color: #6c6c6c;
}

.name {
  color: #6c6c6c;
  margin-left: 2vw;
}

.line {
  display: flex;
  align-items: center;
}

.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0vh 6vw;
  font-family: "ali", sans-serif;
  font-size: 14px;
  height: 11vh;
  justify-content: space-between;
  margin-bottom: 2vh;
}
</style>
