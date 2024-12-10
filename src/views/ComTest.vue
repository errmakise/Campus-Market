<template>
  <div class="container">

    <TasksCatogories />


  </div>
</template>

<script setup>

import TasksCatogories from '@/components/TasksCatogories.vue';
import TasksTagsBar from '@/components/TasksTagsBar.vue';

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
