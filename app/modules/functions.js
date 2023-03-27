const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
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

const uploadPath = () => {
    const date = new Date();
    const year = date.getFullYear() + "";
    const month = date.getMonth() + "";
    const day = date.getDate() + "";
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "uploads", year, month, day);
}

module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    uploadPath
};