import ins from './axiosInstance.js'

export const getItems = async (
  timestamp,
  page = 1,
  sort = 'timeDesc',
  tag = '',
  categoryId = 0,
) => {
  try {
    const res = await ins.get('/api/items', {
      params: {
        page,
        pageSize: 10,
        timestamp,
        sort,
        tag,
        categoryId,
      },
    })
    console.log(res.data.data)
    return res.data.data.items
  } catch (error) {
    console.error('getItems失败 message:', error.response.data)
    throw error
  }
}

/**
 * 获取标签选项
 * @param {Number} categoryId - 标签类别 ID
 * @returns {Promise<Array>} 标签选项数组
 */
export const fetchTagOptions = async (categoryId) => {
  try {
    console.log('开始获取标签选项', categoryId)
    const response = await ins.get('/api/post/tag', {
      params: { type: categoryId },
    })
    console.log('获取标签选项成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取标签选项失败:', error)
    throw error
  }
}
