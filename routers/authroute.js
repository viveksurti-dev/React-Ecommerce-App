const express = require("express");
const { registerController, loginController, testController, forgotpassword, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController } = require("../controllers/authController");
const { requiresignin, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

//REGISTER
//POST METHOD REGISTER
router.post("/register", registerController);

//POST METHOD LOGIN
router.post("/login", loginController);

//forget pass
router.post("/forgot-password", forgotpassword);


//test routers
router.get("/test", requiresignin, isAdmin, testController);

//protected  auth
router.get("/user-auth", requiresignin, (req, res) => {
    res.status(200).send({ ok: true });
})


//protected admin auth
router.get("/admin-auth", requiresignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put('/profile', requiresignin, updateProfileController);


//orders
router.get("/orders", requiresignin, getOrdersController);

//all orders
router.get("/all-orders", requiresignin, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requiresignin,
    isAdmin,
    orderStatusController
);

//all users
router.get("/allUser", getAllUsersController)


module.exports = router;