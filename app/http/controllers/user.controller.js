const userModel = require("../../models/user.model");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = `${req.protocol}://${req.get("host")}/${user.profile_image.replace(/[\\\\]/gm, "/")}`
            return res.status(200).json({
                status: 200,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = req.body;
            const userId = req?.user?._id;
            const fields = ["first_name", "last_name", "Skills"];
            const badValues = ["", " ", null, undefined, {}, [], 0, -1, NaN];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (badValues.includes(value)) delete data[key]
            })
            const result = await userModel.updateOne({ _id: userId }, { $set: data });
            if (!result.modifiedCount > 0) throw { status: 401, message: "بروزرسانی انجام نشد" };
            return res.status(200).json({
                status: 200,
                message: "بروزرسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const { _id } = req.user;
            const { path } = req?.file;
            const imagePath = path?.substring(7);
            const result = await userModel.updateOne({ _id }, { $set: { profile_image: imagePath } })
            if (result.modifiedCount == 0) throw { status: 401, message: "بروزرسانی انجام نشد" };
            return res.status(200).json({
                status: 200,
                message: "بروزرسانی با موفقیت انجام شد",
            })
        } catch (error) {
            next(error)
        }
    }
    addSkills() {

    }
    editSkills() {

    }
    acceptInviteInTeam() {

    }
    rejectInviteInTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}