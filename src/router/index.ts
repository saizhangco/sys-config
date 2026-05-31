/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import Index from '@/pages/index1.vue'
import IndexReport from '@/pages/index-report.vue'
import IndexSetting from '@/pages/index-setting.vue'

const router = createRouter({
  history: createWebHistory('/vghks/'),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/dashboard',
      component: Index,
    },
    {
      path: '/report',
      component: IndexReport,
    },
    {
      path: '/setting',
      component: IndexSetting,
    },
  ],
})

export default router
