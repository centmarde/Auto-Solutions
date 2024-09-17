<template>
  <header class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-dark': theme === 'dark', 'navbar-light': theme === 'light' }"
    :style="{ backgroundColor: theme === 'dark' ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: theme === 'light' ? '#333' : '#fff' }">
    <div class="container-fluid">
      <!-- Logo and Title Section -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="@/assets/images/logo.jpeg" alt="logo" class="logopic" height="50" />
        <h3 id="gidor" class="ms-2 mb-0">Auto Solutions</h3>
      </a>

      <!-- Hamburger Menu Button -->
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" :class="{ show: isMenuVisible }" id="navbarNav">
        <div class="ms-auto d-flex align-items-center justify-content-end w-100">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/UserInfo" class="nav-link btn wes" @click="closeMenu">{{ username }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Supra" class="nav-link btn wes" @click="closeMenu">GARAGE</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link btn wes" @click="handleLogout">LOGOUT</router-link>
            </li>
          </ul>

          <!-- Theme Toggle -->
          <div class="d-flex align-items-center ms-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'"
                @change="toggleTheme">
              <label class="form-check-label" for="themeSwitch">
                <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Links -->
    <div class="nav-links-mobile" v-show="isMenuVisible">
      <router-link to="/UserInfo" class="nav-link btn wes" @click="closeMenu">{{ username }}</router-link>
      <router-link to="/Supra" class="nav-link btn wes" @click="closeMenu">SERVICES</router-link>
      <router-link to="/" class="nav-link btn wes" @click="handleLogout">LOGOUT</router-link>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import { supabase } from '../../../lib/supabase'; // Import the configured Supabase client

export default {
    data() {
        return {
            car: {
                brand: '',
                model: '',
                year: null,
                mileage: null,
                price: null,
                description: '',
                engine: '',
                horsepower: '',
                torque: '',
                topSpeed: '',
                transmission: '',
                yearsowned: '',
            },
            carData: [],
            makesData: [],
            suggestedBrands: [],
            suggestedModels: [],
            imagePreview: null,
        };
    },
    methods: {
        async fetchCarData() {
            try {
                const response1 = await axios.get("https://raw.githubusercontent.com/centmarde/api/main/allcars.json");
                this.carData = response1.data;

                const response2 = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                this.makesData = response2.data.Results.map(item => item.MakeName); 
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        },
        async fetchModelsForMake(make) {
            try {
                const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`);
                this.suggestedModels = response.data.Results.map(model => model.Model_Name);
            } catch (error) {
                console.error(`Error fetching models for make ${make}:`, error);
            }
        },
        filterBrands() {
            const inputBrand = this.car.brand.toLowerCase();
            this.suggestedBrands = this.makesData
                .filter(brand => brand.toLowerCase().includes(inputBrand));
        },
        async selectBrand(brand) {
            this.car.brand = brand;
            this.suggestedBrands = [];
            await this.fetchModelsForMake(brand);
        },
        filterModels() {
            const inputModel = this.car.model.toLowerCase();
            this.suggestedModels = this.suggestedModels
                .filter(model => model.toLowerCase().includes(inputModel));
        },
        selectModel(model) {
            this.car.model = model;
            this.suggestedModels = [];
        },
        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async submitCarDetails() {
            if (!this.car.model || !this.car.brand || !this.car.price) {
                alert('Please fill in all required fields!');
                return;
            }
            const userId = localStorage.getItem('user_id');
            // Prepare the data to be inserted
            const carDetails = {
                brand: this.car.brand,
                model: this.car.model,
                year: this.car.year,
                mileage: this.car.mileage,
                price: this.car.price,
                description: this.car.description,
                engine: this.car.engine,
                horsepower: this.car.horsepower,
                torque: this.car.torque,
                topSpeed: this.car.topSpeed,
                transmission: this.car.transmission,
                yearsowned: this.car.yearsowned,
                forSale: true, // or false based on your requirement
                forRent: false, // or true based on your requirement
                user_id: userId // Include user_id in the data
            };

            try {
                const { data, error } = await supabase
                    .from('Car')
                    .insert([carDetails]);

                if (error) throw error;

                console.log('Car Details Submitted:', data);
                alert('Car details submitted successfully!');
            } catch (error) {
                console.error('Error submitting car details:', error);
                alert('Failed to submit car details.');
            }
        },
    },
    mounted() {
        this.fetchCarData();
    },
};
</script>


<style scoped>
.logopic {
  border-radius: 30px;
  max-width: 100px; /* Ensures logo doesn't grow too large */
}

#gidor {
  font-size: 1.2rem;
  font-family: "Merriweather", serif; 
}

@media (max-width: 992px) { /* Large tablets and small desktops */
  #gidor {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) { /* Tablets */
  .logopic {
    height: 40px; /* Smaller logo for smaller screens */
  }

  #gidor {
    font-size: 1rem; /* Smaller title for smaller screens */
  }
}

@media (max-width: 280px) { /* Mobile devices */
  .logopic {
    height: 30px; /* Even smaller logo for mobile */
  }

  #gidor {
    font-size: 0.6rem; /* Adjust title size for mobile */
  }
}

/* From Uiverse.io by biswacpcode */
.btn {
  text-decoration: none;
  font-size: 10px;
  border: none;
  background: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.btn::before {
  margin-left: auto;
}

.btn::after,
.btn::before {
  content: '';
  width: 0%;
  height: 2px;
  background: rgb(97, 40, 255);
  display: block;
  transition: 0.5s;
}

.btn:hover::after,
.btn:hover::before {
  width: 100%;
}

.nav-link {
  color: white;
  text-transform: uppercase;
}

header.navbar-light .nav-link {
  color: #333;
}
</style>
