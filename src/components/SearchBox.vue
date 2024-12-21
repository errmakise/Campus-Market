<!-- src/components/SearchBox.vue -->
<template>
  <div class="search-box">
    <input type="text" v-model="keyword" @input="handleInput" @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev" @keydown.enter.prevent="selectSuggestion" placeholder="请输入地点"
      ref="inputRef" />
    <ul v-if="suggestions.length" class="suggestions-list">
      <li v-for="(suggestion, index) in suggestions" :key="index" :class="{ active: index === highlightedIndex }"
        @click="selectSuggestion(index)" @mouseover="highlightedIndex = index">
        {{ suggestion.name }} - {{ suggestion.address }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'


const emit = defineEmits(['onSelect'])

// Refs and reactive data
const keyword = ref('')
const suggestions = ref([])
const highlightedIndex = ref(-1)
const inputRef = ref(null)

// Autocomplete 实例
let autocomplete = null

// 初始化 Autocomplete
const initializeAutocomplete = (AMap) => {
  AMap.plugin("AMap.AutoComplete", function () {
    //在回调函数中实例化插件，并使用插件功能
    autocomplete = new AMap.AutoComplete({
    })
    // 监听搜索完成事件
    autocomplete.on('complete', (data) => {
      console.log("搜索完成",data)
      suggestions.value = data.tips || []
      highlightedIndex.value = -1
    })
    autocomplete.on('select', (data) => {
      console.log("原生选择", data)
    })
  });



}

// 处理输入事件
const handleInput = () => {
  if (autocomplete && keyword.value) {
    autocomplete.search(keyword.value)
  } else {
    suggestions.value = []
  }
}

// 高亮下一个建议
const highlightNext = () => {
  if (suggestions.value.length === 0) return
  highlightedIndex.value =
    (highlightedIndex.value + 1) % suggestions.value.length
}

// 高亮上一个建议
const highlightPrev = () => {
  if (suggestions.value.length === 0) return
  highlightedIndex.value =
    (highlightedIndex.value - 1 + suggestions.value.length) %
    suggestions.value.length
}


// 选择建议
const selectSuggestion = (index = highlightedIndex.value) => {
  if (index >= 0 && index < suggestions.value.length) {
    const selected = suggestions.value[index]
    keyword.value = selected.name
    suggestions.value = []
    console.log("选择", selected)
    emit('onSelect', selected)
  }
}

// 在组件挂载时初始化 Autocomplete
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
        console.error('高德地图API加载失败:', e)
      })
  }
})
</script>

<style scoped>
.search-box {
  position: relative;
  width: 300px;
}

.search-box input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestions-list li.active,
.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
