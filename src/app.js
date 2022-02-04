import Vue from "vue";

import { createRouter } from "@/router.js";
import { createStore } from "@/vuex/index.js";
import { sync } from "vuex-router-sync";
import App from "./app.vue";

import "./styles/main.less";
// import "github-markdown-css"; //markdown css
import "./styles/iconfont/iconfont.css";

// 注册一个全局自定义指令 v-focus
// window &&
//   Vue.directive("focus", {
//     // 当绑定元素插入到 DOM 中。
//     inserted: function (el, binding) {
//       // 聚焦元素
//       if (binding.value) {
//         el.focus();
//       }
//     },
//   });

// // 处理刷新的时候vuex被清空但是用户已经登录的情况
// if (window && localStorage.getItem("userInfo")) {
//   store.commit("LOGIN", JSON.parse(localStorage.getItem("userInfo")));
// }
export function createApp() {
  const router = createRouter();
  const store = createStore();
  // 同步路由状态(route state)到 store
  sync(store, router);
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  });
  return { app, router, store };
}
