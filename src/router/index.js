import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: () => import('../views/ComTest.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/Tasks.vue'),
    },
    {
      path: '/publish/:type',
      name: 'publish',
      component: () => import('../views/Publish.vue'),
    },
    {
      path: '/mapSearch',
      name: 'mapSearch',
      component: () => import('../views/MapSearch.vue'),
    },
    {
      path: '/appeal',
      name: 'appeal',
      component: () => import('../views/OrderAppeal.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/Report.vue'),
    },
    {
      path: '/userDetail/:userId',
      name: 'userDetail',
      component: () => import('../views/UserDetail.vue'),
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: () => import('../views/Nearby.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/post/:postType/:postId',
      name: 'post',
      component: () => import('../views/PostDetail.vue'),
    },
    {
      path: '/post/trading',
      name: 'postTrading',
      component: () => import('../views/PostDetailTrading.vue'),
    },
    {
      path: '/items',
      name: 'items',
      component: () => import('../views/Items.vue'),
    },

    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/Messages.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User.vue'),
    },
    //#region 用户页跳转
    {
      path: '/user/postedTasks',
      name: 'postedTasks',
      component: () => import('../views/user-router/PostedTasks.vue'),
    },
    {
      path: '/user/acceptedTasks',
      name: 'acceptedTasks',
      component: () => import('../views/user-router/AcceptedTasks.vue'),
    },
    {
      path: '/user/postedItems',
      name: 'postedItems',
      component: () => import('../views/user-router/PostedItems.vue'),
    },
    {
      path: '/user/soldItems',
      name: 'soldItems',
      component: () => import('../views/user-router/SoldItems.vue'),
    },
    {
      path: '/user/manageAddress',
      name: 'manageAddress',
      component: () => import('../views/user-router/ManageAddress.vue'),
    },
    {
      path: '/user/socialHistory',
      name: 'socialHistory',
      component: () => import('../views/user-router/SocialHistory.vue'),
    },
    {
      path: '/user/followList',
      name: 'followList',
      component: () => import('../views/user-router/FollowList.vue'),
    },
    {
      path: '/user/starList',
      name: 'starList',
      component: () => import('../views/user-router/StarList.vue'),
    },
    // #endregion

    // #region 物品分类
    {
      path: '/items/digital',
      name: 'digital',
      component: () => import('../views/item-catogories/Digital.vue'),
    },
    {
      path: '/items/fashion',
      name: 'fashion',
      component: () => import('../views/item-catogories/Fashion.vue'),
    },
    {
      path: '/items/account',
      name: 'accounts',
      component: () => import('../views/item-catogories/Account.vue'),
    },
    {
      path: '/items/food',
      name: 'food',
      component: () => import('../views/item-catogories/Food.vue'),
    },
    {
      path: '/items/game',
      name: 'games',
      component: () => import('../views/item-catogories/Game.vue'),
    },
    {
      path: '/items/others',
      name: 'others',
      component: () => import('../views/item-catogories/Others.vue'),
    },
    {
      path: '/items/instrument',
      name: 'instrument',
      component: () => import('../views/item-catogories/Instrument.vue'),
    },
    {
      path: '/items/sport',
      name: 'sports',
      component: () => import('../views/item-catogories/Sport.vue'),
    },
    {
      path: '/items/study',
      name: 'study',
      component: () => import('../views/item-catogories/Study.vue'),
    },
    {
      path: '/items/ticket',
      name: 'tickets',
      component: () => import('../views/item-catogories/Ticket.vue'),
    },

    // #endregion
  ],
})

export default router
