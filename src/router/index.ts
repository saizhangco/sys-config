/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import Index from '@/pages/index1.vue'

const router = createRouter({
  history: createWebHistory('/vghks/'),
  routes: [
    {
      path: '/',
      component: Index,
    },
  ],
})

export default router
