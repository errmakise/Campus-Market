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
