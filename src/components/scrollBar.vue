<template>
  <div class="scrollBarWrapper" :style="scrollBarWrapperStyle">
    <div class="scrollBarContent directionX" ref="scrollBarContent">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";

// Props
const props = defineProps({
  activeIndex: {
    type: Number,
    default: 0,
    validator: value => value >= 0
  }
});

// Refs
const scrollBarContent = ref(null);

// Computed property
const scrollBarWrapperStyle = computed(() => ({
  width: "100%" // 固定为水平排列
}));

// Methods
const initItemDisplay = () => {
  const content = scrollBarContent.value;
  const contentItems = content.children;
  Array.from(contentItems).forEach(item => {
    item.style.display = "inline-block"; // 仅水平排列
  });
};

const handleChange = () => {
  nextTick(() => {
    const content = scrollBarContent.value;
    const activeItem = content.children[props.activeIndex];
    if (!activeItem) return;

    const scrollOption = {
      left: 0,
      behavior: "smooth"
    };

    const contentWidth = content.offsetWidth;
    const activeItemWidth = activeItem.offsetWidth;
    const activeItemLeft = activeItem.offsetLeft;
    const offset = activeItemLeft - (contentWidth - activeItemWidth) / 2;
    scrollOption.left = offset;

    content.scrollTo(scrollOption);
  });
};

// Watchers
watch(() => props.activeIndex, handleChange);

// Lifecycle hooks
onMounted(() => {
  initItemDisplay();
  handleChange();
});
</script>

<style lang="scss" scoped>
.scrollBarWrapper {
  position: relative;
  max-width: 90%;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;
  /* 只虚化右侧 */
  mask-image: linear-gradient(to right, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(to right, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0));
  mask-size: 100% 100%;
  mask-repeat: no-repeat;

  .scrollBarContent {
    max-width: 100%;
    white-space: nowrap;
    word-break: keep-all;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;



    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
