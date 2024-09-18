<template>
  <div class="card mx-4 mb-5" style="padding: 2rem;">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-8 col-md-8">
        <div class="card-body"><h3 id="ttrs">YOUR GARAGE</h3>
        <br>
        <h5>Add your car. Track its value.</h5>
        <span>Add your car to Your Garage to track its market value and cash in when the time is right to sell.</span>
       
        <div class="row">
          <div class="col d-flex justify-content-start mt-3">
            <!-- Submit Button -->
            <button type="submit" class="sski" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                <span>Loading...</span>
              </span>
              <span v-else><router-link to="/login" class="nav-link">Get-Started</router-link></span>
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

            <p class="d-flex mt-2 apol">Already have an account? <router-link to="/login" class="nav-link"><b>Log-in</b></router-link>
            </p>
    </div>
      </div>
      <div class="col-12 col-lg-4 col-md-5 col-sm-12 d-flex justify-content-center">
        <img class="ssed" src="https://www.cars.com/images/garage-landing/garage-hero.webp" alt="ssed">
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
#ttrs {
  font-family: "Merriweather", serif;
}

/* From Uiverse.io by satyamchaudharydev */
.sski {
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

.sski:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.sski:hover .icon {
  transform: translate(4px);
}

.sski:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.sski::before {
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
.ssed{
  width: 20rem;
}
@media(max-width: 360px) {
  .apol{
    font-size: 0.9rem;
  }
  .ssed{
    width: 15rem;
  }
}
</style>
