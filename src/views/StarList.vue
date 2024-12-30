<template>
  <div class="container">
    <TopBar title="我的收藏" :isEllipsis="false" />
    <div class="content">
      <CategoryContent :showComments="false" maxHeight="77vh" />
    </div>


  </div>
</template>

<script setup>
onMounted(() => {
})

</script>

<style scoped>
.categories {
  margin: 2.5vh auto 3vh 6vw;
}

.category {
  background-color: rgb(216, 215, 215);
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 20px;
  margin-right: 3.5vw;
}

.category.active {
  background-color: #613eea;
  color: white;
}

.content {
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top: #d6d6d6 solid 1px;
  height: 87vh;
}

.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5vh 5vw;
  gap: 1.8vh;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-size: 14px;
  font-family: 'ali', sans-serif;
}
</style>
