const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/defaults/default.png" },
    tags: { type: String, default: [] },
    Owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true },
    show: { type: Boolean, default: true }
}, {
    timestamps: true
});

const projectModel = mongoose.model("project", projectSchema);
module.exports = projectModel;