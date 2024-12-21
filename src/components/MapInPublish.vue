<template>
  <div>
    <div id="mapContainer"></div>

    <MapSearchBar :markers="markers" @select="selectSearchResult" />

    <!-- 上传弹窗 -->
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

    <!-- 确认地址选择弹窗 -->
    <van-overlay :show="showAddressConfirmPopup">
      <div class="popup">
        <h3>是否确认地址选择</h3>
        <p>{{ selectedMarker.name }}</p>
        <div class="popup-buttons">
          <button @click="confirmAddressSelection">确认</button>
          <button @click="cancelAddressSelection">取消</button>
        </div>
      </div>
    </van-overlay>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const map = ref(null); // 地图实例
const tempMarker = ref(null); // 当前待上传点位
const showPopup = ref(false); // 是否显示上传弹窗
const showAddressConfirmPopup = ref(false); // 是否显示地址确认弹窗
const selectedMarker = ref(null); // 当前选中的标记

const pointData = reactive({ name: '', sync: false }); // 点位信息

const props = defineProps({
  existedMarkers: {
    type: Array,
    default: () => [
      { name: '地图点位1', position: [116.404, 39.915], type: 'map' },
      { name: '地图点位2', position: [116.397, 39.921], type: 'map' },
      // 其他地图自带点位...
    ],
  },
  userDefinedMarkers: {
    type: Array,
    default: () => [
      // 用户自定义的点位
      { name: '用户点位1', position: [116, 39.915], type: 'user' },
    ],
  },
  sharedMarkers: {
    type: Array,
    default: () => [
      // 其他用户共享的点位
      { name: '共享点位1', position: [116, 39], type: 'shared' },
    ],
  }
});

const markers = ref([...props.existedMarkers, ...props.userDefinedMarkers, ...props.sharedMarkers]);


let sharedMarkerInstance = null; // 当前显示的共享标记实例


const selectSearchResult = (result) => {

  console.log("父组件接收搜索提示", result);
  map.value.setCenter(result.position);

  // map.value.panTo(result.position, true); 快速跳转

  selectedMarker.value = result;

  if (result.type === 'shared') {
    // 显示共享标记
    if (sharedMarkerInstance) {
      sharedMarkerInstance.setMap(null);
    }
    sharedMarkerInstance = new AMap.Marker({
      position: result.position,
      map: map.value,
      title: result.name,
      //icon: 'path/to/shared-marker-icon.png', // 自定义共享标记图标
    });

    // 绑定点击事件
    sharedMarkerInstance.on('click', () => {
      showConfirmAddressPopup(result);
    });
  }

  showConfirmAddressPopup(result);
};



//弹窗相关
//#region
const showConfirmAddressPopup = (marker) => {
  selectedMarker.value = marker;
  showAddressConfirmPopup.value = true;
};

const confirmAddressSelection = () => {
  // 执行页面跳转并传递地址信息
  router.push({ name: 'DetailPage', params: { marker: selectedMarker.value } });
  showAddressConfirmPopup.value = false;
};

const cancelAddressSelection = () => {
  showAddressConfirmPopup.value = false;
};

const showUploadPopup = () => {
  showPopup.value = true;
};

const confirmUpload = async () => {
  if (!pointData.name.trim()) {
    alert('点位名称不能为空！');
    return;
  }

  try {
    // 模拟上传操作
    // 替换为实际的上传逻辑
    // await uploadMarker(pointData, tempMarker.value.getPosition());

    // 假设上传成功
    const position = tempMarker.value.getPosition();
    const newMarker = {
      name: pointData.name,
      sync: pointData.sync,
      position: [position.lng, position.lat],
      type: 'user',
    };
    markers.value.push(newMarker);

    // 创建永久标记
    createMarker(newMarker);

    // 清除临时标记
    tempMarker.value.setMap(null);
    tempMarker.value = null;

    showPopup.value = false;
  } catch (error) {
    console.error('上传失败：', error);
    alert('上传失败，请重试。');
    // 保留临时标记
    showPopup.value = false;
  }
};

const cancelUpload = () => {
  if (tempMarker.value) {
    tempMarker.value.setMap(null);
    tempMarker.value = null;
  }
  showPopup.value = false;
};

//#endregion

// 创建标记
const createMarker = (marker) => {
  const amapMarker = new AMap.Marker({
    position: marker.position,
    map: map.value,
    title: marker.name,
  });

  amapMarker.on('click', () => {
    if (marker.type === 'shared') {
      showConfirmAddressPopup(marker);
    } else if (marker.type === 'map' || marker.type === 'user') {
      showConfirmAddressPopup(marker);
    }
  });

  return amapMarker;
};

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
      enableHighAccuracy: true,
      timeout: 10000,
      buttonPosition: 'RB',
      zoomToAccuracy: true,
      showCircle: false,
    });

    map.value.addControl(geolocation);

    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        console.log('定位成功：', result);
        const position = result.position;
        map.value.setCenter(position);
      } else {
        console.error('定位失败：', result);
        alert('定位失败，请确保已授权定位权限。');
      }
    });
  });

  // 添加地图自带和用户自定义的标记
  const permanentMarkers = markers.value.filter(marker => marker.type !== 'shared');
  permanentMarkers.forEach(marker => {
    createMarker(marker);
  });

  // 地图点击事件
  map.value.on('click', (e) => {
    const { lng, lat } = e.lnglat;

    // 隐藏共享标记
    if (sharedMarkerInstance) {
      sharedMarkerInstance.setMap(null);
      sharedMarkerInstance = null;
    }

    // 处理用户自定义标记的逻辑
    if (tempMarker.value) {
      tempMarker.value.setMap(null);
    }

    tempMarker.value = new AMap.Marker({
      position: [lng, lat],
      map: map.value,
      draggable: true,
      type: 'temporary',
    });

    tempMarker.value.on('click', () => {
      showUploadPopup();
    });

    pointData.name = '';
    pointData.sync = false;

    showPopup.value = true;
  });
});


onUnmounted(() => {
  if (tempMarker.value) {
    tempMarker.value.off('click');
    tempMarker.value.setMap(null);
    tempMarker.value = null;
  }

  if (sharedMarkerInstance) {
    sharedMarkerInstance.setMap(null);
    sharedMarkerInstance = null;
  }
});
</script>

<style scoped>
.search-icon {
  height: 5vh;
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
  box-shadow: #ccc 0 3px 5px;
}

.map-search {
  position: absolute;
  top: 4vh;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92vw;
}

#mapContainer {
  width: 100vw;
  height: 100vh;
  border: 1px solid #ccc;
}

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

.search-results {
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ccc;
  width: 92vw;
  max-height: 30vh;
  overflow-y: auto;
  z-index: 1000;
}

.search-results li {
  padding: 10px;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #f0f0f0;
}
</style>
