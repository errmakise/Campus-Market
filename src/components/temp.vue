<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';

const props = defineProps({});

const data = reactive({});

const router = useRouter();
</script>

<template>
  <div class="flex-col page">
    <div class="flex-col">
      <div class="flex-row justify-between items-center section">
        <img class="image"
          src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=2bc2ff3c1d3943ad0237f11b1bda9b08.png" />
        <div class="flex-row">
          <div class="shrink-0 section_2"></div>
          <span class="ml-8 self-start text">搜索</span>
        </div>
      </div>
      <div class="flex-col section_3 mt-15">
        <div class="flex-row equal-division">
          <div class="flex-col items-center group equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=b56e21e27fb42c7ea2c1a237a015e3eb.png" />
            <span class="mt-2 font text_2">数码产品</span>
          </div>
          <div class="flex-col items-center group equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=c7f880555adb847bccf6b5ea5d5ec8e7.png" />
            <span class="mt-2 font text_3">学习资料</span>
          </div>
          <div class="flex-col items-center group equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=9201d5fca48110ce3dcfe960bfbab2f6.png" />
            <span class="mt-2 font text_4">餐饮代购</span>
          </div>
          <div class="flex-col items-center group equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=d4a5e59725e374d2d2c44c9218c42027.png" />
            <span class="mt-2 font text_5">服饰美妆</span>
          </div>
          <div class="flex-col items-center group equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=4b6a5367fc353c04f1046823abd5bb48.png" />
            <span class="mt-2 font text_6">门票</span>
          </div>
        </div>
        <div class="flex-row equal-division">
          <div class="flex-col items-center group_2 equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=c2a3bf2a45179a23a10dbf67e3fa87de.png" />
            <span class="mt-2 font text_7">乐器</span>
          </div>
          <div class="flex-col items-center group_2 equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=e635195d0c0cda5dfc19e956d969d0a0.png" />
            <span class="mt-2 font text_8">账号会员</span>
          </div>
          <div class="flex-col items-center group_2 equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=aea2d0bc80f7576f00f983690e554339.png" />
            <span class="mt-2 font text_9">游戏</span>
          </div>
          <div class="flex-col items-center group_2 equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=4b93264333f2dccab8ed9825a0074159.png" />
            <span class="mt-2 font text_10">运动用品</span>
          </div>
          <div class="flex-col items-center group_2 equal-division-item">
            <img class="image_2"
              src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=e750a562a53ced0d65f9fd36ed1cffae.png" />
            <span class="mt-2 font text_11">其他</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-18 flex-row relative group_3">
      <div class="flex-col self-start section_4">
        <div class="flex-col self-stretch">
          <div class="flex-row group_5">
            <span class="font_2">#租借</span>
            <span class="font_2 ml-13">#租借</span>
          </div>
          <div class="flex-col justify-start relative group_6">
            <span class="font_3">
              <br />
              打印资料，买瓜子、可乐、薯片、面包、纸巾
            </span>
            <span class="font_4 pos">
              <br />
              <br />
              <br />
            </span>
            <span class="font_5 pos_2"><br /></span>
          </div>
        </div>
        <div class="flex-col justify-start items-start self-start relative group_8 mt-73">
          <span class="font_5">￥</span>
          <span class="font_6 pos_3">323</span>
          <span class="font_4 text_12 pos_5">33人想要</span>
          <span class="font_7 pos_4">
            <br />
            1小时前发布
          </span>
        </div>
      </div>
      <div class="ml-8 flex-col self-center section_5">
        <div class="flex-row group_4">
          <span class="font_2">#租借</span>
          <span class="font_2 ml-13">#租借</span>
        </div>
        <div class="flex-col group_7">
          <img class="image_3"
            src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=822e85b029439386b29a5cf923226b0f.png" />
          <div class="group_11 mt-21">
            <span class="font_3">
              <br />
              打印资料，买瓜子、可乐、薯片、面包、纸巾
            </span>
            <span class="font_4">
              <br />
              <br />
              <br />
            </span>
            <span class="font_5"><br /></span>
            <span class="font_5">￥</span>
            <span class="font_6">323</span>
            <span class="font_7"><br /></span>
            <span class="font_7">1小时前发布</span>
          </div>
        </div>
      </div>
      <div class="ml-8 flex-row justify-center items-start shrink-0 group_9 pos_6">
        <div class="flex-col section_8">
          <div class="self-stretch divider_2"></div>
          <span class="self-end font_7 text_13 mt-89">1小时前发布</span>
        </div>
        <div class="flex-col section_7">
          <div class="flex-row self-stretch group_13">
            <span class="font_2">#租借</span>
            <span class="font_2 ml-13">#租借</span>
          </div>
          <div class="mt-14 flex-col justify-start self-start relative group_14">
            <span class="font_3">
              <br />
              打印资料，买瓜子、可乐、薯片、面包、纸巾
            </span>
            <span class="font_7 pos_9">
              <br />
              <br />
            </span>
          </div>
        </div>
        <div class="flex-col section_6 pos_7">
          <div class="flex-row group_10">
            <span class="font_2">#租借</span>
            <span class="font_2 ml-13">#租借</span>
          </div>
          <div class="divider"></div>
          <div class="group_12">
            <span class="font_3">
              <br />
              打印资料，买瓜子、可乐、薯片、面包、纸巾
            </span>
            <span class="font_4">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </span>
            <span class="font_5"><br /></span>
            <span class="font_5">￥</span>
            <span class="font_6">323</span>
            <span class="font_7"><br /></span>
            <span class="font_7">1小时前发布</span>
          </div>
        </div>
        <div class="flex-col justify-start items-center image-wrapper pos_8">
          <img class="image_4"
            src="https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=2dd4c5da1b5c3f7bb51ef46d4905b3cf.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.mt-15 {
  margin-top: 1.777vh;
}

.ml-13 {
  margin-left: 1.54vh;
}

.mt-73 {
  margin-top: 8.649vh;
}

.mt-21 {
  margin-top: 2.488vh;
}

.mt-89 {
  margin-top: 10.545vh;
}

.page {
  padding-left: 1.066vh;
  padding-top: 4.739vh;
  background-color: #fafafa;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.section {
  margin-left: 1.066vh;
  margin-right: 2.133vh;
  padding: 1.422vh 2.133vh 1.185vh 2.37vh;
  background-color: #ffffff;
  border-radius: 5.924vh;
}

.image {
  width: 2.043vh;
  height: 2.193vh;
}

.section_2 {
  background-color: #999393;
  width: 0.355vh;
  height: 2.335vh;
}

.text {
  color: #6e6a6a;
  font-size: 1.659vh;
  font-family: HarmonyOSSansSC;
  line-height: 1.523vh;
}

.section_3 {
  margin-right: 1.185vh;
  background-color: #ffffff;
  border-radius: 2.37vh;
}

.equal-division {
  padding: 0.474vh 0.948vh 1.185vh;
  border-radius: 2.37vh;
}

.group {
  flex: 1 1 8.399vh;
}

.image_2 {
  width: 3.943vh;
  height: 3.943vh;
}

.font {
  font-size: 1.659vh;
  font-family: AlibabaPuHuiTi;
  line-height: 1.422vh;
  color: #000000;
}

.text_2 {
  line-height: 1.481vh;
}

.text_3 {
  line-height: 1.481vh;
}

.text_4 {
  line-height: 1.481vh;
}

.text_5 {
  line-height: 1.481vh;
}

.text_6 {
  line-height: 1.481vh;
}

.group_2 {
  flex: 1 1 8.412vh;
}

.equal-division-item {
  padding: 0.474vh 0;
}

.text_7 {
  line-height: 1.44vh;
}

.text_8 {
  line-height: 1.44vh;
}

.text_9 {
  line-height: 1.44vh;
}

.text_10 {
  line-height: 1.44vh;
}

.text_11 {
  line-height: 1.44vh;
}

.group_3 {
  margin-bottom: -0.948vh;
  padding-bottom: 23.46vh;
}

.section_4 {
  padding: 1.185vh 1.422vh 2.844vh;
  flex: 1 1 21.443vh;
  background-color: #ffffff;
  border-radius: 2.445vh;
  height: 22.867vh;
}

.group_5 {
  padding-bottom: 1.185vh;
}

.font_2 {
  font-size: 1.422vh;
  font-family: HarmonyOSSansSC;
  line-height: 1.286vh;
  font-weight: 300;
  color: #000000;
}

.group_6 {
  margin-left: 0.237vh;
  margin-right: 0.948vh;
  padding-top: 1.659vh;
  height: 5.09vh;
  border-top: solid 0.124vh #e0dada;
}

.font_3 {
  font-size: 1.422vh;
  font-family: HarmonyOSSansSC;
  line-height: 1.659vh;
  color: #1a1a1a;
}

.font_4 {
  font-size: 1.185vh;
  font-family: AlibabaPuHuiTi;
  line-height: 1.422vh;
  color: #1a1a1a;
}

.pos {
  position: absolute;
  right: 6.297vh;
  bottom: 0;
}

.font_5 {
  font-size: 1.185vh;
  font-family: AlibabaPuHuiTi;
  line-height: 1.422vh;
  font-weight: 700;
  color: #ff0000;
}

.pos_2 {
  position: absolute;
  right: 6.297vh;
  bottom: 0;
}

.group_8 {
  padding: 0.711vh 0 0.474vh;
  width: 10.732vh;
}

.font_6 {
  font-size: 2.133vh;
  font-family: AlibabaPuHuiTi;
  line-height: 2.607vh;
  font-weight: 700;
  color: #ff0000;
}

.pos_3 {
  position: absolute;
  left: 1.187vh;
  bottom: 0;
}

.text_12 {
  color: #a3a2a2;
  word-break: break-all;
  width: 3.55vh;
}

.pos_5 {
  position: absolute;
  right: 1.755vh;
  top: 50%;
  transform: translateY(-50%);
}

.font_7 {
  font-size: 1.185vh;
  font-family: HarmonyOSSansSC;
  line-height: 1.422vh;
  font-weight: 300;
  color: #1a1a1a;
}

.pos_4 {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.section_5 {
  padding: 0 1.422vh;
  flex: 1 1 21.443vh;
  background-color: #ffffff;
  border-radius: 2.943vh;
  height: 46.801vh;
}

.group_4 {
  padding: 1.422vh 0.474vh 0.948vh;
}

.group_7 {
  margin-right: 0.474vh;
  padding: 1.422vh 0;
  border-top: solid 0.127vh #e0dada;
}

.image_3 {
  margin-right: 0.237vh;
  width: 17.654vh;
  height: 21.209vh;
}

.group_11 {
  margin-left: 0.474vh;
  line-height: 1.422vh;
}

.group_9 {
  padding-top: 24.526vh;
}

.pos_6 {
  position: absolute;
  left: 0;
  right: 0;
  top: 24.052vh;
}

.section_8 {
  margin-top: 5.924vh;
  padding: 3.555vh 1.896vh 0 2.133vh;
  background-color: #ffffff;
  border-radius: 2.37vh 2.37vh 0 0;
  width: 20.519vh;
  height: 15.649vh;
}

.divider_2 {
  background-color: #e0dada;
  height: 0.124vh;
}

.text_13 {
  margin-right: 4.739vh;
}

.section_7 {
  margin-left: 1.896vh;
  padding: 0 1.896vh 11.611vh;
  background-color: #ffffff;
  border-radius: 2.37vh 2.37vh 0 0;
  width: 21.443vh;
  height: 20.701vh;
}

.group_13 {
  padding: 1.659vh 0 1.185vh;
  border-bottom: solid 0.124vh #e0dada;
}

.group_14 {
  width: 14.822vh;
  height: 3.339vh;
}

.pos_9 {
  position: absolute;
  right: 0.776vh;
  bottom: 0.232vh;
}

.section_6 {
  padding: 0 1.422vh 3.318vh;
  background-color: #ffffff;
  border-radius: 3.649vh;
  width: 21.443vh;
}

.pos_7 {
  position: absolute;
  left: 0;
  top: 0;
}

.group_10 {
  padding: 2.133vh 0;
}

.divider {
  margin-left: 0.474vh;
  margin-right: 0.948vh;
  background-color: #e0dada;
  height: 0.128vh;
}

.group_12 {
  margin: 1.185vh 0.948vh 0 0.237vh;
  line-height: 1.422vh;
}

.image-wrapper {
  padding-top: 3.791vh;
  filter: drop-shadow(0vh -0.355vh 0.237vh #00000040);
  background-image: url('https://ide.code.fun/api/image?token=674d267fdefdb100110d1ae7&name=9b64dc681c699e895fcb7533bc2fe296.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.pos_8 {
  position: absolute;
  left: 0;
  right: 0;
  top: 31.517vh;
}

.image_4 {
  border-radius: 2.37vh;
  width: 97.6923vw;
  height: 19.2308vw;
}
</style>
