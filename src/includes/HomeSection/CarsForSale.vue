<template>
    <div class="cars-for-sale container">
      <h1 class="my-4">Cars for Sale</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error alert alert-danger">{{ error }}</div>
      <div v-if="cars.length === 0" class="no-cars alert alert-warning">No cars available for sale.</div>
      
      <div class="row">
        <div v-for="car in cars" :key="car.id" class="col-md-6 mb-4">
          <div class="card">
            <img v-if="car.image" :src="car.image" alt="Car Image" class="card-img-top"/>
            <div class="card-body">
              <h2 class="card-title">{{ car.brand }} {{ car.model }}</h2>
              <ul class="list-unstyled">
                <li><strong>Year:</strong> {{ car.year }}</li>
                <li><strong>Mileage:</strong> {{ car.mileage }} miles</li>
                <li><strong>Price:</strong> php{{ car.price }}</li>
                <li><strong>Description:</strong> {{ car.description }}</li>
                <li><strong>Engine:</strong> {{ car.engine }}</li>
                <li><strong>Horsepower:</strong> {{ car.horsepower }} hp</li>
                <li><strong>Torque:</strong> {{ car.torque }} lb-ft</li>
                <li><strong>Top Speed:</strong> {{ car.topSpeed }} mph</li>
                <li><strong>Transmission:</strong> {{ car.transmission }}</li>
                <li><strong>Years Owned:</strong> {{ car.yearsowned }}</li>
                <li><strong>Posted By:</strong> {{ car.User.username }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { supabase } from '../../lib/supaBase';

  const itemsImageUrl = "https://xgjgtijbrkcwwsliqubk.supabase.co/storage/v1/object/public/cars/car_img/";
  
  export default {
    data() {
      return {
        cars: [], 
        loading: true,
        error: null,
      };
    },
    async created() {
      await this.fetchCars();
    },
    methods: {
      async fetchCars() {
        this.loading = true;
        try {
          const { data, error } = await supabase
            .from('Car')
            .select(`
              *,
              User(username)  // Join with User table to fetch user name
            `)
            .eq('forSale', true);  // Fetch only cars for sale
  
          if (error) throw error;
  
          this.cars = data;
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cars-for-sale {
    padding: 20px;
  }
  
  .loading {
    font-size: 18px;
    color: #666;
  }
  
  .error {
    color: red;
  }
  
  .no-cars {
    font-size: 18px;
  }
  
  .car-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  
  .car-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  