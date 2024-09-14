<template>
  <div>
    <Loader />
    <Navbar/>
    <TopContents/>
    <MidContents/>
    <Footer/>
  </div>
</template>

<script setup>
import Navbar from '../includes/Navbar/Navbar.vue'
import TopContents from '../includes/HeroSection/TopContents.vue'
import MidContents from '../includes/HeroSection/MidContents.vue'
import Footer from '../includes/HeroSection/Footer.vue'
import Loader from './Loader.vue'
</script>

<style>
/* You can add additional styles here if needed */
</style>
