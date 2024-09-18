<template>
  <header class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-dark': theme === 'dark', 'navbar-light': theme === 'light' }"
    :style="{ backgroundColor: theme === 'dark' ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: theme === 'light' ? '#333' : '#fff' }">
    <div class="container-fluid">
      <!-- Logo and Title Section -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="@/assets/images/logo.jpeg" alt="logo" class="logopic" height="50" />
        <h3 id="gidor" class="ms-2 mb-0">Auto Solutions</h3>
      </a>

      <!-- Hamburger Menu Button -->
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" :class="{ show: isMenuVisible }" id="navbarNav">
        <div class="ms-auto d-flex align-items-center justify-content-end w-100">
          
          <ul class="navbar-nav">
           
            <li class="nav-item">
              <router-link to="/Supra" class="nav-link btn wes" @click="closeMenu">GARAGE</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/UserInfo" class="nav-link btn wes" @click="closeMenu">{{ username }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link btn wes" @click="handleLogout">LOGOUT</router-link>
            </li>
            
          </ul>
          <router-link to="/UserInfo" @click="closeMenu">
                <img :src="userImage"  class="rounded-circle"
                  style="width: 3rem; height: 3rem; object-fit: cover; border: 2px solid white;" />
              </router-link>

          <!-- Theme Toggle -->
          <div class="d-flex align-items-center ms-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'"
                @change="toggleTheme">
              <label class="form-check-label" for="themeSwitch">
                <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Links -->
    <div class="nav-links-mobile" v-show="isMenuVisible">
      <router-link to="/UserInfo" class="nav-link btn wes" @click="closeMenu">{{ username }}</router-link>
      <router-link to="/Supra" class="nav-link btn wes" @click="closeMenu">SERVICES</router-link>
      <router-link to="/" class="nav-link btn wes" @click="handleLogout">LOGOUT</router-link>
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
const userImage = ref(''); // New state for user image
const theme = ref(localStorage.getItem('theme') || 'dark'); // Load saved theme or default to dark

// Router
const router = useRouter();

// Methods
const closeMenu = () => {
  isMenuVisible.value = false;
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

const fetchUserData = async () => {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('No user ID found in local storage');
    }

    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    username.value = data.username || 'Guest';
    userImage.value = data.img || ''; // Set user image URL

    // Debugging: Check the userImage value
    console.log('Fetched user image:', userImage.value);
  } catch (error) {
    console.error('Error fetching user data:', error);
    username.value = 'Guest'; // Default value in case of an error
  }
};

// Fetch user data on component mount
onMounted(fetchUserData);

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', theme.value);
  localStorage.setItem('theme', theme.value); // Save theme in local storage
};

// Apply saved theme on mount
onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value);
});
</script>





<style scoped>
.logopic {
  border-radius: 30px;
  max-width: 100px;
  /* Ensures logo doesn't grow too large */
}

#gidor {
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
}

@media (max-width: 992px) {

  /* Large tablets and small desktops */
  #gidor {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {

  /* Tablets */
  .logopic {
    height: 40px;
    /* Smaller logo for smaller screens */
  }

  #gidor {
    font-size: 1rem;
    /* Smaller title for smaller screens */
  }
}

@media (max-width: 280px) {

  /* Mobile devices */
  .logopic {
    height: 30px;
    /* Even smaller logo for mobile */
  }

  #gidor {
    font-size: 0.6rem;
    /* Adjust title size for mobile */
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

.nav-link {
  color: white;
  text-transform: uppercase;
}

header.navbar-light .nav-link {
  color: #333;
}
/* Mobile Navigation Links */
.nav-links-mobile {
  display: none;
  background-color: rgba(52, 52, 52, 0.9);
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 9999;
  flex-direction: column;
  padding: 10px 20px;
}

.nav-links-mobile .nav-link {
  color: white;
  padding: 10px;
  text-align: center;
}

/* Show mobile nav links when menu is visible */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to /* .v-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
