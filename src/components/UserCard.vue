<template>
  <div class="publisher" @click="handleClick">
    <div class="left-part">
      <Avatar :src="props.avatarUrl" :size="avatarSize" />
      <div class="publisher-info">
        <div class="publisher-name">{{ props.username }}</div>
        <div class="publisher-time" v-if="type === 'post'">{{ formattedTime }}</div>
      </div>
    </div>

    <!-- FollowButton 组件 -->
    <FollowButton :userId="props.userId" :buttonType="small" :avatarUrl="props.avatarUrl" :username="props.username" />
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import FollowButton from "@/components/FollowButton.vue";
import { formatTime } from "@/utils/timeFormatter";
import { useRouter } from "vue-router";

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  userId: {
    type: Number,
  },
  createTime: {
    type: [String, Date],
    default: "",
  },
  avatarSize: {
    type: String,
    default: "5vh", // 默认头像大小
  },
  type: {
    type: String,
    default: "", // post 或 list
  },
});

// 格式化时间
const formattedTime = computed(() => formatTime(props.createTime));

// 路由跳转逻辑
const router = useRouter();
const handleClick = () => {
  router.push({
    name: "userDetail",
    params: { userId: props.userId },
  });
};
</script>

<style scoped>
.publisher {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-part {
  display: flex;
  align-items: center;
}

.publisher-info {
  margin-left: 3vw;
  font-size: 14px;
  font-family: "ali", sans-serif;
}

.publisher-name {
  font-size: 16px;
  font-weight: bold;
}

.publisher-time {
  font-size: 12px;
  color: rgba(110, 109, 109, 1);
  margin-top: 3px;
}
</style>
