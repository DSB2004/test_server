import { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import redis from "../../../lib/redis";
import ResetPasswordSchema, { ResetPasswordFormData } from "./validation";
import { AuthSessionType, SessionType } from "../../../types/app";
import convertZodError from "../../../utils/handleFormatting";
import { hashPassword } from "../../../utils/handleHashing";

const ResetPasswordController = async (req: Request, res: Response): Promise<any> => {
    try {
        const authSession = req.headers['auth-session'] as string;
        const sessionData = await redis.get(`auth-session:${authSession}`);
        const data: ResetPasswordFormData = req.body
        if (!sessionData) {
            return res.status(401).json({ msg: "Account session has expired" });
        }
        const errors = ResetPasswordSchema.safeParse(data);

        if (!errors.success) {
            const errorObj = convertZodError(errors.error);
            return res.status(400).json(errorObj)
        }


        const parseData = JSON.parse(sessionData) as AuthSessionType;
        console.log(parseData)
        if (SessionType.RESET_PASSWORD !== parseData.type) {
            return res.status(403).json({ msg: "Invalid session" });
        }
        if (!parseData.email) {
            return res.status(401).json({ msg: "Account session has expired" });
        }
        const hashedPassword = await hashPassword(data.password)
        await prisma.user.update({ data: { password: hashedPassword }, where: { email: parseData.email } })

        return res.status(200).json({ msg: "Password updated" })

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "I fucked up" });
    }
}

export default ResetPasswordController;