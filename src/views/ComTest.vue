<template>
  <div class="container">
    <TaskSwipe></TaskSwipe>
    <TaskCard></TaskCard>
  </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue';
import TaskSwipe from '@/components/TaskSwipe.vue';


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  height: 100%;
  align-items: center;
}
</style>
