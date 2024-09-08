<template>
  <div>
    <br><br>
    <form id="login_form" @submit.prevent="login" class="container wrap-form text-center">
      <h1 class="login">Auto Solutions</h1>
      <h2 class="text-center">Login</h2>
      <div class="input-box">
        <input v-model="email" type="email" placeholder="Email" required />
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="input-box">
        <input
          :type="passwordType"
          v-model="password"
          placeholder="Password"
          required
        />
        <i class="fa-solid fa-lock"></i>
        <button type="button" @click="togglePassword" id="togglePassword">
          <i :class="passwordType === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>
      <button type="submit" id="login_button" class="btn btn-primary">Login</button>
      <div class="create-account">
        <p>Create Account <router-link to="/register">Sign-up</router-link></p>
        <router-link to="/">Go-Back</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supaBase';

const email = ref('');
const password = ref('');
const passwordType = ref('password');

const togglePassword = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};

const login = async () => {
  const loginButton = document.querySelector("#login_button");

  // Disable login button and show loading spinner
  loginButton.disabled = true;
  loginButton.innerHTML = `<div class="spinner-border spinner-border-sm me-2" role="status"></div><span>Loading...</span>`;

  // Supabase sign-in
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value, 
    password: password.value, 
  });

  let session = data.session;
  let user = data.user;

  console.log(data);

  if (session != null) {
    // Store tokens for API
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);

    // Save user id in local storage
    localStorage.setItem("auth_id", user?.id);

    // Fetch user profiles
    let { data: profiles, error } = await supabase
      .from("User")
      .select("*")
      .eq("auth_id", localStorage.getItem("auth_id"));

    if (profiles && profiles.length > 0) {
      localStorage.setItem("user_id", profiles[0].id);
      console.log(profiles[0].id);

      // Redirect to home page after successful login
      alert("Login Successfully");
      window.location.pathname = '/UserLanding';
    } else {
      alert(`${error.message}`);
    }
  } else {
    alert("Error Please Try again or check your password");
    console.log(error);
  }

 
  loginButton.disabled = false;
  loginButton.innerHTML = "Login";
};

</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
}

.input-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-box input {
  width: 100%;
  padding-right: 2.5rem;
}

.input-box i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.btn-link {
  color: #666;
  padding: 0;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.25rem;
}

.create-account {
  margin-top: 1.5rem;
  font-size: 0.875rem;
}
</style>