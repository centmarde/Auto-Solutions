<template>
    <div class="container my-5">
        <div class="card p-5">
            <h1 class="text-center mb-4">Sell Your Car</h1>
            <form @submit.prevent="submitCarDetails">
                <div class="row">
                    <!-- Car Image Input -->
                    <div class="col-md-6 mb-3">
                        <label for="carImage" class="form-label">Car Image</label>
                        <input type="file" class="form-control" id="carImage" @change="onImageChange" required />
                        <img v-if="imagePreview" :src="imagePreview" class="img-fluid mt-3" alt="Car Image Preview" />
                    </div>

                    <!-- Car Brand with Suggestions -->
                    <div class="col-md-6 mb-3 position-relative">
                        <label for="carBrand" class="form-label">Car Brand</label>
                        <input type="text" class="form-control" id="carBrand" v-model="car.brand" @input="filterBrands"
                            placeholder="Enter car brand" required />
                        <ul v-if="suggestedBrands.length" class="list-group position-absolute w-100"
                            style="z-index: 1000; max-height: 200px; overflow-y: auto;">
                            <li v-for="(brand, index) in suggestedBrands" :key="index" class="list-group-item"
                                @click="selectBrand(brand)">
                                {{ brand }}
                            </li>
                        </ul>
                    </div>

                    <!-- Car Model with Suggestions -->
                    <div class="col-md-6 mb-3 position-relative">
                        <label for="carModel" class="form-label">Car Model</label>
                        <input type="text" class="form-control" id="carModel" v-model="car.model" @input="filterModels"
                            placeholder="Enter car model" required />
                        <ul v-if="suggestedModels.length" class="list-group position-absolute w-100"
                            style="z-index: 1000; max-height: 200px; overflow-y: auto;">
                            <li v-for="(model, index) in suggestedModels" :key="index" class="list-group-item"
                                @click="selectModel(model)">
                                {{ model }}
                            </li>
                        </ul>
                    </div>

                    <!-- Price -->
                    <div class="col-md-6 mb-3">
                        <label for="carPrice" class="form-label">Price (PHP)</label>
                        <input type="number" class="form-control" id="carPrice" v-model="car.price"
                            placeholder="Enter price in PHP" required />
                    </div>
                    <!-- Description -->
                    <div class="col-12 mb-3">
                        <label for="carDescription" class="form-label">Description</label>
                        <textarea class="form-control" id="carDescription" v-model="car.description" rows="4"
                            placeholder="Describe your car" required></textarea>
                    </div>

                    <h5 class="text-center mb-4">Addtional Contents (Optional)</h5>

                    <!-- Year of Manufacture -->
                    <div class="col-md-6 mb-3">
                        <label for="carYear" class="form-label">Year of Manufacture</label>
                        <input type="number" class="form-control" id="carYear" v-model="car.year"
                            placeholder="Enter year (e.g. 2021)" required />
                    </div>

                    <!-- Car Specifications -->
                    <div class="col-md-6 mb-3">
                        <label for="carEngine" class="form-label">Engine</label>
                        <input type="text" class="form-control" id="carEngine" v-model="car.engine"
                            placeholder="Enter engine specifications" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="carHorsepower" class="form-label">Horsepower</label>
                        <input type="text" class="form-control" id="carHorsepower" v-model="car.horsepower"
                            placeholder="Enter horsepower" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="carTorque" class="form-label">Torque</label>
                        <input type="text" class="form-control" id="carTorque" v-model="car.torque"
                            placeholder="Enter torque" required />
                    </div>



                    <div class="col-md-6 mb-3">
                        <label for="carTopSpeed" class="form-label">Top Speed</label>
                        <input type="text" class="form-control" id="carTopSpeed" v-model="car.topSpeed"
                            placeholder="Enter top speed" required />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="carTransmission" class="form-label">Transmission</label>
                        <input type="text" class="form-control" id="carTransmission" v-model="car.transmission"
                            placeholder="Enter transmission type" required />
                    </div>


                    <!-- Mileage -->
                    <div class="col-md-6 mb-3">
                        <label for="carMileage" class="form-label">Mileage (in KM)</label>
                        <input type="number" class="form-control" id="carMileage" v-model="car.mileage"
                            placeholder="Enter mileage" required />
                    </div>


                    <div class="col-md-6 mb-3">
                        <label for="contactPhone" class="form-label">Years Owned</label>
                        <input type="tel" class="form-control" id="contactPhone" v-model="car.yearsowned"
                            placeholder="Years Owned" required />
                    </div>
                    <div class="col-md-6 bm-3 text-center mx-auto d-flex justify-content-center">
                        <router-link to="/Home" class="tr" exact>
                            <button type="button" class="lofi" style="width: 30rem;">
                                <span>Exit</span>
                                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </router-link>
                    </div>

                    <div class="col-md-6 bm-3 text-center mx-auto d-flex justify-content-center">
                        <button type="button" @click="submitCarDetails" :class="['lofi', { 'disabled': loading }]"
                            style="width: 30rem;" :disabled="loading">
                            <span v-if="loading">
                                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                                <span>Loading...</span>
                            </span>
                            <span v-else>
                                Submit
                            </span>
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                    clip-rule="evenodd"></path>
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
import { supabase } from '../../lib/supaBase';

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
            selectedImage: null,
            loading: false,
        };
    },
    methods: {
        async submitCarDetails() {
            if (!this.car.model || !this.car.brand || !this.car.price) {
                alert('Please fill in all required fields!');
                return;
            }

            this.loading = true;
            const userId = localStorage.getItem('user_id');

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
                forSale: true,
                forRent: false,
                user_id: userId,
            };

            try {

                const { data: insertData, error: insertError } = await supabase
                    .from('Car')
                    .insert([carDetails])
                    .select();

                if (insertError) throw insertError;

                console.log('Car Details Submitted:', insertData);


                if (this.selectedImage) {
                    const imageUrl = await this.imageUpload();


                    await supabase
                        .from('Car')
                        .update({ img: imageUrl })
                        .match({ id: insertData[0].id });
                }

                alert('Car details submitted successfully!');
            } catch (error) {
                console.error('Error submitting car details:', error);
                alert('Failed to submit car details.');
            } finally {
                this.loading = false;
            }
        },

        async imageUpload() {
            if (!this.selectedImage) {
                console.log('No image selected for upload.');
                return;
            }

            const fileName = `public/${Date.now()}_${this.selectedImage.name}`;
            try {

                const { data, error } = await supabase
                    .storage
                    .from('cars')
                    .upload(fileName, this.selectedImage, {
                        cacheControl: "3600",
                        upsert: true,
                    });

                if (error) throw error;

                const imageUrl = `https://xgjgtijbrkcwwsliqubk.supabase.co/storage/v1/object/public/cars/${fileName}`;
                console.log('Image uploaded successfully:', imageUrl);

                // Return the image URL for further use
                return imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image.');
            }
        },

        async fetchCarData() {
            try {
                const response1 = await axios.get("https://raw.githubusercontent.com/centmarde/carsMockdata/main/allcars.json");
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
                this.selectedImage = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    },
    mounted() {
        this.fetchCarData();
    },
};
</script>




<style lang="scss" scoped></style>