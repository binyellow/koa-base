import KoaRouter from 'koa-router';
import user from './user';
import db from './db';

const router = new KoaRouter();
router.use('/user', user.routes(), user.allowedMethods());
router.use('/db', db.routes(), db.allowedMethods());

module.exports = router;
