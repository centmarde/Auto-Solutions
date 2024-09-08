<template>
    <Nav />
    <br><br> <br><br><br>
    <div class="container">
      <div class="row">
        <div class="col d-flex justify-content-center">
         
          <button
            type="button"
            id="carparts_button"
            class="btn btn-primary ms-5"
            @click="gotoCarOwned"
          >
            Cars Owned
          </button>

          <button
            type="button"
            id="carparts_button"
            class="btn btn-primary ms-5"
            @click="gotoCarParts"
          >
            Car Parts
          </button>
  
          <button
            type="button"
            id="carrepair_button"
            class="btn btn-primary ms-5"
            @click="goToCarRepair"
          >
            Car Repair
          </button>
  
          <button
            type="button"
            id="carrental_button"
            class="btn btn-primary ms-5"
            @click="gotoCarRental"
          >
            Car Rental
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { doLogout } from "../../lib/supaBase";
  import Nav from '../../includes/Navbar/includes/InsideNavbar.vue';
  
  
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
  
  
  const logout = async () => {
    await doLogout();
  };
  </script>
  