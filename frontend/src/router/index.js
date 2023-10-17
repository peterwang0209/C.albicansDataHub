import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'; 
import HomeData from "../views/HomeView.vue";
import AllData from "../views/AllData.vue";
import Research from "../views/Research.vue";
import About from "../views/About.vue";
import DataPage from "../views/DataPage.vue";
import Overview from "../views/Overview.vue";
import FeedBack from "../views/FeedBack.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeData, name: "HomeData", meta: { requiresAuth: true } },
    { path: "/alldata", component: AllData, meta: { requiresAuth: true } },
    { path: "/research", component: Research, meta: { requiresAuth: true } },
    { path: "/about", component: About, meta: { requiresAuth: true } },
    {
      path: "/datapage/:type/:id/",
      name: "DataPage",
      component: DataPage,
      props: true,
      meta: { requiresAuth: true }
    },
    { path: "/overview", component: Overview, meta: { requiresAuth: true } },
    { path: "/feedback", component: FeedBack, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
