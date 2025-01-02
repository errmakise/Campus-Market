// stores/publish.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios' // 确保已安装 axios
import { fetchTagOptions, postUpload } from '../api/api.js' // 引入API
import ins from '../api/axiosInstance.js'

export const usePublishStore = defineStore('publish', () => {
  // 表单数据
  const formData = reactive({
    type: '', // 发布类型
    content: '', // 发布内容
    title: '', // 发布标题
    activeIndex: 0, // 活动索引，用于多步操作
    isDiscussed: false, // 是否讨论
    money: '0', // 金额
    phone: '', // 电话
    lng: '', // 经度
    lat: '', // 纬度
    address: '', // 地址
    selectedTags: [], // 用户选择的标签
    fileList: [], // 上传的文件列表
    tagOptions: [], // 当前类别的标签选项
  })

  /**
   * 将文件列表中的文件上传，并返回逗号分隔的 URL 字符串
   * @returns {Promise<string>} 逗号分隔的 URL 字符串
   */
  const convertFileListToUrlsString = async () => {
    if (!formData.fileList || formData.fileList.length === 0) {
      return '' // 如果没有文件，返回空字符串
    }

    console.log('正在处理上传的文件列表:', formData.fileList)

    const urls = []

    for (const fileItem of formData.fileList) {
      try {
        const file = fileItem.file // 提取文件
        const response = await postUpload(file) // 调用上传接口
        urls.push(response) // 将返回的 URL 添加到数组中
      } catch (error) {
        console.error('文件上传失败:', error)
        throw new Error('文件上传失败，请重试')
      }
    }

    // 返回逗号分隔的 URL 字符串
    return urls.join(',')
  }

  /**
   * 根据类别 ID 获取标签选项并更新到 `formData.tagOptions`
   * @param {number} categoryId 类别 ID
   */
  const fetchAndSetTagOptions = async (categoryId) => {
    try {
      const tags = await fetchTagOptions(categoryId) // 从 API 获取标签选项
      formData.tagOptions = tags
      console.log('标签选项已更新:', tags)
    } catch (error) {
      formData.tagOptions = [] // 如果失败，则清空标签选项
      console.error('获取标签选项失败:', error)
      // 可选：触发通知或显示错误提示
    }
  }

  /**
   * 重置表单数据
   */
  const resetFormData = () => {
    formData.type = ''
    formData.content = ''
    formData.title = ''
    formData.activeIndex = 0
    formData.isDiscussed = false
    formData.money = '0'
    formData.phone = ''
    formData.lng = ''
    formData.lat = ''
    formData.address = ''
    formData.selectedTags = []
    formData.fileList = []
    formData.tagOptions = []
    console.log('表单数据已重置')
  }

  /**
   * 提交发布数据
   * @returns {Promise<void>}
   */
  const submitFormData = async () => {
    try {
      const picUrl = await convertFileListToUrlsString() // 上传文件并获取 URL
      const payload = {
        content: formData.content,
        title: formData.title,
        money: formData.money,
        phone: formData.phone,
        lng: formData.lng,
        lat: formData.lat,
        address: formData.address,
        selectedTags: formData.selectedTags,
        picUrl, // 上传的文件 URL
      }

      console.log('提交发布数据:', payload)

      // 调用发布 API
      const response = await ins.post('/api/publish', payload)
      console.log('发布成功:', response.data)

      // 可选：跳转到成功页面或显示成功通知
    } catch (error) {
      console.error('发布失败:', error)
      throw new Error('发布失败，请检查网络或重新提交')
    }
  }

  return {
    formData,
    fetchAndSetTagOptions,
    convertFileListToUrlsString,
    resetFormData,
    submitFormData,
  }
})
