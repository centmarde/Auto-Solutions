<template>
  <div class="container">
    <div class="row justify-content-center">
      <form @submit.prevent="submitForm" ref="form_register" class="card shadow-md mb-2 wrap-form p-4 col-lg-8 col-md-10">
        <!-- Personal Details -->
        <h5 class="text-start mt-2 mb-3">SIGN-UP</h5>
        <div class="row mb-3">
          <!-- Name Fields -->
          <div class="col-md-3 mb-2">
            <input type="text" class="form-control" placeholder="Firstname" v-model="firstname" required />
          </div>
          <div class="col-md-3 mb-2">
            <input type="text" class="form-control" placeholder="Middlename" v-model="middlename" required />
          </div>
          <div class="col-md-3 mb-2">
            <input type="text" class="form-control" placeholder="Lastname" v-model="lastname" required />
          </div>
          <div class="col-md-3 mb-2">
            <input type="text" class="form-control" placeholder="Extension Name (Optional)" v-model="extensionname" />
          </div>
        </div>

        <!-- Username and Gender -->
        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="User Name" v-model="username" required />
          </div>
          <div class="col-md-6 mb-2">
            <select v-model="gender" class="form-select">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <!-- Birthdate -->
        <div class="row mb-3">
          <div class="col-md-12">
            <p class="text-start mb-2">Birthdate</p>
            <input type="date" class="form-control" v-model="birthdate" required />
          </div>
        </div>

        <!-- Password -->
        <div class="row mb-3">
          <div class="col-md-4 mb-2">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required />
          </div>
          <div class="col-md-4 mb-2">
            <input type="password" class="form-control" placeholder="Password" v-model="password" required />
          </div>
          <div class="col-md-4 mb-2">
            <input type="password" class="form-control" placeholder="Password Confirmation" v-model="passwordConfirm" required />
          </div>
        </div>

        <hr />

        <!-- Address -->
        <h4 class="text-start mt-2 mb-3">Address</h4>
        <div class="row mb-3">
          <!-- Region Dropdown -->
          <div class="col-md-3 mb-2">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="regionDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedRegionName || 'Region' }}
              </button>
              <ul class="dropdown-menu w-100" aria-labelledby="regionDropdownButton" id="regionDropdown" style="max-height: 200px; overflow-y: auto">
                <li v-for="region in regions" :key="region.code">
                  <a class="dropdown-item" @click="selectRegion(region)">{{ region.name }}</a>
                </li>
              </ul>
              <input type="hidden" v-model="selectedRegionCode" required />
            </div>
          </div>
          <!-- Province Dropdown -->
          <div class="col-md-3 mb-2">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="provinceDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedProvinceName || 'Province' }}
              </button>
              <ul class="dropdown-menu w-100" aria-labelledby="provinceDropdownButton" id="provinceDropdown" style="max-height: 200px; overflow-y: auto">
                <li v-for="province in provinces" :key="province.code">
                  <a class="dropdown-item" @click="selectProvince(province)">{{ province.name }}</a>
                </li>
              </ul>
              <input type="hidden" v-model="selectedProvinceCode" required />
            </div>
          </div>
          <!-- City Dropdown -->
          <div class="col-md-3 mb-2">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="cityDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedCityName || 'City' }}
              </button>
              <ul class="dropdown-menu w-100" aria-labelledby="cityDropdownButton" id="cityDropdown" style="max-height: 200px; overflow-y: auto">
                <li v-for="city in cities" :key="city.code">
                  <a class="dropdown-item" @click="selectCity(city)">{{ city.name }}</a>
                </li>
              </ul>
              <input type="hidden" v-model="selectedCityCode" required />
            </div>
          </div>
          <!-- Barangay Dropdown -->
          <div class="col-md-3 mb-2">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="barangayDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedBarangayName || 'Barangay' }}
              </button>
              <ul class="dropdown-menu w-100" aria-labelledby="barangayDropdownButton" id="barangayDropdown" style="max-height: 200px; overflow-y: auto">
                <li v-for="barangay in barangays" :key="barangay.code">
                  <a class="dropdown-item" @click="selectBarangay(barangay)">{{ barangay.name }}</a>
                </li>
              </ul>
              <input type="hidden" v-model="selectedBarangayCode" required />
            </div>
          </div>
        </div>

        <!-- Submit and Login Buttons -->
        <div class="row mb-3">
          <div class="col-md-12 d-flex justify-content-center">
            <!-- Submit Button -->
            <button type="submit" id="submitBtn" class="sski mx-3" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                <span>Loading...</span>
              </span>
              <span v-else>Submit</span>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <!-- Login Button -->
            <button type="button" id="loginBtn" class="sski mx-3">
              <router-link to="/login" class="nav-link">Log-In</router-link>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { supabase } from '../lib/supaBase'; // Adjust the import based on your project structure

export default {
  data() {
    return {
      firstname: '',
      middlename: '',
      lastname: '',
      extensionname: '',
      username: '',
      gender: '',
      email: '',
      birthdate: '',
      password: '',
      passwordConfirm: '',
      regions: [],
      selectedRegionCode: '',
      selectedRegionName: '',
      provinces: [],
      selectedProvinceCode: '',
      selectedProvinceName: '',
      cities: [],
      selectedCityCode: '',
      selectedCityName: '',
      barangays: [],
      selectedBarangayCode: '',
      selectedBarangayName: '',
      isSubmitting: false,
    };
  },
  methods: {
    async fetchRegions() {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/regions/');
        this.regions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchProvinces(regionCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/provinces/');
        this.provinces = response.data.filter(province => province.regionCode === regionCode);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCities(provinceCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/cities/');
        this.cities = response.data.filter(city => city.provinceCode === provinceCode);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchBarangays(cityCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/barangays/');
        this.barangays = response.data.filter(barangay => barangay.cityCode === cityCode);
      } catch (error) {
        console.error(error);
      }
    },
    selectRegion(region) {
      this.selectedRegionCode = region.code;
      this.selectedRegionName = region.name;
      this.fetchProvinces(this.selectedRegionCode);
    },
    selectProvince(province) {
      this.selectedProvinceCode = province.code;
      this.selectedProvinceName = province.name;
      this.fetchCities(this.selectedProvinceCode);
    },
    selectCity(city) {
      this.selectedCityCode = city.code;
      this.selectedCityName = city.name;
      this.fetchBarangays(this.selectedCityCode);
    },
    selectBarangay(barangay) {
      this.selectedBarangayCode = barangay.code;
      this.selectedBarangayName = barangay.name;
    },
    async submitForm() {
      if (!this.firstname || !this.lastname || !this.username || !this.gender || !this.email || !this.password || !this.passwordConfirm || !this.birthdate || !this.selectedRegionCode || !this.selectedProvinceCode || !this.selectedCityCode || !this.selectedBarangayCode) {
        alert('Please fill out all required fields.');
        return;
      }

      if (this.password !== this.passwordConfirm) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      this.isSubmitting = true;

      try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (signUpError) {
          console.error('Error signing up:', signUpError.message);
          alert('An error occurred during sign-up. Please try again.');
          return;
        }

        const user_id = signUpData?.user?.id;

        if (user_id) {
          const address = `${this.selectedBarangayName}, ${this.selectedCityName}, ${this.selectedProvinceName}, ${this.selectedRegionName}`;
          const additionalUserData = {
            firstname: this.firstname,
            middlename: this.middlename,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            gender: this.gender,
            birthdate: this.birthdate,
            auth_id: user_id,
            address: address,
            password: this.password,
          };

          try {
            const { data, error } = await supabase
              .from('User')
              .insert([additionalUserData])
              .select();

            if (error) {
              console.error('Error inserting additional data:', error.message);
              alert(`Error: ${error.message}`);
            } else {
              const supa_id = data[0]?.id;
              await this.fetchUserData(supa_id, this.email, this.firstname, this.middlename, this.lastname, this.username, this.gender, this.birthdate, address, this.password);
              alert('Register Successfully, please verify your email. <a href="./login.html">Click Here!</a>');
              console.log(data);
            }
          } catch (error) {
            console.error('Unexpected error:', error.message);
            alert(`Error: ${error.message}`);
          } finally {
            this.$refs.form_register.reset();
            this.isSubmitting = false;
          }
        } else {
          console.error('User ID is null');
          alert('Error: User ID is null');
        }
      } catch (error) {
        console.error('Error submitting form:', error.message);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    async fetchUserData(supa_id, email, firstname, middlename, lastname, username, gender, birthdate, address, password) {
      try {
        const response = await axios.post('http://localhost:3001/User', {supa_id, email, firstname, middlename, lastname, username, gender, birthdate, address, password });
        console.log('User data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    },
  },
  mounted() {
    this.fetchRegions();
  },
};
</script>

<style scoped>
.container-fluid {
  background: var(--background-light);
  height: 100vh;
}

.wrap-form {
  background: var(--card-bg-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.input-box .form-control,
.input-box .form-select {
  border-radius: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-link {
  color: var(--primary-color);
}

.spinner-border {
  border-color: var(--primary-color);
}

@media (max-width: 767.98px) {
  .wrap-form {
    padding: 2rem;
  }
}
</style>

