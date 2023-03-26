const { body } = require("express-validator");
const userModel = require("../../models/user.model");
function registerValidation() {
    return [
        body("username").custom(async (value) => {
            if (value) {
                const user = await userModel.findOne({ username: value });
                if (user) throw "نام کاربری وارد شده قبلا استفاده شده"
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}/gi
                if (usernameRegex.test(value)) {
                    return true;
                }
                throw "نام کاربری وارد شده صحیح نمی باشد";
            }
            throw "نام کاربری را وارد کنید";
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد")
            .custom(async email => {
                const user = await userModel.findOne({ email });
                if (user) throw "ایمیل وارد شده قبلا استفاده شده"
            }),
        body("mobile").isMobilePhone("ir-IR").withMessage("شماره موبایل وارد شده صحیح نمی باشد")
            .custom(async mobile => {
                const user = await userModel.findOne({ mobile });
                if (user) throw "شماره موبایل وارد شده قبلا استفاده شده"
            }),
        body("password").isLength({ min: 6, max: 16 }).withMessage("کلمه عبور باید حداقل 6 و حداکثر 16 کاراکتر باشد").custom((value, context) => {
            const { confirmPassword } = context?.req?.body;
            if (!value) throw "کلمه عبور نمی تواند خالی باشد";
            if (value !== confirmPassword) throw "کلمه عبور با تکرار آن یکسان نمی باشند";
            return true;
        })

    ]
}
function loginValidation() {
    return [
        body("username").custom(async username => {
            if (username) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}/gi
                if (usernameRegex.test(username)) {
                    return true;
                }
                throw "نام کاربری وارد شده صحیح نمی باشد";
            }
            throw "نام کاربری نمی تواند خالی باشد";
        }),
        body("password").isLength({ min: 6, max: 16 }).withMessage("کلمه عبور باید حداقل 6 و حداکثر 16 کاراکتر باشد")
    ]
}

module.exports = {
    registerValidation,
    loginValidation
}