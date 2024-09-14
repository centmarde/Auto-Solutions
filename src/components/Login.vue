<template>
  <div id="yyts" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <div class="card-body">
        <form
          id="login_form"
          @submit.prevent="login"
          class="container wrap-form text-center"
        >
          <h1 class="login">Auto Solutions</h1>
          <h2 class="text-center">Login</h2>

          <div class="form-floating mb-4">
            <input
              class="form-control"
              type="email"
              placeholder="Email"
              v-model="email"
              required
            />
            <label for="emailInput">
              <i class="fa-solid fa-user"></i> Email
            </label>
          </div>

          <div class="form-floating position-relative mb-4">
            <input
              :type="passwordType"
              class="form-control"
              placeholder="Password"
              v-model="password"
              @keydown.enter.prevent
              required
            />
            <label for="passwordInput">
              <i class="fa-solid fa-lock"></i> Password
            </label>
            <button
              type="button"
              @click="togglePassword"
              class="password-toggle-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </button>
          </div>

          <!-- Submit Button -->
          <div class="d-flex justify-content-center">
            <button
              type="submit"
              id="login_button"
              class="sski btn btn-primary"
              style="background-color: rgb(97, 40, 255); border-color: rgb(97, 40, 255);"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                <span>Loading...</span>
              </span>
              <span v-else>Login</span>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div class="create-account mt-3">
            <p>
              Create Account <router-link to="/register">Sign-up</router-link>
            </p>
            <router-link to="/">Go-Back</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import Vue Router's useRouter
import { supabase } from "../lib/supaBase";
import axios from "axios";

const email = ref("");
const password = ref("");
const passwordType = ref("password");
const router = useRouter(); // Get router instance

const togglePassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};

const login = async () => {
  const loginButton = document.querySelector("#login_button");

  // Disable login button and show loading spinner
  loginButton.disabled = true;
  loginButton.innerHTML = `<div class="spinner-border spinner-border-sm me-2" role="status"></div><span>Loading...</span>`;

  // Attempt Supabase sign-in first
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  let session = data?.session;
  let user = data?.user;

  if (session) {
    // Store tokens and user ID from Supabase
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);
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
      router.push("/Home");
    } else {
      alert(`Profile fetch error: ${error.message}`);
    }
  } else {
    // If Supabase login fails, attempt Axios login
    console.log("Supabase login failed, trying Axios");

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email.value,
        password: password.value,
      });

      if (response.data && response.data.success) {
        // Store tokens and user ID from backend response
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("axios_id", response.data.user_id);
        console.log("Axios user_id:", response.data.id);

        // Redirect to home page after successful login
        alert("Login Successfully");
        router.push("/Home");
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    } catch (axiosError) {
      console.error("Axios login failed", axiosError);
      alert(
        "Error: Unable to login. Please check your credentials or try again later."
      );
    }
  }

  // Re-enable login button
  loginButton.disabled = false;
  loginButton.innerHTML = "Login";
};
</script>

<style scoped>
/* #yyts{
  background-color: aliceblue;
} */
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

.position-relative {
  position: relative;
}

.password-toggle-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
}
</style>


