import { Request, Response } from "express";
import redis from "../../../lib/redis";
import { generateTOTP } from "../../../utils/handleOTP";
import prisma from "../../../lib/prisma";
import { v4 } from "uuid";
import { SessionType } from "../../../types/app";


const ForgetPasswordController = async (req: Request, res: Response): Promise<any> => {
    const data: { email: string } = req.body;
    const { email } = data;


    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!checkUser || checkUser === null) {
            return res.status(400).json({ email: { type: "pattern", message: "Account not found" } });
        }


        const otp_session = v4();
        const otp = generateTOTP();
        console.log("Generated OTP:", otp);

        await redis.set(
            `otp-session:${otp_session}`,
            JSON.stringify({
                email, otp, type: SessionType.RESET_PASSWORD
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

export default ForgetPasswordController;
