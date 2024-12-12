<template>
  <div class="grid-container">
    <div class="category-item" v-for="(category, index) in categories" :key="index">
      <img :src="icons[category.icon]" alt="icon" class="category-icon" />
      <div class="category-name">{{ category.label }}</div>
    </div>
  </div>
</template>

<script setup>
import accountsIcon from "@/assets/images/categories/accounts.png";
import digitalIcon from "@/assets/images/categories/digital.png";
import fashionIcon from "@/assets/images/categories/fashion.png";
import foodIcon from "@/assets/images/categories/food.png";
import gamesIcon from "@/assets/images/categories/games.png";
import instrumentsIcon from "@/assets/images/categories/instruments.png";
import othersIcon from "@/assets/images/categories/others.png";
import sportsIcon from "@/assets/images/categories/sports.png";
import studyIcon from "@/assets/images/categories/study.png";
import ticketsIcon from "@/assets/images/categories/tickets.png";

const icons = {
  accounts: accountsIcon,
  digital: digitalIcon,
  fashion: fashionIcon,
  food: foodIcon,
  games: gamesIcon,
  instruments: instrumentsIcon,
  others: othersIcon,
  sports: sportsIcon,
  study: studyIcon,
  tickets: ticketsIcon,
};


const key = 'digital';
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});


</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行最多显示 5 个 */
  width: 95vw;

  background-color: #ffffff;
  border-radius: 12px;
  padding: 0.474vh 0.6vh 1.185vh;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.474vh 0;
}

.category-icon {

  height: 3.5vh;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  color: #2b2b2b;
  font-family: ali;
}
</style>
