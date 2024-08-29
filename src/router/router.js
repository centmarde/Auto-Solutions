import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/Hero.vue'),
    beforeEnter: (to, from) => {
      // Redirect authenticated users to the dashboard
      if (sessionStorage.getItem('token') != null) {
        return '/home'; // Redirect to a default page for authenticated users
      }
    },
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue'),
    beforeEnter: (to, from) => {
      // Redirect authenticated users to the dashboard
      if (sessionStorage.getItem('token') != null) {
        return '/home'; // Redirect to a default page for authenticated users
      }
    },
  },
  {
    path: '/register',
    component: () => import('../components/Register.vue'),
    beforeEnter: (to, from) => {
      // Redirect authenticated users to the dashboard
      if (sessionStorage.getItem('token') != null) {
        return '/home'; // Redirect to a default page for authenticated users
      }
    },
  },
  {
    path: '/hero',
    component: () => import('../components/Hero.vue'),
    beforeEnter: (to, from) => {
      // Redirect unauthenticated users to the login page
      if (sessionStorage.getItem('token') == null) {
        return '/login'; // Redirect to the login page if not authenticated
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../components/Notfoundpage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
