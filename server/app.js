import Koa from "koa";
import cors from "koa2-cors";
import router from "./routers/index";
import { query } from "./db/init";

const app = new Koa();

app.use(cors());

const sql = "SELECT * FROM `bgy_ap_payables_header` WHERE `HEADER_ID` = '29'";
const sql1 = "SELECT * FROM `runoob_tbl`";
const sql2 = `
select * from information_schema.columns
where table_name = 'bgy_ap_payables_header' ;`;
app.use(async ctx => {
  await query(sql2).then(res => {
    ctx.body = res;
  });
});

app.listen(9002, () => console.log(9002));
