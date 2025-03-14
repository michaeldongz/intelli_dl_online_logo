import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/ai-logo',
      name: 'aiLogo',
      component: () => import('@/views/AILogo.vue')
    },
    {
      path: '/vi-design',
      name: 'viDesign',
      component: () => import('@/views/VIDesign.vue')
    },
    {
      path: '/custom',
      name: 'custom',
      component: () => import('@/views/Custom.vue')
    },
    {
      path: '/templates',
      name: 'templates',
      component: () => import('@/views/Templates.vue')
    },
    {
      path: '/trademark',
      name: 'trademark',
      component: () => import('@/views/Trademark.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/Member.vue')
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: () => import('@/views/Strategy.vue')
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: () => import('@/views/Workspace.vue')
    }
  ]
})

export default router