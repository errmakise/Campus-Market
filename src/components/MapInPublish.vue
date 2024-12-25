<template>
  <div>
    <div id="mapContainer"></div>

    <MapSearchBar :markers="markers" @select="selectSearchResult" />



    <van-popup v-model:show="showPopup" round position="bottom" class="popup add-address"
      @click-overlay="onClickOverlay">

      <h3 style="margin-right: auto;">添加点位信息</h3>
      <div class="input-box">
        点位名称：
        <input type="text" v-model="pointData.name" placeholder="请输入点位名称" class="input-frame" />
      </div>
      <label style="margin-top: auto;margin-right: auto;">
        <input type="checkbox" v-model="pointData.sync" />
        同步给其他用户
      </label>
      <div class="popup-buttons">
        <button @click="cancelUpload">取消</button>
        <button @click="confirmUpload">确认</button>
      </div>

    </van-popup>

    <!-- 确认地址选择弹窗 -->
    <van-popup v-model:show="showAddressConfirmPopup" round class="popup address-confirm"
      @click-overlay="onClickOverlay">
      <h3>是否确认地址选择?</h3>
      <p>{{ selectedMarker.name }}</p>
      <div class="popup-buttons">
        <button @click="cancelAddressSelection">取消</button>
        <button @click="confirmAddressSelection">确认</button>

      </div>
    </van-popup>


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

const pointData = reactive({ name: '', sync: false }); // 自定义点位信息

const props = defineProps({
  userDefinedMarkers: {
    type: Array,
    default: () => [
      // 用户自定义的点位
      { name: '用户点位1', position: [116, 39.915], type: 'user', id: 1 },
      { name: '用户点位2', position: [116.404, 39.915], type: 'user', id: 2 },
    ],
  },
  sharedMarkers: {
    type: Array,
    default: () => [
      // 其他用户共享的点位
      { name: '共享点位1', position: [116, 39], type: 'shared', id: 3 },
      { name: '共享点位2', position: [116.397, 39.921], type: 'shared', id: 4 },
    ],
  }
});





const markers = ref([...props.userDefinedMarkers, ...props.sharedMarkers]);



let sharedMarkerInstance = null; // 当前显示的共享标记实例

//处理搜索框选中地址后，标点的逻辑
const selectSearchResult = (result) => {

  console.log("父组件接收搜索提示", result);
  // 隐藏共享标记
  if (sharedMarkerInstance) {
    sharedMarkerInstance.setMap(null);
    sharedMarkerInstance = null;
  }
  // 处理用户自定义标记的逻辑
  if (tempMarker.value) {
    tempMarker.value.setMap(null);
  }

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
// 显示地址确认弹窗
const showConfirmAddressPopup = (marker) => {
  selectedMarker.value = marker;
  showAddressConfirmPopup.value = true;
};
// 确认地址选择
const confirmAddressSelection = () => {
  console.log("确认地址选择", selectedMarker.value);
  showAddressConfirmPopup.value = false;

  // 执行页面跳转并传递地址信息
  router.push({ name: 'publish', params: { type: 'task' }, query: { location: JSON.stringify(selectedMarker.value) } });

};

// 取消地址选择
const cancelAddressSelection = () => {
  console.log("取消地址选择");
  showAddressConfirmPopup.value = false;
};

//显示上传弹窗
const showUploadPopup = () => {
  console.log("显示上传弹窗");
  showPopup.value = true;
};

const onClickOverlay = () => {
  console.log("点击遮罩层");

}

// 确认上传
const confirmUpload = async () => {
  if (!pointData.name.trim()) {
    alert('点位名称不能为空！');
    return;
  }
  console.log("确认上传");
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
    console.log('上传成功：', newMarker);
  } catch (error) {
    console.error('上传失败：', error);
    alert('上传失败，请重试。');
    // 保留临时标记
    showPopup.value = false;
  }
};

// 取消上传
const cancelUpload = () => {
  console.log("取消上传");
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

// 初始化地图
const initializeMap = (AMap) => {
  AMap.plugin("", function () {
    //在回调函数中实例化插件，并使用插件功能

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
      console.log('地图点击事件：', e);
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
      console.log("临时标记", tempMarker.value);
      map.value.setCenter(tempMarker.value.getPosition());

      tempMarker.value.on('click', (e) => {
        console.log("临时标记点击事件", e);

        //在高德地图中，e.originEvent 是原生的 MouseEvent 或 TouchEvent，
        //该事件的默认行为可能与地图交互相关（如拖拽、缩放、点击标记等）。
        //当你没有调用 preventDefault() 时，这些默认行为仍然会执行，可能会导致以下情况：
        // 地图点击事件：点击标记时，地图的点击事件被触发，即使 stopPropagation() 阻止了冒泡。
        // 触发交互逻辑冲突：高德地图可能内部有特定的默认交互逻辑（例如拖拽或响应点击），这些逻辑没有被阻止。
        e.originEvent.stopPropagation(); // 阻止事件传播
        e.originEvent.preventDefault();  // 阻止默认行为
        showUploadPopup();

      });

      pointData.name = '';
      pointData.sync = false;

      showPopup.value = true;
    });
  });
}

import AMapLoader from '@amap/amap-jsapi-loader'
onMounted(() => {
  if (window.AMap) {
    initializeMap(window.AMap)
  } else {
    // 如果AMap未加载，等待加载
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: [],
    })
      .then((AMap) => {
        initializeMap(AMap)
      })
      .catch((e) => {
        console.error('地图组件高德地图API加载失败:', e)
      })
  }


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
.add-address {
  height: 35vh;

}

.popup {
  background: white;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.address-confirm {
  width: 80vw;

}

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

.input-box {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 2vh;
  width: 100%;
}

.input-frame {
  display: flex;
  border-color: #e7e7e7;
  padding: 8px 8px;
  border-radius: 10px;
  width: 75%;
}



.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
  width: 100%;
}

.popup-buttons button {
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  cursor: pointer;
}

.popup-buttons button:first-child {
  background-color: #e7e7e7;
  color: rgb(27, 27, 27);

}

.popup-buttons button:last-child {

  color: white;
  background-color: #613EEA;
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
