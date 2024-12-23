import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import UsersPage from '../pages/usersPage/UsersPage.vue';

const routes = [{
  path: '/',
  name: 'home',
  component: HomePage,
}, {
  path: '/users',
  name: 'users',
  component: UsersPage,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
