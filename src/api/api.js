import ins from './axiosInstance.js'

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

// 发布任务订单
export const postCreateTask = async (postId) => {
  try {
    console.log('开始创建任务订单', postId)
    const response = await ins.post('/api/order/reward', {
      body: { postId: postId },
    })
    console.log('创建任务订单成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('创建任务订单失败:', error)
    throw error
  }
}

// 获取帖子详情
export const getPostDetail = async (postId) => {
  try {
    console.log('开始获取帖子详情', postId)
    const response = await ins.get('/api/post/post/${postId}')
    console.log('获取帖子详情成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取帖子详情失败:', error)
    throw error
  }
}

// 举报
export const postReport = async (targetId, type, content) => {
  try {
    console.log('提交举报,举报id', targetId, '举报类型', type, '举报内容', content)

    const response = await ins.post('/api/social/report', {
      body: { targetId: targetId, type: type, content: content },
    })
    console.log('举报成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('举报失败:', error)
    throw error
  }
}

// 发布评论
export const postComment = async (postId, content, root, parentId = '', replyId = '') => {
  try {
    console.log(
      '提交评论:postId:',
      postId,
      'content:',
      content,
      'root:',
      root,
      'parentId:',
      parentId,
      'replyId:',
      replyId,
    )

    const response = await ins.post('/api/post/comment', {
      body: { postId: postId, content: content, root: root, parentId: parentId, replyId: replyId },
    })

    console.log('提交评论成功', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('提交评论失败', error)
    throw error
  }
}

// 获取帖子通用方法
const getPosts = async (type, typeId, pageNo, pageSize) => {
  try {
    console.log('开始获取帖子列表')
    const response = await ins.get('/api/post/post', {
      params: { type: type, typeId: typeId, pageNo: pageNo, pageSize: pageSize },
    })
    console.log('获取帖子列表成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取帖子列表失败:', error)
    throw error
  }
}

// 获取任务列表
export const getTasks = async (typeId, pageNo, pageSize) => {
  try {
    console.log('开始获取任务')
    const response = await getPosts(0, typeId, pageNo, pageSize)
    console.log('获取任务成功:', response)
    return response
  } catch (error) {
    console.error('获取任务失败:', error)
    throw error
  }
}

// 获取商品列表
export const getItems = async (typeId, pageNo, pageSize) => {
  try {
    console.log('开始获取商品')
    const response = await getPosts(1, typeId, pageNo, pageSize)
    console.log('获取商品成功:', response)
    return response
  } catch (error) {
    console.error('获取商品失败:', error)
    throw error
  }
}

// 获取评论列表
export const getCommentList = async (postId, pageNo, pageSize) => {
  try {
    console.log('开始获取评论')
    const response = await ins.get('/api/post/comment', {
      params: { postId: postId, pageNo: pageNo, pageSize: pageSize },
    })
    console.log('获取评论成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取评论失败:', error)
    throw error
  }
}
