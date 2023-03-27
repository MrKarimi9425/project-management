const path = require("path");
const { uploadPath } = require("./functions");

const uploadFile = async (req, res, next) => {
    try {
        if (Object.keys(req.files ?? req.file ?? {}).length == 0) throw "یک تصویر انتخاب کنید"
        const { image } = req.files;
        const imageUrl = path.join(uploadPath(), (Date.now() + path.extname(image.name)));
        let pathUpload = path.join(__dirname, "..", "..", imageUrl);
        image.mv(pathUpload, error => {
            if (error) throw "بارگزاری تصویر با خطا مواجه شد";
            next();
        })
        req.body.image = `${req.protocol}://${req.get("host")}/${imageUrl.replace(/[\\\\]/gm, "/").substring(7)}`
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadFile
}