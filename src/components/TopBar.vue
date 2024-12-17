<template>

  <div class="top-container">
    <img v-if="!isRound" src="@/assets/images/left.png" class="left" />
    <img v-else class="left-round" src="@/assets/images/left-round.png" alt="left-round" />

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
  isRound: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.left-round{
  height: 50%;
  margin-right: 3vw;
}
.title {
  font-family: 'ali', sans-serif;
  font-size: 22px;
  font-weight: 600;
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
  margin-right: 5vw;
}

.ellipsis {
  height: 45%;
  margin-left: auto;
}
</style>
