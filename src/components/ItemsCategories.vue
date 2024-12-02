<template>
  <div class="categories-container">
    <div class="categories-row">
      <div class="category-item" v-for="item in categories1" :key="item.label">
        <img :src="item.icon" :alt="item.label" class="category-icon">
        <span class="category-label">{{ item.label }}</span>
      </div>
    </div>
    <div class="categories-row">
      <div class="category-item" v-for="item in categories2" :key="item.label">
        <img :src="item.icon" :alt="item.label" class="category-icon">
        <span class="category-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import digitalIcon from "@/assets/images/items/digital.png";
import studyIcon from "@/assets/images/items/study.png";
import foodIcon from "@/assets/images/items/food.png";
import fashionIcon from "@/assets/images/items/fashion.png";
import ticketsIcon from "@/assets/images/items/tickets.png";
import instrumentsIcon from "@/assets/images/items/instruments.png";
import accountsIcon from "@/assets/images/items/accounts.png";
import gamesIcon from "@/assets/images/items/games.png";
import sportsIcon from "@/assets/images/items/sports.png";
import othersIcon from "@/assets/images/items/others.png";
const categories1 = [
  { icon: digitalIcon, label: "数码产品" },
  { icon: studyIcon, label: "学习资料" },
  { icon: gamesIcon, label: "游戏" },

  { icon: fashionIcon, label: "服饰美妆" },
  { icon: ticketsIcon, label: "门票" },
];

const categories2 = [

  { icon: accountsIcon, label: "账号会员" },
  { icon: instrumentsIcon, label: "乐器" },
  { icon: foodIcon, label: "餐饮代购" },
  { icon: sportsIcon, label: "运动用品" },
  { icon: othersIcon, label: "其他" },
];
</script>
<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 2.37vh;
  width: 95vw;
}

.categories-row {
  display: flex;
  flex-direction: row;
  /* 上，左右，下 */
  padding: 0.474vh 0.6vh 1.185vh;
  border-radius: 2.37vh;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 比例扩展、缩小、容器初始大小 */
  flex: 1 1 8.399vh;
  /* 上下、左右 */
  padding: 0.474vh 0;
}


.category-icon {
  height: 3.5vh;
}

.category-label {
  font-size: medium;
  font-family: ali;
  color: #000000;
  line-height: 1.44vh;
  margin-top: 0.8vh;
}
</style>
