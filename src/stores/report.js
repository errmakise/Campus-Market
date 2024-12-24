// src/stores/report.js

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { postReport } from '@/api/api.js'
import { Toast } from 'vant'

export const useReportStore = defineStore('report', () => {
  const appealContent = ref('')
  const reportData = ref(null) // 存储被举报对象的信息，如用户、帖子、评论等

  // 提交举报
  const submitReport = async () => {
    if (appealContent.value.trim().length === 0) {
      Toast.fail({
        message: '请输入举报理由！',
        duration: 1000,
      })
      return
    }

    try {
      await postReport(reportData.value.id, reportData.value.type, appealContent.value)
      Toast.success({
        message: '举报成功',
        duration: 2000,
      })
      // 清空举报数据
      clearReportData()
    } catch (error) {
      console.error('举报失败', error)
      Toast.fail({
        message: '举报失败，请稍后重试',
        duration: 1000,
      })
    }
  }

  // 设置举报数据
  const setReportData = (data) => {
    reportData.value = data
  }

  // 清空举报数据
  const clearReportData = () => {
    reportData.value = null
    appealContent.value = ''
  }

  return {
    appealContent,
    reportData,
    submitReport,
    setReportData,
    clearReportData,
  }
})
