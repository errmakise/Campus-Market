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
      path: '/publish',
      name: 'publish',
      component: () => import('../views/Publish.vue'),
    },
    {
      path: '/appeal',
      name: 'appeal',
      component: () => import('../views/OrderAppeal.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/UserReport.vue'),
    },
    {
      path: '/post',
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
      path: '/items/food',
      name: 'food',
      component: () => import('../views/item-catogories/Food.vue'),
    },
    {
      path: '/items/games',
      name: 'games',
      component: () => import('../views/item-catogories/Games.vue'),
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
      path: '/items/sports',
      name: 'sports',
      component: () => import('../views/item-catogories/Sports.vue'),
    },
    {
      path: '/items/study',
      name: 'study',
      component: () => import('../views/item-catogories/Study.vue'),
    },
    {
      path: '/items/tickets',
      name: 'tickets',
      component: () => import('../views/item-catogories/Tickets.vue'),
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
  ],
})

export default router
