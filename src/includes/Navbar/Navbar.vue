<template>
  <header class="navbar navbar-expand-lg fixed-top" :class="{'navbar-dark': theme === 'dark', 'navbar-light': theme === 'light'}" :style="{ backgroundColor: theme === 'dark' ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: theme === 'light' ? '#333' : '#fff' }">

    <div class="container-fluid">
      <!-- Logo and Title Section -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="@/assets/images/logo.jpeg"
          alt="logo"
          class="logopic"
          height="50"
        />
        <h3 id="gidor" class="ms-2 mb-0">AUTO-SOLUTIONS</h3>
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

      <!-- Navbar Links (moved to the left) -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuVisible }"
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto"> <!-- changed ms-auto to me-auto to move to the left -->
          <li class="nav-item">
            <a href="#CarSale" class="nav-link btn" @click="closeMenu">CARS FOR SALE</a>
          </li>
          <li class="nav-item text-center">
            <div class="dropdown">
 
</div>
          </li>
          <li class="nav-item">
            <a href="#sellcar23" class="nav-link btn" @click="closeMenu">SELL YOUR CAR</a>
          </li>
          <li class="nav-item">
            <a href="#stack" class="nav-link btn" @click="closeMenu">REVIEWS</a>
          </li>
         
          <li class="nav-item">
            <a class="nav-link btn"><router-link to="/login" style="text-decoration: none; color:rgb(97, 40, 255);">RENT A CAR</router-link></a>
          </li>
        </ul>

        <!-- Separate Login and Theme Toggle on the right -->
        <ul class="navbar-nav ms-auto d-flex align-items-center">
          <li class="nav-item d-flex">
            <router-link to="/login" class="nav-link btn" @click="closeMenu">LOGIN</router-link>
            <i class="fa fa-user-circle ms-1 mt-2" aria-hidden="true"></i>
          </li>
          <li class="nav-item d-flex align-items-center ms-3">
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
  font-size: 1.2rem;
  font-family: "Merriweather", serif; 
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

/* From Uiverse.io by biswacpcode */
.btn {
 
  text-decoration: none;
  font-size: 10px;
  border: none;
  background: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.btn::before {
  margin-left: auto;
}

.btn::after,
.btn::before {
  content: '';
  width: 0%;
  height: 2px;
  background: rgb(97, 40, 255);
  display: block;
  transition: 0.5s;
}

.btn:hover::after,
.btn:hover::before {
  width: 100%;
}

.drp_btn{
  margin-top: 2px;
}
</style>
