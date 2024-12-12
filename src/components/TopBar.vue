<template>
  <div>
    <div class="container">
    <img src="@/assets/images/left.png" class="left" />

    <img src="@/assets/images/Ellipsis.png" class="ellipsis" />
  </div>
  </div>

</template>

<script setup></script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 10vh;
  align-items: center;
  justify-content: space-between;
  padding:0vh 5vw;
  width: 100vw;
}
.left {
  height: 25%;
}
.ellipsis{
  height: 45%;
}
</style>
