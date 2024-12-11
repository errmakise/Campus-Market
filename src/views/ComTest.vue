<template>
  <div class="container">

    <TaskCard />
  </div>
</template>

<script setup>
import InputFrame from "@/components/InputFrame.vue";
import SearchBar from "@/components/SearchBar.vue";
import TaskCard from "@/components/TaskCard.vue";
import { ref, watch } from "vue";
const text = ref("");
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
