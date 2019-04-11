import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "@/router";
import { createStore } from "@/store";
import VueMeta from "vue-meta";
import "./global";

Vue.use(VueMeta);

export function createApp() {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}
