const koa = require("koa");
const router = require("koa-router")();
const app = new koa();

const createApp = require("./entry-server");

router.get("*", function (ctx, next) {
  ctx.body = "Hello koa";
});

app.listen(3000, () => {
  console.log("服务开始启动");
});
