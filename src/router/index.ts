import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '首页',
      path: '/',
      component: () => import('@/views/home.vue'),
    },
    {
      name: '注册/登录',
      path: '/auth',
      component: () => import('@/views/auth.vue'),
    },
  ],
});

export default router;
