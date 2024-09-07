<template>
  <header class="navbar navbar-expand-lg fixed-top" :class="{'navbar-dark': theme === 'dark', 'navbar-light': theme === 'light'}" :style="{ backgroundColor: theme === 'dark' ? 'rgba(82, 52, 52, 0.5)' : 'rgba(255, 255, 255, 0.5)' }">
    <div class="container-fluid">
      <!-- Logo and Title Section -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="@/assets/images/logo.jpeg"
          alt="logo"
          class="logopic"
          height="50"
        />
        <h3 id="gidor" class="ms-2 mb-0">Gidor's Auto Solutions</h3>
      </a>

      <!-- Hamburger Menu Button -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuVisible }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a href="#home" class="nav-link" @click="closeMenu">Home</a>
          </li>
          <li class="nav-item">
            <a href="#menu" class="nav-link" @click="closeMenu">Menu</a>
          </li>
          <li class="nav-item">
            <a href="#stack" class="nav-link" @click="closeMenu">About Us</a>
          </li>
          <li class="nav-item me-5">
            <router-link to="/login" class="nav-link" @click="closeMenu">Log-in</router-link>
          </li>
          <!-- Theme Toggle Switch -->
          <li class="nav-item d-flex align-items-center">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'" @change="toggleTheme">
              <label class="form-check-label" for="themeSwitch">
                <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMenuVisible = ref(false);
const theme = ref(localStorage.getItem('theme') || 'dark'); // Load saved theme or default to dark

const closeMenu = () => {
  isMenuVisible.value = false;
};

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', theme.value);
  localStorage.setItem('theme', theme.value); // Save theme in local storage
};

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value); // Apply saved theme on mount
});
</script>

<style scoped>
.logopic {
  border-radius: 30px;
  max-width: 100px; /* Ensures logo doesn't grow too large */
}

#gidor {
  font-size: 1.5rem; /* Default font size */
}

@media (max-width: 992px) { /* Large tablets and small desktops */
  #gidor {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) { /* Tablets */
  .logopic {
    height: 40px; /* Smaller logo for smaller screens */
  }

  #gidor {
    font-size: 1rem; /* Smaller title for smaller screens */
  }
}

@media (max-width: 280px) { /* Mobile devices */
  .logopic {
    height: 30px; /* Even smaller logo for mobile */
  }

  #gidor {
    font-size: 0.6rem; /* Adjust title size for mobile */
  }
}
</style>
