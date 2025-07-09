const express = require("express");
const { requiresignin, isAdmin } = require("../middlewares/authMiddlewares");
const { createCategoryController, updateCtegoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/CategoryController");
const router = express.Router();

//routes
router.post("/create-category", requiresignin, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", requiresignin, isAdmin, updateCtegoryController);

//getall
router.get("/get-category", categoryController);

//single cat
router.get("/single-category/:slug", singleCategoryController);

//delte
router.delete("/delete-category/:id", requiresignin, isAdmin, deleteCategoryController);



// export default router;
module.exports = router;
