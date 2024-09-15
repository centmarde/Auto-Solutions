<template>
    <Nav />
    <br><br><br>
    <FeaturedCar/>
    
  </template>
  
  <script setup>
  import { doLogout } from "../../lib/supaBase";
  import Nav from '../../includes/Navbar/includes/InsideNavbar.vue';
  import FeaturedCar from '../../includes/HomeSection/FeaturedCar.vue';

  
  
  const logout = async () => {
    await doLogout();
  };
  </script>
  