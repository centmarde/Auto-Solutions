<template>
   
    <div id="nav" class="container-fluid" >
        <header class="row">
          <div class="col">  <section class="logo">
        <img class="logopic" src="@/assets/images/logo.jpeg" alt="logo" />
        <h3>Gidor's Auto Solutions</h3>
      </section>
      <div class="hamburger mx-2" @click="toggleMenu">
        <div class="bar" :class="{ open: isMenuVisible }"></div>
        <div class="bar" :class="{ open: isMenuVisible }"></div>
        <div class="bar" :class="{ open: isMenuVisible }"></div>
      </div>

      <section  class="nav-links buttons" :class="{ show: isMenuVisible }">
        <router-link to="/login" @click="closeMenu">Services</router-link>
        <router-link to="/login" @click="logout">Log-out</router-link>
      </section></div>
    

     
    </header>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { doLogout } from "../../../lib/supaBase";

import NavLink from '../Navlink.vue';

const isMenuVisible = ref(false);

const closeMenu = () => {
  isMenuVisible.value = false;
};
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const logout = async () => {
    await doLogout();
  };
</script>

<style lang="scss" scoped>

.logo {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 120px;
}

.logopic {
  border-radius: 30px;
  height: 50px;
}

header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(82, 52, 52, 0.5);
  margin: -10px;
  margin-top: -20px;
  padding: 10px;
  align-items: center;
  color: white;
  position: fixed;
  width: 100%;
}

.buttons {
  display: flex;
  gap: 50px;
  margin-left: 200px;
}

header a {
  text-decoration: none;
  color: white;
}

header a:hover {
  padding: 10px;
  background-color: rgba(141, 40, 40, 0.25);
  border-radius: 20px;
}

</style>