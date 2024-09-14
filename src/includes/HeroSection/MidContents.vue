<template>
  <div id="body">
    <br /><br />
    <YourGarage/>
    <CarPopular/>

    <div class="container-fluid">
        <div class="row">
  <div class="col-12 col-md-6 mb-2">
    <div class="card mx-3" style="max-width: 100%;">
      <SellCar />
    </div>
  </div>
  <div class="col-12 col-md-6 mb-2">
    <div class="card mx-3" style="max-width: 100%;">
      <ResearchCars />
    </div>
  </div>
</div>

    </div>

    <br />

    <div class="card" style="margin: 2rem">
      <div class="card-body">
        <div class="row">
          <div class="col-12 text-center">
            <div class="btnn text-center">SHOP CARS FOR SALE</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <CarSearch />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CarSearch from "./CarSearch.vue";
import SellCar from "./SellCar.vue";
import ResearchCars from "./ResearchCars.vue";
import CarPopular from "./CarPopular.vue";
import YourGarage from "./YourGarage.vue"; 
</script>

<style>
#body {
  background-color: #151515;
  overflow: hidden;
}
.btnn {
  font-family: "Merriweather", serif;
  font-size: 35px;
}
</style>
