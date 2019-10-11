import KoaRouter from 'koa-router';
import { generator } from '../controller/db';
const db = new KoaRouter();

db.post('/generator', generator);

module.exports = db;