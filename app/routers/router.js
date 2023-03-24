const router = require("express").Router();
const { authRouters } = require("./auth.route");
const { projectRoutes } = require("./project.route");
const { teamRoutes } = require("./team.route");
const { userRoutes } = require("./user.route");


router.use("/auth", authRouters)
router.use("/project", projectRoutes)
router.use("/team", teamRoutes)
router.use("/user", userRoutes)

module.exports = {
    allRoutes: router
}