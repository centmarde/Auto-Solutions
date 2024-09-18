<template>
    <div>
      <section>
        <div class="bg"></div>
        <h1>Simple parallax sections</h1>
      </section>
      <section>
        <div class="bg"></div>
        <h1>Hey look, a title</h1>
      </section>
      <section>
        <div class="bg"></div>
        <h1>They just keep coming</h1>
      </section>
      <section>
        <div class="bg"></div>
        <h1>So smooth though</h1>
      </section>
      <section>
        <div class="bg"></div>
        <h1>Nice, right?</h1>
      </section>
    </div>
  </template>
  
  <script setup>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMounted } from "vue";
  
  gsap.registerPlugin(ScrollTrigger);
  
  const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);
  
  onMounted(() => {
    gsap.utils.toArray("section").forEach((section, i) => {
      const bg = section.querySelector(".bg");
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
  
      gsap.fromTo(
        bg,
        {
          backgroundPosition: () => (i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"),
        },
        {
          backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  });
  </script>
  
  <style scoped lang="scss">
  section {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  h1 {
    color: white;
    text-shadow: 1px 1px 3px black;
    z-index: 1;
    font-size: 3em;
    font-weight: 400;
  }
  </style>
  