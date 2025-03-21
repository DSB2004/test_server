import {
  ADD_EMAIL_CONTROLLER,
  GET_EMAIL,
} from "../controller/dashx/get_email/index.controller";

import { Router } from "express";

export const dashxRouter = Router();

dashxRouter.get("/", GET_EMAIL);
dashxRouter.post("/", ADD_EMAIL_CONTROLLER);
