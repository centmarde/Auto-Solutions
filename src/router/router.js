import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../components/Hero.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NotFound from '../components/Notfoundpage.vue';

// Login contents
import Home from '../components/includes/Home.vue';
import UserInfo from '../components/includes/UserInfo.vue';
import Supra from '../components/includes/Supra.vue';
import Honda from '../components/includes/Honda.vue';
import Nissan from '../components/includes/Nissan.vue';
import SellContents from '../includes/HomeSection/SellContents.vue';
import CarDetails from '../includes/HomeSection/CarDetails.vue'; // Import the CarDetails component

const routes = [
  { path: '/', component: Hero },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/Supra', component: Supra, meta: { requiresAuth: true } },
  { path: '/Honda', component: Honda, meta: { requiresAuth: true } },
  { path: '/Nissan', component: Nissan, meta: { requiresAuth: true } },
  { path: '/Home', component: Home, meta: { requiresAuth: true } },
  { path: '/UserInfo', component: UserInfo, meta: { requiresAuth: true } },
  { path: '/SellContents', component: SellContents, meta: { requiresAuth: true } },
  { path: '/car/:id', component: CarDetails, name: 'CarDetails', meta: { requiresAuth: true } }, // Car details route

  // { path: '/home', component: Home, meta: { requiresAuth: true } },

  /* { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
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

  // Pages that don't require authentication
  const publicPages = ['/', '/login', '/register'];

  // Pages that require authentication
  const protectedPages = ['/UserLanding', '/Home', '/UserInfo', '/Supra', '/Honda', '/Nissan', '/SellContents'];

  // Redirect to login if trying to access protected pages without being logged in
  if (protectedPages.includes(to.path) && !isLoggedIn) {
    return next('/');
  }

  // Redirect to home if already logged in and trying to access public pages
  if (publicPages.includes(to.path) && isLoggedIn) {
    return next('/Home');
  }

  // Example for role-based access (uncomment if needed)
  /* if (to.path.startsWith('/dashboard') && (userRole !== 'Owner' && userRole !== 'Admin')) {
    return next('/home');
  } */

  // Default behavior: proceed to the route
  next();
});

export default router;
