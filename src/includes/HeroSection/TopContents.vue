<template>
  <div>
    <main>
      <section class="header2 text-center text-md-start position-relative">
        <img class="bg img-fluid" src="@/assets/images/Rectangle 1.png" alt="" />
        <div class="row align-items-center justify-content-center">
          <div class="col-md-9">
            <img class="car1 img-fluid" src="@/assets/images/car1.png" alt="" />
          </div>
          <div class="col-md-2">
            <h1 class="display-4">RIDE LIKE A CHAMPION</h1>
          </div>
         
        </div>
      </section>

      <div class="container-fluid">
        <article class="text-center my-5">
        <h3>
          Here at Gidor's Auto Solutions, we offer a wide selection of Toyota
          sports cars and car parts suited for you. As a trusted manufacturer
          for Toyota, our line of quality, durable, and reliable vehicles will
          address your needs and more!
        </h3>
      </article>

      <h1 class="title text-center">Sports</h1>
      
      <section id="menu" class="text-center my-5">
        <div class="cars row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/Aqua g sports.png" alt="" />
              <h3>Aqua G Sports</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/gr86.png" alt="" />
              <h3>GR86</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/hq toyota.png" alt="" />
              <h3>HQ</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/toyota gt86.png" alt="" />
              <h3>GT86</h3>
            </a>
          </div>
        </div>

        <h3 class="menu mt-5">MENU</h3>
        <hr />

        <h1 class="title text-center">Vehicle Parts</h1>
        
        <div class="parts row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/INVHS12SSTGTT.jpg" alt="" />
              <h3>INVHS12SSTGTT</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/KGNMB5745XPGC.jpeg" alt="" />
              <h3>KGNMB5745XPGC</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid ligid" src="@/assets/images/ADWYAT8J40DSB.jpeg" alt="" />
              <h3>ADWYAT8J40DSB</h3>
            </a>
          </div>
          <div class="col">
            <a>
              <img class="img-fluid" src="@/assets/images/TSUTS-1-6870T4096E.jpg" alt="" />
              <h3>TSUTS-1-6870T4096E</h3>
            </a>
          </div>
        </div>

        <h3 class="menu mt-5">MENU</h3>
      </section>
      </div>
     
    </main>
  </div>
</template>



<style>
main{
  overflow: hidden;
}
.bg {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
}


/* .header2 h1 {
  font-size: 3rem;
  font-style: italic;
  color: white;
  margin-top: 150px;
} */

.engine {
  max-width: 200px;
  margin-top: 80px;
}

.title {
  text-decoration: underline;
  margin-bottom: 80px;
}

.menu {
  background-color: rgba(159, 69, 69, 0.5);
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
}

.menu:hover {
  transform: translateY(10px) scaleY(1.1);
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: translateX(10px);
  transition: transform 0.3s ease-in-out;
}

.cars h3,
.parts h3 {
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}

.ligid {
  width: 150px;
}

</style>
