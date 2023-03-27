const fileUpload = require("express-fileupload");
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidationMapper } = require("../http/middlewares/checkError");
const { createProjectValidation, projectImageValidation } = require("../http/validations/project.validation");
const { uploadFile } = require("../modules/fileUpload");
const { upload } = require("../modules/multer");

const router = require("express").Router();
router.use(checkLogin);
router.post("/create", fileUpload(), uploadFile, createProjectValidation(), expressValidationMapper, ProjectController.createProject)
router.get("/getProjects", ProjectController.getAllProjects)
module.exports = {
    projectRoutes: router
}