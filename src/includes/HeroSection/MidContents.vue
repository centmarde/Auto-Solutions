<template>
    <div id="body" >
        <br><br>
        <div class="card" style="margin: 2rem;">
            <div class="card-body"> 
                <div class="row">
                    <div class="col-12 text-center"><div class="btnn text-center">SHOP CARS FOR SALE</div></div>
                </div>
                <div class="row">
                    <div class="col">
                        <CarSearch/>

                    </div>
                </div>
            </div>
        </div>
       
        <br>
    </div>
</template>

<script setup>
import CarSearch from './CarSearch.vue';

</script>

<style>
#body{
    background-color: #151515;
    overflow: hidden;
}
.btnn{
    font-family: "Merriweather", serif;
    font-size: 35px
}
</style>