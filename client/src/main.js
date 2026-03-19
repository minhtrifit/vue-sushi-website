import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { vuetify } from "./libs/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "./libs/echarts";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .use(vuetify)
  .mount("#app");
