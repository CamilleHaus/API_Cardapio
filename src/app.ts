import "express-async-errors"
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middleware/HandleErrors";

export const app = express()

app.use(cors())
app.use(helmet())
app.use(json())

app.use(HandleErrors.execute)