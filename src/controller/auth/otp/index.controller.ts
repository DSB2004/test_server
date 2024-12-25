import { Request, Response } from "express";
import { verifyOTP } from "../../../utils/handleOTP";
import redis from "../../../lib/redis";
import { v4 } from "uuid";
import { OtpSessionType, SessionType } from "../../../types/app";

const OtpController = async (req: Request, res: Response): Promise<any> => {
    const otpSession = req.headers['otp-session'] as string;
    const otpData = req.body.otp as string;

    if (!otpSession) {
        return res.status(400).json({ msg: "OTP session has expired" });
    }

    try {
        const sessionData = await redis.get(`otp-session:${otpSession}`);
        if (!sessionData) {
            return res.status(400).json({ msg: "OTP session not found" });
        }

        const { email, otp, type } = JSON.parse(sessionData) as OtpSessionType;
        console.log(email, type, otp)
        if (!email || !otp || !type) {
            return res.status(400).json({ msg: "Session expired" });
        }
        const isOtpValid = verifyOTP(otpData) && otp === otpData;
        if (!isOtpValid) {
            return res.status(400).json({ msg: "OTP didn't match or has expired" });
        }

        const authSession = v4();
        await redis.set(
            `auth-session:${authSession}`,
            JSON.stringify({ email, type }),
            'EX', 120
        );
        res.setHeader('auth-session', authSession);
        return res.status(200).json({ msg: "OTP verified successfully", authSession });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "I fucked up" });
    }
};

export default OtpController;
