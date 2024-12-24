<template>

  <div class="top-container">
    <img v-if="!isRound" src="@/assets/images/left.png" class="left" @click="clickBack" />
    <img v-else class="left-round" src="@/assets/images/left-round.png" alt="left-round" @click="clickBack" />

    <span class="title">{{ title }}</span>
    <img v-if="props.isEllipsis" src="@/assets/images/Ellipsis.png" class="ellipsis" />
  </div>


</template>

<script setup>

const clickBack = () => {
  window.history.back()
}

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
.left-round {
  height: 5vh;
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
  height: 12vh;
  align-items: center;

  padding: 0vh 4vw;
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
