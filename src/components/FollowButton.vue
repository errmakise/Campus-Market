<template>
  <button :class="['follow-button', { small: buttonType === 'small', large: buttonType === 'large' }]"
    @click.stop="handleClick">
    <template v-if="!isFollowing">
      <img src="@/assets/images/follow.png" alt="icon" class="button-icon" v-if="buttonType === 'small'" />
      <img src="@/assets/images/add-white.png" alt="icon" class="icon-large" v-else />
      <span>{{ followText }}</span>
    </template>
    <template v-else>
      <span>{{ unfollowText }}</span>
    </template>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { toggleFollow } from '@/api/api.js';

const followText = '关注';
const unfollowText = '已关注';

// 接收组件的 props
const props = defineProps({
  userId: {
    type: Number,
    required: true, // 被关注用户的 ID
  },
  buttonType: {
    type: String,
    default: 'small', // 按钮样式类型：small 或 large
  },
  avatarUrl: {
    type: String,
    required: true, // 被关注用户的头像
  },
  username: {
    type: String,
    required: true, // 被关注用户的用户名
  },
});

// 获取用户 Store
const userStore = useUserStore();

// 计算当前用户是否已关注
const isFollowing = computed(() => userStore.followStatus[props.userId] || false);

// 处理按钮点击事件
const handleClick = async () => {
  try {
    console.log('111110。', props.userId);
    // 调用 API 切换关注状态
    await toggleFollow(props.userId, isFollowing.value);

    // 更新本地 Store 状态
    userStore.setFollowStatus(props.userId, !isFollowing.value, props.avatarUrl, props.username);

    // 显示 Toast 提示
    showSuccessToast({
      message: isFollowing.value ? '关注成功' : '取消关注成功',
      duration: 1000,
    });
  } catch (error) {
    console.error('切换关注状态失败:', error);
  }
};
</script>

<style scoped>
.icon-large {
  height: 3vh;
  margin-right: 1vw;
}

.follow-button {
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  font-family: 'ali', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
}

.follow-button.large {
  position: absolute;
  bottom: 2vh;
  z-index: 3;
  background-color: #613eea;
  color: white;
  font-size: 16px;
  height: 5vh;
  width: 40vw;
}

.follow-button.small {
  background-color: #f7f7f7;
  color: #333;
}



.button-icon {
  height: 14px;
  margin-right: 5px;
}
</style>
