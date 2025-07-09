const jwt = require("jsonwebtoken");
const usermodels = require("../models/usermodels")


const requiresignin = async (req, res, next) => {
    try {

        const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);

    }


}

//admin access 
const isAdmin = async (req, res, next) => {
    try {

        const user = await usermodels.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send("unAuthorized access");

        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("error in admin middleware" + error)
    }
}

module.exports = { requiresignin, isAdmin };
