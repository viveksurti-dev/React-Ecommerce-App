const { hashpassword, comparePassword } = require("../helpers/authhelper");
const usermodels = require("../models/usermodels");
const orderModel = require("../models/OrderModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {

        const { name, email, password, phone, address, question } = req.body;
        if (!name) {
            return res.send("name is required");
        }
        if (!email) {
            return res.send("email is required");
        }
        if (!password) {
            return res.send("password is required");
        }
        if (!phone) {
            return res.send("phone is required");
        }
        if (!address) {
            return res.send("address is required");
        }
        if (!question) {
            return res.send("Answer is required");
        }

        //user check
        const existingUser = await usermodels.findOne({ email })
        //existingUser
        if (existingUser) {
            // return res.status(200).send("already registerd please login :) ");
            return res.status(200).send({
                success: false,
                message: "already registerd please login :) "
            });

        }

        //register user
        const hashedpassword = await hashpassword(password);
        //

        const user = await new usermodels({
            name,
            email,
            password: hashedpassword,
            phone,
            address,
            question
        }).save();

        // res.status(201).send("user register successfully" + user);
        res.status(201).send({
            success: true,
            message: "user register successfully",
            user,
        });


    } catch (error) {
        console.log(error);
        //  res.status(500).send("go to authcontroller register" + error);
        res.status(500).send({
            success: true,
            message: "go to authcontroller register",
            error,

        });

    }
}


const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send("invalid access please check..");
        }

        //user check
        const user = await usermodels.findOne({ email })
        if (!user) {

            return res.status(404).send("sorry bro....");
        }


        const match = await comparePassword(password, user.password)
        if (!match) {

            return res.status(200).send("password incorrect...");
        }

        //token 
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token
        });



    } catch (error) {
        res.status(500).send("go to authcontroller login" + error);
    }
}


const forgotpassword = async (req, res) => {
    try {

        const { email, question, newPassword } = req.body;

        if (!email) {
            return res.status(400).send("email is required");
        }

        if (!question) {
            return res.status(400).send("question is required");
        }

        if (!newPassword) {
            return res.status(400).send("New password is required");
        }

        //check

        const user = await usermodels.findOne({ email, question });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "wrong Email or Question",
            })
        }


        const hashed = await hashpassword(newPassword);
        await usermodels.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        });
    }

}


const testController = (req, res) => {
    console.log("protected route");
    res.send("protected route");

}

//update profile
const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await usermodels.findById(req.user._id);

        // if (password) {
        //     return res.json({ error: "password is required" });
        // }

        const hashedpassword = password ? await hashpassword(password) : undefined
        const updatedUser = await usermodels.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedpassword || user.password,
            email: email || user.email,
            address: address || user.address,
            phone: phone || user.phone

        }, { new: true });
        res.status(200).send({
            success: true,
            message: "profile updated successfully",
            updatedUser
        })

    }


    catch (error) {
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        });
    }
}




//orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};


// all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};


//order status
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};


const getAllUsersController = async (req, res) => {
    try {
        const user = await usermodels.find({});
        res.status(201).send({
            success: true,
            message: "All users ",
            user
        });
        // res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While getting all users",
            error,
        });
    }
}
module.exports = {
    registerController, loginController, testController, forgotpassword, updateProfileController,
    getOrdersController, orderStatusController, getAllOrdersController, getAllUsersController
};




