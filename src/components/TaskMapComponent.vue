<template>
  <div class="map-container">
    <div id="taskMapContainer" style="border-radius: 20px;width: 100%; height: 100%;"></div>
    <div v-if="showTaskOverlay" class="overlay">
      <div class="overlay-content">
        <img class="x-icon" src="@/assets/images/x.png" @click="closeOverlay" />
        <p class="title">{{ selectedTask.description }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const map = ref(null); // 地图实例
const tasks = ref([]); // 任务数据
const lastClickedMarker = ref(null); // 上次点击的标记
const userPosition = ref(null); // 用户当前位置

// 遮罩层相关状态
const showTaskOverlay = ref(false); // 是否显示遮罩层
const selectedTask = reactive({ title: '', description: '', id: null }); // 当前选中的任务

onMounted(() => {
  if (typeof AMap === 'undefined') {
    console.error('AMap is not defined. 请检查高德地图脚本是否正确引入。');
    return;
  }

  // 初始化地图，禁用拖拽和缩放功能
  map.value = new AMap.Map('taskMapContainer', {
    zoom: 18,
    //dragEnable: false, // 禁用拖拽
    //zoomEnable: false, // 禁用缩放
  });

  // 获取用户当前位置并设置地图中心
  map.value.plugin('AMap.Geolocation', () => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      zoomToAccuracy: true,
    });


    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        userPosition.value = result.position; // 保存用户位置
        map.value.setCenter(userPosition.value); // 设置地图中心
        console.log('用户位置：', userPosition.value);
        // 加载附近任务点
        loadTasks(userPosition.value);
      } else {
        console.error('定位失败：', result);
        alert('定位失败，请确保已授权定位权限。');
      }
    });
  });
});

// 加载附近任务点
const loadTasks = async (position) => {
  try {
    tasks.value = [
      {
        id: 1,
        title: '代取快递',
        description: '帮助我从A点取快递到B点帮助我从A点取快递到B点帮助我从A点取快递到B点',
        latitude: 31.284,
        longitude: 121.495998,
      },
      {
        id: 2,
        title: '帮忙买早餐',
        description: '帮我从食堂买一份早餐送到宿舍',
        latitude: 31,
        longitude: 121.49,
      },
    ];
    renderTaskMarkers(tasks.value); // 渲染任务标记
  } catch (error) {
    console.error('加载任务失败:', error);
  }
};

// 渲染任务标记
const renderTaskMarkers = (tasks) => {
  tasks.forEach((task) => {
    const marker = new AMap.Marker({
      position: [task.longitude, task.latitude],
      map: map.value,
      title: task.title, // 标记悬停时显示的标题
    });

    // 绑定点击事件
    marker.on('click', () => handleMarkerClick(marker, task));
  });
};

// 处理标记点击事件
const handleMarkerClick = (marker, task) => {
  // 设置当前选中的任务信息并显示遮罩层
  selectedTask.title = task.title;
  selectedTask.description = task.description;
  selectedTask.id = task.id;
  showTaskOverlay.value = true;
};

// 跳转到任务详情页
const goToTaskDetail = () => {
  if (selectedTask.id) {
    window.location.href = `/task/${selectedTask.id}`; // 跳转到任务详情页
  }
};

// 关闭遮罩层
const closeOverlay = () => {
  showTaskOverlay.value = false;
};



</script>

<style scoped>
.title {
  font-size: 16px;
  max-height: 8vh;
  overflow-y: hidden;
}

.x-icon {
  margin-left: auto;
  height: 20px;
}

/* 地图容器外层，设置相对定位 */
.map-container {
  position: relative;
  /* 限制遮罩层范围 */
  width: 92vw;
  height: 26vh;
  box-shadow: #666666 0px 1px 5px;
  margin-top: 1vh;
  border-radius: 20px
}

/* 遮罩层样式 */
.overlay {
  position: absolute;
  /* 相对于 .map-container 定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-content {
  background: white;
  padding: 1.5vh 3vw;
  border-radius: 15px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
