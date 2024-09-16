<template>
    <div class="container my-5">
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
                    <ul v-if="suggestedBrands.length" class="list-group position-absolute w-100" style="z-index: 1000;">
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
                    <ul v-if="suggestedModels.length" class="list-group position-absolute w-100" style="z-index: 1000;">
                        <li v-for="(model, index) in suggestedModels" :key="index" class="list-group-item"
                            @click="selectModel(model)">
                            {{ model }}
                        </li>
                    </ul>
                </div>

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
                    <label for="car0to60" class="form-label">0-60 mph</label>
                    <input type="text" class="form-control" id="car0to60" v-model="car.zeroToSixty"
                        placeholder="Enter 0-60 mph time" required />
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

                <!-- Contact Information -->
                <div class="col-md-6 mb-3">
                    <label for="contactName" class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="contactName" v-model="car.contactName"
                        placeholder="Enter your name" required />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="contactEmail" class="form-label">Your Email</label>
                    <input type="email" class="form-control" id="contactEmail" v-model="car.contactEmail"
                        placeholder="Enter your email" required />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="contactPhone" class="form-label">Your Phone</label>
                    <input type="tel" class="form-control" id="contactPhone" v-model="car.contactPhone"
                        placeholder="Enter your phone number" required />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="contactPhone" class="form-label">Years Owned</label>
                    <input type="tel" class="form-control" id="contactPhone" v-model="car.yearsowned"
                        placeholder="Years Owned" required />
                </div>




                <div class="col-md-6 bm-3 text-center mx-auto d-flex justify-content-center">
                    <router-link to="/Home" class="tr" exact >
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
                    <router-link to="/Supra" class="tr" exact >
                        <button type="submit" class="lofi" style="width: 30rem;">
                            <span>Submit</span>
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
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
                contactName: '',
                contactEmail: '',
                contactPhone: '',
                engine: '',
                horsepower: '',
                torque: '',
                zeroToSixty: '',
                topSpeed: '',
                transmission: '',
                yearsowned: '',
            },
            carData: [],
            suggestedBrands: [],
            suggestedModels: [],
            imagePreview: null,
        };
    },
    methods: {
        async fetchCarData() {
            const response = await fetch("https://raw.githubusercontent.com/centmarde/api/main/allcars.json");
            this.carData = await response.json();
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
        filterBrands() {
            const inputBrand = this.car.brand.toLowerCase();
            this.suggestedBrands = this.carData
                .map(car => car.Brand)
                .filter((brand, index, self) => self.indexOf(brand) === index && brand.toLowerCase().includes(inputBrand));
        },
        filterModels() {
            const inputModel = this.car.model.toLowerCase();
            this.suggestedModels = this.carData
                .filter(car => car.Brand.toLowerCase() === this.car.brand.toLowerCase())
                .map(car => car.Model)
                .filter(model => model.toLowerCase().includes(inputModel));
        },
        selectBrand(brand) {
            this.car.brand = brand;
            this.suggestedBrands = [];
        },
        selectModel(model) {
            this.car.model = model;
            this.suggestedModels = [];
        },
        submitCarDetails() {
            if (!this.car.model || !this.car.brand || !this.car.price) {
                alert('Please fill in all required fields!');
                return;
            }
            console.log('Car Details Submitted:', this.car);
            alert('Car details submitted successfully!');
        },
    },
    mounted() {
        this.fetchCarData();
    },
};
</script>


<style lang="scss" scoped></style>