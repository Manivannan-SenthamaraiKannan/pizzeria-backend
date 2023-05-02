


import express from "express";
import { client } from "../index.js";
const router = express.Router();

//add product
router.post("/", async (req, res) => {
    const newNonVegPizza = req.body;
    const result = await client
        .db("product")
        .collection("NonVegPizza")
        .insertMany(newNonVegPizza);
    res.send(result);
});

// get all product
router.get("/", async (req, res) => {
    const result = await client
        .db("product")
        .collection("NonVegPizza")
        .find({})
        .toArray();
    res.send(result);
});

//get product by ID
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await client
        .db("product")
        .collection("NonVegPizza")
        .findOne({ id: id });
    result
        ? res.send(result)
        : res.status(404).send({ message: "No product found" });
});

//update product by ID
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const updatedproduct = req.body;
    const result = await client
        .db("product")
        .collection("NonVegPizza")
        .updateOne({ id: id }, { $set: updatedproduct });
    res.send(result);
});


export const nonVegPizzaRouter = router;