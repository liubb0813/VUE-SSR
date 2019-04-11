import { createApp } from "./base";
import Vue from "vue";

const { app, router, store } = createApp();

Vue.mixin({
  beforeRouteUpdate(to, _, next) {
    fetchTasks([this.$options], to)
      .then(() => {
        next();
      })
      .catch(e => {
        throw e;
      });
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

function fetchTasks(tasks, route) {
  const promises = [];

  tasks.forEach(({ asyncData }) => {
    if (asyncData) {
      const fetchTasks = asyncData({
        store: store,
        route: route
      });

      if (Array.isArray(fetchTasks)) {
        promises.push(
          ...fetchTasks.map(t =>
            t.catch(e => {
              throw e;
            })
          )
        );
      } else {
        promises.push(
          fetchTasks.catch(e => {
            throw e;
          })
        );
      }
    }
  });

  return promises.length > 0 ? Promise.all(promises) : Promise.resolve();
}

router.onReady(async function() {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const tasks = matched.filter((c, i) => {
      return !!c && (diffed || (diffed = prevMatched[i] !== c));
    });

    await fetchTasks(tasks, to);
    next();
  });

  const initRoute = router.currentRoute;

  const tasks = router.getMatchedComponents().filter(c => !!c);
  await fetchTasks(tasks, initRoute);

  app.$mount("#app");
});
