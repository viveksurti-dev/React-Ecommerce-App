const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'products',
    },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'eapp',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Deliverd", "Cancle"],
    },

}, { timestamps: true });

const orders = new mongoose.model('Order', orderSchema);
module.exports = orders;
