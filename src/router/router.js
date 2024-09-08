import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../components/Hero.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import NotFound from '../components/Notfoundpage.vue';

//login contents
import Home from '../components/includes/Home.vue';
import UserLanding from '../components/includes/UserLanding.vue'
import CarRepair from '../includes/HomeSection/CarRepair.vue'
import CarParts from '../includes/HomeSection/CarParts.vue'
import CarRental from '../includes/HomeSection/CarRental.vue';
import CarOwned from '../components/includes/CarOwned.vue';


const routes = [
  { path: '/', component: Hero },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/UserLanding', component: UserLanding, meta: { requiresAuth: true } },
  { path: '/Home', component: Home, meta: { requiresAuth: true } },
  { path: '/CarRepair', component: CarRepair, meta: { requiresAuth: true } },
  { path: '/CarParts', component: CarParts, meta: { requiresAuth: true } },
  { path: '/CarRental', component: CarRental, meta: { requiresAuth: true } },
  { path: '/CarOwned', component: CarOwned, meta: { requiresAuth: true } },


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
  const protectedPages = ['/UserLanding', '/CarRental', '/CarRepair', '/CarRental', '/CarParts', '/home', '/CarOwned'];

  // Redirect to login if trying to access protected pages without being logged in
  if (protectedPages.includes(to.path) && !isLoggedIn) {
    return next('/login');
  }

  // Redirect to home if already logged in and trying to access public pages
  if (publicPages.includes(to.path) && isLoggedIn) {
    return next('/UserLanding');
  }

  // Example for role-based access (uncomment if needed)
  /* if (to.path.startsWith('/dashboard') && (userRole !== 'Owner' && userRole !== 'Admin')) {
    return next('/home');
  } */

  // Default behavior: proceed to the route
  next();
});

export default router;
