<template>
  <div class="loading-screen" v-if="isLoading" ref="loadingScreen">
    <div class="spinner"></div>
    <p>LOADING RESOURCES</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

const isLoading = ref(true)
const loadingScreen = ref(null)

// Check if the page needs to be reloaded
const needsReload = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('reloaded')) {
    // Page has been reloaded, no need to reload again
    sessionStorage.removeItem('reloaded')
    setTimeout(() => {
      isLoading.value = false
    }, 3000) // 5 seconds
  } else {
    // Set flag to reload page and store it in sessionStorage
    sessionStorage.setItem('reloaded', 'true')
    window.location.reload()
  }
})


</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #151515; /* Solid white background */
  z-index: 99999;
  color: #EEEEEE;
  font-size: 1.5rem;
  font-family: Arial, sans-serif;
  opacity: 1; /* Ensure opacity starts as fully opaque */
  transition: opacity 1s;
  font-family: "Merriweather", serif;
}

.spinner {
  border: 8px solid rgba(221, 221, 221, 0.1);
  border-radius: 50%;
  border-top: 8px solid rgb(211, 211, 211);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
