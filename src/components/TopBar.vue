<template>

  <div class="top-container">
    <img src="@/assets/images/left.png" class="left" />

    <span class="title">{{ title }}</span>
    <img v-if="props.isEllipsis" src="@/assets/images/Ellipsis.png" class="ellipsis" />
  </div>


</template>

<script setup>
const props = defineProps({
  title: String,
  isEllipsis: {
    type: Boolean,
    default: true
  },
})
</script>

<style scoped>
.title {
  font-family: 'ali', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin-left: 5vw;
  letter-spacing: 2px;
}

.top-container {
  display: flex;
  flex-direction: row;
  height: 10vh;
  align-items: center;

  padding: 0vh 5vw;
  width: 100vw;
}

.left {
  height: 25%;
}

.ellipsis {
  height: 45%;
  margin-left: auto;
}
</style>
