import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { vuetify } from "./libs/vuetify";
import "@mdi/font/css/materialdesignicons.css";

createApp(App).use(router).use(VueQueryPlugin).use(vuetify).mount("#app");
