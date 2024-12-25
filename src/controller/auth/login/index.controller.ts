// login using username and password 


import LogInSchema from "./validation";
import prisma from "../../../lib/prisma";
import { createToken } from "../../../utils/handleJwt";
import { comparePassword } from "../../../utils/handleHashing";
import convertZodError from "../../../utils/handleFormatting";
import { Response, Request } from "express";


const LoginController = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { username, password } = data;
    const errors = LogInSchema.safeParse(data)
    if (!errors.success) {
        const errorObj = convertZodError(errors.error);
        return res.status(400).json(errorObj)
    }

    try {
        const userInfo = await prisma.user.findUnique({ where: { username } });
        if (!userInfo) {
            return res.status(400).json({ msg: "Account Not Found" })
        }

        const dbPassword = userInfo.password;
        const passwordAuth = await comparePassword(password, dbPassword);
        if (!passwordAuth) {
            return res.status(401).json({ msg: "Password didn't matched" })
        }

        const refreshToken =
            await createToken({
                id: userInfo.id,
            }, "30d");

        const accessToken = await createToken({ id: userInfo.id, name: userInfo.name, email: userInfo.email, username }, "1h");
        await prisma.token.update({
            where: { userId: userInfo.id },
            data: { refreshToken }
        })
        if (!accessToken || !refreshToken) {
            return res.status(500).json({ msg: "I fucked up again" });
        }
        res.setHeader('access-token', accessToken);
        res.setHeader('access-token', refreshToken);

        return res.status(200).json({ msg: "Login successful", refreshToken, accessToken });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "I fucked up" })
    }

};

export default LoginController;
