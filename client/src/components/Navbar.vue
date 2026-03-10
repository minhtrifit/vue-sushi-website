<script setup>
import { ref } from "vue";
import { get } from "lodash";
import { useUserStore } from "../stores/user";
import { adminLogout } from "../helpers";
import { PhSignOut } from "@phosphor-icons/vue";

const userStore = useUserStore();

const drawer = defineModel();
const menu = ref(false);

const handleLogout = () => {
  adminLogout();
};
</script>

<template>
  <v-app-bar app elevation="1" style="height: 64px">
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <v-spacer />

    <v-menu v-model="menu">
      <template #activator="{ props }">
        <v-btn v-bind="props"> {{ get(userStore, "user.fullName") }} </v-btn>
      </template>

      <v-list>
        <v-list-item @click="handleLogout">
          <template #prepend>
            <v-icon>
              <PhSignOut size="20" />
            </v-icon>
          </template>

          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
