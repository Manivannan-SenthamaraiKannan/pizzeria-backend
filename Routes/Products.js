import express from "express";
import { client } from "../index.js";
const router = express.Router();

//add products
router.post("/", async (req, res) => {
    const newProduct = req.body;
    const result = await client
        .db("products")
        .collection("pizzas")
        .insertMany(newProduct);
    res.send(result);
});

// get all products
router.get("/", async (req, res) => {
    const result = await client
        .db("products")
        .collection("pizzas")
        .find({})
        .toArray();
    res.send(result);
});

//get products by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const result = await client
        .db("products")
        .collection("pizzas")
        .findOne({ id: id });
    result
        ? res.send(result)
        : res.status(404).send({ message: "No product found" });
});

//delete products by ID

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const result = await client
        .db("products")
        .collection("pizzas")
        .deleteOne({ id: id });
    result
        ? res.send(result)
        : res.status(404).send({ message: "No product found" });
});

//update product by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProducts = req.body;
    const result = await client
        .db("products")
        .collection("pizzas")
        .updateOne({ id: id }, { $set: updatedProducts });
    res.send(result);
});


export const productsRouter = router;