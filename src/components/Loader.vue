<template>
    <div class="loading-screen" v-if="isLoading" ref="loadingScreen">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import gsap from 'gsap'
  
  const isLoading = ref(true)
  const loadingScreen = ref(null)
  
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 5000) // 5 seconds
  })
  
  // Watch for changes in `isLoading` and trigger GSAP animation when it turns false
  watch(isLoading, (newValue) => {
    if (!newValue) {
      // Trigger fade-out effect with GSAP after 5 seconds
      gsap.to(loadingScreen.value, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          // Hide the element after animation completes
          loadingScreen.value.style.display = 'none'
        }
      })
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
    background: #ffffff; /* Solid white background */
    z-index: 99999;
    color: #333;
    font-size: 1.5rem;
    font-family: Arial, sans-serif;
    opacity: 1; /* Ensure opacity starts as fully opaque */
    transition: opacity 1s;
  }
  
  .spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 8px solid rgb(97, 40, 255);
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
  