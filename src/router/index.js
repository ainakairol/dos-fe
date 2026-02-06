import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Leave from '../pages/Leave.vue'
import Attendance from '../pages/Attendance.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/leave', name: 'Leave', component: Leave },
    { path: '/attendance', name: 'Attendance', component: Attendance },
  ],
})

export default router
