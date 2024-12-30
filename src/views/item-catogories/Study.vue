<template>
  <div class="back"></div>

  <div class="container">
    <TopBar title="学习资料" :isEllipsis="false" />

    <SearchBar />

    <ItemList view-height="65" style="margin-top: 1vh;" />
  </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.back {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 42vh;
  opacity: 1;
  background: linear-gradient(180deg,
      rgba(46, 126, 255, 0.46) 0%,
      rgba(141, 184, 252, 0.29) 25.68%,
      rgba(38, 120, 252, 0.01) 100%);
  z-index: 1;
}
</style>
