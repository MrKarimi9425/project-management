const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidationMapper } = require("../http/middlewares/checkError");
const { imageValidation } = require("../http/validations/user.validation");
const { upload } = require("../modules/multer");

const router = require("express").Router();
router.use(checkLogin)
router.get("/profile", UserController.getProfile);
router.post("/profile", UserController.editProfile)
router.post("/upload", upload.single("image"), imageValidation(), expressValidationMapper, UserController.uploadProfileImage)
module.exports = {
    userRoutes: router
}