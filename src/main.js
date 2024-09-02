// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Assuming you are using Vue Router
import '../src/scss/styles.scss';
import * as bootstrap from 'bootstrap';

const app = createApp(App);

app.use(router); // Use router if you're using Vue Router

app.mount('#app');
