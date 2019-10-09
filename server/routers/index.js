import KoaRouter from 'koa-router';
import user from './user';

const router = new KoaRouter();
router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;
