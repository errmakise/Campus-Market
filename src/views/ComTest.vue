<template>
  <div class="container">

    <InputFrame v-model="text" fontSize="18px" :maxWidth="500" placeholder="请输入内容" type="number" />

  </div>
</template>

<script setup>
import InputFrame from "@/components/InputFrame.vue";
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
