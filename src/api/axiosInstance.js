import axios from 'axios'

const axiosInstance = axios.create({
  // 网络请求的公共配置
  baseURL: '/api',
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 判断是否需要跳过 token
    if (!config.skipAuth) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  // 获得响应成功
  (response) => response,
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  },
)

export default axiosInstance
