<template>
  <div class="container mt-5">
    <h2>Select Brand</h2>
    <form @submit.prevent="submitForm">
      <!-- Make Selection with Images -->
      <div class="row d-flex justify-content-center">
        <div class="col-md-4 mb-4" style="width: 20%;">
          <div class="card brand-card" @click="selectBrand('Toyota')">
            <img class="mx-2 my-2" src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28Red%29.svg" alt="Toyota" />
            <div class="card-body text-center"></div>
          </div>
        </div>
        <div class="col-md-4 mb-4" style="width: 20%;">
          <div class="card brand-card" @click="selectBrand('Honda')">
            <img class="mx-2 my-2" src="https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo.png" alt="Honda" />
            <div class="card-body text-center"></div>
          </div>
        </div>
        <div class="col-md-4 mb-4" style="width: 20%;">
          <div class="card brand-card" @click="selectBrand('Nissan')">
            <img class="mx-2 my-2" src="https://seeklogo.com/images/N/Nissan-logo-4B3C580C8A-seeklogo.com.png" alt="Nissan" />
            <div class="card-body text-center"></div>
          </div>
        </div>
      </div>

      <!-- Model Selection -->
      <div class="mb-3" v-if="selectedMake">
        <label class="form-label" for="model">Model</label>
        <select id="model" class="form-select" v-model="selectedModel" @change="showCarImage">
          <option value="" disabled>Select a model</option>
          <option v-for="model in filteredModels" :key="model.Model" :value="model.Model">{{ model.Model }}</option>
        </select>
      </div>

      <!-- Display Car Image -->
      <div v-if="selectedCar">
        <h3>{{ selectedCar.Brand }} {{ selectedCar.Model }} ({{ selectedCar.yearModel }})</h3>
        <img :src="selectedCar.ImageURL" :alt="selectedCar.Model" class="img-fluid mt-3" />
        <p>{{ selectedCar.Description }}</p>
      </div>

      <!-- Additional Fields -->
      <div class="mb-3">
        <label class="form-label" for="yearsOwned">Years Owned</label>
        <input id="yearsOwned" class="form-control" type="number" v-model="yearsOwned" placeholder="Enter number of years owned">
      </div>
      <div class="mb-3">
        <label class="form-label" for="description">Description</label>
        <textarea id="description" class="form-control" v-model="description" rows="3" placeholder="Enter additional description"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div><span>Loading...</span>
        </span>
        <span v-else>Submit</span>
      </button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../../lib/supaBase';
import axios from 'axios';

export default {
  data() {
    return {
      cars: [], 
      selectedMake: '',
      selectedModel: '',
      selectedCar: null,
      uniqueMakes: [], 
      filteredModels: [], 
      yearsOwned: '',  
      description: '', 
      isSubmitting: false 
    };
  },
  created() {
    this.fetchCarData();
  },
  methods: {
    async fetchCarData() {
      try {
        const response = await axios.get('https://thestrongestalgorithm.github.io/api/allcars.json');
        this.cars = response.data;
        this.uniqueMakes = [...new Set(this.cars.map(car => car.Brand))];
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    },
    selectBrand(brand) {
      this.selectedMake = brand;
      this.filterModels();
    },
    filterModels() {
      this.filteredModels = this.cars.filter(car => car.Brand === this.selectedMake);
      this.selectedModel = '';
      this.selectedCar = null;
    },
    showCarImage() {
      this.selectedCar = this.cars.find(
        car => car.Brand === this.selectedMake && car.Model === this.selectedModel
      );

    
    },
    async submitForm() {
      this.isSubmitting = true; 

      try {
        const userId = localStorage.getItem('user_id');

        const { data, error } = await supabase
          .from('Car_owned') 
          .insert([
            {
              brand: this.selectedMake,
              model: this.selectedModel,
              years_owned: this.yearsOwned,
              description: this.description,
              user_id: userId,
            }
          ])
          .select();

        if (error) throw error;

        alert('Form submitted successfully:');
        
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false; 
      }
    }
  }
};
</script>
