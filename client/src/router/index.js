import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import NotFound from "../components/NotFound.vue";
import MainPage from "@/pages/main/MainPage.vue";
import AdminPage from "@/pages/admin/AdminPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: MainPage,
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: LoginPage,
      },
      {
        path: "register",
        component: RegisterPage,
      },
    ],
  },

  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: AdminPage,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.body.classList.remove(
    "main-layout",
    "admin-layout",
    "admin-auth-layout",
  );

  if (to.path.startsWith("/admin")) {
    document.body.classList.add("admin-layout");
    document.documentElement.classList.remove("smooth-scroll");
  } else if (to.path.startsWith("/auth")) {
    document.body.classList.add("auth-layout");
    document.documentElement.classList.remove("smooth-scroll");
  } else {
    document.documentElement.classList.add("smooth-scroll");
    document.body.classList.add("main-layout");
  }
});

export default router;
