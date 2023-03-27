const { body } = require("express-validator");

const createProjectValidation = () => {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text")
            .notEmpty().withMessage("متن پروژه نمیتواند خالی باشد")
            .isLength({ min: 25 }).withMessage("متن پروژ باید حداقل 25 کاراکتر باشد")
    ]
}

module.exports = {
    createProjectValidation
};