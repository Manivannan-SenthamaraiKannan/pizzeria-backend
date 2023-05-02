import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import cookieParser from 'cookie-parser';
import db from './db/connect.js'
import { productsRouter } from "./Routes/Products.js";
import { vegPizzaRouter } from "./Routes/VegPizza.js";
import {nonVegPizzaRouter} from './Routes/NonVegPizza.js'
import { PizzaBaseRouter } from "./Routes/PizzaBase.js";
import { PizzaSauceRouter } from "./Routes/PizzaSauce.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// connecting db with mongoose
db();

const PORT = 8000;

const MONGO_URL = process.env.MONGO_URL;

//MongoDB connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDb is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products", productsRouter);
app.use("/vegpizza", vegPizzaRouter);
app.use("/nonvegpizza", nonVegPizzaRouter);
app.use("/pizzabase", PizzaBaseRouter);

app.listen(PORT, () =>
  console.log("Server started on PORT", PORT)
);