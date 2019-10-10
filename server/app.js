import Koa from "koa";
import cors from "koa2-cors";
import router from "./routers/index";
import { query } from "./db/init";

const app = new Koa();

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001, () => console.log(3001));
