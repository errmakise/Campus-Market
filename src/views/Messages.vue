<template>
  <div class="container">
    <span class="title">消息</span>

    <MessageCard  title="商品通知" type="sys" content="111"
     iconUrl="\src\assets\images\items-notice.png" badgeCount="11"/>

     <MessageCard  title="任务通知" type="sys" content="111"
     iconUrl="\src\assets\images\tasks-notice.png" badgeCount="11"/>

     <MessageCard  title="互动通知" type="sys" content="111"
     iconUrl="\src\assets\images\interaction-notice.png" badgeCount="11"/>


     <MessageCard  title="用户名" type="user" content="111"
     iconUrl="\src\assets\images\interaction-notice.png" badgeCount="11"/>

     <BottomNav nowView="消息"/>
  </div>

</template>

<script setup>



</script>

<style scoped>
.title{
font-size: 22px;
font-weight: 600;
letter-spacing: 2px;
height: 10vh;
display: flex;
align-items: center;
padding-left: 6vw;
}

.container{
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
