<template>
  <section id="CarSale">
    <div class="container mt-5">
      <h2>Select Brand</h2>

      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-6">
            <!-- Brand Selection Dropdown -->
            <div class="mb-3">
              <label class="form-label" for="brand">Brand</label>
              <select
                id="brand"
                class="form-select"
                v-model="selectedMake"
                @change="filterModels"
              >
                <option value="" disabled>Select a brand</option>
                <option v-for="make in uniqueMakes" :key="make" :value="make">
                  {{ make }}
                </option>
              </select>
            </div>

            <!-- Model Selection Dropdown -->
            <div class="mb-3" v-if="selectedMake">
              <label class="form-label" for="model">Model</label>
              <select
                id="model"
                class="form-select"
                v-model="selectedModel"
                @change="showCarImage"
              >
                <option value="" disabled>Select a model</option>
                <option
                  v-for="model in filteredModels"
                  :key="model.Model"
                  :value="model.Model"
                >
                  {{ model.Model }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                :placeholder="
                  selectedCar
                    ? selectedCar.Description
                    : 'Car Description'
                "
              ></textarea>
            </div>
          </div>

          <div class="col">
            <!-- Display Car Image and Details -->
            <div v-if="selectedCar" class="card mt-3">
              <div class="card-body text-center">
                <h5 class="card-title">
                  {{ selectedCar.Brand }} {{ selectedCar.Model }} ({{
                    selectedCar.yearModel
                  }})
                </h5>
                <img
                  :src="selectedCar.ImageURL"
                  :alt="selectedCar.Model"
                  class="img-fluid my-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col d-flex justify-content-center mt-3">
            <!-- Submit Button -->
            <button type="submit" class="btnn" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                <span>Loading...</span>
              </span>
              <span v-else>Show Matches {{ $count }}</span>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { supabase } from "../../lib/supaBase";
import axios from "axios";

export default {
  data() {
    return {
      cars: [], // Holds the fetched car data
      selectedMake: "",
      selectedModel: "",
      selectedCar: null,
      uniqueMakes: [], // Unique car makes for dropdown
      filteredModels: [], // Filtered models based on selected make
      yearsOwned: "",
      description: "",
      isSubmitting: false,
      isDataFetched: false, // Flag to check if data has been fetched
    };
  },
  async mounted() {
    if (!this.isDataFetched) {
      await this.fetchCarData();
    }
  },
  methods: {
    GoBack() {
      this.$router.push("/Home");
    },
    async fetchCarData() {
      try {
        const response = await axios.get(
          "https://centmarde.github.io/carsMockdata/allcars.json"
        );
        this.cars = response.data;
        this.uniqueMakes = [...new Set(this.cars.map((car) => car.Brand))];
        this.isDataFetched = true; // Set flag to true after data is fetched
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    },
    filterModels() {
      this.filteredModels = this.cars.filter(
        (car) => car.Brand === this.selectedMake
      );
      this.selectedModel = "";
      this.selectedCar = null;
    },
    showCarImage() {
      this.selectedCar = this.cars.find(
        (car) =>
          car.Brand === this.selectedMake && car.Model === this.selectedModel
      );
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        const userId = localStorage.getItem("user_id");

        const { data: supabaseData, error: supabaseError } = await supabase
          .from("Car_owned")
          .insert([
            {
              brand: this.selectedMake,
              model: this.selectedModel,
              years_owned: this.yearsOwned,
              description: this.description,
              user_id: userId,
            },
          ])
          .select();
        if (supabaseError) throw supabaseError;

        const response = await axios.post("http://localhost:3001/submitForm", {
          brand: this.selectedMake,
          model: this.selectedModel,
          years_owned: this.yearsOwned,
          description: this.description,
          user_id: userId,
        });

        if (response.data.error) throw new Error(response.data.error);
        alert("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
  max-width: 100%;
  margin: auto;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}

/* From Uiverse.io by satyamchaudharydev */
.btnn {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(97, 40, 255);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.btnn:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.btnn:hover .icon {
  transform: translate(4px);
}

.btnn:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.btnn::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
#CarSale{
  overflow: hidden;
  padding: 1rem;
}
</style>
