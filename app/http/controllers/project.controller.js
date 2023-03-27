const projectModel = require("../../models/project.model");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image } = req.body;
            const userID = req?.user?._id;
            const result = await projectModel.create({ title, text, Owner: userID, image });
            if (!result) throw { status: 401, message: "پروژه ایجاد نشد" };
            return res.status(201).json({
                status: 201,
                message: "پروژه با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async getAllProjects(req, res, next) {
        try {
            const project = await projectModel.find({});
            return res.status(200).json({
                status: 200,
                project
            });
        } catch (error) {
            next(error);
        }
    }

    getProjectById() {

    }
    getAllProjectsOfTeam() {

    }
    getProjectsOfUser() {

    }
    updateProject() {

    }
    deleteProjectById() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}