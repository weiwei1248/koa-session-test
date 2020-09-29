const Router = require('koa-router')
const router = new Router()
const dbPromise = require('../database/db')
const session = require('koa-session');
const koaBody = require("koa-body");

router.post('/login', async ctx => {

});

router.post('/register', async ctx => {
  // ctx.request.body.pass = await bcrypt.hash(ctx.request.body.pass, 5);
  console.log(ctx.session.logged);
  ctx.session.logged = true;
  ctx.body = {
    status: "success",
    data: "done",
  };
})


module.exports = router
