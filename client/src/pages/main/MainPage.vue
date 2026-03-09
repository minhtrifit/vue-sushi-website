<script setup>
import { useScrollUp } from "@/composables/useScrollUp";
import { useScrollActive } from "@/composables/useScrollActive";
import AboutSection from "./components/AboutSection.vue";
import HomeSection from "./components/HomeSection.vue";
import MenuSection from "./components/MenuSection.vue";
import NewSection from "./components/NewSection.vue";
import ContactSection from "./components/ContactSection.vue";

useScrollUp();
useScrollActive();
</script>

<template>
  <main class="main">
    <HomeSection />
    <AboutSection />
    <MenuSection />
    <NewSection />
    <ContactSection />
  </main>

  <!--========== SCROLL UP ==========-->
  <a href="#" class="scrollup" id="scroll-up">
    <i class="ri-arrow-up-line"></i>
  </a>
</template>
