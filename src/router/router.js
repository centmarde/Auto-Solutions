import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../components/Hero.vue';

const routes = [
  {
    path: '/',
    name: 'hero',
    component: Hero
  },
  // Uncomment and add routes if needed
  // {
  //   path: '/background',
  //   name: 'background',
  //   component: BackgroundPage
  // },
  // {
  //   path: '/portfolio',
  //   name: 'portfolio',
  //   component: PortfolioPage
  // },
  // {
  //   path: '/contact',
  //   name: 'contact',
  //   component: ContactPage
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'notFound',
  //   component: NotFoundPage
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
