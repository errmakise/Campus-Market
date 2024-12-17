<template>
  <div class="container">
    <TopBar :isEllipsis="false" title="我发布的" :isRound="true" style="background-color: white" />


    <PostCard class="card" />

  </div>
</template>

<script setup>
import PostCard from '@/components/PostCard.vue';




</script>

<style scoped>
.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-family: 'ali', sans-serif;
  font-size: 14px;
}
</style>
