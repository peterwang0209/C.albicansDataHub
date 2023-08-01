import { createRouter, createWebHistory } from "vue-router";
import HomeData from "../views/HomeView.vue";
import AllData from "../views/AllData.vue";
import Database from "../views/Database.vue";
import Research from "../views/Research.vue";
import About from "../views/About.vue";
import DataPage from "../views/DataPage.vue";

const routes = [
  { path: "/", component: HomeData },
  { path: "/alldata", component: AllData },
  { path: "/research", component: Research },
  { path: "/about", component: About },
  { path: "/datapage/:id", name: "DataPage", component: DataPage, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
