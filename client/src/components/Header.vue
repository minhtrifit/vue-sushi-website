<script setup>
import { ref } from "vue";
import { useScrollHeader } from "@/composables/useScrollHeader";

useScrollHeader();

const navList = [
  { id: "home", title: "Home", href: "#home" },
  { id: "about", title: "About Us", href: "#about" },
  { id: "menu", title: "Menu", href: "#menu" },
  { id: "special", title: "Special", href: "#new" },
  { id: "contact", title: "Contact", href: "#contact" },
];

const activeLink = ref("home");
const showMenu = ref(false);

const handleToggleMenu = () => (showMenu.value = !showMenu.value);

const handleCloseMenu = () => (showMenu.value = false);

const handleUpdateActiveLink = (value) => (activeLink.value = value);
</script>

<template>
  <header class="header" id="header">
    <nav class="nav container">
      <a href="#" class="nav__logo" @click="handleUpdateActiveLink('home')"
        >Sushi</a
      >

      <div :class="['nav__menu', showMenu && 'show-menu']" id="nav-menu">
        <ul class="nav__list">
          <li v-for="nav in navList" :key="nav.id">
            <a
              :href="nav.href"
              :class="['nav__link', activeLink === nav.id && 'active-link']"
              @click="handleUpdateActiveLink(nav.id)"
              >{{ nav.title }}</a
            >
          </li>
        </ul>

        <!-- Close -->
        <div class="nav__close" id="nav-close" @click="handleCloseMenu()">
          <i class="ri-close-large-line"></i>
        </div>
      </div>

      <!-- Toggle -->
      <div class="nav__toggle" id="nav-toggle" @click="handleToggleMenu()">
        <i class="ri-apps-2-line"></i>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: var(--body-color);
  z-index: var(--z-fixed);
  transition: box-shadow 0.4s;
}

.nav {
  position: relative;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__logo {
  color: var(--first-color);
  font-weight: var(--font-semi-bold);
  font-family: var(--second-font);
}

.nav__toggle {
  width: 32px;
  height: 32px;
  background-color: var(--first-color);
  color: var(--white-color);
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Navigation for mobile devices */
@media screen and (width <= 1150px) {
  .nav__menu {
    position: fixed;
    top: -120%;
    left: 0;
    width: 100%;
    background-color: var(--body-color);
    box-shadow: 0 8px 16px hsla(0, 0%, 0%, 0.15);
    padding-block: 4rem;
    border-radius: 0 0 1rem 1rem;
    transition: top 0.4s;
  }
}

.nav__list {
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
}

.nav__link {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
  transition: color 0.4s;
}

.nav__link:hover {
  color: var(--first-color);
}

.nav__close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  display: inline-flex;
  font-size: 1.5rem;
  color: var(--title-color);
  cursor: pointer;
}

/* Show menu */
.show-menu {
  top: 0;
}

/* Change header styles */
.scroll-header {
  box-shadow: 0 2px 16px hsla(0, 0%, 0%, 0.15);
}

/* Active link */
.active-link {
  color: var(--first-color);
}

/*=============== BREAKPOINTS ===============*/
/* For large devices <> */
@media screen and (width >= 1150px) {
  .nav {
    height: calc(var(--header-height) + 2rem);
  }

  .nav__toggle,
  .nav__close {
    display: none;
  }

  .nav__list {
    flex-direction: row;
    column-gap: 4rem;
  }
}
</style>
