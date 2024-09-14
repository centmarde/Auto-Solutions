<template>
   <section id="sellcar23">
    <div id="xrt23" class="card-body">
       <div class="row">
            <div class="col-12 col-lg-7 col-md-6 col-sm-5"><h3 id="title">SELL YOUR CAR
            </h3>
            <div class="d-flex"> <img class="erd3 me-2" src="https://www.cars.com/images/sell/explore-ready-go.png"  alt="">
                <span>Get an offer online and quickly complete the transaction with a local dealer.</span></div>
           
    <hr>
    <div class="d-flex"> <img class="erd3 me-2" src="https://www.cars.com/images/sell/explore-enter-details.png"  alt="">
        <span>List your car for free. Set your own price and easily showcase your car on Auto-Solutions.</span></div>
    
           </div>
            <div class="col-12 col-lg-5 col-md-6 col-sm-5">
                    <div id="sts4" style="top: 20%; right: 10%; position: relative;"> <img src="https://www.cars.com/images/sell/sale-dealer-woman-brand-colors.png" style="width: 15rem;"></div>
                   
            </div>
       </div>
    </div>

    <div class="row">
          <div class="col d-flex justify-content-center my-2">
            <!-- Submit Button -->
            <button type="submit" class="btnn32" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                <span>Loading...</span>
              </span>
              <span v-else><router-link to="/Register" class="nav-link">Get-Started</router-link></span>
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

   </section>
    
</template>

<style>
#xrt23{
overflow: hidden;
}
#title{
    font-family: "Merriweather", serif;
}

@media (max-width: 800px) and (min-width: 350px) {
#sts4 {
     top: 50%;
     left: 25%;
     margin-bottom: 2rem;
}
}
.erd3{
        width: 5rem;
}
@media (max-width: 999px) and (min-width: 350px) {
.erd3 {
    width: 3rem;
    height: 3rem;
}
}

/* From Uiverse.io by satyamchaudharydev */
.btnn32{
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0 107 179);
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

.btnn32hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.btnn32:hover .icon {
  transform: translate(4px);
}

.btnn32:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.btnn32::before {
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
</style>