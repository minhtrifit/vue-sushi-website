<script setup>
import { useTitle } from "../composables/useTitle";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const APP_NAME = import.meta.env.VITE_APP_NAME;

useTitle(`${APP_NAME} | Authentic Japanese Flavors`);
</script>

<template>
  <div class="main-layout">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style>
.main-layout * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body.main-layout {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
  color: var(--text-color);
}

.main-layout input,
.main-layout button {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  border: none;
  outline: none;
}

.main-layout h1,
.main-layout h2,
.main-layout h3,
.main-layout h4 {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
  font-family: var(--second-font);
}

.main-layout ul {
  list-style: none;
}

.main-layout a {
  text-decoration: none;
}

.main-layout img {
  display: block;
  max-width: 100%;
  height: auto;
}

/*=============== REUSABLE CSS CLASSES ===============*/
.container {
  max-width: 1120px;
  margin-inline: 1rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.section {
  padding-block: 5rem 1rem;
}

.section__title {
  line-height: normal;
  text-align: center;
  font-size: var(--bigger-font-size);
  margin-bottom: 1rem;
}

.section__title span:nth-of-type(2) {
  color: var(--first-color);
}

.section__subtitle {
  display: block;
  text-align: center;
  font: var(--font-semi-bold) var(--small-font-size) var(--second-font);
  color: var(--first-color);
  margin-bottom: 0.5rem;
}

.main {
  overflow: hidden;
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

/*=============== SCROLL BAR ===============*/
.main-layout::-webkit-scrollbar {
  width: 0.6rem;
  background-color: hsl(34, 32%, 75%);
}

.main-layout::-webkit-scrollbar-thumb {
  background-color: hls(34, 32%, 65%);
}

.main-layout::-webkit-scrollbar-thumb:hover {
  background-color: hsl(34, 32%, 55%);
}

/*=============== SCROLL UP ===============*/
.scrollup {
  position: fixed;
  right: 1rem;
  bottom: -50%;
  height: 34px;
  background-color: var(--body-color);
  box-shadow: 0 4px 16px hsla(0, 0%, 0%, 0.15);
  color: var(--title-color);
  display: flex;
  align-items: center;
  justify-content: center;
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
@media screen and (width >=2048px) {
  body {
    zoom: 120%;
  }
}
</style>
