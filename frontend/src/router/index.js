import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../components/signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/feed",
    name: "feed",
    component: () => import("../components/feed.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../components/profile.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../components/onePost.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
