import { createRouter, createWebHistory } from "vue-router";
import MainView from '@/views/MainView'

const routes = [
  {
    path: '/',
    component: MainView,
    name: 'Main'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
