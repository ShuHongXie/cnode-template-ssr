import Vue from "vue";
import Router from "vue-router";
import TopicList from "./views/topicList";

Vue.use(Router);

export function createRouter() {
  // 实例化VueRouter
  const router = new Router({
    routes: [
      {
        path: "/",
        name: "list",
        component: TopicList,
      },
      // {
      //   path: "/topic/:id",
      //   name: "topic",
      //   component: () =>
      //     import(/* webpackPrefetch: true */ "@/views/topic.vue"),
      // },
      // {
      //   path: "/create",
      //   name: "create",
      //   component: () =>
      //     import(/* webpackPrefetch: true */ "@/views/newTopic.vue"),
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: "/login",
      //   name: "login",
      //   component: () =>
      //     import(/* webpackPrefetch: true */ "@/views/login.vue"),
      // },
      // {
      //   path: "/user/:loginname",
      //   name: "user",
      //   component: () => import(/* webpackPrefetch: true */ "@/views/user.vue"),
      // },
      // {
      //   path: "/message",
      //   name: "message",
      //   component: () =>
      //     import(/* webpackPrefetch: true */ "@/views/message.vue"),
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: "/about",
      //   name: "about",
      //   component: () =>
      //     import(/* webpackPrefetch: true */ "@/views/about.vue"),
      // },
    ],
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition;
    //   } else {
    //     return { x: 0, y: 0 };
    //   }
    // },
  });

  // 登录验证
  // router.beforeEach((to, from, next) => {
  //   if (to.matched.some((record) => record.meta.requiresAuth)) {
  //     if (store.state.userInfo.loginname) {
  //       //已登录
  //       next();
  //     } else {
  //       //未登录
  //       next({
  //         name: "login",
  //         query: { redirect: encodeURIComponent(to.name) }, //缓存应该跳的页面,方便登录后直接跳转
  //       });
  //     }
  //   } else {
  //     next();
  //   }
  // });

  return router;
}
