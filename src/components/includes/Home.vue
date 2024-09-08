<template>
    <div class="home-container">
        <div class="row">
            <div class="col text-center">
                <h1 class="text-center">Welcome to the Home Page</h1>
                <!-- Other content of the Home page -->

                <!-- Logout Button -->

                <div class="ms-5"><Contents/><button @click="doLogout" class="btn btn-danger mt-3">Logout</button></div>
                
               
            </div>
            <!-- <div class="col"> </div> -->
        </div>

    </div>

</template>

<script setup>
import { doLogout } from '../../lib/supaBase.js';
import Contents from '../../includes/HomeSection/Contents.vue'
</script>

<style lang="scss" scoped>
h1 {

    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
}

.btn-danger:hover {
    background-color: #c82333;
}
</style>