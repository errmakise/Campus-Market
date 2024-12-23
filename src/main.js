import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AMapLoader from '@amap/amap-jsapi-loader'

// 设置全局安全配置
window._AMapSecurityConfig = {
  securityJsCode: import.meta.env.VITE_AMAP_SECURITY_CODE,
}

// 初始化高德地图Loader
AMapLoader.load({
  key: import.meta.env.VITE_AMAP_KEY, // 你的高德地图API Key
  version: '2.0', // 指定要加载的JS API版本，默认为1.4.15
  plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Autocomplete', 'AMap.PlaceSearch'], // 需要使用的插件列表
  // 其他配置选项...
})
  .then((AMap) => {
    // 高德地图API加载成功，可以在这里进行全局配置或初始化
    console.log('高德地图API加载成功')
    // 例如，设置全局默认中心点或其他配置
  })
  .catch((e) => {
    console.error('高德地图API加载失败:', e)
  })
const pinia = createPinia()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pinia)
app.mount('#app')
