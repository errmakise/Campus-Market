// stores/publish.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios' // 确保已安装 axios
import ins from '../api/axiosInstance.js'
export const usePublishStore = defineStore('publish', () => {
  const formData = reactive({
    postContent: '',
    postTitle: '',
    activeIndex: 0,
    isDiscussed: false,
    reward: '0',
    phone: '',
    address: '无',
    selectedTags: [],
    fileList: [],
    location: null, // 选择的地点信息
    tagOptions: [], // 当前类别的标签选项
  })

  // 异步动作：根据类别获取标签选项
  const fetchTagOptions = async (categoryId) => {
    try {
      console.log('开始获取标签选项', categoryId)
      const response = await ins.get('/api/post/tag', {
        params: { type: categoryId },
      })
      formData.tagOptions = response.data.data
      console.log('获取标签选项成功:', response.data.data)
    } catch (error) {
      console.error('获取标签选项失败:', error)
      formData.tagOptions = [] // 清空标签选项或设置默认值
    }
  }

  return { formData, fetchTagOptions }
})
