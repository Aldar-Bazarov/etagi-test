const Router = require('express');
const router = new Router();
const apartmentRouter = require('./apartmentRouter');

router.use('/apartment', apartmentRouter);

module.exports = router;