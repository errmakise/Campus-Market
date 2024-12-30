// stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      userId: '123456', // 用户ID
      username: '用户名', // 用户名
      avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 用户头像
      followCount: 110, // 用户关注的总数量
      starCount: 320, // 收藏帖子数量
    },
    followStatus: {}, // 用户的关注状态 { userId: { isFollowing, avatarUrl, username } }
  }),
  actions: {
    // 初始化用户信息
    setUserInfo(userInfo) {
      this.userInfo = {
        userId: userInfo.userId,
        username: userInfo.username,
        avatarUrl: userInfo.avatarUrl,
        followCount: userInfo.followCount || 0,
        starCount: userInfo.starCount || 0,
      }
    },

    // 更新单个关注对象的状态
    setFollowStatus(userId, isFollowing, avatarUrl = '', username = '') {
      if (isFollowing) {
        // 新增关注对象详细信息
        this.followStatus[userId] = {
          isFollowing: true,
          avatarUrl,
          username,
        }
        this.userInfo.followCount += 1 // 关注 +1
      } else {
        // 删除关注对象
        delete this.followStatus[userId]
        this.userInfo.followCount -= 1 // 取消关注 -1
      }
    },

    // 批量更新关注对象的状态
    setBatchFollowStatus(statusList) {
      statusList.forEach(({ userId, isFollowing, avatarUrl, username }) => {
        if (isFollowing) {
          // 新增关注对象详细信息
          this.followStatus[userId] = {
            isFollowing: true,
            avatarUrl,
            username,
          }
        } else {
          // 删除关注对象
          delete this.followStatus[userId]
        }
      })
    },

    // 获取关注对象列表
    getFollowList() {
      // 返回 followStatus 的所有值
      return Object.keys(this.followStatus).map((userId) => ({
        userId,
        ...this.followStatus[userId],
      }))
    },

    clearFollowStatus() {
      this.followStatus = {}
    },

    // 清空用户数据（用于退出登录）
    clearAllData() {
      this.userInfo = {
        userId: '',
        username: '',
        avatarUrl: '',
        followCount: 0,
        starCount: 0,
      }
      this.clearFollowStatus()
    },
  },
})
