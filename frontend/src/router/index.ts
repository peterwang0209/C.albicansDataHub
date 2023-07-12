import { createRouter, createWebHistory } from "vue-router";
import HomeData from "../views/HomeView.vue";
import AllData from "../views/AllData.vue";
import Database from "../views/Database.vue";
import Research from "../views/Research.vue";
import About from "../views/About.vue";

const routes = [
  { path: "/", component: HomeData },
  { path: "/alldata", component: AllData },
  { path: "/database", component: Database },
  { path: "/research", component: Research },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
