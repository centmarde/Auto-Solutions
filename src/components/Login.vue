<template>
    <div>
      <form id="login_form" @submit.prevent="login" class="container wrap-form text-center mt-5">
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
 
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  