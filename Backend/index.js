const express = require('express');
const cors = require("cors");
require('./db/config');
const dotenv = require('dotenv').config();
const User = require("./db/User");
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken')

const jwtKey = "e-commerce";
const app = express();

app.use(express.json());
app.use(cors());

//for registration route
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "23h" }, (err, token) => {
        if (err) {
            res.send({ result: 'Somthing went wrong, Please try after sometime.' })
        }
        res.send({ result, auth: token })
    })
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");


        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "20h" }, (err, token) => {
                if (err) {
                    res.send({ result: 'Somthing went wrong, Please try after sometime.' })
                }
                res.send({ user, auth: token })
            })


        } else {
            res.send({ result: 'No User Found' })
        }
    } else {
        res.send({ result: 'No User Found' })
    }


})

//for the products route
app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

//for the products route!
app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No product found" })
    }
})

//for the delete product route
app.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})


//for the delete product route
app.get("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record Found." });
    }
})

//make a Update route
app.put("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );

    res.send(result);

})
//Make a route for API.
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]

    });
    res.send(result);
})


//verify token middleware make
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.warn("middleware called if", token);

        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide the valid token" })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with Header" })
    }
}

app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`)
});


