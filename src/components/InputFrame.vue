<template>
  <input :type="props.type" v-model="inputValue" ref="input" @input="updateValue" :style="inputStyle"
    :placeholder="placeholder" :disabled="props.disabled" :maxLength="props.maxLength" />
</template>

<script setup>
import { ref, computed, onMounted, toRef, watch } from "vue";

// Props
const props = defineProps({
  maxLength: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  fontSize: {
    type: String,
    default: "16px",
  },
  maxWidth: {
    type: Number,
    default: 300,
  },
  placeholder: {
    type: String,
    default: "请输入内容",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Local state
const input = ref(null); // 引用输入框
const inputWidth = ref(20); // 初始宽度，单位 px

// 获取 modelValue 的引用
const modelValueRef = toRef(props, "modelValue");

// 本地状态同步 modelValue
const inputValue = ref(modelValueRef.value);

// 动态样式
const inputStyle = computed(() => ({
  fontSize: props.fontSize,
  width: `${Math.min(inputWidth.value, props.maxWidth)}px`,
}));

// 更新父组件的值
const updateValue = (event) => {
  inputValue.value = event.target.value; // 更新本地状态
  emit("update:modelValue", inputValue.value); // 通知父组件
};

// 动态调整输入框宽度
const updateWidth = () => {
  const inputEl = input.value;
  if (!inputEl) return;

  const tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.position = "absolute";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.style.font = `${props.fontSize}`;
  tempSpan.textContent = inputValue.value || props.placeholder || " "; // 如果没有输入内容，用 placeholder 的内容计算宽度
  document.body.appendChild(tempSpan);

  inputWidth.value = tempSpan.offsetWidth + 15; // 增加缓冲宽度
  document.body.removeChild(tempSpan);
};

// 同步 modelValue 的变化到本地状态
watch(
  modelValueRef,
  (newValue) => {
    inputValue.value = newValue;
    updateWidth();
  },
  { immediate: true }
);

// 初始化宽度
onMounted(() => {
  updateWidth();
});
</script>

<style scoped>
input {
  border: none;
  outline: none;
  box-sizing: border-box;
}
</style>
