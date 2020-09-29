const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const HttpStatus = require("http-status");
const session = require('koa-session');


const app = new Koa();

app.keys = ["some secret hurr"];  // 这个是配合signed属性的签名key
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 10000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));
app.use((ctx, next) => {
  ctx.cookies.secure = true;
  return next();
});









//These are the new change
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/client/build")); //serve the build directory
app.use(mount("/", static_pages));

const PORT = 5000;

app.use(BodyParser());
app.use(Logger());
app.use(cors({credentials: true}));

const router = new Router();

app.use(router.routes()).use(router.allowedMethods());
app.use(require('./routes/api').routes())

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
