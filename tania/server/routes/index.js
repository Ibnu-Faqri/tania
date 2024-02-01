const router = require("express").Router();
const ajuanRouter = require("./Ajuan/index");
const userRouter = require("./User/index");

router.use('/ajuan', ajuanRouter);
router.use(userRouter);

module.exports = router;