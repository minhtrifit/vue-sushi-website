<script setup>
import { ref } from "vue";
import {
  PhSquaresFour,
  PhHouse,
  PhUsers,
  PhStar,
  PhPhone,
  PhGear,
  PhTag,
  PhBowlSteam,
} from "@phosphor-icons/vue";

const APP_NAME = import.meta.env.VITE_APP_NAME;

const appName = ref(APP_NAME);

const drawer = defineModel();

const MENU = [
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: PhSquaresFour,
  },
  {
    id: "home",
    title: "Home",
    url: "/admin/home",
    icon: PhHouse,
  },
  {
    id: "about-us",
    title: "About us",
    url: "/admin/about-us",
    icon: PhUsers,
  },
  {
    id: "management",
    title: "Management",
    icon: PhGear,
    children: [
      {
        id: "category",
        title: "Category",
        url: "/admin/management/category",
        icon: PhTag,
      },
      {
        id: "food",
        title: "Food",
        url: "/admin/management/food",
        icon: PhBowlSteam,
      },
    ],
  },
  {
    id: "special",
    title: "Special",
    url: "/admin/special",
    icon: PhStar,
  },
  {
    id: "contact",
    title: "Contact",
    url: "/admin/contact",
    icon: PhPhone,
  },
];
</script>

<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list style="padding: 0">
      <router-link
        to="/admin/dashboard"
        style="text-decoration: none; color: #000"
      >
        <v-list-item style="height: 64px">
          <div class="d-flex align-center justify-center ga-2">
            <img src="/assets/img/menu-shusi-1.png" style="height: 30px" />
            <span style="font-weight: 600">{{ appName }}</span>
          </div>
        </v-list-item>
      </router-link>

      <v-divider />

      <template v-for="item in MENU" :key="item.id">
        <!-- MENU NORMAL -->
        <v-list-item
          v-if="!item.children"
          :to="item.url"
          active-class="active-menu"
        >
          <template #prepend>
            <v-icon>
              <component :is="item.icon" size="22" />
            </v-icon>
          </template>

          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- MENU GROUP -->
        <v-list-group v-else>
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-icon>
                  <component :is="item.icon" size="22" />
                </v-icon>
              </template>

              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <!-- SUB MENU -->
          <v-list-item
            v-for="child in item.children"
            :key="child.id"
            :to="child.url"
            style="padding-left: 40px"
            active-class="active-menu"
          >
            <template #prepend>
              <v-icon>
                <component :is="child.icon" size="20" />
              </v-icon>
            </template>

            <v-list-item-title>
              {{ child.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.active-menu {
  background-color: var(--first-color) !important;
  color: white !important;
}
</style>
