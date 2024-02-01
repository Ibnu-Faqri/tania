const AjuanController = require("../../controller/ajuanController");
const authentication = require("../../middlewares/authentication");
const isUserOwnAjuan = require("../../middlewares/authorization");
const isAdmin = require("../../middlewares/isAdmin");

const router = require("express").Router();

router.post('/', authentication, AjuanController.createAjuan);
router.get('/', authentication, AjuanController.getAjuan);
router.get('/:id', authentication, AjuanController.getAjuanId);
router.put('/:id', authentication, isUserOwnAjuan, AjuanController.updateAjuan);
router.put('/:id', authentication, isAdmin, AjuanController.balasAjuan);
router.put('/:id/balas', authentication, isUserOwnAjuan, AjuanController.balasAjuanAdmin);
// router.put("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.updateAnswer);
// router.delete("/:id", authentication, isUserOwnReviewandAnswer, AnswerController.deleteAnswer);

module.exports = router;