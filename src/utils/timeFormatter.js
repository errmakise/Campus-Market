export function formatTime(createdAt) {
  if (!createdAt) return '未知时间'

  const createdAtTime = new Date(createdAt)
  const now = new Date()
  const diffInMs = now - createdAtTime
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    return diffInMinutes > 0 ? `${diffInMinutes}分钟前发布` : '刚刚发布'
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前发布`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}天前发布`
  }
}
