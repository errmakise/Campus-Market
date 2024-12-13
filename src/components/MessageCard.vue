<template>
  <div class="message-card" :style="{backgroundColor:type!='user'?'#fafafa':'#ffffff'}">
    <img :src="iconUrl" alt="icon" class="message-icon" />
    <div class="text-part">
      <div class="message-title" :style="{fontWeight:type!='user'?'600':'400'}">{{ title }}</div>
      <div class="message-content">{{ content }}</div>
    </div>
    <div v-if="badgeCount > 0" class="message-badge">{{ badgeCount }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true, // 确保 `type` 被正确传递
  },
  iconUrl: {
    type: String,
    required: true, // 左侧图标 URL
  },
  title: {
    type: String,
    required: true, // 主标题
  },
  content: {
    type: String,
    default: "", // 副标题
  },
  badgeCount: {
    type: Number,
    default: 0, // 徽标显示的数字
  },
});
</script>


<style scoped>
.message-card {
  display: flex;
  align-items: center;
  padding: 1.5vh 5vw;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.text-part {
  flex: 1;
}

.message-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.message-content {
  font-size: 14px;
  color: #999999;
  margin-top: 4px;
}

.message-badge {
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
