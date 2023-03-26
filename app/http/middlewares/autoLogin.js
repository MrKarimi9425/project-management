const userModel = require("../../models/user.model");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
    try {
        const authError = "لطفا وارد حساب کاربری خود شوید";
        const authorization = req?.headers?.authorization;
        if (!authorization) throw { status: 401, message: authError };
        const token = authorization.split(" ")?.[1];
        if (!token) throw { status: 401, message: authError };
        const result = verifyJwtToken(token);
        console.log("result", result)
        const { username } = result;
        const user = await userModel.findOne({ username }, { password: 0 })
        if (!user) throw { status: 401, message: authError };
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin
}