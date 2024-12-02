<template>

  <div class="a">
    11
    <SearchBar></SearchBar>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
import SearchBar from '@/components/SearchBar.vue';

const props = defineProps({});

const data = reactive({});

const router = useRouter();
</script>

<style>
.a {
  background-color: antiquewhite;
  width: 100vw;
  height: 100vh;
}
</style>
