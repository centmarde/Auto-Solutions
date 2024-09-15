<template>
    <Nav />
    <br><br><br>
    <FeaturedCar/>
    
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { doLogout } from "../../lib/supaBase";
  import Nav from '../../includes/Navbar/includes/InsideNavbar.vue';
  import FeaturedCar from '../../includes/HomeSection/FeaturedCar.vue';

  
  //enable this for remove auth
  // localStorage.removeItem("access_token");

  
  // Using Vue Router's push method for navigation
  const router = useRouter();
  
  const goToCarRepair = () => {
    router.push("/CarRepair");
  };
  
  const gotoCarParts = () => {
    router.push("/CarParts");
  };
  
  const gotoCarRental = () => {
    router.push("/CarRental");
  };

  const gotoCarOwned = () => {
    router.push("/CarOwned");
  };
  const gotoUserInfo = () => {
    router.push("/UserInfo");
  };
  
  const logout = async () => {
    await doLogout();
  };
  </script>
  