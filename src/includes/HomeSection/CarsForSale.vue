<template>
  <div class="cars-for-sale container">
    <h1 class="my-4">Cars for Sale</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error alert alert-danger">{{ error }}</div>
    <div v-if="cars.length === 0" class="no-cars alert alert-warning">No cars available for sale.</div>
    
    <div class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-6 mb-4">
        <div class="card">
          <img v-if="car.img" :src="car.img" alt="Car Image" class="card-img-top"/>
          <div class="card-body">
            <h2 class="card-title">{{ car.brand }} {{ car.model }}</h2>
            <ul class="list-unstyled">
              <li><strong>Year:</strong> {{ car.year }}</li>
              <li><strong>Price:</strong> php{{ car.price }}</li>
              <li><strong>Description:</strong> {{ car.description }}</li>
              <li><strong>Years Owned:</strong> {{ car.yearsowned }}</li>
              <li><strong>Posted By:</strong> {{ car.User.username }}</li>
              <li><strong>Location:</strong> {{ car.User.address }}</li>
            </ul>
          </div>
          <router-link :to="{ name: 'CarDetails', params: { id: car.id } }" class="koy d-flex justify-content-center my-2" exact>
            <button type="button" class="lofi" style="width: 30rem;">
              <span>More Information</span>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supaBase';

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
            User(*)  // Join with User table to fetch user name
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
.koy{
  text-decoration: none;
}
.card-img-top {
  width: 100%;        
  height: 300px;     
  object-fit: cover;  
}

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
