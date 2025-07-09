const bcrypt = require("bcrypt");

const hashpassword = async (password) => {
    try {

        const hashpassword = await bcrypt.hash(password, 10);
        return hashpassword;

    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password, hashpassword) => {
    return bcrypt.compare(password, hashpassword);
}

module.exports = { hashpassword, comparePassword }