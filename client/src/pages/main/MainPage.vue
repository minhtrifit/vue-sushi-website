<script setup>
import { useScrollUp } from "@/composables/useScrollUp";
import { useScrollActive } from "@/composables/useScrollActive";
import Header from "@/components/Header.vue";
import AboutSection from "./components/AboutSection.vue";
import HomeSection from "./components/HomeSection.vue";
import MenuSection from "./components/MenuSection.vue";
import NewSection from "./components/NewSection.vue";
import ContactSection from "./components/ContactSection.vue";
import Footer from "@/components/Footer.vue";

useScrollUp();
useScrollActive();
</script>

<template>
  <Header />
  <main class="main">
    <HomeSection />
    <AboutSection />
    <MenuSection />
    <NewSection />
    <ContactSection />
  </main>
  <Footer />

  <!--========== SCROLL UP ==========-->
  <a href="#" class="scrollup" id="scroll-up">
    <i class="ri-arrow-up-line"></i>
  </a>
</template>

<style>
/*=============== BASE ===============*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body,
input,
button {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
}

body {
  background-color: var(--body-color);
  color: var(--text-color);
}

input,
button {
  border: none;
  outline: none;
}

h1,
h2,
h3,
h4 {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
  font-family: var(--second-font);
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

/*=============== SCROLL BAR ===============*/
::-webkit-scrollbar {
  width: 0.6rem;
  background-color: hsl(34, 32%, 75%);
}

::-webkit-scrollbar-thumb {
  background-color: hls(34, 32%, 65%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(34, 32%, 55%);
}

/*=============== SCROLL UP ===============*/
.scrollup {
  position: fixed;
  right: 1rem;
  bottom: -50%;
  background-color: var(--body-color);
  box-shadow: 0 4px 16px hsla(0, 0%, 0%, 0.15);
  color: var(--title-color);
  display: inline-flex;
  padding: 6px;
  font-size: 1.25rem;
  border-radius: 0.25rem;
  z-index: var(--z-tooltip);
  transition:
    bottom 0.4s,
    transform 0.4s;
}

.scrollup:hover {
  transform: translateY(-0.5rem);
}

/* Show Scroll Up */
.show-scroll {
  bottom: 3rem;
}

/*=============== BUTTON ===============*/
.button {
  display: inline-flex;
  background-color: var(--first-color);
  color: var(--white-color);
  font-weight: var(--font-semi-bold);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition:
    background-color 0.4s,
    box-shadow 0.4s;
}

.button:hover {
  background-color: var(--first-color-alt);
  box-shadow: 0 8px 24px hsla(358, 54%, 24%, 0.3);
}

/*=============== BREAKPOINTS ===============*/
/* For large devices <> */
@media screen and (width >= 1150px) {
  .container {
    margin-inline: auto;
  }

  .section {
    padding-block: 7rem 5rem;
  }

  .section__title {
    font-size: var(--biggest-font-size);
  }

  .section__subtitle {
    font-size: var(--h3-font-size);
  }

  .scrollup {
    right: 3rem;
  }
}

/* For 2K resolutions <> */
@media screen and(width >=2048px) {
  body {
    zoom: 120%;
  }
}
</style>
