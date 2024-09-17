<template>
    <Nav />
    <br><br><br><br>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12"><div class="card shadow-lg">
          <div class="card-body"><SellCar/></div>
        </div></div>
      </div>
    </div>
    
    <br><br><br>
    <FeaturedCar/>
    
  </template>
  
  <script setup>
  import { doLogout } from "../../lib/supaBase";
  import Nav from '../../includes/Navbar/includes/InsideNavbar.vue';
  import FeaturedCar from '../../includes/HomeSection/FeaturedCar.vue';
  import SellCar from '../../includes/HeroSection/SellCar.vue';
  import HeroHome from "../../includes/HomeSection/HeroHome.vue";

  
  
  const logout = async () => {
    await doLogout();
  };
  </script>
  