import { Request, Response, NextFunction } from 'express';

const OTPMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const otpSession = req.headers['otp-session'];
    if (!otpSession) {
        return res.status(403).json({ msg: 'OTP session not found.' });
    }
    next();
};

export default OTPMiddleware;
