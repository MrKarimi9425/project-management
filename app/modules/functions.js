const bcrypt = require("bcrypt");
const hashString = (str) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(str, salt);
}

module.exports = {
    hashString
}