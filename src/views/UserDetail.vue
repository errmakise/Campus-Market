<template>
  <div class="container">
    <div class="gray-part">
      <TopBar />
    </div>

    <div class="user">
      <avatar :src="avatarUrl" size="10vh" class="avatar" />
      <span class="user-name">{{ userName }}</span>
    </div>

    <div class="divider"></div>

    <div class="categories">
      <buttun class="category" :class="{ active: activeIndex === 0 }" @click="clickItems">
        <span>商品</span>
      </buttun>

      <buttun class="category" :class="{ active: activeIndex === 1 }" @click="clickTasks">
        <span>悬赏</span>
      </buttun>

      <buttun class="category" :class="{ active: activeIndex === 2 }" @click="clickComment">
        <span>评价</span>
      </buttun>


    </div>


    <!-- 瀑布流组件 -->
    <div class="content" @scroll="handleScroll" ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <WaterfallGrid  v-if="activeIndex === 0" :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <ItemCard :itemId="element.id" :title="element.title" :price="element.price" :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>


        <WaterfallGrid  v-else-if="activeIndex === 1" :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <ItemCard :itemId="element.id" :title="element.title" :price="element.price" :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>

        <div v-else>
          <CommentCard />
          <CommentCard />
        </div>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>

    </div>

    <buttun class="botton" v-if="!isOwn" @click="clickButton">
      <img src="@/assets/images/add-white.png" class="buttun-icon" />
      <span>{{ isFollowed ? '取消关注' : '关注' }}</span>
    </buttun>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue';
const avatarUrl = ref('https://img.yzcdn.cn/vant/cat.jpeg');
const userName = ref('用户名');
const followNumber = ref(100);
const starNumber = ref(210);
const activeIndex = ref(0);
const isFollowed = ref(false);
const isOwn = ref(false);

const clickItems = () => {
  activeIndex.value = 0;
};

const clickTasks = () => {
  activeIndex.value = 1;
};

const clickComment = () => {
  activeIndex.value = 2;
};

const clickButton = () => {
  console.log('点击了按钮');
};

import { usePagination } from "@/utils/usePagination";
import { getItems } from "@/api/api.js";
import CommentCard from '@/components/CommentCard.vue';

const masonryContainer = ref(null);

// 使用封装的分页逻辑
const { items, loading, hasMore, fetchItems, refreshItems, currentPage } = usePagination(getItems);

// 滚动加载防抖
let debounceTimeout;
const handleScroll = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const target = masonryContainer.value;
    if (!target) return;

    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    if (isBottom && !loading.value) {
      currentPage.value += 1;
      fetchItems();
    }
  }, 200);
};

// 下拉刷新逻辑
const isRefreshing = ref(false);
const onRefresh = async () => {
  isRefreshing.value = true;
  await refreshItems();
  isRefreshing.value = false;
};

// 页面加载时初始数据
onMounted(() => {
  fetchItems();
});
</script>


<style scoped>
.buttun-icon {
  height: 3vh;
  margin-right: 1vw;
}

.botton {
  position: absolute;
  bottom: 2vh;
  z-index: 3;
  background-color: #613eea;
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  padding: 1vh 11vw;
  font-size: 16px;

}

.content {
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
}

.categories {
  margin: 2.5vh auto 3vh 7.5vw;
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

.divider {
  width: 90vw;
  height: 0px;
  border: 1px solid rgb(216, 215, 215);
  margin-top: 24vh;
}

.user-name {
  margin-left: 4vw;
  font-size: 16px;
  font-weight: 600;
}

.avatar {}

.user {
  position: absolute;
  top: calc(15% - 3vh);
  width: 100%;
  z-index: 2;
  padding-left: 8vw;
  display: flex;
  align-items: center;
}

.content {
  z-index: 2;
}

.container {
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  font-family: "ali", sans-serif;
  font-size: 14px;

}

.gray-part {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 15%;
  background-color: #fafafa;
  z-index: 1;
}
</style>
