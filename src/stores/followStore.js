// stores/followStore.js
import { defineStore } from 'pinia'

export const useFollowStore = defineStore('follow', {
  state: () => ({
    followStatus: {}, // 存储用户的关注状态，格式为 { userId: isFollowing }
  }),
  actions: {
    // 更新关注状态
    setFollowStatus(userId, isFollowing) {
      this.followStatus[userId] = isFollowing
    },
    // 批量更新关注状态
    setBatchFollowStatus(statusList) {
      statusList.forEach(({ userId, isFollowing }) => {
        this.followStatus[userId] = isFollowing
      })
    },
    // 获取单个用户关注状态
    getFollowStatus(userId) {
      return this.followStatus[userId] ?? null // 如果状态不存在，返回 null
    },

    // 检查用户是否已关注
    checkIsFollowing(userId) {
      return this.followStatus[userId] === true
    },
  },
})
