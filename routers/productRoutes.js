const express = require("express");
const { requiresignin, isAdmin } = require("../middlewares/authMiddlewares");
const {
    createProductController,
    getProductController,
    getsingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    // relatedProductController,
    categoryWiseProdController,
    braintreeTokenProdController, braintreePaymentController } = require("../controllers/productController");
const Formidable = require("express-formidable");

const router = express.Router();



//routes
router.post("/create-product", requiresignin, isAdmin, Formidable(), createProductController);


//get product
router.get("/get-product", getProductController);


//single product
router.get("/getsingle-product/:slug", getsingleProductController);

//photo
router.get("/product-photo/:pid", productPhotoController);

//delete
router.delete("/delete-product/:pid", deleteProductController)

//update
router.put("/update-product/:pid", requiresignin, isAdmin, Formidable(), updateProductController);

//filter 
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product count
router.get("/product-list/:page", productListController);

//search product 
router.get("/search/:keyword", searchProductController);

//similar product
// router.get("/related-product/:pid/:cid ", relatedProductController);

//categories wise prod
router.get('/product-category/:slug', categoryWiseProdController);


//payment routes
// token
router.get('/braintree/token', braintreeTokenProdController);


// payment
router.post("/braintree/payment", requiresignin, braintreePaymentController);


module.exports = router;
