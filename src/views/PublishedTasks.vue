<template>
  <div class="container">
    <TopBar :isEllipsis="false" title="我发布的" :isRound="true" style="background-color: white" />

    <div class="list">
      <PostCard class="card" />
      <PostCard class="card" />
    </div>



  </div>
</template>

<script setup>
import PostCard from '@/components/PostCard.vue';




</script>

<style scoped>
.list {
  width: 100vw;

  background-color: white;
}

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
