import "express-async-errors";
import "reflect-metadata";
import "dotenv/config"
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middleware/HandleErrors";
import { restaurantRouter } from "./routes/restaurant.routes";
import { recipeRouter } from "./routes/recipe.routes";
import { categoryRouter } from "./routes/category.routes";

export const app = express()

app.use(cors())
app.use(helmet())
app.use(json())

app.use("/restaurants", restaurantRouter);
app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter)

app.use(HandleErrors.execute)