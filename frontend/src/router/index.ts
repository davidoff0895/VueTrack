import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/common/NotFoundView.vue';
import AuthView from '@/views/AuthView.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import UsersList from '@/components/users/UsersList.vue';
import { global } from '@/consts/global';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginForm,
        meta: { title: 'Log in to VueTrack' },
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/AdminView.vue'),
    children: [
      {
        path: 'users',
        name: 'users',
        component: UsersList,
        meta: { title: 'Users | Administration' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || global.DEFAULT_DOC_TITLE;
  next();
});

export default router;
