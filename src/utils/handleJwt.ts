import { jwtVerify, SignJWT } from "jose";



const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const createToken = async (payload: any, expireTime: string): Promise<string> => {
    if (!payload) throw new Error("Payload is required");
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expireTime)
        .setIssuedAt()
        .sign(JWT_SECRET);
};



export const verifyToken = async (token: string): Promise<any | null> => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload; 
    } catch (err) {
        console.error("Token verification failed:", err);
        return null;
    }
};