<template>
  <div class="container">
    <!-- 搜索框组件 -->
    <SearchBar />

    <!-- 分类组件 -->
    <div class="nearbyTitle">
      <span>附近任务</span>
      <img src="@/assets/images/extendIcon.png" class="image" @click="handleClickNearby" alt="Nearby" />
    </div>
    <TaskSwipe class="swipe" :tasks="nearbySwipe" />

    <!-- 任务类型标签 -->
    <TasksTypes class="categories" @tabClick="handleTabClick" :tabs="types" :selectedTab="selectedCategory" />

    <!-- 标签选择栏 -->
    <TasksTagsBar class="tagsBar" :options="tagsOptions" :activeIndex="activeTagIndex" @tabClick="handleTagClick" />

    <!-- 商品瀑布流列表 -->
    <div class="items" @scroll="handleScroll" ref="masonryContainer">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <WaterfallGrid :elements="items" :number-of-columns="2" :loading="loading">
          <template #card="{ element }">
            <TaskCard :postId="element.id" :title="element.title" :reward="element.price"
              :imageUrl="element.imageUrl" />
          </template>
        </WaterfallGrid>
      </van-pull-refresh>

      <!-- 状态提示 -->
      <div class="status-indicator">
        <div v-if="loading">正在加载...</div>
        <div v-else-if="!hasMore">没有更多数据了</div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePagination } from "@/utils/usePagination";
import { getItems, fetchTagOptions, getNearbySwipe } from "@/api/api.js"; // 确保路径正确
import { showFailToast, showSuccessToast, Toast } from 'vant'; // 导入 Vant 的 Toast 组件

const router = useRouter();

// 定义任务类型
const types = ref([
  { typeId: 1, typeName: '推荐' },
  { typeId: 2, typeName: '最新' },
  { typeId: 3, typeName: '求助' },
  { typeId: 4, typeName: '跑腿' },
  { typeId: 5, typeName: '寻物' },
  { typeId: 6, typeName: '求购' },
]);

// 当前选中的类别 ID
const selectedCategory = ref(3); // 默认选中 '求助'

// 标签选项
const tagsOptions = ref([]);

// 当前选中的标签索引
const activeTagIndex = ref(0);

// 使用封装的分页逻辑，传入当前类别和选中的标签
const { items, loading, hasMore, fetchData, refreshItems, currentPage, resetPagination } = usePagination(
  (page, pageSize) => getItems(page, pageSize, selectedCategory.value),
  10
);
//, tagsOptions.value[activeTagIndex.value]?.id

const masonryContainer = ref(null);

// 处理类别标签点击
const handleTabClick = async (typeId) => {
  if (selectedCategory.value === typeId) return; // 如果点击的是当前选中类别，则不执行任何操作

  selectedCategory.value = typeId; // 更新选中的类别

  // 请求对应类别的标签
  try {
    tagsOptions.value = await fetchTagOptions(typeId);
    activeTagIndex.value = 0; // 默认选择第一个标签
    resetPagination();
    fetchData();
  } catch (error) {
    Toast.fail('获取标签失败，请稍后重试');
  }
};

// 处理标签点击
const handleTagClick = (index) => {
  activeTagIndex.value = index;
  resetPagination();
  fetchData();
};



// 处理点击“附近任务”
const handleClickNearby = () => {
  console.log('点击了附近任务');
  router.push('/nearby');
};

// 滚动加载防抖
let debounceTimeout;
const handleScroll = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const target = masonryContainer.value;
    if (!target) return;

    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    if (isBottom && !loading.value && hasMore.value) {
      currentPage.value += 1;
      fetchData();
    }
  }, 200);
};

// 下拉刷新逻辑
const isRefreshing = ref(false);
const onRefresh = async () => {
  isRefreshing.value = true;
  try {
    tagsOptions.value = await fetchTagOptions(selectedCategory.value);
    activeTagIndex.value = 0;
    resetPagination();
    await refreshItems();
    showSuccessToast('刷新成功');
  } catch (error) {
    showFailToast('刷新失败，请稍后重试');
  } finally {
    isRefreshing.value = false;
  }
};

import AMapLoader from '@amap/amap-jsapi-loader'
// 初始化时获取默认类别的标签和商品列表
onMounted(async () => {
  try {
    tagsOptions.value = await fetchTagOptions(selectedCategory.value);
    activeTagIndex.value = 0;
    fetchData();
  } catch (error) {
    showFailToast('初始化失败，请稍后重试');
  }

  if (window.AMap) {
    initializeGeolocation(window.AMap)
    getLocation()
  } else {
    // 如果AMap未加载，等待加载
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Geolocation'],
    })
      .then((AMap) => {
        initializeGeolocation(AMap)
        getLocation()
      })
      .catch((e) => {
        console.error('tasks主页高德地图API加载失败:', e)
      })
  }
});


let geolocation = null
const getLocation = () => {
  if (geolocation) {
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        handleGeolocationComplete(result)
      } else {
        handleGeolocationError(result)
      }
    });
  } else {
    console.error('Geolocation 未初始化');
  }
};

// 初始化 Geolocation
const initializeGeolocation = (AMap) => {
  AMap.plugin("AMap.Geolocation", function () {
    //在回调函数中实例化插件，并使用插件功能
    geolocation = new AMap.Geolocation({
      getCityWhenFail: true,
    })
  });
}

const location = ref(null);
const nearbySwipe = ref([]);
//
const handleGeolocationComplete = (data) => {
  console.log("定位完成", data)
  location.value = { lat: data.position.lat, lng: data.position.lng };
  console.log("当前位置", location.value)
  getNearbySwipe(location.value.lat, location.value.lng)
    .then((res) => {
      nearbySwipe.value = res;
      console.log("附近任务", res)
    })
    .catch((error) => {
      console.error('获取附近任务失败', error);
    });
};

const handleGeolocationError = (error) => {
  console.error('定位失败', error);
  location.value = null;

};
</script>



<style scoped>
.swipe {
  margin-top: 1vh;
}

.categories {
  margin-top: 1.7vh;
}

.tagsBar {
  margin-top: 1vh;
  margin-bottom: 2vh;
}

.nearbyTitle {
  display: flex;
  justify-content: space-between;
  width: 87vw;
  font-weight: 600;
  font-family: 'ali', sans-serif;
  font-size: 16px;
  margin-top: 2.2vh;
}

.nearbyTitle .image {
  height: 24px;
}

.items {
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
  margin-top: 1vh;
}

.masonry {
  display: flex;
}

.masonry-column {
  flex: 1;
  /* 确保每列均分宽度 */
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* 列内卡片的间距 */
  margin-left: 4px;
  margin-right: 4px;
}



.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3vh;
  align-items: center;
  overflow-x: hidden;

}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
