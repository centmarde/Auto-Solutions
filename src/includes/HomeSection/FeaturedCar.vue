<template>
  <div class="container">
    <h2 id="ppo" class="text-center">Featured Cars</h2>
    <div class="row">
      <div class="col-12 col-lg-4 col-md-12 col-sm-12">
        <div class="card w-100 w-md-50 w-lg-25 mt-2 shadow-lg">
          <img src="../../assets/images/Supra.png" class="card-img-top" alt="Toyota Supra" />
          <div class="card-body">
            <h5 class="card-title">2024 Toyota GR Supra</h5>
            <p class="card-text">
              The Toyota GR Supra is a high-performance sports car known for its
              striking design and powerful engine. With exhilarating
              acceleration and precision handling, the Supra offers an
              exceptional driving experience.
            </p>
            <!-- <ul class="list-unstyled">
      <li><strong>Engine:</strong> 3.0L Inline-6 Turbo</li>
      <li><strong>Horsepower:</strong> 382 hp</li>
      <li><strong>Torque:</strong> 368 lb-ft</li>
      <li><strong>0-60 mph:</strong> 3.9 seconds</li>
      <li><strong>Top Speed:</strong> 155 mph (electronically limited)</li>
      <li><strong>Transmission:</strong> 8-speed automatic</li>
    </ul> -->
    <router-link to="/Supra" class="tr" exact>
    <button type="submit" class="lofi">
      <span>Explore More</span>
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </router-link>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-md-12 col-sm-12">
        <div class="card w-100 w-md-50 w-lg-25 mt-2 shadow-lg">
          <img src="../../assets/images/Honda_Civic.png" class="card-img-top" alt="Honda Civic" />
          <div class="card-body">
            <h5 class="card-title">2024 Honda Civic</h5>
            <p class="card-text">
              The Honda Civic is a reliable and fuel-efficient compact sedan,
              offering a perfect blend of style, performance, and practicality.
              Known for its modern design and advanced technology, the Civic is
              a top choice for daily commuters.
            </p>
            <!-- <ul class="list-unstyled">
      <li><strong>Engine:</strong> 2.0L 4-cylinder</li>
      <li><strong>Horsepower:</strong> 158 hp</li>
      <li><strong>Torque:</strong> 138 lb-ft</li>
      <li><strong>Fuel Efficiency:</strong> 31 city / 40 highway MPG</li>
      <li><strong>Transmission:</strong> CVT (Continuously Variable Transmission)</li>
      <li><strong>Top Speed:</strong> 130 mph</li>
    </ul> -->
    <router-link to="/Honda" class="tr" exact>
    <button type="submit" class="lofi">
      <span>Explore More</span>
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </router-link>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-md-12 col-sm-12">
        <div class="card w-100 w-md-50 w-lg-25 mt-2 shadow-lg">
          <img src="../../assets/images/NissanZ.png" class="card-img-top w-100" alt="Nissan Z Performance" />
          <div class="card-body">
            <h5 class="card-title">2024 Nissan Z Performance</h5>
            <p class="card-text">
              The 2024 Nissan Z Performance is a high-powered sports car with a
              rich legacy. Combining retro-inspired styling with modern
              technology, this iconic coupe offers thrilling performance and
              sharp handling for driving enthusiasts.
            </p>
            <!-- <ul class="list-unstyled">
      <li><strong>Engine:</strong> 3.0L V6 Twin-Turbo</li>
      <li><strong>Horsepower:</strong> 400 hp</li>
      <li><strong>Torque:</strong> 350 lb-ft</li>
      <li><strong>0-60 mph:</strong> 4.5 seconds</li>
      <li><strong>Top Speed:</strong> 155 mph</li>
      <li><strong>Transmission:</strong> 6-speed manual / 9-speed automatic</li>
    </ul> -->
    <router-link to="/Nissan" class="tr" exact>
    <button type="submit" class="lofi">
      <span>Explore More</span>
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style>
#ppo {
  font-family: "Merriweather", serif;
}

.lofi {
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

.tr {
  text-decoration: none;
  color: inherit; /* Ensures it takes the same color as the parent */
}


.lofihover {
  transform: scale(1.05);
  border-color: #fff9;
}

.lofi:hover .icon {
  transform: translate(4px);
}

.lofi:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.lofi::before {
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
</style>
