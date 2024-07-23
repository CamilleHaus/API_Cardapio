import supertest from "supertest";
import { app } from "../../app";

export const request = supertest(app);