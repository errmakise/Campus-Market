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
    const postDetail = response.data.data
    handleUrl(postDetail)

    return postDetail
  } catch (error) {
    console.error('获取帖子详情失败:', error)
    throw error
  }
}

// 处理图片url
const handleUrl = (postDetail) => {
  // 检查 picUrl 是否存在且为非空字符串
  if (postDetail.picUrl && typeof postDetail.picUrl === 'string') {
    // 将 picUrl 字符串按逗号分隔，并去除每个 URL 的首尾空白字符
    postDetail.picUrl = postDetail.picUrl.split(',').map((url) => url.trim())
  } else {
    // 如果 picUrl 不存在或不是字符串，初始化为一个空数组
    postDetail.picUrl = []
  }
  console.log('处理后的图片数组:', postDetail.picUrl)
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
  const response = await ins.get('/api/post/post', {
    params: { type: type, typeId: typeId, pageNo: pageNo, pageSize: pageSize },
  })
  const data = response.data.data
  data.list.forEach((item) => {
    handleUrl(item)
  })
  return data
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
export const getItems = async (pageNo, pageSize, typeId) => {
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

// 获取附近任务
export const getNearbyList = async (longitude, latitude, pageNo, pageSize) => {
  try {
    console.log('开始获取附近任务')
    const response = await ins.get('/api/post/post/nearby', {
      params: { longitude: longitude, latitude: latitude, pageNo: pageNo, pageSize: pageSize },
    })
    console.log('获取附近任务成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取附近任务失败:', error)
    throw error
  }
}

// 获取附近任务轮播图
export const getNearbySwipe = async (longitude, latitude) => {
  try {
    console.log('开始获取附近任务轮播图')
    const response = await getNearbyList(longitude, latitude, 1, 5)
    console.log('获取附近任务成功:', response.list)
    return response.list
  } catch (error) {
    console.error('获取附近任务失败:', error)
    throw error
  }
}

// 获取关注列表
export const getFollowList = async () => {
  try {
    console.log('开始获取关注列表')
    const response = await ins.get('/api/social/follow')
    console.log('获取关注列表成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取关注列表失败:', error)
    throw error
  }
}

import { useFollowStore } from '@/stores/followStore'
const followStore = useFollowStore()

// 关注/取消关注
export const toggleFollow = async (userId, isFollowing) => {
  try {
    console.log('开始关注/取消关注', userId, isFollowing)
    const response = await ins.post('/api/social/follow/{userId}')
    console.log('关注/取消关注成功:', response.data.data)
    followStore.setFollowStatus(userId, !isFollowing)
    return response.data.data
  } catch (error) {
    console.error('关注/取消关注失败:', error)
    throw error
  }
}

// 获取用户收到的评价
export const getUserComments = async (userId, pageNo, pageSize) => {
  try {
    console.log('开始获取用户收到的评论,userId', userId)
    const response = await ins.get('/api/order/comment', {
      params: { userId: userId },
    })
    console.log('获取收到的评论成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取收到的评论失败:', error)
    throw error
  }
}
