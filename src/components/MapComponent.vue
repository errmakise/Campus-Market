<template>
  <div>
    <div id="mapContainer"></div>

    <van-overlay :show="showPopup">
      <div class="popup">
        <h3>添加点位信息</h3>
        <label>
          点位名称：
          <input type="text" v-model="pointData.name" placeholder="请输入点位名称" />
        </label>
        <label>
          <input type="checkbox" v-model="pointData.sync" />
          同步给其他用户
        </label>
        <div class="popup-buttons">
          <button @click="confirmUpload">确认上传</button>
          <button @click="cancelUpload">取消上传</button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const map = ref(null); // 地图实例
const tempMarker = ref(null); // 当前待上传点位
const showPopup = ref(false); // 是否显示弹窗
const pointData = reactive({ name: '', sync: false }); // 点位信息


const props = defineProps({
  existedMarkers: {// 已上传点位列表
    type: Array,
    default: () => [
      { name: '点位1', position: [116.404, 39.915] },
      { name: '点位2', position: [116.397, 39.921] },
      // 其他点位...
    ],
  }
});
const markers = ref(props.existedMarkers); // 已上传点位列表

onMounted(() => {
  if (typeof AMap === 'undefined') {
    console.error('AMap is not defined. 请检查高德地图脚本是否正确引入。');
    return;
  }

  // 初始化地图
  map.value = new AMap.Map('mapContainer', {
    zoom: 15,
  });

  // 使用高德地图定位插件获取用户当前位置
  map.value.plugin('AMap.Geolocation', () => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位
      timeout: 10000, // 定位超时时间
      buttonPosition: 'RB', // 定位按钮的位置
      zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
      showCircle: false,
    });

    // 添加定位控件
    map.value.addControl(geolocation);

    // 获取用户当前位置
    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        console.log('定位成功：', result);
        const position = result.position; // 定位结果
        map.value.setCenter(position); // 设置地图中心为当前位置
      } else {
        console.error('定位失败：', result);
        alert('定位失败，请确保已授权定位权限。');
      }
    });
  });

  // 地图点击事件
  map.value.on('click', (e) => {

    const { lng, lat } = e.lnglat;

    // 如果已有待上传点位，先移除
    if (tempMarker.value) {
      tempMarker.value.setMap(null);
    }

    // 创建新的待上传点位
    tempMarker.value = new AMap.Marker({
      position: [lng, lat],
      map: map.value,
      draggable: true, // 支持拖拽调整位置
    });

    // 为临时点位绑定点击事件
    tempMarker.value.on('click', () => {
      showPopup.value = true; // 点击时重新显示弹窗
    });

    // 重置弹窗数据
    pointData.name = '';
    pointData.sync = false;

    // 显示弹窗
    showPopup.value = true;
  });

  markers.value.forEach((marker) => {
    new AMap.Marker({
      position: marker.position,
      map: map.value,
      title: marker.name, // 显示点位名称
    });
  });
});

// 确认上传
const confirmUpload = () => {
  if (!pointData.name.trim()) {
    alert('点位名称不能为空！');
    return;
  }

  // 获取待上传点位的坐标
  const position = tempMarker.value.getPosition();

  // 添加到已上传点位列表
  markers.value.push({
    name: pointData.name,
    sync: pointData.sync,
    position: [position.lng, position.lat],
  });

  // 转换为固定标记
  new AMap.Marker({
    position: [position.lng, position.lat],
    map: map.value,
    title: pointData.name, // 设置点位名称为标题
  });

  // 清除临时点位
  tempMarker.value.setMap(null);
  tempMarker.value = null;

  // 关闭弹窗
  showPopup.value = false;
};

// 取消上传
const cancelUpload = () => {
  // 关闭弹窗，但保留当前待上传点位
  showPopup.value = false;
};

// 页面销毁时清除临时点位
onUnmounted(() => {
  if (tempMarker.value) {
    tempMarker.value.off('click');
    tempMarker.value.setMap(null);
    tempMarker.value = null;
  }
});
</script>

<style scoped>
/* 地图容器样式 */
#mapContainer {
  width: 100vw;
  height: 100vh;
  border: 1px solid #ccc;
}

/* 弹窗样式 */
.popup {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  z-index: 1000;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.popup-buttons button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-buttons button:first-child {
  background-color: #4caf50;
  color: white;
}

.popup-buttons button:last-child {
  background-color: #f44336;
  color: white;
}
</style>
