<template>
  <div class="container-fluid mb-3">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-7"> <!-- Image takes up more space -->
              <img v-if="car.img" :src="car.img" alt="Car Image" class="card-img"/>
            </div>
            <div class="col-md-5"> <!-- Details take up less space -->
              <div class="card-body">
                <h1 class="card-title">{{ car.brand }} {{ car.model }}</h1>
                <ul class="list-unstyled">
                  <li v-for="(value, key) in carDetails" :key="key" class="car-detail-item">
                    <strong>{{ key }}:</strong> {{ value }}
                  </li>
                  <li v-if="user.mobile_no" class="car-detail-item">
                    <strong>Contact:</strong> {{ user.mobile_no }}
                  </li>
                 
                </ul>
                <div v-if="user.username" class="car-detail-item d-flex justify-content-end">
                <div class="my-2 mx-2">  {{ user.username }} </div>
                    <img :src="user.img" alt="User Image" class="user-img"/>
                  </div>
                  <hr>
              </div>
              <div class="col-md-6 bm-3 text-center mx-auto mb-4 d-flex justify-content-center">
                        <router-link to="/Home" class="tr mx-3" exact>
                            <button type="button" class="lofi">
                                <span>Exit</span>
                                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </router-link>
                        <router-link to="/Home" class="tr mx-3" exact>
                            <button type="button" class="lofi">
                                <span>Interested</span>
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
      </div>
      
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supaBase';
import gsap from 'gsap';

export default {
  name: 'CarDetails',
  data() {
    return {
      car: {},
      user: {}
    };
  },
  computed: {
    carDetails() {
      return {
        Year: this.car.year,
        Price: `php${this.car.price}`,
        Description: this.car.description,
        Mileage: this.car.mileage,
        Engine: this.car.engine,
        Horsepower: `${this.car.horsepower} HP`,
        Torque: `${this.car.torque} Nm`,
        TopSpeed: `${this.car.topSpeed} km/h`,
        Transmission: this.car.transmission,
        YearsOwned: this.car.yearsowned
      };
    }
  },
  async mounted() {
    const carId = this.$route.params.id;
    await this.fetchCarDetails(carId);

    // GSAP animation
    gsap.from('.car-detail-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1
    });
  },
  methods: {
    async fetchCarDetails(id) {
      try {
        const { data, error } = await supabase
          .from('Car')
          .select('*, User(username, mobile_no, img)')
          .eq('id', id)
          .single();

        if (error) throw error;

        this.car = data;
        this.user = data.User;
      } catch (err) {
        console.error('Error fetching car details:', err.message);
      }
    }
  }
};
</script>

<style scoped>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 2rem;
  font-weight: bold;
}

ul.list-unstyled {
  padding-left: 0;
}

.car-detail-item {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.user-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
