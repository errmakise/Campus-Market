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
