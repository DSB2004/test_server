import { Router, Request, Response } from "express";
import LoginController from "../controller/auth/login/index.controller";
import SignUpController from "../controller/auth/signup/index.controller";
import CreateAccountController from "../controller/auth/account/index.controller";
import OtpController from "../controller/auth/otp/index.controller";
import ForgetPasswordController from "../controller/auth/password/forget.controller";
import ResetPasswordController from "../controller/auth/password/reset.controller";

// middleware
import AuthMiddleware from "../middleware/auth/auth.middleware";
import OTPMiddleware from "../middleware/auth/otp.middleware";


const AuthRouter = Router();

AuthRouter.get("/", (req: Request, res: Response) => {
    console.log(req.headers)
    console.log(req.cookies)
    res.json({ msg: "Logged in" });
});

AuthRouter.post("/login", LoginController)
AuthRouter.post("/signup", SignUpController)
// @ts-ignore
AuthRouter.put("/account", AuthMiddleware, CreateAccountController)
// @ts-ignore
AuthRouter.post("/otp", OTPMiddleware, OtpController)

AuthRouter.post("/forget-password", ForgetPasswordController)
AuthRouter.patch("/reset-password", ResetPasswordController)


export default AuthRouter;


