import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('@/views/WeatherView.vue')
  }
]

export default createRouter({
  routes,
  history: createWebHistory()
})
