<template>
  <div class="container">
    <MapComponent />

  </div>
</template>

<script setup>
import MapComponent from '@/components/MapComponent.vue';
import SearchBox from '@/components/SearchBox.vue';


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  height: 100%;
  align-items: center;
  width: 100vw;
}
</style>
