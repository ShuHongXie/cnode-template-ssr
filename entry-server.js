import { createApp } from "./src/app.js";

export default (context) => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    // 设置服务器端 router 的位置
    router.push(context.url);

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map((Component) => {
          console.log(Component);
          if (Component.asyncData) {
            // return 出来的变量同时也注入组件
            const componentData =
              Component.data ||
              function () {
                return {};
              };
            const data = componentData.call(this);
            const asyncData = Component.asyncData({
              store,
              route: router.currentRoute,
            });
            Component.data = function () {
              return { ...data, ...asyncData };
            };
            console.log(JSON.stringify(Component));
            return asyncData;
          }
        })
      )
        .then(() => {
          // console.log(store.state);
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;

          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
