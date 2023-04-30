import express from "express";
import { client } from "../index.js";
const router = express.Router();

//add  pizza base
router.post('/', async (req, res) => {
    const newPizzaBase = req.body;
    const result = await client
        .db("Inventory")
        .collection("pizzaBase")
        .insertMany(newPizzaBase);
    res.send(result)
})

// get all pizza base
router.get('/', async (req, res) => {
    const result = await client
        .db("Inventory")
        .collection("pizzaBase")
        .find({})
        .toArray()
    res.send(result)
})

// get all pizza base by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await client
        .db("Inventory")
        .collection("pizzaBase")
        .findOne({ id: id })
    result
        ? res.send(result)
        : res.status(404).send({ message: "No product found" });
})

// gupdate pizza base by ID
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const updatedPizzaBase = req.body;
    const result = await client
        .db("Inventory")
        .collection("pizzaBase")
        .updateOne({ id: id }, { $set: updatedPizzaBase });
    res.send(result);
})



export const PizzaBaseRouter = router;