<template>
  <div class="container-fluid backgrounds">
    <div class="row">
      <!-- Empty column for the image -->
      <div class="col-lg-6 col-md-4 col-sm-12">
        <img id="img_work" src="#" alt="Description of the image" class="img-fluid" />
      </div>

      <!-- Form section on the right side -->
      <div class="col-lg-6 col-md-8 col-sm-12">
        <form @submit.prevent="submitForm" ref="form_register" class="wrap-form text-center p-3 m-3">
          <h1>Sign-up</h1>
          <hr />
          <h4 class="text-start mt-2 mb-3">Personal Details</h4>
          <div class="input-box d-flex">
            <input class="me-1" type="text" placeholder="Firstname" v-model="firstname" required />
            <input class="mx-1" type="text" placeholder="Middlename" v-model="middlename" required />
            <input class="mx-1" type="text" placeholder="Lastname" v-model="lastname" required />
            <input class="me-1" type="text" placeholder="Extension Name (Optional)" v-model="extensionname" />
          </div>
          <div class="input-box">
            <input type="text" placeholder="User Name" v-model="username" required />
            <select v-model="gender" class="btn btn-success dropdown-toggle">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <p class="me-2 mt-4">Birthdate</p>
            <input type="date" v-model="birthdate" required />
          </div>
          <hr />
          <h4 class="text-start mt-2 mb-3">Password</h4>
          <div class="input-box">
            <input type="email" placeholder="email" v-model="email" required />
            <input type="password" placeholder="Password" v-model="password" required />
            <input type="password" placeholder="Password Confirmation" v-model="passwordConfirm" required />
          </div>
          <hr />
          <h4 class="text-start mt-2 mb-3">Address</h4>
          <div class="row">
            <!-- Region Dropdown -->
            <div class="col-md-3 mb-3">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="regionDropdownButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedRegionName || 'Region' }}
                </button>
                <ul class="dropdown-menu w-100" aria-labelledby="regionDropdownButton" id="regionDropdown"
                  style="max-height: 200px; overflow-y: auto">
                  <li v-for="region in regions" :key="region.code">
                    <a class="dropdown-item" @click="selectRegion(region)">{{ region.name }}</a>
                  </li>
                </ul>
                <input type="hidden" v-model="selectedRegionCode" required />
              </div>
            </div>
            <!-- Province Dropdown -->
            <div class="col-md-3 mb-3">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="provinceDropdownButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedProvinceName || 'Province' }}
                </button>
                <ul class="dropdown-menu w-100" aria-labelledby="provinceDropdownButton" id="provinceDropdown"
                  style="max-height: 200px; overflow-y: auto">
                  <li v-for="province in provinces" :key="province.code">
                    <a class="dropdown-item" @click="selectProvince(province)">{{ province.name }}</a>
                  </li>
                </ul>
                <input type="hidden" v-model="selectedProvinceCode" required />
              </div>
            </div>
            <!-- City Dropdown -->
            <div class="col-md-3 mb-3">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="cityDropdownButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedCityName || 'City' }}
                </button>
                <ul class="dropdown-menu w-100" aria-labelledby="cityDropdownButton" id="cityDropdown"
                  style="max-height: 200px; overflow-y: auto">
                  <li v-for="city in cities" :key="city.code">
                    <a class="dropdown-item" @click="selectCity(city)">{{ city.name }}</a>
                  </li>
                </ul>
                <input type="hidden" v-model="selectedCityCode" required />
              </div>
            </div>
            <!-- Barangay Dropdown -->
            <div class="col-md-3 mb-3">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="barangayDropdownButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedBarangayName || 'Barangay' }}
                </button>
                <ul class="dropdown-menu w-100" aria-labelledby="barangayDropdownButton" id="barangayDropdown"
                  style="max-height: 200px; overflow-y: auto">
                  <li v-for="barangay in barangays" :key="barangay.code">
                    <a class="dropdown-item" @click="selectBarangay(barangay)">{{ barangay.name }}</a>
                  </li>
                </ul>
                <input type="hidden" v-model="selectedBarangayCode" required />
              </div>
            </div>
          </div>
          <button type="submit" id="submitBtn" class="bttn">Submit</button>
          <button type="button" class="bttn">
            <router-link to="/login" class="btn-link">Log-in</router-link>
          </button>
        </form>
      </div>
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

      // Disable submit button during submission
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting...';

      try {
        // Sign up the user with email and password
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (signUpError) {
          console.error('Error signing up:', signUpError.message);
          alert('An error occurred during sign-up. Please try again.');
          return;
        }

        console.log('User signed up:', signUpData);

        const user_id = signUpData?.user?.id;

        if (user_id) {
          // Inserting additional user details into the 'User' table
          const additionalUserData = {
            firstname: this.firstname,
            middlename: this.middlename,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            gender: this.gender,
            birthdate: this.birthdate,
            auth_id: user_id, // Supabase user ID
            address: `${this.selectedBarangayName}, ${this.selectedCityName}, ${this.selectedProvinceName}, ${this.selectedRegionName}`,
          };

          try {
            // Insert the data into the 'User' table
            const { data, error } = await supabase
              .from('User')
              .insert([additionalUserData])
              .select();

            if (error) {
              console.error('Error inserting additional data:', error.message);
              alert(`Error: ${error.message}`);
            } else {
              const supa_id = data[0]?.id; // Get the ID from the inserted data

              // Fetch the id and email from the server
              await this.fetchUserData(supa_id, this.email);

              alert('Register Successfully, please verify your email. <a href="./login.html">Click Here!</a>');
              console.log(data);
            }
          } catch (error) {
            console.error('Unexpected error:', error.message);
            alert(`Error: ${error.message}`);
          } finally {
            this.$refs.form_register.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = 'Register';
          }
        } else {
          console.error('User ID is null');
          alert('Error: User ID is null');
        }

      } catch (error) {
        console.error('Error submitting form:', error.message);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit';
      }
    },
    async fetchUserData(supa_id, email) {
      try {
        const response = await axios.post('http://localhost:3001/User', { id: supa_id, email }); // Send the id and email
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
/* Your existing styles here */
</style>
