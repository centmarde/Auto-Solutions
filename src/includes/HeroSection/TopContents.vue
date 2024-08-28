<template>
  <div>
    <main>
      <section class="header2 position-relative">
        <img class="bg w-100 position-absolute top-0 start-0" src="@/assets/images/Rectangle 1.png" alt="" />
        <div class="container text-center text-md-start">
          <div class="row align-items-center">
            <div class="col-md-6">
              <img class="car1 img-fluid" src="@/assets/images/car1.png" alt="" />
            </div>
            <div class="col-md-4">
              <h1 class="display-4 text-white fst-italic">RIDE LIKE <br />A CHAMPION</h1>
            </div>
            <div class="col-md-2">
              <img class="engine img-fluid" src="@/assets/images/purepng.com-engine-motorsenginemotorsmachinemechanical-motionpneumaticmolecular-motorscar-engine-17015274910449zksw.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <article class="my-5">
        <div class="container">
          <h3 class="text-center">
            Here at Gidor's Auto Solutions, we offer a wide selection of Toyota sports cars and car parts suited for you. As a trusted manufacturer for Toyota, our line of quality, durable, and reliable vehicles will address your needs and more!
          </h3>
        </div>
      </article>
      <h1 class="title text-center text-decoration-underline mb-5">Sports</h1>
      <section id="menu">
        <div class="container">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 cars">
            <div class="col">
              <a>
                <img src="@/assets/images/Aqua g sports.png" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">Aqua G Sports</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/gr86.png" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">GR86</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/hq toyota.png" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">HQ</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/toyota gt86.png" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">GT86</h3>
              </a>
            </div>
          </div>
        </div>
        <h3 class="menu text-center my-5 py-3 bg-opacity-50 bg-danger rounded">MENU</h3>
        <hr class="mx-5 bg-danger" />
        <h1 class="title text-center text-decoration-underline mb-5">Vehicle Parts</h1>
        <div class="container">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 parts">
            <div class="col">
              <a>
                <img src="@/assets/images/INVHS12SSTGTT.jpg" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">INVHS12SSTGTT</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/KGNMB5745XPGC.jpeg" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">KGNMB5745XPGC</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/ADWYAT8J40DSB.jpeg" alt="" class="ligid img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">ADWYAT8J40DSB</h3>
              </a>
            </div>
            <div class="col">
              <a>
                <img src="@/assets/images/TSUTS-1-6870T4096E.jpg" alt="" class="img-fluid" />
                <h3 class="text-center text-decoration-underline fw-bold mt-3">TSUTS-1-6870T4096E</h3>
              </a>
            </div>
          </div>
        </div>
        <h3 class="menu text-center my-5 py-3 bg-opacity-50 bg-danger rounded">MENU</h3>
      </section>
    </main>
  </div>
</template>


<style>
.bg {
  z-index: -1;
  position: absolute;
  width: 100%;
  margin: -8px;
  margin-right: -10px;
  margin-top: -20px;
}

.car1 {
  max-width: 550px;
  margin-top: 100px;
  margin-left: 150px;
}

.header2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.header2 h1 {
  font-size: 50px;
  font-style: italic;
  color: white;
  margin-top: 150px;
  margin-left: 40px;
}

.engine {
  max-width: 200px;
  margin-top: 80px;
}

article {
  width: 100%;
  display: flex;
  justify-content: center;
}

article h3 {
  width: 50%;
  font-family: "Segoe UI";
  font-style: normal;
}

.title {
  text-align: center;
  text-decoration: underline;
  margin-bottom: 80px;
}

.cars,
.parts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: baseline;
  justify-items: baseline;
  gap: 80px;
}

.cars img,
.parts img {
  max-width: 200px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cars h3,
.parts h3 {
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
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
  animation-delay: 5s;
}

hr {
  width: 100%;
  background-color: rgb(137, 36, 36);
}

.ligid {
  width: 150px;
}

img:hover {
  transform: translateX(10px);
  transition: transform 0.3s ease-in-out;
  animation-delay: 5s;
}

main a h3:hover {
  transform: translateX(10px);
  transition: transform 0.3s ease-in-out;
  animation-delay: 5s;
}
</style>
