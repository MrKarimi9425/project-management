const multer = require("multer");
const path = require("path");
const { uploadPath } = require("./functions");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadPath());
    },
    filename: (req, file, callback) => {
        const type = path.extname(file.originalname);
        callback(null, Date.now() + type)
    }
})

const upload = multer({ storage });

module.exports = {
    upload
};