const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidationMapper } = require("../http/middlewares/checkError");
const { registerValidation, loginValidation } = require("../http/validations/auth.validation");

const router = require("express").Router();

router.post("/register", registerValidation(), expressValidationMapper, AuthController.register)
router.post("/login", loginValidation(), expressValidationMapper, AuthController.login)
module.exports = {
    authRouters: router
}