const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
    role: { type: [String], default: ["USER"] },
    token: { type: String, default: "" },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    profile_image: { type: String, required: false }
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userScheme);
module.exports = userModel;