import express from "express";
import { client } from "../index.js";
const router = express.Router();

//add  pizza base
router.post('/', async (req, res) => {
    const newpizzaSauce = req.body;
    const result = await client
        .db("Inventory")
        .collection("pizzaSauce")
        .insertMany(newpizzaSauce);
    res.send(result)
})

// get all pizza base
router.get('/', async (req, res) => {
    const result = await client
        .db("Inventory")
        .collection("pizzaSauce")
        .find({})
        .toArray()
    res.send(result)
})

// get all pizza base by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await client
        .db("Inventory")
        .collection("pizzaSauce")
        .findOne({ id: id })
    result
        ? res.send(result)
        : res.status(404).send({ message: "No product found" });
})

// gupdate pizza base by ID
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const updatedpizzaSauce = req.body;
    const result = await client
        .db("Inventory")
        .collection("pizzaSauce")
        .updateOne({ id: id }, { $set: updatedpizzaSauce });
    res.send(result);
})



export const PizzaSauceRouter = router;