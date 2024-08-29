// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../components/Hero.vue';
import Home from '../components/dist/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NotFound from '../components/Notfoundpage.vue'; // Optional for handling unknown routes

const routes = [
  { path: '/', component: Hero },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
 /*  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/userProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/help', component: Help, meta: { requiresAuth: true } },
  { path: '/accept', component: Accept, meta: { requiresAuth: true } },
  { path: '/sets', component: Sets, meta: { requiresAuth: true } }, */
  { path: '/:pathMatch(.*)*', component: NotFound } // Optional for handling unknown routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const userRole = localStorage.getItem("Role");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/home');
  } else if (to.path.startsWith('/dashboard') && !isLoggedIn) {
    next('/login');
  } else if (to.path.startsWith('/dashboard') && userRole !== 'Owner' && userRole !== 'Admin') {
    next('/home');
  } else {
    next();
  }
});

export default router;
