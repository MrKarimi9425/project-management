const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashString = (str) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(str, salt);
};
const tokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY);
};
const verifyJwtToken = (token) => {
    const result = jwt.verify(token, process.env.JWT_KEY);
    if (!result) throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    return result;
};

module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken
};