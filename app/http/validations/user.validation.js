const { body } = require("express-validator");
const path = require("path");

function imageValidation() {
    return [
        body("image").custom((value, { req }) => {
            if (Object.keys(req?.file ?? {}).length == 0) throw "لطفا یک تصویر را انتخاب کنید";
            const { originalname, size } = req.file;
            const allowExts = [".jpg", ".png", ".jpeg", ".gif", ".webp"];
            const ext = path.extname(originalname);
            if (!allowExts.includes(ext)) throw "فرمت فایل ارسالی معتبر نمی باشد";
            const allowSize = 2 * 1024 * 1024;
            if (size > allowSize) throw "اندازه فایل ارسالی نمیتواند بیشتر از 2 مگابایت باشد";
            return true;
        })
    ]
}

module.exports = {
    imageValidation
}