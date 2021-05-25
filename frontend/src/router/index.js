import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "feed",
    component: () => import("../components/feed.vue"),
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
