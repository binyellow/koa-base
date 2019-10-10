import { successResponse, failedResponse } from "../utils/response";
import { query } from "../db/init";
import { sql2 } from "../sql";

async function register(ctx, next) {
  await query(sql2).then(
    res => {
      ctx.body = res;
    },
    err => {
      console.log(err);
    }
  );
}

async function login(ctx) {
  ctx.body = 123;
}
module.exports = { register, login };
