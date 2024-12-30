<template>
  <div class="category-content">
    <!-- 分类部分 -->
    <div class="categories">
      <button v-for="(category, index) in filteredCategories" :key="index" class="category"
        :class="{ active: activeIndex === index }" @click="handleCategoryClick(index)">
        <span>{{ category.label }}</span>
      </button>
    </div>

    <!-- 内容部分 -->
    <div class="content" @scroll="handleScroll" ref="contentContainer" :style="{ maxHeight: props.maxHeight }">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <!-- 商品内容 -->
        <WaterfallGrid v-if="activeIndex === 0" :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <ItemCard :itemId="element.id" :title="element.title" :price="element.price" :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>

        <!-- 悬赏内容 -->
        <WaterfallGrid v-else-if="activeIndex === 1" :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <TaskCard :postId="element.id" :title="element.title" :reward="element.reward"
              :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>

        <!-- 评论内容 -->
        <div v-else class="comment-list">
          <CommentCard v-for="(comment, index) in items" :key="index" :comment="comment" />
        </div>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { usePagination } from "@/utils/usePagination";
import { getItems, getTasks, getUserComments } from "@/api/api.js";

// Props
const props = defineProps({
  showComments: {
    type: Boolean,
    default: true, // 是否显示评论分类
  },
  maxHeight: {
    type: String,// 内容区域的最大高度
  },
});

// 数据
const activeIndex = ref(0);
const categories = ref([
  { label: "商品" },
  { label: "悬赏" },
  { label: "评价" },
]);

// 过滤分类
const filteredCategories = computed(() => {
  return props.showComments ? categories.value : categories.value.slice(0, 2);
});

// 分页数据
const isRefreshing = ref(false);
const contentContainer = ref(null);

// 分页工具
const { items, fetchData, loading, hasMore, refreshItems } = usePagination(fetchDataCallback, 10);

// 动态选择请求函数
function fetchDataCallback(page, pageSize) {
  if (activeIndex.value === 0) {
    return getItems(page, pageSize);
  } else if (activeIndex.value === 1) {
    return getTasks(page, pageSize);
  } else {
    return getUserComments(page, pageSize);
  }
}

// 切换分类
const handleCategoryClick = (index) => {
  activeIndex.value = index;
  refreshItems();
};

// 滚动加载
const handleScroll = () => {
  const target = contentContainer.value;
  if (
    target.scrollHeight - target.scrollTop <=
    target.clientHeight + 10 &&
    !loading.value &&
    hasMore.value
  ) {
    fetchData();
  }
};




// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true;
  await refreshItems();
  isRefreshing.value = false;
};

// 初始化数据
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.category-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.categories {
  margin: 2.5vh auto 3vh 6vw;
}

.category {
  background-color: rgb(216, 215, 215);
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 20px;
  margin-right: 3.5vw;
  border: none;
}

.category.active {
  background-color: #613eea;
  color: white;
}

.content {
  width: 100%;
  overflow-y: auto;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.status-indicator {
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
