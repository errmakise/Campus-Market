<template>
  <div class="avatar-container" :style="{
    width: size,
    height: size,
  }">
    <img :src="src" alt="avatar" class="avatar-image" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '', // 头像默认图片
  },
  size: {
    type: String,
    default: '50px', // 头像默认大小
  },
});
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  /* 圆形容器 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 确保图片完整填充容器 */
}
</style>
