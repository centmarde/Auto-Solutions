<template>
    <a :class="['nav-link', { 'is-active': isActive }]" :href="href" @click="setActiveLink">
      <slot></slot>
    </a>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Props
  const props = defineProps({
    href: {
      type: String,
      required: true,
    },
  });
  
  // State
  const isActive = ref(false);
  
  // Methods
  function setActiveLink(event: Event) {
    isActive.value = true;
    document.querySelectorAll('.nav-link').forEach((link) => {
      if (link !== event.target) {
        link.classList.remove('is-active');
      }
    });
  }
  </script>
  
  <style scoped>
 .nav-link {
  color: #EEEEEE;
  text-decoration: none;
  font-family: "Roboto Condensed", sans-serif;
  margin: 0 10px;
  transition: color 0.3s, transform 0.3s;
}

.nav-link.is-active {
  color: #C73659; /* Example active color */
  text-transform: uppercase;
}

  </style>
  