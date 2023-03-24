const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    project: { type: String, default: [] },
    owner: { type: mongoose.Types.ObjectId, required: true }
})
const teamModel = mongoose.model("team", teamSchema);
module.exports = teamModel;