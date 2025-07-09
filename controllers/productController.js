const productModel = require("../models/productModels");
const CategoryModele = require('../models/CategoryModel');
const slugify = require("slugify");
const fs = require('fs');
const braintree = require('braintree');
const OrderModel = require("../models/OrderModel");
const dotenv = require("dotenv");

dotenv.config();

//payment getway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,

});




const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" });
            case !description:
                return res.status(500).send({ error: "description is required" });
            case !price:
                return res.status(500).send({ error: "price is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !quantity:
                return res.status(500).send({ error: "quantity is required" });
            // case !shipping:
            //     return res.status(500).send({ error: "shipping is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should be less then 1mb" });
        }


        const product = await productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type


        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "new product created",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product"
        });
    }
};

const getProductController = async (req, res) => {
    try {

        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(201).send({
            success: true,
            countproduct: product.length,
            message: "All product ",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in  geting product"
        });
    }

}

const getsingleProductController = async (req, res) => {
    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(201).send({
            success: true,
            message: "single product ",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in  geting single product"
        });
    }
}

const productPhotoController = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('content-type', product.photo.contentType);
            return res.status(201).send(product.photo.data);

        }
    }


    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in  geting photo of product"
        });
    }
}

const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(201).send({
            success: true,
            message: "product deleted"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in deleting"
        });
    }
}

const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" });
            case !description:
                return res.status(500).send({ error: "description is required" });
            case !price:
                return res.status(500).send({ error: "price is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !quantity:
                return res.status(500).send({ error: "quantity is required" });
            // case !shipping:
            //     return res.status(500).send({ error: "shipping is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should be less then 1mb" });
        }


        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true }).select('-photo');
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type

        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "new product updated",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in updating product"
        });
    }
}

//filter
const productFiltersController = async (req, res) => {
    try {

        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) {
            args.category = checked;

        }
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args);
        res.status(201).send({
            success: true,
            products
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "error while filtering products"
        });
    }
}


//product count
const productCountController = async (req, res) => {
    try {

        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send(
            {
                success: true,
                total
            }
        );

        console.log("here");

    } catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "error while  products count"
        });
    }
}


const productListController = async (req, res) => {
    try {
        const perPage = 4
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })

        res.status(200).send(
            {
                success: true,
                products
            }
        );

    }
    catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "error while  products listing"
        });
    }
}


const searchProductController = async (req, res) => {
    try {

        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }]
        }).select("-photo")
        res.json(result)

    }
    catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "error while  products searching"
        });
    }

}

// //similar product
// const relatedProductController = async (req, res) => {
//     try {
//         const { pid, cid } = req.params;
//         const product = await productModel.find({
//             category: cid,
//             _id: { $ne: pid }

//         }).select("-photo").limit(3).populate("category");

//         res.status(200).send(
//             {
//                 success: true,
//                 product
//             }
//         );

//     }

//     catch (error) {
//         res.status(400).send({
//             success: false,
//             error,
//             message: "error while related products showing"
//         });
//     }

// }


//get pro by cat
const categoryWiseProdController = async (req, res) => {
    try {
        const category = await CategoryModele.findOne({ slug: req.params.slug });
        const product = await productModel.find({ category }).populate('category')
        res.status(200).send(
            {
                success: true,
                category,
                product
            }
        )

    } catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "error while categoryWiseProdController showing"
        });
    }

}



//payment token
const braintreeTokenProdController = async (req, res) => {

    try {

        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response);
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}

//payment
const braintreePaymentController = async (req, res) => {
    try {

        const { cart, nonce } = req.body;
        let total = 0
        cart.map((i) => { total += i.price });

        let newTrans = await gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }

        },

            function (error, result) {
                if (result) {
                    const orders = new OrderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error);
                }
            }

        )
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    createProductController, getProductController,
    getsingleProductController, productPhotoController,
    deleteProductController, updateProductController,
    productFiltersController, productCountController,
    productListController, searchProductController,
    categoryWiseProdController,
    braintreeTokenProdController,
    braintreePaymentController
    // // relatedProductController
}