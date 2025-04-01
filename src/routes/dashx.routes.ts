import {
  ADD_EMAIL_CONTROLLER,
  GET_EMAIL,
  HANDLE_WEBHOOK
} from "../controller/dashx/get_email/index.controller";

import { Router } from "express";

export const dashxRouter = Router();

dashxRouter.get("/", GET_EMAIL);
dashxRouter.post("/", ADD_EMAIL_CONTROLLER);
dashxRouter.post("/webhook-response", HANDLE_WEBHOOK);
