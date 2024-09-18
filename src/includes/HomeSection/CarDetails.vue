<template>
    <div>
      <h1>Car Details</h1>
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'CarDetails',
    mounted() {
      // Access the car ID from the route parameters
      const carId = this.$route.params.id;
      // Log the car ID to the console
      console.log('Car ID:', carId);
  
    
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  