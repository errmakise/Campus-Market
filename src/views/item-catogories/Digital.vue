<template>
  <div class="back"></div>

  <div class="container">
    <TopBar title="数码产品" />

    <SearchBar />

    <TagsGrid :categories="categories" style="margin-top: 2vh;" />

    <ItemList view-height="65" style="margin-top: 1vh;" />
  </div>
</template>

<script setup>
import ItemList from '@/components/itemList.vue';
import ItemsCategories from '@/components/ItemsCategories.vue';
import SearchBar from '@/components/SearchBar.vue';
import TagsGrid from '@/components/tagsGrid.vue';
import TopBar from '@/components/TopBar.vue'


const categories = [
  { label: "主页", icon: "home", activeIcon: "home-active" },
  { label: "相机", icon: "camera", activeIcon: "camera-active" },
  { label: "游戏机", icon: "console", activeIcon: "console-active" },
  { label: "手机", icon: "phone", activeIcon: "phone-active" },
  { label: "显示器", icon: "monitor", activeIcon: "monitor-active" },
  { label: "耳机", icon: "headphones", activeIcon: "headphones-active" },
  { label: "收音机", icon: "radio", activeIcon: "radio-active" },
  { label: "手表手环", icon: "watch", activeIcon: "watch-active" },
  { label: "键鼠", icon: "mouse", activeIcon: "mouse-active" },
  { label: "其他", icon: "others", activeIcon: "others-active" },
];

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
