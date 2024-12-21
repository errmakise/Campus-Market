<template>
  <van-overlay :show="show">
    <div class="popup">
      <h3>{{ title }}</h3>
      <slot></slot>
      <div class="popup-buttons">
        <button @click="onConfirm">{{ confirmText }}</button>
        <button @click="onCancel">{{ cancelText }}</button>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: '确认上传',
  },
  cancelText: {
    type: String,
    default: '取消上传',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => emit('confirm');
const onCancel = () => emit('cancel');
</script>

<style scoped>
.popup {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  z-index: 1000;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.popup-buttons button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-buttons button:first-child {
  background-color: #4caf50;
  color: white;
}

.popup-buttons button:last-child {
  background-color: #f44336;
  color: white;
}
</style>
