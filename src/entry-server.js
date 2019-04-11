import { createApp } from "./base";

export default async context => {
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp();
    const meta = app.$meta();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error("no matched components"));
      }
      let promises = [];
      matchedComponents.forEach(({ asyncData }) => {
        if (asyncData) {
          const fetchTasks = asyncData({
            store,
            route: router.currentRoute,
            router
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
      Promise.all(promises)
        .then(() => {
          context.meta = meta;
          context.state = store.state;
          context.router = router;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
