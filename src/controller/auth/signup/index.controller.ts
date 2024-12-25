import { Request, Response } from "express";
import SignUpSchema, { SignUpFormData } from "./validation"; 
import { hashPassword } from "../../../utils/handleHashing";
import redis from "../../../lib/redis";
import { generateTOTP } from "../../../utils/handleOTP";
import prisma from "../../../lib/prisma";
import { v4 } from "uuid";
import { SessionType } from "../../../types/app";
import convertZodError from "../../../utils/handleFormatting";

const SignUpController = async (req: Request, res: Response): Promise<any> => {
    const data: SignUpFormData = req.body;
    const { name, email, password, username } = data;
    const errors = SignUpSchema.safeParse(data)

    if (!errors.success) {
        const errorObj = convertZodError(errors.error);
        return res.status(400).json(errorObj)
    }


    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (checkUser) {
            return res.status(400).json({ email: { type: "pattern", message: "Account already exists" } });
        }


        const hashedPassword = await hashPassword(password);
        await redis.set(`user-account:${email}`, JSON.stringify({ username, email, name, password: hashedPassword }), "EX", 300);
        const otp_session = v4();
        const otp = generateTOTP();
        console.log("Generated OTP:", otp);

        await redis.set(
            `otp-session:${otp_session}`,
            JSON.stringify({
                email, otp, type: SessionType.ACCOUNT
            }),
            'EX', 300
        );

        return res.status(200).json({
            message: "OTP generated, please check your email for the code.",
            otp_session
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "I fucked up" });
    }
};

export default SignUpController;
