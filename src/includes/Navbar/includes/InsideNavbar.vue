<template>
  <div id="nav" class="container-fluid">
    <header class="row align-items-center">
      <div class="col-md-6 d-flex align-items-center">
        <section class="logo d-flex align-items-center">
          <img class="logopic" src="@/assets/images/logo.jpeg" alt="logo" />
          <h3 class="mb-0 ms-2">Gidor's Auto Solutions</h3>
        </section>
      </div>
      <div class="col-md-6 d-flex justify-content-end align-items-center">
        <div class="hamburger d-md-none" @click="toggleMenu">
          <div class="bar" :class="{ open: isMenuVisible }"></div>
          <div class="bar" :class="{ open: isMenuVisible }"></div>
          <div class="bar" :class="{ open: isMenuVisible }"></div>
        </div>
        <nav class="nav-links d-none d-md-flex">
          <router-link to="/login" class="nav-link" @click="closeMenu">Services</router-link>
          <router-link to="/login" class="nav-link" @click="logout">Log-out</router-link>
        </nav>
      </div>
    </header>
    <div class="nav-links-mobile" v-show="isMenuVisible">
      <router-link to="/login" @click="closeMenu">Services</router-link>
      <router-link to="/login" @click="logout">Log-out</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { doLogout } from "../../../lib/supaBase";

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
  gap: 10px;
}

.logopic {
  border-radius: 30px;
  height: 50px;
}

header {
  background-color: rgba(82, 52, 52, 0.5);
  padding: 10px;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.hamburger {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.bar {
  width: 30px;
  height: 3px;
  background-color: white;
  transition: 0.3s;
}

.bar.open:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.bar.open:nth-child(2) {
  opacity: 0;
}

.bar.open:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.nav-links {
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  padding: 10px;
  background-color: rgba(141, 40, 40, 0.25);
  border-radius: 20px;
}

.nav-links-mobile {
  display: none;
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: rgba(82, 52, 52, 0.7);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.nav-links-mobile a {
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
}

.nav-links-mobile a:hover {
  background-color: rgba(141, 40, 40, 0.25);
}

/* Show mobile menu when visible */
.nav-links-mobile[v-show="true"] {
  display: block;
}
</style>
