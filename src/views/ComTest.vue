<template>
  <div class="container">
    <TasksTagsBar></TasksTagsBar>
  </div>
</template>

<script setup>

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
