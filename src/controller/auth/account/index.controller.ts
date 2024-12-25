import { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import redis from "../../../lib/redis";
import { createToken } from "../../../utils/handleJwt";
import { AccountDetailsType, AuthSessionType, SessionType } from "../../../types/app";
import { v4 } from "uuid";

const CreateAccountController = async (req: Request, res: Response): Promise<any> => {
    try {
        const authSession = req.headers['auth-session'] as string;
        const sessionData = await redis.get(`auth-session:${authSession}`);
        if (!sessionData) {
            return res.status(401).json({ msg: "Account session has expired" });
        }

        const parseData = JSON.parse(sessionData) as AuthSessionType;
        console.log(parseData)
        if (SessionType.ACCOUNT !== parseData.type) {
            return res.status(403).json({ msg: "Invalid session" });
        }
        if (!parseData.email) {
            return res.status(401).json({ msg: "Account session has expired" });
        }

        // Fetch user data from Redis
        const userInfo = JSON.parse(await redis.get(`user-account:${parseData.email}`) || "{}") as AccountDetailsType;
        if (!userInfo) {
            return res.status(400).json({ msg: "User data not found" });
        }

        const { name, password, username, email } = userInfo;

        await redis.del(`user-account:${email}`);


        const id = v4();

        await prisma.user.create({
            data: {
                email,
                password,
                name: name,
                username,
                id
            },
        });


        const accessToken = await createToken({ id, name, email, username }, "1h");
        const refreshToken = await createToken({ id }, "30d");
        
        await prisma.token.create({ data: { refreshToken, userId: id } })

        if (!accessToken || !refreshToken) {
            return res.status(500).json({ msg: "I fucked up again" });
        }

        res.setHeader('access-token', accessToken);
        res.setHeader('access-token', refreshToken);
        res.status(201).json({ msg: "Account created successfully", accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "I fucked up" });
    }
};

export default CreateAccountController;
