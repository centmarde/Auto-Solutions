// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Assuming you are using Vue Router
import '../src/scss/styles.scss';
import * as bootstrap from 'bootstrap';


async function doLogout() {
    // Supabase Logout
    let { error } = await supabase.auth.signOut();

    if (error == null) {
      successNotification("Logout Successfully!");
  
      // Clear local Storage
      localStorage.clear();
  
      // Redirect to login page
      window.location.pathname = "/index.html";
    } else {
      errorNotification("Logout Failed!", 15);
    }
  }

export { doLogout };
  
const app = createApp(App);

app.use(router); // Use router if you're using Vue Router

app.mount('#app');
