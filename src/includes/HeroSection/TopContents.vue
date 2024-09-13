<template>
  <div>
    <section id="home">
      <section id="index" class="lottie-container">
        <div class="animation"></div>
      </section>
      <section class="gradient"></section>
      <div class="end-lottie"></div> <!-- Moved end-lottie here -->
    </section>

    
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const lottieContainers = document.querySelectorAll(".animation");

  lottieContainers.forEach(container => {
    LottieScrollTrigger({
      trigger: container,
      start: "top top",
      endTrigger: ".end-lottie",
      end: `bottom center += ${container.offsetHeight}`,
      renderer: "svg",
      target: container,
      path: "/param.json", // Path adjusted
      scrub: 0.5, // Adjust scrub for smoother animation
      fps: 60, // Request high FPS for smoother animation
    });
  });
});

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
    st = {
      trigger: vars.trigger || ".trigger",
      end: speeds[vars.speed] || "+=1300",
      scrub: vars.scrub || 1,
      markers: false,
    },
    ctx = gsap.context && gsap.context(),
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

  for (let p in vars) {
    st[p] = vars[p];
  }

  animation.addEventListener("DOMLoaded", function () {
    let createTween = function () {
      animation.frameTween = gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st,
      });
      return () => animation.destroy && animation.destroy();
    };
    ctx && ctx.add ? ctx.add(createTween) : createTween();
  });

  return animation;
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

#index {
  width: 100%;
  height: 800vh;
  background-color: #151515;
}

.lottie-container {
  position: fixed;
  width: 100vw;
  height: 5vh;
  top: 0;
  z-index: -1;
  filter: saturation(2);
}

.gradient {
  width: 100vw;
  height: 300vh;
  position: relative;
  background: linear-gradient(180deg, rgba(21, 21, 21, 0) 0%, rgba(21, 21, 21, 1) 100%);
  z-index: 1;
}


.end-lottie {
  position: relative; /* Changed to relative */
  width: 100%;
  height: 5px; /* Keeps it minimal */
  top: 0; /* Ensures it aligns after the gradient */
}
.animation{
  height: 100vh;
}

@media (max-width: 768px) {
  .animation {
    height: 100vh;
    position: absolute;
  }
}


</style>
