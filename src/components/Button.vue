<template>
  <button :class="'round-button'" :style="buttonStyle" @click="handleClick">
    <img v-if="iconPath" :src="iconPath" alt="icon" class="button-icon" :style="{ height: buttonData.iconSize }" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import followIcon from '@/assets/images/follow.png';
import acceptIcon from '@/assets/images/accept.png'
import iWantToBuyIcon from '@/assets/images/iWantToBuy.png';
// 接收按钮类型作为唯一参数
const props = defineProps({
  buttonType: {
    type: String,
    required: true, // 必须传入按钮类型
  },
});

// 定义按钮的样式和内容
const buttonConfig = {
  accept: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '接单',
    action: () => {
      console.log('接单')
    },
    fontSize: '14px',
    iconPath: ''
  },
  follow: {
    color: '#000000',
    backgroundColor: '#F2F2F2',
    label: '关注',
    action: () => {
      console.log('关注')
    },
    fontSize: '16px',
    iconSize: '20px',
    iconPath: followIcon
  },
  chat: {
    color: '#000000',
    backgroundColor: '#F2F2F2',
    label: '私聊',
    action: () => {
      console.log('私聊')
    },
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '11px 30px',
    lettetSpacing: '3px',
    iconPath: ''
  },
  acceptD: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '接单',
    action: () => {
      console.log('接单')
    },
    fontSize: '18px',
    iconPath: acceptIcon,
    fontWeight: 'bold',
    iconSize: '30px',
  },
  finish: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '已完成',
    action: () => {
      console.log('已完成')
    },
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '11px 20px',
  },
  confirm: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '确认完成',
    action: () => {
      console.log('确认完成')
    },
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '11px 15px',
  },
  toComment: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '去评价',
    action: () => {
      console.log('去评价')
    },
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '11px 20px',
  },
  iWantToBuy: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '我想要',

    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 10px',
    iconPath: iWantToBuyIcon,
    iconSize: '30px',
    action: () => {
      console.log('我想要')
    },
  },
  buy: {
    color: '#FFFFFF',
    backgroundColor: '#613EEA',
    label: '购买',
    action: () => {
      console.log('购买')
    },
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 20px',
  }
};

// 根据按钮类型获取对应的配置
const buttonData = computed(() => buttonConfig[props.buttonType]);

// 动态计算按钮样式
const buttonStyle = computed(() => ({
  backgroundColor: buttonData.value.backgroundColor,
  color: buttonData.value.color,
  fontSize: buttonData.value.fontSize,
  fontWeight: buttonData.value.fontWeight,
  padding: buttonData.value.padding,
  lettetSpacing: buttonData.value.lettetSpacing,
}));

// 动态获取按钮的标签和图标路径
const label = computed(() => buttonData.value.label);
const iconPath = computed(() => buttonData.value.iconPath);

// 点击按钮事件
const handleClick = () => {
  buttonData.value.action();
};
</script>

<style scoped>
.round-button {
  border-radius: 20px;
  /* 圆形按钮 */
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;

}

.round-button:hover {
  opacity: 0.8;
}

.button-icon {

  margin-right: 5px;
}
</style>
