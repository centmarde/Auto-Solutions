<template>
  <div class="container mt-5">
    <h2>Add Car Information</h2>
    <form @submit.prevent="submitForm">
      <!-- Make Selection -->
      <div class="mb-3">
        <label class="form-label" for="make">Make</label>
        <select id="make" class="form-select" v-model="car.make" @change="fetchModels(car.make)">
          <option value="" disabled>Select a make</option>
          <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
        </select>
      </div>

      <!-- Model Selection -->
      <div class="mb-3" v-if="car.make">
        <label class="form-label" for="model">Model</label>
        <select id="model" class="form-select" v-model="car.model" @change="fetchYears(car.model)">
          <option value="" disabled>Select a model</option>
          <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
        </select>
      </div>

      <!-- Year Selection -->
      <div class="mb-3" v-if="car.model">
        <label class="form-label" for="year">Year</label>
        <select id="year" class="form-select" v-model="car.year">
          <option value="" disabled>Select a year</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <!-- Price Input -->
      <div class="mb-3" v-if="car.year">
        <label for="price" class="form-label">Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="car.price"
          placeholder="Enter car price"
          required
        />
      </div>

      <!-- Status Selection -->
      <div class="mb-3">
        <label class="form-label" for="status">Status</label>
        <select id="status" class="form-select" v-model="car.status">
          <option value="" disabled>Select a status</option>
          <option v-for="statusOption in statusOptions" :key="statusOption" :value="statusOption">{{ statusOption }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!canSubmit">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      car: {
        make: '',
        model: '',
        year: null,
        price: null,
        status: ''
      },
      makes: [],
      models: [],
      years: [],
      statusOptions: ['Available', 'Sold', 'Rented'],
    };
  },
  async mounted() {
    await this.fetchMakes();
  },
  methods: {
    async fetchMakes() {
      try {
        const response = await axios.get('http://localhost:3000/api/makes');
        this.makes = response.data;
      } catch (error) {
        console.error("Failed to fetch makes", error);
      }
    },
    async fetchModels(make) {
      if (!make) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/models/${make}`);
        this.models = response.data;
        // Clear model and year when make changes
        this.car.model = '';
        this.car.year = null;
      } catch (error) {
        console.error("Failed to fetch models", error);
      }
    },
    async fetchYears(model) {
      if (!model) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/years/${model}`);
        this.years = response.data;
        // Clear year when model changes
        this.car.year = null;
      } catch (error) {
        console.error("Failed to fetch years", error);
      }
    },
    submitForm() {
      console.log("Car information:", this.car);
      // Perform form submission logic here (e.g., send data to API)
    },
  },
  computed: {
    canSubmit() {
      return this.car.make && this.car.model && this.car.year && this.car.price && this.car.status;
    }
  }
};
</script>
