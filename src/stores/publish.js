// stores/publish.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios' // 确保已安装 axios
import { fetchTagOptions } from '../api/api.js'
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
  const fetchAndSetTagOptions = async (categoryId) => {
    try {
      const tags = await fetchTagOptions(categoryId)
      formData.tagOptions = tags
      console.log('更新后的标签选项:', tags)
    } catch (error) {
      formData.tagOptions = [] // 清空标签选项或设置默认值
      console.error('获取标签选项失败:', error)
      // 可选：添加错误处理逻辑，例如显示通知
    }
  }

  return { formData, fetchAndSetTagOptions }
})
