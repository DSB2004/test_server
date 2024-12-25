import { Request, Response, NextFunction } from 'express';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authSession = req.headers['auth-session'];
    if (!authSession) {
        return res.status(403).json({ msg: 'Auth session not found, please verify your OTP.' });
    }

    // If OTP session is found, forward the request to the next middleware/controller
    next();
};

export default AuthMiddleware;
