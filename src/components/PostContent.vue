<template>
  <div>
    <div class="post-text">
      <span class="label">金额：</span>
      <span class="value">￥{{ reward }}</span>
    </div>

    <div class="post-text">
      <span class="label">详情：</span>
      <span class="value">{{ content }}</span>
    </div>

    <div v-if="props.type == 0">
      <div class="post-text">
        <span class="label">截止时间：</span>
        <span class="value">{{ deadline }}</span>
      </div>

      <div class="post-text">
        <span class="label">任务地点：</span>
        <span class="value">{{ address }}</span>
      </div>
    </div>




    <div class="image-gallery">
      <img v-for="(image, index) in images" :key="index" :src="image" class="gallery-image" />
    </div>

    <div class="footer" v-if="showFooter">
      <div class="tags">
        <span v-for="tag in tags" :key="tag.tagId" class="tag">#{{ tag.tagName }}</span>
      </div>
      <div class="report-button" @click="clickReport">举报</div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['clickReport']);
const clickReport = () => {
  emit('clickReport');

};
const props = defineProps({
  deadline: String,
  reward: String,
  address: String,
  content: String,
  images: Array,
  tags: Array,
  showFooter: {
    type: Boolean,
    default: true
  },
  type: Number,
});

onMounted(() => {
});
</script>

<style scoped>
.post-text {
  margin: 0.5vh 0vw 1.5vh 0vw;
  font-size: 14px;
}

.label {
  color: #707070;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.value {
  flex-grow: 1;
  color: #000;

}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 1rem 0;
}

.gallery-image {
  width: calc(33.333% - 10px);
  border-radius: 8px;
  object-fit: cover;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  color: #0077FF;
  font-size: 12px;
}

.report-button {
  font-size: 12px;
  color: #707070;
  cursor: pointer;
}
</style>
