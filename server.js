const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
require("./config/db");
const morgan = require("morgan");
const authRoutes = require("./routers/authroute");
const CategoryRoutes = require("./routers/CategoryRoutes");
const productRoutes = require("./routers/productRoutes");
const cors = require('cors');


const PORT = process.env.PORT || 8090;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", productRoutes);



app.get("/", (req, res) => {
    res.send("this is ecommerce-app");
});

app.listen(PORT, (req, res) => {
    console.log(`server is runing on ${process.env.DEV_MODE} mode on part ${PORT}`.bgYellow.black);
});
