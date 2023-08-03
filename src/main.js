import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
//import { model } from "./script";
import { createRouter, createWebHistory } from "vue-router";
import AdminPage from "./components/Adminka/AdminPage.vue";
import EditInfo from "./components/Adminka/EditInfo.vue";
import EditModels from "./components/Adminka/EditModels.vue";
import EditUsers from "./components/Adminka/EditUsers.vue";
import HomePage from "./components/Home.vue";

const router = createRouter({
  routes: [
    {
      name: "home",
      path: "",
      component: HomePage,
    },
    {
      path: "/adminka",
      component: AdminPage,
      adminOnly: true,
    },
    {
      path: "/edit-users",
      component: EditUsers,
      adminOnly: true,
    },
    {
      path: "/edit-models",
      component: EditModels,
      adminOnly: true,
    },
    {
      path: "/edit-info",
      component: EditInfo,
      adminOnly: true,
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
//createApp(App).mount("#app");

//model(document.getElementById("model"));
