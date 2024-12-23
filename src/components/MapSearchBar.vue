<template>
  <div class="search-container">
    <div class="search-bar">
      <img src="@/assets/images/left-round.png" alt="搜索" class="search-icon" />
      <input type="text" v-model="searchQuery" @input="onSearchInput" placeholder="搜索地点" class="search-input"
        ref="searchInput" />
    </div>

    <ul v-if="combinedResults.length" class="search-results">
      <li v-for="result in combinedResults" :key="result.id" @click="handleClick(result)"
        :class="{ 'custom-marker': result.type === 'shared' || 'user', 'map-suggestion': result.type === 'map' }">
        {{ result.name }}
      </li>
    </ul>

  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 定义组件的 props
const props = defineProps({
  markers: {
    type: Array,
    required: true,
  },
});

// 定义组件的事件
const emit = defineEmits(['select']);

// 搜索查询
const searchQuery = ref('');
// 自定义标记搜索结果
const searchResults = ref([]);
// 高德地图搜索建议结果
const mapResults = ref([]);
// 合并后的搜索结果
const combinedResults = ref([]);



// 引用搜索输入框
const searchInput = ref(null);
const maxSuggestions = 5 // 设置最大提示条数

// 处理 AutoComplete 完成事件
const handleAutoCompleteComplete = (data) => {
  console.log("搜索完成", data.tips)
  if (data) {
    data.tips = data.tips.slice(0, maxSuggestions)
    mapResults.value = data.tips.map((tip) => ({
      id: `map-tip.id`,
      name: tip.name,
      location: tip.location, // { lng: 经度, lat: 纬度 }
      type: 'map',
    }));
  } else {
    mapResults.value = [];
  }
  console.log("高德地图搜索结果", mapResults.value)
  updateCombinedResults();
};

// 处理 AutoComplete 错误事件
const handleAutoCompleteError = (error) => {
  console.error('AutoComplete 错误:', error);
  mapResults.value = [];
  updateCombinedResults();
};

// 搜索输入处理
const onSearchInput = () => {
  const query = searchQuery.value.trim();

  // 清空自定义标记搜索结果
  searchResults.value = [];

  if (!query) {
    // 如果搜索框为空，清空所有结果
    mapResults.value = [];
    combinedResults.value = [];
    return;
  }

  // 自定义标记搜索
  const lowerQuery = query.toLowerCase();
  searchResults.value = props.markers
    .filter(marker =>
      (marker.type === 'user' || marker.type === 'shared') &&
      marker.name.toLowerCase().includes(lowerQuery)
    )
    .map(marker => ({
      id: marker.id,
      name: marker.name,
      position: marker.position, // [lng, lat]
      type: marker.type,
    }));

  // 使用高德地图的自动完成服务
  if (autoComplete) {
    autoComplete.search(query);
  }

  // 合并结果将在 AutoComplete 的回调中处理
};

// 更新合并后的搜索结果
const updateCombinedResults = () => {
  combinedResults.value = [
    ...searchResults.value,
    ...mapResults.value,
  ];
  console.log("合并结果", combinedResults.value)
};

// 处理搜索结果点击
const handleClick = (result) => {
  searchQuery.value = result.name;
  combinedResults.value = [];

  emit('select', result);
};

import AMapLoader from '@amap/amap-jsapi-loader'

// 初始化 AutoComplete
onMounted(() => {
  if (window.AMap) {
    initializeAutocomplete(window.AMap)
  } else {
    // 如果AMap未加载，等待加载
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Autocomplete'],
    })
      .then((AMap) => {
        initializeAutocomplete(AMap)
      })
      .catch((e) => {
        console.error('搜索框组件高德地图API加载失败:', e)
      })
  }
});

// Autocomplete 实例
let autoComplete = null
// 初始化 Autocomplete
const initializeAutocomplete = (AMap) => {
  AMap.plugin("AMap.AutoComplete", function () {
    //在回调函数中实例化插件，并使用插件功能
    autoComplete = new AMap.AutoComplete({
      city: '上海', // 限制城市范围，可选
    })
    // 监听搜索完成事件
    autoComplete.on('complete', handleAutoCompleteComplete)
    autoComplete.on('error', handleAutoCompleteError);
  });
}

// 清理事件监听
onBeforeUnmount(() => {
  if (autoComplete) {
    autoComplete.off('complete', handleAutoCompleteComplete);
    autoComplete.off('error', handleAutoCompleteError);
    autoComplete = null;
  }
});
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-container {
  position: absolute;
  top: 4vh;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90vw;
  z-index: 1000;
}

.search-icon {
  height: 4vh;
  box-shadow: #ccc 0 3px 5px;
  border-radius: 50%;
}

.search-input {
  background-color: white;
  height: 5.5vh;
  padding: 0 2vw;
  border: none;
  border-radius: 10px;
  width: 80vw;
  box-shadow: #ccc 0 2px 5px;
  outline: none;
}

.search-results {
  background: white;
  border: 1px solid #ccc;
  width: 80vw;
  max-height: 30vh;
  overflow-y: auto;
  z-index: 1001;
  margin-left: auto;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: #ccc 0 2px 5px;
  font-size: 14px;

}

.search-results li {
  padding: 10px;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #f0f0f0;
}

/* 可选：根据结果类型进行样式区分 */
.search-results li.custom-marker {
  font-style: italic;
}

.search-results li.map-suggestion {}
</style>
