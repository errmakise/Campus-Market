<template>

  <div class="nav">
    <RouterLink v-for="(icon, index) in navIconsL" :key="index" :to="icon.route" @click="activeTab = icon.label"
      class="icons">
      <img :src="activeTab === icon.label ? icon.se : icon.unse" class="icon">
    </RouterLink>
    <img src="@/assets/images/post.png" class="post">
    <RouterLink v-for="(icon, index) in navIconsR" :key="index" :to="icon.route" @click="activeTab = icon.label"
      class="icons">
      <img :src="activeTab === icon.label ? icon.se : icon.unse" class="icon">
    </RouterLink>
  </div>
</template>

<script setup>
import taskSelected from '@/assets/images/task-selected.png';
import taskUnselected from '@/assets/images/task-unselected.png';
import itemSelected from '@/assets/images/item-selected.png';
import itemUnselected from '@/assets/images/item-unselected.png';
import messageSelected from '@/assets/images/message-selected.png';
import messageUnselected from '@/assets/images/message-unselected.png';
import userSelected from '@/assets/images/user-selected.png';
import userUnselected from '@/assets/images/user-unselected.png';

const props = defineProps({
  nowView: {
    type: String,
    default: '悬赏'
  }
});
const activeTab = ref(props.nowView);
const navIconsL = ref([
  {
    label: '悬赏',
    se: taskSelected,
    unse: taskUnselected,
    route: '/tasks'
  },
  {
    label: '二手',
    se: itemSelected,
    unse: itemUnselected,
    route: '/items'
  },
]);

const navIconsR = ref([
  {
    label: '消息',
    se: messageSelected,
    unse: messageUnselected,
    route: '/messages'
  },
  {
    label: '我的',
    se: userSelected,
    unse: userUnselected,
    route: '/user'
  },
]);
</script>

<style>
.icons {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.icon {
  height: 72%;
}

.post {

  height: 80%;

}

.nav-item {
  text-align: center;
  flex: 1;
}

.nav {
  filter: drop-shadow(0vw -0.769vw 0.513vw #00000040);
  background-image: url('@/assets/images/navBackground.png');
  background-size: 100%;
  background-repeat: no-repeat;

  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
