<template>
  <header class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-dark': theme === 'dark', 'navbar-light': theme === 'light' }"
    :style="{ backgroundColor: theme === 'dark' ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: theme === 'light' ? '#333' : '#fff' }">

    <div class="container-fluid">
      <!-- Logo and Title Section -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="@/assets/images/logo.jpeg" alt="logo" class="logopic" height="50" />
        <h3 id="gidor" class="ms-2 mb-0">Gidor's Auto Solutions</h3>
      </a>

      <!-- Hamburger Menu Button -->
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" :class="{ show: isMenuVisible }" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button class="btn"> <router-link to="/UserInfo" class="nav-link">{{ username }}</router-link></button>

          </li>
          <li class="nav-item">
            <button class="btn"> <router-link to="/Supra" class="nav-link"
                @click="closeMenu">SERVICES</router-link></button>

          </li>
          <li class="nav-item me-5">
            <button class="btn"> <router-link to="/" class="nav-link"
                @click="handleLogout">LOGOUT</router-link></button>

          </li>
          <!-- Theme Toggle Switch -->
          <li class="nav-item d-flex align-items-center">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'"
                @change="toggleTheme">
              <label class="form-check-label" for="themeSwitch">
                <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile Navigation Links (only shown on mobile) -->
    <div class="nav-links-mobile" v-show="isMenuVisible">
      <router-link to="/Supra" class="nav-link" @click="closeMenu">SERVICES</router-link>
      <router-link to="/" class="nav-link" @click="handleLogout">LOGOUT</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase, doLogout as supabaseLogout } from '../../../lib/supaBase';


// State
const isMenuVisible = ref(false);
const username = ref('');
const theme = ref(localStorage.getItem('theme') || 'dark'); // Load saved theme or default to dark

// Router
const router = useRouter();

// Methods
const closeMenu = () => {
  isMenuVisible.value = false;
};

const gotoUserInfo = () => {
  router.push("/UserInfo");
};

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleLogout = async () => {
  try {
    await supabaseLogout(); // Use the imported logout function
    localStorage.removeItem('user_id');
    localStorage.removeItem('axios_id');
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const fetchUsername = async () => {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('No user ID found in local storage');
    }

    const { data, error } = await supabase
      .from('User')
      .select('username')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    username.value = data.username || 'Guest';
  } catch (error) {
    console.error('Error fetching username:', error);
    username.value = 'Guest'; // Default value in case of an error
  }
};

// Fetch username on component mount
onMounted(fetchUsername);

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
.logo {
  gap: 10px;
}

.logopic {
  border-radius: 30px;
  height: 50px;
}

/* Dark mode styles */
/* Dark mode styles */
header.navbar-dark .nav-link {
  color: white;
  text-transform: uppercase;
}

/* Light mode styles */
header.navbar-light .nav-link {
  color: #333;
  text-transform: uppercase;
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

#gidor {
  font-size: 1.5rem;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  #gidor {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  #gidor {
    font-size: 1rem;
  }
}

/* From Uiverse.io by biswacpcode */
.btn {
  color: #151515;
  text-decoration: none;
  font-size: 15px;
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
  background: rgba(255, 0, 0, 0.5);
  display: block;
  transition: 0.5s;
}

.btn:hover::after,
.btn:hover::before {
  width: 100%;
}
</style>