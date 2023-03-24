const userModel = require("../../models/user.model");
const { hashString } = require("../../modules/functions");
const bcrypt = require("bcrypt");

class AuthController {
    async register(req, res, next) {
        const { username, password, email, mobile } = req.body;
        const hashPassword = hashString(password);
        const result = await userModel.create({ username, mobile, password: hashPassword, email });
        return res.json(result);
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) throw { status: 401, message: "نام کاربری یا کلمه عبور وارد شده اشتباه است" };
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) throw { status: 401, message: "نام کاربری یا کلمه عبور وارد شده اشتباه است" };
            return res.json({
                status: 200,
                message: "شما با موفقیت وارد حساب کاربری خود شدید",
                token: ""
            })
        } catch (error) {
            next(error)
        }
    }
    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}