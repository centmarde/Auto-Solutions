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
import CarDetails from '../includes/HomeSection/CarDetails.vue';
import Dashboard from '../components/includes/Dashboard.vue';
import Inquires from '../components/includes/Inquires.vue'
import Test from '.././includes/HomeSection/Test.vue'

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
  { path: '/Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/Inquires', component: Inquires, meta: { requiresAuth: true } },
  { path: '/Test', component: Test, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound } // Optional for handling unknown routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const userRole = JSON.parse(localStorage.getItem("Role")); // Parse the boolean stored as a string
  const hasVisitedDashboard = JSON.parse(localStorage.getItem("hasVisitedDashboard")) || false; // Track dashboard visit
  
  console.log('User Role:', userRole); // Debugging role

  // Pages that don't require authentication
  const publicPages = ['/', '/login', '/register'];

  // Pages that require authentication
  const protectedPages = ['/UserLanding', '/Home', '/UserInfo', '/Supra', '/Honda', '/Nissan', '/SellContents', '/Dashboard', '/car/:id', 'Inquires', '/Test'];

  // Redirect to login if trying to access protected pages without being logged in
  if (protectedPages.includes(to.path) && !isLoggedIn) {
    return next('/');
  }

  // Redirect admin to the dashboard on first login if they haven't visited it yet
  if (isLoggedIn && userRole === true && !hasVisitedDashboard) {
    localStorage.setItem("hasVisitedDashboard", true); // Set flag to true after visiting dashboard
    return next('/Dashboard');
  }

  // Redirect to home if already logged in and trying to access public pages
  if (publicPages.includes(to.path) && isLoggedIn) {
    return next('/Home');
  }

  // Restrict non-admin users from accessing the dashboard
  if (to.path.startsWith('/Dashboard') && userRole !== true) {
    alert('You do not have permission to access this page.');
    return next('/Home');
  }

  // Default behavior: proceed to the requested route
  next();
});



export default router;
