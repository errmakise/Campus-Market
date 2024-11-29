<template>

  <div class="a">
    <BottomNav nowView="二手"></BottomNav>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
const props = defineProps({});

const data = reactive({});

const router = useRouter();
</script>

<style>

</style>

