<template>
  <div class="scrollBarWrapper" :style="scrollBarWrapperStyle">
    <div
      class="scrollBarContent"
      :class="direction === 'y' ? 'directionY' : 'directionX'"
      ref="scrollBarContent"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";

// Props
const props = defineProps({
  direction: {
    type: String,
    default: "x",
    validator: value => value === "x" || value === "y"
  },
  activeIndex: {
    type: Number,
    default: 0,
    validator: value => value >= 0
  }
});

// Refs
const scrollBarContent = ref(null);

// Computed property
const scrollBarWrapperStyle = computed(() =>
  props.direction === "y"
    ? { height: "100%" }
    : { width: "100%" }
);

// Methods
const initItemDisplay = () => {
  const content = scrollBarContent.value;
  const contentItem = content.children;
  [].forEach.call(contentItem, item => {
    if (props.direction === "y") {
      item.style.display = "block";
    } else {
      item.style.display = "inline-block";
    }
  });
};

const handleChange = () => {
  nextTick(() => {
    const content = scrollBarContent.value; // Element that scrolls
    const activeItem = content.children[props.activeIndex]; // Currently selected element
    if (!activeItem) return false;

    const scrollOption = {
      top: 0,
      left: 0,
      behavior: "smooth"
    };

    if (props.direction === "y") {
      const contentHeight = content.offsetHeight;
      const activeItemHeight = activeItem.offsetHeight;
      const activeItemTop = activeItem.offsetTop;
      const offset = activeItemTop - (contentHeight - activeItemHeight) / 2;
      scrollOption.top = offset;
    } else {
      const contentWidth = content.offsetWidth;
      const activeItemWidth = activeItem.offsetWidth;
      const activeItemLeft = activeItem.offsetLeft;
      const offset = activeItemLeft - (contentWidth - activeItemWidth) / 2;
      scrollOption.left = offset;
    }

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
  max-width: 300px;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;

  .scrollBarContent {
    max-width: 100%;
    white-space: nowrap;
    word-break: keep-all;
    -webkit-overflow-scrolling: touch;

    /* 只虚化右侧 */
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
    -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
    mask-size: 100% 100%;
    mask-repeat: no-repeat;

    &.directionX {
      overflow-x: scroll;
      overflow-y: hidden;
    }

    &.directionY {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}


</style>
