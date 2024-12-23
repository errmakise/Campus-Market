<template>
  <div class="container">
    <div class="top">
      <img src="@/assets/images/x.png" alt="x" class="x" @click="handleBack" />
      <button class="post-button" @click="handlePost">
        <span>发布</span>
      </button>
    </div>

    <div style="margin-top: 8vh; height: 92vh; overflow-y: auto;">

      <!-- 帖子内容 -->
      <div class="post-content">
        <textarea v-model="publishStore.formData.postContent" placeholder="输入帖子内容" class="post-textarea"
          maxlength="200"></textarea>
        <div class="content-line2">
          <van-uploader preview-size="18.5vw" class="uploader" v-model="publishStore.formData.fileList" multiple
            :max-count="3" />
          <p class="textPrompt">{{ publishStore.formData.postContent.length }}/200</p>
        </div>
      </div>

      <!-- 标题、悬赏类型、标签等 -->
      <div class="post-content">
        <span class="title">标题</span>
        <div class="post-title">
          <div class="title-line1">
            <textarea v-model="publishStore.formData.postTitle" placeholder="输入标题" class="title-content" maxlength="20"
              clearable></textarea>
            <img src="@/assets/images/x.png" alt="x" class="x" @click="clearTitle" />
          </div>
          <p class="textPrompt">{{ publishStore.formData.postTitle.length }}/20</p>
        </div>

        <div class="title">{{ cateTitle }}</div>
        <div class="categories">
          <div class="item" v-for="(item, index) in categories" :key="index" @click="changeCate(item, index)"
            :class="index === publishStore.formData.activeIndex ? 'active' : null">
            <span class="category-name">{{ item.name }}</span>
          </div>
        </div>

        <div class="title">标签</div>
        <TagsBar class="tagsBar" :options="publishStore.formData.tagOptions" @update:selectedTags="handleSelectedTags"
          v-model:selectedTags="publishStore.formData.selectedTags" />

        <div class="reward">
          <div class="reward-part1">
            <div class="title">金额</div>
            <div v-if="type === 'task'" class="item" @click="toBeDiscussed"
              :class="publishStore.formData.isDiscussed ? 'active' : null">
              <span>待议</span>
            </div>
          </div>

          <div class="reward-amount">
            ￥
            <InputFrame v-model="publishStore.formData.reward" maxWidth="150" type="number" class="amount"
              :disabled="publishStore.formData.isDiscussed" />
          </div>
        </div>
      </div>

      <!-- 联系方式和任务地点 -->
      <div class="post-content" style="margin-bottom: 10vh;">
        <div class="post-phone">
          <div class="title">联系方式</div>
          <InputFrame v-model="publishStore.formData.phone" maxLength="11" type="number" placeholder="请输入手机号" />
        </div>

        <div class="post-address" @click="showAddressPopup = true" v-if="type === 'task'">
          <div class="title">任务地点</div>
          <div class="address"> {{ publishStore.formData.address }}</div>
          <img src="@/assets/images/right.png" alt="right" class="right">
        </div>

        <!-- 弹出选择地址的弹窗 -->
        <van-popup v-model:show="showAddressPopup" position="bottom" round>
          <div class="popup-title">
            选择任务地点
            <div class="map-search" @click="openMapSearch">地图
              <img src="@/assets/images/right.png" alt="right" class="right">
            </div>
          </div>
          <div class="address-popup">
            <!-- 预设地址列表 -->
            <div v-for="(item, index) in presetAddresses" :key="index" class="address-item"
              @click="selectPresetAddress(item)">
              {{ item }}
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePublishStore } from '@/stores/publish';
import TagsBar from '@/components/TagsBar.vue'; // 确保路径正确
import InputFrame from '@/components/InputFrame.vue'; // 确保路径正确

const router = useRouter();
const route = useRoute();
const publishStore = usePublishStore();

const showAddressPopup = ref(false);

// 动态标题和类别列表
const type = ref('');
const cateTitle = ref('');
const categories = ref([]);

// 预设地址列表
const presetAddresses = ref([
  '北京市 朝阳区 国贸',
  '北京市 海淀区 中关村',
  '上海市 黄浦区 人民广场',
  '广州市 天河区 珠江新城',
  // 更多地址...
]);

// 选择预设地址
const selectPresetAddress = (selectedAddress) => {
  publishStore.formData.address = selectedAddress; // 更新任务地点
  showAddressPopup.value = false; // 关闭弹窗
  console.log('选中的地址:', selectedAddress);
};

// 打开地图搜索页面
const openMapSearch = () => {
  showAddressPopup.value = false; // 关闭弹窗
  console.log('打开地图搜索页面');
  router.push({ name: 'mapSearch' }); // 跳转到地图搜索页面
};

// 返回上一页
const handleBack = () => {
  console.log('点击退出');
  router.back();
};

// 待议
const toBeDiscussed = () => {
  publishStore.formData.isDiscussed = !publishStore.formData.isDiscussed;
  if (publishStore.formData.isDiscussed) {
    publishStore.formData.reward = '0';
    console.log('待议');
  } else {
    console.log('取消待议');
  }
};

// 切换类别并获取对应的标签选项
const changeCate = async (item, index) => {
  console.log('切换类别:', item.name);
  publishStore.formData.activeIndex = index; // 更新 activeIndex
  publishStore.formData.selectedTags = [];
  try {
    await publishStore.fetchAndSetTagOptions(item.id); // 根据类别名称获取标签
  } catch (error) {
    console.error('获取标签选项失败:', error);
  }
};



// 处理图片上传成功后的回调
const handleAfterRead = (file) => {
  publishStore.formData.fileList.push(file);
};

// 监听子组件的事件，更新选中的标签 ID
const handleSelectedTags = (tags) => {
  publishStore.formData.selectedTags = tags;
  console.log('选中的标签 ID:', tags);
};

// 清除标题
const clearTitle = () => {
  publishStore.formData.postTitle = '';
};

// 发布按钮逻辑
const handlePost = () => {
  // 发布逻辑
  console.log('发布内容:', publishStore.formData);
};

// 在发布页挂载时设置类别和检查是否有传回的地点信息
onMounted(async () => {
  type.value = route.params.type;
  if (type.value === 'task') {
    cateTitle.value = '悬赏类型';
    categories.value = [
      { name: '求助', id: 1 },
      { name: '跑腿', id: 2 },
      { name: '求购', id: 3 },
      { name: '寻物', id: 4 },
    ];
  } else if (type.value === 'item') {
    cateTitle.value = '商品类型';
    categories.value = [
      { name: '数码产品', id: 1 },
      { name: '学习资料', id: 2 },
      { name: '门票', id: 3 },
      { name: '乐器', id: 4 },
      { name: '餐饮代购', id: 5 },
      { name: '服饰美妆', id: 6 },
      { name: '会员', id: 7 },
      { name: '游戏', id: 8 },
      { name: '运动用品', id: 9 },
      { name: '其他', id: 10 },
    ];
  }

  console.log('帖子类型', type.value);
  if (route.query.location) {
    publishStore.formData.location = JSON.parse(route.query.location);
    publishStore.formData.address = publishStore.formData.location.name;
    console.log('选中的位置', publishStore.formData.location);
  }

  // 根据当前类别获取标签选项
  const currentCategory = categories.value[publishStore.formData.activeIndex]?.id;
  if (currentCategory) {
    try {
      await publishStore.fetchAndSetTagOptions(currentCategory);
    } catch (error) {
      console.error('初始化获取标签选项失败:', error);
    }
  }
});
</script>
<style scoped>
.map-search {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.address-item {
  font-size: 16px;
  border-bottom: 1px solid #bbbbbb;
  padding: 1.5vh 0vw;
}

.popup-title {
  font-size: 22px;
  font-weight: 600;
  padding: 2vh 6vw 2vh 6vw;
  display: flex;
  justify-content: space-between;
}

.address-popup {
  height: 45vh;
  padding: 1vh 6vw;
  overflow-y: auto;
}

.tagsBar {
  margin-top: 1vh;
  margin-bottom: 4vh;
}

.right {
  height: 20px;
}

.address {
  margin-left: auto;
  display: flex;
  align-items: center;
  max-width: 60%;
}

.post-address {
  display: flex;
  align-items: center;
}

.post-phone {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4vh;
}

.reward {
  display: flex;
  justify-content: space-between;
  width: 100%;

}

.amount {
  flex-shrink: 0;
  padding: 0px 2px;
  font-size: 18px;
  border: none;


}

.reward-amount {
  font-size: 12px;
  display: flex;
  align-items: end;


}

.reward-part1 {
  display: flex;
}

.item {
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background-color: #ededed;
  color: #4F4D4D;
}

.active {
  background-color: #4794ff;
  color: #ffffff;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* 上右下左 */
  color: #4F4D4D;
  padding: 2vh 2vw 4vh 2vw;

}

.title-line1 {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.post-title {
  width: 100%;
  resize: none;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 2vh;
  margin-bottom: 4vh;
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.title-content {

  height: 6vh;
  width: 90%;
  border: none;
  background-color: #f5f5f5;
  resize: none;
}

.textPrompt {
  margin: 5px 0;
}

.title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-right: 4vw;
}

.content-line2 {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.uploader {}

.post-content {
  margin-top: 1.5vh;
  width: 90vw;
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 1.5vh 5vw;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'ali', sans-serif;
  font-size: 14px;
  height: auto;
}

.post-textarea {
  width: 100%;
  height: 20vh;
  border: none;
  margin-bottom: 2vh;
  resize: none;
}

.post-button {
  border-radius: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 18px;
  color: #ffffff;
  background-color: #0c6cf2;
  font-size: 14px;
}

.top {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  padding: 2vh 3vw;
  align-items: center;
  background-color: #fafafa;

}

.x {
  height: 24px;
}

.container {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}
</style>
