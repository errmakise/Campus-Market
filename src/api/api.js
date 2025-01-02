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

// 获取最新帖子
const getLatestPost = async (type, pageNo, pageSize) => {
  try {
    console.log('开始获取最新帖子')
    const response = await ins.get('/api/post/post/latest', {
      params: { type: type, pageNo: pageNo, pageSize: pageSize },
    })
    const data = response.data.data
    data.list.forEach((item) => {
      handleUrl(item)
    })
    console.log('获取最新帖子成功:', data)
    return data
  } catch (error) {
    console.error('获取最新帖子失败:', error)
    throw error
  }
}
// 获取最新任务
export const getLatestTasks = async (pageNo, pageSize) => {
  try {
    console.log('开始获取最新任务')
    const response = await getLatestPost(0, pageNo, pageSize)
    console.log('获取最新任务成功:', response)
    return response
  } catch (error) {
    console.error('获取最新任务失败:', error)
    throw error
  }
}
// 获取最新商品
export const getLatestItems = async (pageNo, pageSize) => {
  try {
    console.log('开始获取最新商品')
    const response = await getLatestPost(1, pageNo, pageSize)
    console.log('获取最新商品成功:', response)
    return response
  } catch (error) {
    console.error('获取最新商品失败:', error)
    throw error
  }
}

// 获取帖子通用方法
const getPosts = async (pageNo, pageSize, tagType, tag, sortByTime, sortByMoney, type) => {
  console.log(
    '开始获取帖子 pageNo:',
    pageNo,
    'pageSize:',
    pageSize,
    'tagType:',
    tagType,
    'tag:',
    tag,
    'sortByTime:',
    sortByTime,
    'sortByMoney:',
    sortByMoney,
    'type:',
    type,
  )
  try {
    const response = await ins.get('/api/post/post', {
      params: {
        type: type,
        tag: tag,
        tagType: tagType,
        pageNo: pageNo,
        pageSize: pageSize,
        sortByMoney: sortByMoney,
        sortByTime: sortByTime,
      },
    })
    const data = response.data.data
    data.list.forEach((item) => {
      handleUrl(item)
    })
    return data
  } catch (error) {
    console.error('获取帖子失败', error)
    throw error
  }
}

// 获取任务列表
export const getTasks = async (pageNo, pageSize, tagType, tag, sortByTime, sortByMoney) => {
  try {
    console.log('开始获取任务')
    const response = await getPosts(pageNo, pageSize, tagType, tag, sortByTime, sortByMoney, 0)
    console.log('获取任务成功:', response)
    return response
  } catch (error) {
    console.error('获取任务失败:', error)
    throw error
  }
}

// 获取商品列表
export const getItems = async (pageNo, pageSize, tagType, tag, sortByTime, sortByMoney) => {
  try {
    console.log('开始获取商品')
    const response = await getPosts(pageNo, pageSize, tagType, tag, sortByTime, sortByMoney, 1)
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

// 生成帖子标题
export const getPostTitle = async (content, type) => {
  try {
    console.log('开始获取帖子标题,内容', content)
    const response = await ins.get('/api/post/post/title')
    console.log('获取帖子标题成功:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('获取帖子标题失败:', error)
    throw error
  }
}

// 登录
export const postLogin = async (phone, password) => {
  try {
    console.log('开始登录, 手机:', phone, '密码:', password)

    // 发起登录请求
    const response = await ins.post('/api/user/login', {
      phone: phone, // 手机号
      password: password, // 密码
    })
    console.log('登录响应:', response)

    // 检查响应是否成功
    if (response.status === 200) {
      if (response.data.status !== 0) {
        throw new Error(response.data.msg)
      }

      console.log('登录成功:', response.data.data)
      // 存储 token 到 localStorage
      const token = response.data.data.token
      if (token) {
        localStorage.setItem('token', token) // 存储 token
      }

      return response.data.data
    } else {
      throw new Error(response.data.msg)
    }
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

// 注册
export const postSignUp = async (phone, username, password, gender) => {
  console.log('开始注册, 手机:', phone, '密码:', password, '用户名:', username, '性别:', gender)
  try {
    const res = await ins.post(
      '/api/user/register',
      {
        phone: phone,
        password: password,
        username: username,
        gender: gender,
      },
      { skipAuth: true },
    )

    console.log('注册响应:', res.data.msg)
    if (res.data.status !== 0) {
      throw new Error(res.data.msg) // 抛出错误，让调用者处理
    }
    return res.data // 正常返回数据
  } catch (err) {
    console.error('注册失败:', err)
    throw err // 将错误抛出，让调用者处理
  }
}

// 编辑用户信息
export const putEditUserInfo = async (username, gender, avatarUrl) => {
  try {
    console.log('开始修改用户信息, 用户名:', username, '性别:', gender)
    // 发起修改用户信息请求
    const response = await ins.put('/api/user/info', {
      username: username, // 用户名
      gender: gender, // 性别
    })
    // 检查响应是否成功
    if (response.status === 200) {
      console.log('修改用户信息成功:', response.data.data)
      return response.data.data
    } else {
      throw new Error(response.data.msg)
    }
  } catch (error) {
    console.error('修改用户信息失败:', error)
    throw error
  }
}

// 创建帖子
export const postCreatePost = async (postInfo) => {
  console.log('开始创建帖子', postInfo)
  try {
    // 发起创建帖子请求
    const response = await ins.post(
      '/api/post/post',
      postInfo.title,
      postInfo.content,
      postInfo.type,
      postInfo.tagType,
      postInfo.tagIds,
      postInfo.picUrl,
      postInfo.money,
      postInfo.phone,
      postInfo.address,
    )
    // 检查响应是否成功
    if (response.status === 200) {
      console.log('创建帖子成功:', response.data.data)
      return response.data.data
    } else {
      throw new Error(response.data.msg)
    }
  } catch (error) {
    console.error('创建帖子失败:', error)
    throw error
  }
}

// 上传文件
export const postUpload = async (file) => {
  try {
    console.log('开始上传文件', file)
    // 构造 FormData 对象
    const formData = new FormData()
    formData.append('file', file)
    // 发起上传请求
    const response = await ins.post('/api/user/common/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 确保请求是文件上传
      },
    })
    // 检查响应是否成功
    if (response.status === 200) {
      console.log('上传文件成功:', response.data.data)
      return response.data.data
    } else {
      throw new Error(response.data.msg)
    }
  } catch (error) {
    console.error('上传文件失败:', error)
    throw error
  }
}
