import { successResponse, failedResponse } from "../utils/response";
import { query } from "../db/init";
import { sql2 } from "../sql";

async function generator(ctx, next) {
  console.log(ctx.request.body);
  ctx.body = 1;
}

module.exports = { generator };
