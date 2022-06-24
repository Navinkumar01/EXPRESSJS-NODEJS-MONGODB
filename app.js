const express = require("express");
const res = require("express/lib/response");
const app = express();

const userId = require("./model/product.js");
const PORT = 4000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const productRoutes = require('./routes/products.js');
app.use('/products', productRoutes);

const userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";


mongoose.connect(url, { useNewUrlParser:true }, () =>{
    console.log("Connected to DB!")
})

app.get('/', (req, res) => {
    res.send("welcome to express and nodejs");
});

app.listen(PORT, () =>{
    console.log("server is listening at port")
})