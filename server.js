const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const app = new Koa();
const router = new Router();

const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("./output/vue-ssr-server-bundle.json");
const clientManifest = require("./output/vue-ssr-client-manifest.json");
const template = require("fs").readFileSync("./index.html", "utf-8");

const resolve = (file) => path.resolve(__dirname, file);

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
  basedir: resolve("./dist"),
});

// /(.*) koa-static正则匹配会拦截koa-static的静态资源返回404导致拿不到 所以最好是根据目录动态生成链接
router.get("/", async function (ctx, next) {
  const context = { url: ctx.request.url };
  console.log(ctx.request.url);
  try {
    const html = await renderer.renderToString(context);
    ctx.status = 200;
    ctx.body = html;
  } catch (err) {
    console.log(err);
    if (err.code === 404) {
      ctx.status = 404;
      ctx.body = "page not found";
    } else {
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(static(__dirname))
  .listen(3000, () => {
    console.log("服务开始启动");
  });
